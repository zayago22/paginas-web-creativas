import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    server: {
        host: '127.0.0.1',
    },
    build: {
        // Minification (esbuild is default and fast)
        minify: 'esbuild',
        // Increase chunk size warning limit (sections are intentionally split)
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                // Manual chunks — split vendor and heavy libs for better caching
                manualChunks(id) {
                    // Core React vendor chunk
                    if (id.includes('node_modules/react/') ||
                        id.includes('node_modules/react-dom/') ||
                        id.includes('node_modules/scheduler/')) {
                        return 'vendor-react';
                    }
                    // Inertia chunk
                    if (id.includes('node_modules/@inertiajs/')) {
                        return 'vendor-inertia';
                    }
                    // Animations — framer-motion is heavy, isolate it
                    if (id.includes('node_modules/framer-motion')) {
                        return 'vendor-animations';
                    }
                    // Icons
                    if (id.includes('node_modules/lucide-react')) {
                        return 'vendor-icons';
                    }
                    // QR code library
                    if (id.includes('node_modules/qrcode')) {
                        return 'vendor-qrcode';
                    }
                    // Font source files
                    if (id.includes('node_modules/@fontsource')) {
                        return 'vendor-fonts';
                    }
                },
            },
        },
    },
});
