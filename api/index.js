import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  initDb,
  migrateFromMeta,
  upsertUser,
  listMockups,
  createMockup,
  deleteMockup,
  pool,
} from './db.js';
import { requireAuth, registerAuthRoutes, resolveHubConfig } from './auth.js';

const app = express();
const DATA_DIR = process.env.DATA_DIR || '/data';
const UPLOAD_DIR = path.join(DATA_DIR, 'mockups');
const META_FILE = path.join(DATA_DIR, 'meta.json');
const SESSION_SECRET = process.env.SESSION_SECRET || randomUUID();

if (!process.env.SESSION_SECRET) {
  console.warn('WARNING: SESSION_SECRET not set — sessions will not survive restarts');
}
if (!process.env.DATABASE_URL) {
  console.warn('WARNING: DATABASE_URL not set — database connection will fail');
}

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.set('trust proxy', 1);

const PgSession = connectPgSimple(session);
const isProduction = process.env.NODE_ENV === 'production';
// express-session only sets Secure cookies when req.secure is true (trust proxy + X-Forwarded-Proto: https).
// Production defaults to secure; set COOKIE_SECURE=false for local HTTP testing.
const cookieSecure = process.env.COOKIE_SECURE === 'false'
  ? false
  : process.env.COOKIE_SECURE === 'true' || isProduction;

app.use(session({
  store: new PgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true,
  }),
  name: 'playground.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: cookieSecure,
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));

app.use(express.json());

const ALLOWED_EXTENSIONS = new Set([
  '.html', '.htm', '.pdf', '.svg',
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.ico', '.avif',
]);

function isAllowedUpload(filename) {
  return ALLOWED_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (isAllowedUpload(file.originalname)) return cb(null, true);
    cb(new Error('Only images, PDFs, SVGs, and HTML files are allowed'));
  },
});

app.use('/mockups', express.static(UPLOAD_DIR));

app.get('/api/mockups', async (req, res) => {
  try {
    res.json(await listMockups());
  } catch (err) {
    console.error('Failed to list mockups:', err);
    res.status(500).json({ error: 'Failed to list mockups' });
  }
});

app.post('/api/mockups', requireAuth, (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE'
        ? 'File exceeds 10 MB limit'
        : err.message;
      return res.status(400).json({ error: message });
    }

    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file' });

    const entry = {
      id: path.parse(file.filename).name,
      title: (req.body.title || file.originalname).trim(),
      filename: file.filename,
      url: `/mockups/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    };

    try {
      const mockup = await createMockup(entry, req.session.userId);
      res.json(mockup);
    } catch (createErr) {
      try { fs.unlinkSync(path.join(UPLOAD_DIR, file.filename)); } catch {}
      console.error('Failed to save mockup:', createErr);
      res.status(500).json({ error: 'Failed to save mockup' });
    }
  });
});

app.delete('/api/mockups/:id', requireAuth, async (req, res) => {
  try {
    const entry = await deleteMockup(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Not found' });

    try { fs.unlinkSync(path.join(UPLOAD_DIR, entry.filename)); } catch {}
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to delete mockup:', err);
    res.status(500).json({ error: 'Failed to delete mockup' });
  }
});

const PORT = parseInt(process.env.PORT) || 3001;

async function main() {
  await initDb();
  const migrated = await migrateFromMeta(META_FILE);
  if (migrated > 0) {
    console.log(`Migrated ${migrated} mockup(s) from meta.json to Postgres`);
  }

  const hubConfig = await resolveHubConfig();
  registerAuthRoutes(app, { upsertUser, hubConfig, sessionSecret: SESSION_SECRET });

  app.listen(PORT, () => console.log(`API :${PORT}`));
}

main().catch(err => {
  console.error('Failed to start API:', err);
  process.exit(1);
});
