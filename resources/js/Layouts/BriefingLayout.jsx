import { Head } from '@inertiajs/react';

export default function BriefingLayout({ children, meta = {} }) {
    return (
        <>
            <Head>
                <title>{meta.title || 'Briefing de Diseño Web — Páginas Web Creativas'}</title>
                <meta name="description" content={meta.description || 'Completa tu briefing de diseño web.'} />
                {meta.noindex && <meta name="robots" content="noindex, nofollow" />}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
            </Head>

            {/* Fondo con soporte de tema */}
            <div
                style={{ background: 'var(--briefing-bg)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", transition: 'background 300ms ease' }}
                className="text-[var(--briefing-text)]"
            >
                {children}
            </div>
        </>
    );
}
