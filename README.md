# Playground

A React application with file-based navigation designed for testing AI-generated mockups and prototypes.

## Features

- 🎨 **File-based routing** - Easy to add new test pages
- 📱 **Responsive design** - Works on all screen sizes
- ⚡ **Hot reload** - Instant feedback during development
- 🐳 **Docker support** - Easy containerization and deployment
- 🎯 **Modern UI** - Beautiful, clean interface for testing
- 📤 **Browser uploads** - Upload mockups from the dashboard without redeploying

## Quick Start

### Development (with Docker)

```bash
# Start development server with Docker
npm run docker:dev

# Or using docker-compose directly
docker-compose up app-dev
```

The app will be available at `http://localhost:3000`

### Development (local)

```bash
# Terminal 1 — API server (file uploads & serving)
cd api && npm install
DATA_DIR=/tmp/mockups node index.js

# Terminal 2 — Vite dev server (proxies /api and /mockups to localhost:3001)
npm install
npm run dev
```

### Production (with Docker)

```bash
# Build and start both services (frontend + upload API)
docker compose up --build -d
```

The production app will be available at `http://localhost:8080` (or the value of `VITE_PORT` in `.env`).

## Mockup Dashboard

The home page (`/`) is a dashboard for uploading and sharing UI mockups.

- **Upload mockups** — images, HTML, PDFs, SVGs, up to 10 MB
- **Instant shareable URL** — each upload gets a `/mockups/<id>.<ext>` URL
- **HTML files render live** — open an uploaded `.html` file and the browser renders it fully, including styles and interactions
- **Drag and drop** supported in the upload modal
- **Persistent** — uploads live in a Docker named volume (`mockups-data`) and survive container rebuilds and redeployments

### Upload API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/mockups` | List all mockups |
| `POST` | `/api/mockups` | Upload a file (`multipart/form-data`: `file`, `title?`) |
| `DELETE` | `/api/mockups/:id` | Delete a mockup |
| `GET` | `/mockups/:filename` | Serve an uploaded file |

## Docker Commands

### Development
```bash
# Build development image
npm run docker:build-dev

# Run development container
npm run docker:run

# Start with docker-compose
npm run docker:dev
```

### Production
```bash
# Build production image
npm run docker:build

# Run production container
npm run docker:run-prod

# Start with docker-compose (includes upload API + persistent volume)
npm run docker:prod
```

## Adding New Pages

1. Create a new component in `src/pages/YourPage.tsx`
2. Add a route in `src/App.tsx`:

```tsx
import YourPage from './pages/YourPage';

<Route path="/your-page" element={<YourPage />} />
```

3. Add a link to the `COMPONENT_PAGES` array in `src/pages/Dashboard.tsx`:

```ts
const COMPONENT_PAGES = [
  // ... existing pages
  { label: 'Your Page', path: '/your-page' },
];
```

The page will appear as a link in the dashboard nav.

## Project Structure

```
src/
├── pages/
│   ├── Dashboard.tsx       # Home page — mockup gallery + upload
│   └── visits/             # Visit-related component pages
├── App.tsx                 # Routes
├── main.tsx                # Entry point
└── index.css               # Base styles

api/
├── index.js                # Express upload API (GET/POST/DELETE /api/mockups)
├── package.json
└── Dockerfile
```

## Architecture

```
browser
  └── nginx (port 80)
        ├── /api/*      → proxy → api:3001
        ├── /mockups/*  → proxy → api:3001  (serves uploaded files)
        └── /*          → React SPA
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run docker:dev` - Start development with Docker
- `npm run docker:prod` - Start production with Docker
- `npm run docker:build` - Build production Docker image
- `npm run docker:build-dev` - Build development Docker image

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Express + Multer** - Upload API
- **Docker** - Containerization
- **Nginx** - Production reverse proxy and static file serving

## License

MIT
