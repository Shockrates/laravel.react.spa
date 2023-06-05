import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
    server: {
        port: 3000,
      },
    plugins: [
        react(),
        laravel({
            input: [
                'resources/js/main.jsx',
            ],
            refresh: true,
        }),
    ],
});