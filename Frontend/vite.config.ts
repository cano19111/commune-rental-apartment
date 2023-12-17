import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: '@/', replacement: '/src/' }],
    },
    server: {
        port: 8000,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'IP/URL',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
