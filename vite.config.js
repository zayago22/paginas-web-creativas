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
    build: {
        minify: 'esbuild',
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'vendor-react';
                    if (id.includes('@inertiajs')) return 'vendor-inertia';
                    if (id.includes('framer-motion')) return 'vendor-animations';
                    if (id.includes('lucide-react')) return 'vendor-icons';
                    if (id.includes('qrcode')) return 'vendor-qrcode';
                    if (id.includes('@fontsource')) return 'vendor-fonts';
                    if (id.includes('browser-image-compression')) return 'vendor-imgcompression';
                    if (id.includes('jszip') || id.includes('file-saver')) return 'vendor-zip';
                    if (id.includes('pdf-lib')) return 'vendor-pdf';
                    if (id.includes('@imgly/background-removal')) return 'vendor-bgremoval';
                    if (id.includes('cropperjs')) return 'vendor-cropper';
                },
            },
        },
    },
});
