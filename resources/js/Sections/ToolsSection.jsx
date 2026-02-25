import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { GradientText, Reveal, SectionLabel } from '../Components/Home/shared';
import { useIsMobile } from '../hooks/useIsMobile';

// ── Mobile-only: lightweight card (no functional component loaded) ────────────
function ToolCardMobile({ tool, onTap }) {
    return (
        <button
            type="button"
            onClick={onTap}
            className="w-full text-left p-4 bg-[#141d2f] border border-white/[0.06] rounded-xl flex items-center gap-3 active:scale-[.98] transition-transform relative overflow-hidden"
        >
            {/* Desktop badge */}
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[.55rem] font-bold uppercase bg-[#0090ff]/10 text-[#0090ff] border border-[#0090ff]/15 leading-none">
                Desktop
            </span>
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: tool.icon_bg_color }}
            >
                {tool.icon}
            </div>
            <div className="min-w-0">
                <h4 className="font-semibold text-sm leading-tight truncate pr-10">{tool.name}</h4>
                <p className="text-xs text-[#64748b] leading-relaxed mt-0.5 line-clamp-1">{tool.short_description}</p>
            </div>
        </button>
    );
}

// ── Bottom toast ─────────────────────────────────────────────────────────────
function DesktopOnlyToast({ visible }) {
    return (
        <div
            aria-live="polite"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] flex items-center gap-3
                px-5 py-3.5 rounded-2xl
                bg-[#0c1222]/90 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,.5)]
                text-white text-sm font-medium
                transition-all duration-300 ease-out pointer-events-none
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            {/* laptop icon */}
            <svg className="w-5 h-5 flex-shrink-0 text-[#0090ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="3" width="20" height="13" rx="2" />
                <path d="M1 20h22" strokeLinecap="round" />
            </svg>
            Para utilizar las herramientas, visita la versión de escritorio
        </div>
    );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ToolsSection({ tools }) {
    const isMobile = useIsMobile();
    const [toastVisible, setToastVisible] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    // Auto-hide toast after 3 s
    useEffect(() => {
        if (!toastVisible) return;
        const t = setTimeout(() => setToastVisible(false), 3000);
        return () => clearTimeout(t);
    }, [toastVisible]);

    const handleMobileTap = () => {
        if (!toastShown) {
            setToastVisible(true);
            setToastShown(true);
        }
    };

    return (
        <section className="py-28" id="herramientas">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <Reveal>
                    <SectionLabel text="Herramientas Gratuitas" />
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Herramientas <GradientText>100% gratis</GradientText> para tu negocio</h2>
                    <p className="text-[#94a3b8] text-lg max-w-[600px] mx-auto leading-relaxed">Optimiza tus imágenes, genera QR y más. Sin registro, sin subir archivos a servidores.</p>
                </Reveal>

                {isMobile ? (
                    /* ── MOBILE: compact 2-col, no heavy imports ── */
                    <div className="grid grid-cols-2 gap-3 mt-10">
                        {tools.map((tool) => (
                            <ToolCardMobile key={tool.id} tool={tool} onTap={handleMobileTap} />
                        ))}
                    </div>
                ) : (
                    /* ── DESKTOP: original layout ── */
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
                        {tools.map((tool, i) => (
                            <Reveal key={tool.id} delay={i * 80}>
                                {tool.url ? (
                                    <Link href={tool.url} className="group block p-7 bg-[#141d2f] border border-white/[0.06] rounded-2xl hover:border-[#0090ff]/20 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,.3)] transition-all text-center relative overflow-hidden">
                                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[.65rem] font-bold uppercase bg-[#00e4b8]/12 text-[#00e4b8]">Gratis</span>
                                        <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: tool.icon_bg_color }}>{tool.icon}</div>
                                        <h4 className="font-semibold mb-1">{tool.name}</h4>
                                        <p className="text-xs text-[#64748b] leading-relaxed">{tool.short_description}</p>
                                    </Link>
                                ) : (
                                    <div className="p-7 bg-[#141d2f] border border-white/[0.06] rounded-2xl opacity-60 text-center relative">
                                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[.65rem] font-bold uppercase bg-[#feca57]/12 text-[#feca57]">Próximamente</span>
                                        <div className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4" style={{ background: tool.icon_bg_color }}>{tool.icon}</div>
                                        <h4 className="font-semibold mb-1">{tool.name}</h4>
                                        <p className="text-xs text-[#64748b] leading-relaxed">{tool.short_description}</p>
                                    </div>
                                )}
                            </Reveal>
                        ))}
                    </div>
                )}

                <Reveal>
                    <Link href="/herramientas" className="inline-flex items-center gap-2 mt-10 text-sm text-[#0090ff] font-semibold hover:underline">
                        Ver todas las herramientas →
                    </Link>
                </Reveal>
            </div>

            {/* Toast — rendered outside the section container so it's always fixed */}
            <DesktopOnlyToast visible={toastVisible} />
        </section>
    );
}
