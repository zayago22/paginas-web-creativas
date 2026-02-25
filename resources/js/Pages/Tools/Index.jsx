import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function ToolsIndex({ toolsByCategory }) {
    const categoryLabels = {
        imagen: '🖼️ Herramientas de Imagen',
        pdf: '📄 Herramientas PDF',
        utilidad: '🛠️ Utilidades Web',
    };

    return (
        <AppLayout>
            <Head title="Herramientas Gratuitas para Imágenes" />

            <section className="pt-40 pb-12 text-center">
                <div className="max-w-[1100px] mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#00e4b8]/8 border border-[#00e4b8]/15 text-[#00e4b8] mb-5">
                        ✨ 100% Gratuitas — Sin registro
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        Herramientas{' '}
                        <span className="bg-gradient-to-r from-[#0090ff] via-[#00bfff] to-[#00e4b8] bg-clip-text text-transparent">
                            para tus imágenes
                        </span>
                    </h1>
                    <p className="text-lg text-[#8899aa] max-w-[560px] mx-auto leading-relaxed">
                        Comprime, edita, convierte y optimiza directamente en tu navegador. Nada se sube a ningún servidor.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#8899aa]">
                        {['100% privado', 'Sin marcas de agua', 'Procesamiento instantáneo'].map(text => (
                            <div key={text} className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#00e4b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                {text}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-28">
                <div className="max-w-[1100px] mx-auto px-6">
                    {Object.entries(toolsByCategory).map(([category, tools]) => (
                        <div key={category} className="mb-12">
                            <div className="flex items-center gap-4 mb-6 pt-8">
                                <h2 className="text-lg font-bold whitespace-nowrap">{categoryLabels[category] || category}</h2>
                                <div className="flex-1 h-px bg-white/[0.06]" />
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {tools.map(tool => (
                                    tool.url ? (
                                        <Link key={tool.id} href={tool.url}
                                              className="group flex items-start gap-4 p-6 bg-[#0d1117] border border-white/[0.06] rounded-2xl hover:border-[#0090ff]/20 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,.3)] transition-all relative">
                                            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[.6rem] font-bold uppercase bg-[#00e4b8]/10 text-[#00e4b8]">
                                                {tool.status === 'active' ? 'Gratis' : 'Nuevo'}
                                            </span>
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: tool.icon_bg_color }}>
                                                {tool.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-1 group-hover:text-[#0090ff] transition">{tool.name}</h3>
                                                <p className="text-xs text-[#5a6a7a] leading-relaxed">{tool.short_description}</p>
                                            </div>
                                        </Link>
                                    ) : (
                                        <div key={tool.id} className="flex items-start gap-4 p-6 bg-[#0d1117] border border-white/[0.06] rounded-2xl opacity-50 relative">
                                            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[.6rem] font-bold uppercase bg-[#feca57]/10 text-[#feca57]">Próximamente</span>
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: tool.icon_bg_color }}>
                                                {tool.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-1">{tool.name}</h3>
                                                <p className="text-xs text-[#5a6a7a] leading-relaxed">{tool.short_description}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* CTA */}
                    <div className="mt-12 p-12 bg-[#0d1117] border border-white/[0.06] rounded-2xl text-center">
                        <h2 className="text-xl font-extrabold mb-2">¿Necesitas una página web profesional?</h2>
                        <p className="text-[#8899aa] mb-6">Diseñamos sitios web que generan clientes. Desde $8,999 MXN.</p>
                        <Link href="/" className="inline-flex px-8 py-3 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-sm hover:shadow-[0_6px_25px_rgba(0,144,255,.3)] transition-all">
                            Ver Planes y Precios →
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
