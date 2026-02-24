import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

function GradientText({ children }) {
    return <span className="bg-gradient-to-r from-[#0090ff] via-[#00bfff] to-[#00e4b8] bg-clip-text text-transparent">{children}</span>;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
    const [current, setCurrent] = useState(startIndex);

    const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
    const next = () => setCurrent(i => (i + 1) % images.length);

    const handleKey = (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape') onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={onClose}
            onKeyDown={handleKey}
            tabIndex={0}
            ref={el => el?.focus()}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition text-xl z-10"
            >×</button>

            {/* Counter */}
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/60 text-white text-sm font-medium">
                {current + 1} / {images.length}
            </div>

            {/* Prev */}
            {images.length > 1 && (
                <button
                    onClick={e => { e.stopPropagation(); prev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
            )}

            {/* Image */}
            <img
                src={images[current]}
                alt={`Imagen ${current + 1}`}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
                onClick={e => e.stopPropagation()}
            />

            {/* Next */}
            {images.length > 1 && (
                <button
                    onClick={e => { e.stopPropagation(); next(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] pb-1">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={e => { e.stopPropagation(); setCurrent(i); }}
                            className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition ${i === current ? 'border-[#0090ff]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                        >
                            <img src={src} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ProjectShow({ project, related }) {
    const [lightbox, setLightbox] = useState(null); // index | null

    // All images: main first, then gallery
    const allImages = [
        ...(project.image_url ? [project.image_url] : []),
        ...(project.gallery_urls || []),
    ];

    const categoryLabels = {
        web: 'Sitio Web',
        ecommerce: 'E-Commerce',
        elearning: 'E-Learning',
        landing: 'Landing Page',
        app: 'Aplicación',
    };

    return (
        <AppLayout>
            <Head title={`${project.title} — Portafolio`} />

            {/* ── Hero ── */}
            <section className="pt-36 pb-12">
                <div className="max-w-[1100px] mx-auto px-6">
                    <Link href="/#portafolio" className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#94a3b8] transition mb-8">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                        Volver al portafolio
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="px-3 py-1.5 rounded-full bg-[#0090ff]/10 text-[#0090ff] text-xs font-semibold uppercase tracking-wider">
                            {categoryLabels[project.category] || project.category}
                        </span>
                        {project.completed_at && (
                            <span className="text-sm text-[#64748b]">Completado: {project.completed_at}</span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        {project.title}
                    </h1>

                    {project.client_name && (
                        <p className="text-[#94a3b8] text-lg mb-6">Cliente: <span className="text-white font-medium">{project.client_name}</span></p>
                    )}

                    <p className="text-[#94a3b8] text-lg leading-relaxed max-w-[700px] mb-8">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0090ff] to-[#00d4aa] text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-[#0090ff]/20 text-sm"
                            >
                                Ver sitio en vivo
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </a>
                        )}
                        {project.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(t => (
                                    <span key={t} className="px-3 py-1.5 bg-[#141d2f] border border-white/[0.06] text-[#94a3b8] text-xs rounded-lg font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Imagen principal ── */}
            {project.image_url && (
                <section className="pb-6">
                    <div className="max-w-[1100px] mx-auto px-6">
                        <div
                            className="rounded-2xl overflow-hidden border border-white/[0.06] cursor-zoom-in"
                            onClick={() => setLightbox(0)}
                        >
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full max-h-[560px] object-cover hover:scale-[1.01] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* ── Galería ── */}
            {project.gallery_urls?.length > 0 && (
                <section className="pb-20">
                    <div className="max-w-[1100px] mx-auto px-6">
                        <h2 className="text-xl font-bold mb-6 mt-8">
                            <GradientText>Galería del proyecto</GradientText>
                            <span className="ml-3 text-sm text-[#64748b] font-normal">{project.gallery_urls.length} imagen{project.gallery_urls.length !== 1 ? 'es' : ''}</span>
                        </h2>

                        {/* Grid dinámico */}
                        <div className={`grid gap-4 ${
                            project.gallery_urls.length === 1 ? 'grid-cols-1' :
                            project.gallery_urls.length === 2 ? 'grid-cols-2' :
                            project.gallery_urls.length === 3 ? 'grid-cols-3' :
                            'grid-cols-2 md:grid-cols-3'
                        }`}>
                            {project.gallery_urls.map((url, i) => {
                                // First image of gallery gets double column if 4+ images
                                const isFeature = i === 0 && project.gallery_urls.length >= 4;
                                return (
                                    <div
                                        key={i}
                                        className={`relative group rounded-xl overflow-hidden border border-white/[0.06] cursor-zoom-in ${isFeature ? 'md:col-span-2' : ''}`}
                                        onClick={() => setLightbox(project.image_url ? i + 1 : i)}
                                    >
                                        <img
                                            src={url}
                                            alt={`${project.title} — imagen ${i + 1}`}
                                            className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${isFeature ? 'h-72' : 'h-52'}`}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                                            </svg>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Proyectos relacionados ── */}
            {related?.length > 0 && (
                <section className="py-20 border-t border-white/[0.06]">
                    <div className="max-w-[1100px] mx-auto px-6">
                        <h2 className="text-2xl font-bold mb-10">Proyectos <GradientText>similares</GradientText></h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {related.map(proj => (
                                <Link
                                    key={proj.id}
                                    href={`/portafolio/${proj.slug}`}
                                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#141d2f] border border-white/[0.06] block hover:border-[#0090ff]/20 transition"
                                >
                                    {proj.image_url ? (
                                        <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#64748b] text-sm">{proj.title}</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222]/90 via-[#0c1222]/20 to-transparent flex flex-col justify-end p-5">
                                        <h4 className="text-base font-bold">{proj.title}</h4>
                                        <p className="text-xs text-[#94a3b8] capitalize">{proj.category}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA ── */}
            <section className="py-20 text-center">
                <div className="max-w-[600px] mx-auto px-6">
                    <h2 className="text-3xl font-extrabold mb-4">¿Te gustó este trabajo?</h2>
                    <p className="text-[#94a3b8] mb-8">Podemos crear algo igual de impresionante para tu negocio.</p>
                    <a
                        href="https://wa.me/5215526711438?text=Hola,%20vi%20su%20portafolio%20y%20me%20interesa%20un%20proyecto%20web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0090ff] to-[#00d4aa] text-white font-bold rounded-2xl hover:opacity-90 transition shadow-xl shadow-[#0090ff]/20"
                    >
                        Quiero un proyecto así
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <Lightbox
                    images={allImages}
                    startIndex={lightbox}
                    onClose={() => setLightbox(null)}
                />
            )}
        </AppLayout>
    );
}
