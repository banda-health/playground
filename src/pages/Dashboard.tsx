import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types';

interface Mockup {
  id: string;
  title: string;
  filename: string;
  url: string;
  uploadedAt: string;
  size: number;
  mimetype: string;
  uploadedByName: string | null;
  uploadedByEmail: string | null;
}

const COMPONENT_PAGES = [
  { label: 'Tabs V3', path: '/visits/tabs-v3' },
  { label: 'Tabs V4', path: '/visits/tabs-v4' },
  { label: 'Visit Builder V3', path: '/visits/builder-v3' },
];

const ALLOWED_EXTENSIONS = new Set([
  '.html', '.htm', '.pdf', '.svg',
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.ico', '.avif',
]);

const ACCEPT_TYPES = 'image/*,.pdf,.svg,.html,.htm';

function isAllowedFile(file: File) {
  const ext = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase() : '';
  return ALLOWED_EXTENSIONS.has(ext);
}

interface Props {
  user: User | null;
  devUserName?: string | null;
  authError?: string | null;
  onClearAuthError?: () => void;
  onLogin: (user: User) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<Props> = ({ user, devUserName, authError, onClearAuthError, onLogin, onLogout }) => {
  const [mockups, setMockups] = useState<Mockup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [fileError, setFileError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const selectFile = (f: File | null) => {
    if (!f) {
      setFile(null);
      setFileError('');
      return;
    }
    if (!isAllowedFile(f)) {
      setFile(null);
      setFileError('Only images, PDFs, SVGs, and HTML files are allowed');
      return;
    }
    setFileError('');
    setFile(f);
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    onLogout();
  };

  const handleSignIn = async () => {
    if (devUserName) {
      const res = await fetch('/api/auth/dev-login', { method: 'POST', credentials: 'include' });
      if (res.ok) {
        onClearAuthError?.();
        onLogin(await res.json());
      }
      return;
    }
    window.location.href = '/api/auth/login';
  };

  const load = async () => {
    const res = await fetch('/api/mockups', { credentials: 'include' });
    if (res.ok) setMockups(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('title', title || file.name);
    const res = await fetch('/api/mockups', { method: 'POST', body: form, credentials: 'include' });
    if (!res.ok) {
      const { error } = await res.json();
      setFileError(error || 'Upload failed');
      setUploading(false);
      return;
    }
    setUploading(false);
    setShowUpload(false);
    setTitle('');
    setFile(null);
    setFileError('');
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this mockup?')) return;
    await fetch(`/api/mockups/${id}`, { method: 'DELETE', credentials: 'include' });
    setMockups(m => m.filter(x => x.id !== id));
  };

  const copyUrl = async (url: string, id: string) => {
    await navigator.clipboard.writeText(window.location.origin + url);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) selectFile(f);
  }, []);

  const closeUpload = () => { setShowUpload(false); setFile(null); setTitle(''); setFileError(''); };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {authError && (
          <div className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{authError}</span>
            <button
              type="button"
              onClick={onClearAuthError}
              className="shrink-0 text-red-400 hover:text-red-600"
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
        )}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-gray-900">Playground</h1>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-500 hidden sm:inline">{user.name}</span>
                <button
                  onClick={() => setShowUpload(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                  Upload mockup
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
              >
                Sign in
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
          <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Components</span>
          {COMPONENT_PAGES.map(p => (
            <Link
              key={p.path}
              to={p.path}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              {p.label}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">Loading...</div>
        ) : mockups.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-sm mb-3">No mockups uploaded yet</p>
            {user ? (
              <button onClick={() => setShowUpload(true)} className="text-blue-600 hover:underline text-sm">
                Upload your first mockup
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="text-blue-600 hover:underline text-sm"
              >
                Sign in to upload mockups
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockups.map(m => (
              <div
                key={m.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
              >
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="block">
                  {m.mimetype.startsWith('image/') ? (
                    <img
                      src={m.url}
                      alt={m.title}
                      className="w-full h-44 object-cover bg-gray-100"
                    />
                  ) : (
                    <div className="w-full h-44 bg-gray-50 flex flex-col items-center justify-center gap-2">
                      <span className="text-5xl text-gray-300">&#128196;</span>
                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        {m.filename.split('.').pop()}
                      </span>
                    </div>
                  )}
                </a>
                <div className="p-4">
                  <p className="font-medium text-gray-900 text-sm truncate" title={m.title}>{m.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(m.uploadedAt)} · {formatSize(m.size)}
                    {m.uploadedByName && (
                      <> · {m.uploadedByName}</>
                    )}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                      Open
                    </a>
                    <button
                      onClick={() => copyUrl(m.url, m.id)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors min-w-[72px]"
                    >
                      {copied === m.id ? 'Copied!' : 'Copy URL'}
                    </button>
                    {user && (
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="px-3 py-1.5 text-red-400 rounded-lg text-xs hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {user && showUpload && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={e => { if (e.target === e.currentTarget) closeUpload(); }}
        >
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-base font-semibold mb-4 text-gray-900">Upload Mockup</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                  file
                    ? 'border-green-400 bg-green-50'
                    : dragging
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept={ACCEPT_TYPES}
                  className="hidden"
                  onChange={e => selectFile(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <p className="text-sm text-green-700 font-medium truncate px-2">{file.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">Drop a file here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">Images, PDFs, SVGs, HTML · up to 10 MB</p>
                  </>
                )}
              </div>
              {fileError && (
                <p className="text-sm text-red-600">{fileError}</p>
              )}
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title (optional)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeUpload}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!file || uploading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
