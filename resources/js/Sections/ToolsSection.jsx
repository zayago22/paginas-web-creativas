import { Link } from '@inertiajs/react';
import { GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

export default function ToolsSection({ tools }) {
    return (
        <section className="py-28" id="herramientas">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <Reveal>
                    <SectionLabel text="Herramientas Gratuitas" />
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Herramientas <GradientText>100% gratis</GradientText> para tu negocio</h2>
                    <p className="text-[#94a3b8] text-lg max-w-[600px] mx-auto leading-relaxed">Optimiza tus imágenes, genera QR y más. Sin registro, sin subir archivos a servidores.</p>
                </Reveal>
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
                <Reveal>
                    <Link href="/herramientas" className="inline-flex items-center gap-2 mt-10 text-sm text-[#0090ff] font-semibold hover:underline">
                        Ver todas las herramientas →
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
