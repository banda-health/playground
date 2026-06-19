import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react()],
		server: {
			port: parseInt(env.VITE_PORT) || 3000,
			host: env.VITE_HOST || 'localhost',
			open: false, // Disable auto-open in Docker
			proxy: {
				'/api': `http://localhost:${parseInt(env.API_PORT) || 3001}`,
				'/mockups': `http://localhost:${parseInt(env.API_PORT) || 3001}`,
			},
		},
	};
});
