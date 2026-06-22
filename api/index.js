import express from 'express';
import session from 'express-session';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const app = express();
const DATA_DIR = process.env.DATA_DIR || '/data';
const UPLOAD_DIR = path.join(DATA_DIR, 'mockups');
const META_FILE = path.join(DATA_DIR, 'meta.json');
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET || randomUUID();

if (!AUTH_PASSWORD) console.warn('WARNING: AUTH_PASSWORD not set — auth is disabled');
if (!process.env.SESSION_SECRET) console.warn('WARNING: SESSION_SECRET not set — sessions will not survive restarts');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax' },
}));

app.use(express.json());

function requireAuth(req, res, next) {
  if (!AUTH_PASSWORD || req.session?.authed) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

app.post('/api/login', (req, res) => {
  if (!AUTH_PASSWORD) return res.json({ ok: true });
  if (req.body?.password === AUTH_PASSWORD) {
    req.session.authed = true;
    return res.json({ ok: true });
  }
  res.status(401).json({ error: 'Incorrect password' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/me', requireAuth, (req, res) => res.json({ ok: true }));

function loadMeta() {
  try { return JSON.parse(fs.readFileSync(META_FILE, 'utf8')); }
  catch { return []; }
}

function saveMeta(meta) {
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2));
}

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

app.use('/mockups', requireAuth, express.static(UPLOAD_DIR));

app.get('/api/mockups', requireAuth, (req, res) => {
  res.json(loadMeta());
});

app.post('/api/mockups', requireAuth, (req, res) => {
  upload.single('file')(req, res, (err) => {
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
      uploadedAt: new Date().toISOString(),
      size: file.size,
      mimetype: file.mimetype,
    };

    const meta = loadMeta();
    meta.unshift(entry);
    saveMeta(meta);
    res.json(entry);
  });
});

app.delete('/api/mockups/:id', requireAuth, (req, res) => {
  const meta = loadMeta();
  const idx = meta.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  const [entry] = meta.splice(idx, 1);
  try { fs.unlinkSync(path.join(UPLOAD_DIR, entry.filename)); } catch {}
  saveMeta(meta);
  res.json({ ok: true });
});

const PORT = parseInt(process.env.PORT) || 3001;
app.listen(PORT, () => console.log(`API :${PORT}`));
