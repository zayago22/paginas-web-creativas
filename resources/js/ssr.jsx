import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './contexts/ThemeContext';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => title ? `${title} – Páginas Web Creativas` : 'Páginas Web Creativas',
        resolve: (name) =>
            resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
        setup({ App, props }) {
            return (
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            );
        },
    }),
);
