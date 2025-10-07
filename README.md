# Playground

A React application with file-based navigation designed for testing AI-generated mockups and prototypes.

## Features

- 🎨 **File-based routing** - Easy to add new test pages
- 📱 **Responsive design** - Works on all screen sizes
- ⚡ **Hot reload** - Instant feedback during development
- 🐳 **Docker support** - Easy containerization and deployment
- 🎯 **Modern UI** - Beautiful, clean interface for testing

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
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production (with Docker)

```bash
# Build and run production container
npm run docker:prod

# Or build manually
docker build -t ai-mockup-tester .
docker run -p 8080:80 ai-mockup-tester
```

The production app will be available at `http://localhost:8080`

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

# Start with docker-compose
npm run docker:prod
```

## Adding New Pages

1. Create a new component in `src/pages/YourPage.jsx`
2. Add the page configuration to `src/utils/pageLoader.js`:

```javascript
import YourPage from '../pages/YourPage.jsx';

export const pages = [
  // ... existing pages
  {
    path: '/your-page',
    component: YourPage,
    title: 'Your Page',
    description: 'Description of your page'
  }
];
```

3. The page will automatically appear in the navigation!

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.jsx
│   └── Navigation.css
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProfilePage.jsx
│   └── Page.css
├── utils/              # Utility functions
│   └── pageLoader.js   # File-based routing config
├── App.jsx             # Main app component
├── App.css             # Global styles
├── main.jsx            # Entry point
└── index.css           # Base styles
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
- **Docker** - Containerization
- **Nginx** - Production web server
- **CSS3** - Modern styling with gradients and animations

## License

MIT