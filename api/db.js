import fs from 'fs';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      hub_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT,
      avatar_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS mockups (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      filename TEXT NOT NULL UNIQUE,
      url TEXT NOT NULL,
      size INTEGER NOT NULL,
      mimetype TEXT NOT NULL,
      uploaded_by_id INTEGER REFERENCES users(id),
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function migrateFromMeta(metaFile) {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM mockups');
  if (rows[0].count > 0) return 0;

  let meta;
  try {
    meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
  } catch {
    return 0;
  }

  if (!Array.isArray(meta) || meta.length === 0) return 0;

  let migrated = 0;
  for (const entry of meta) {
    await pool.query(
      `INSERT INTO mockups (id, title, filename, url, size, mimetype, uploaded_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [
        entry.id,
        entry.title,
        entry.filename,
        entry.url,
        entry.size,
        entry.mimetype,
        entry.uploadedAt ?? new Date().toISOString(),
      ],
    );
    migrated += 1;
  }

  return migrated;
}

export async function upsertUser({ hubId, name, email, avatarUrl }) {
  const { rows } = await pool.query(
    `INSERT INTO users (hub_id, name, email, avatar_url, last_seen_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (hub_id) DO UPDATE SET
       name = EXCLUDED.name,
       email = COALESCE(EXCLUDED.email, users.email),
       avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
       last_seen_at = NOW()
     RETURNING id, hub_id AS "hubId", name, email, avatar_url AS "avatarUrl"`,
    [hubId, name, email ?? null, avatarUrl ?? null],
  );
  return rows[0];
}

export async function getUserById(id) {
  const { rows } = await pool.query(
    `SELECT id, hub_id AS "hubId", name, email, avatar_url AS "avatarUrl"
     FROM users WHERE id = $1`,
    [id],
  );
  return rows[0] ?? null;
}

export async function listMockups() {
  const { rows } = await pool.query(
    `SELECT
       m.id,
       m.title,
       m.filename,
       m.url,
       m.size,
       m.mimetype,
       m.uploaded_at AS "uploadedAt",
       u.name AS "uploadedByName",
       u.email AS "uploadedByEmail"
     FROM mockups m
     LEFT JOIN users u ON u.id = m.uploaded_by_id
     ORDER BY m.uploaded_at DESC`,
  );
  return rows;
}

export async function createMockup(entry, userId) {
  const { rows } = await pool.query(
    `INSERT INTO mockups (id, title, filename, url, size, mimetype, uploaded_by_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING
       id, title, filename, url, size, mimetype, uploaded_at AS "uploadedAt"`,
    [entry.id, entry.title, entry.filename, entry.url, entry.size, entry.mimetype, userId],
  );
  const mockup = rows[0];
  const user = await getUserById(userId);
  return {
    ...mockup,
    uploadedByName: user?.name ?? null,
    uploadedByEmail: user?.email ?? null,
  };
}

export async function deleteMockup(id) {
  const { rows } = await pool.query(
    'DELETE FROM mockups WHERE id = $1 RETURNING filename',
    [id],
  );
  return rows[0] ?? null;
}

export async function closeDb() {
  await pool.end();
}
