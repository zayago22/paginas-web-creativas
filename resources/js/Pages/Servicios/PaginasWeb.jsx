import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

const FEATURES = [
    { icon: '🎨', title: 'Diseño 100% a medida', desc: 'Sin plantillas genéricas. Cada sitio es único y refleja tu marca.' },
    { icon: '⚡', title: 'Velocidad PageSpeed 90+', desc: 'Código optimizado, imágenes comprimidas y hosting en servidores rápidos.' },
    { icon: '🔍', title: 'SEO desde el día uno', desc: 'Estructura semántica, meta tags, sitemap y schema markup incluidos.' },
    { icon: '📱', title: 'Responsive en todos los dispositivos', desc: 'Se ve perfecto en móvil, tablet y escritorio.' },
    { icon: '🔒', title: 'SSL + dominio gratuito', desc: 'Certificado SSL y dominio .com incluido el primer año.' },
    { icon: '📊', title: 'Panel de administración', desc: 'Actualiza textos, imágenes y contenido sin saber programar.' },
];

const PROCESS = [
    { n: '01', title: 'Briefing', desc: 'Conocemos tu negocio, objetivos y público meta.' },
    { n: '02', title: 'Diseño', desc: 'Creamos el diseño visual y lo aprobamos contigo.' },
    { n: '03', title: 'Desarrollo', desc: 'Programamos el sitio con las mejores tecnologías.' },
    { n: '04', title: 'Entrega', desc: 'Publicamos, te capacitamos y te damos soporte.' },
];

export default function PaginasWeb() {
    const whatsapp = 'https://wa.me/5215526711438';

    return (
        <AppLayout>
            <Head title="Diseño de Páginas Web Profesionales" />

            {/* Hero */}
            <section className="pt-44 pb-20">
                <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link href="/servicios" className="inline-flex items-center gap-1 text-sm text-[#0090ff] mb-6 hover:underline">
                            ← Todos los servicios
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            Páginas web profesionales que{' '}
                            <span className="bg-gradient-to-r from-[#0090ff] to-[#00bfff] bg-clip-text text-transparent">
                                convierten
                            </span>
                        </h1>
                        <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                            Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para Google.
                            Entrega en 15 días hábiles. Desde $8,999 MXN.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={`${whatsapp}?text=${encodeURIComponent('Hola! Me interesa una página web profesional para mi negocio')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 rounded-full bg-[#0090ff] text-white font-semibold hover:bg-[#0070d6] hover:-translate-y-0.5 transition-all"
                            >
                                Cotizar mi página web
                            </a>
                            <Link href="/portafolio" className="px-8 py-3.5 rounded-full border border-white/[0.12] font-semibold hover:bg-white/[0.05] transition">
                                Ver portafolio
                            </Link>
                        </div>
                    </div>
                    <div className="bg-[#141d2f] border border-white/[0.06] rounded-2xl p-8">
                        <p className="text-4xl font-black text-[#0090ff] mb-1">$8,999 MXN</p>
                        <p className="text-[#94a3b8] text-sm mb-6">Precio base, pago único</p>
                        <ul className="space-y-3">
                            {['Hasta 6 secciones + contacto', 'Diseño personalizado', 'SEO básico incluido', 'SSL y dominio .com gratis (1 año)', 'Entrega en 15 días hábiles', 'Capacitación incluida'].map(f => (
                                <li key={f} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                                    <span className="text-[#0090ff]">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-center mb-12">¿Qué incluye tu página web?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map(f => (
                            <div key={f.title} className="p-7 bg-[#141d2f] border border-white/[0.06] rounded-xl">
                                <div className="text-3xl mb-3">{f.icon}</div>
                                <h3 className="font-bold mb-2">{f.title}</h3>
                                <p className="text-sm text-[#94a3b8] leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-center mb-12">Proceso de trabajo</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PROCESS.map(p => (
                            <div key={p.n} className="text-center p-6 bg-[#141d2f] border border-white/[0.06] rounded-xl">
                                <p className="text-3xl font-black text-[#0090ff] mb-3">{p.n}</p>
                                <h3 className="font-bold mb-2">{p.title}</h3>
                                <p className="text-sm text-[#94a3b8]">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold mb-4">Empieza hoy — respuesta en menos de 24 h</h2>
                    <p className="text-[#94a3b8] mb-8">Cuéntanos tu proyecto y te enviamos una propuesta sin costo.</p>
                    <a
                        href={`${whatsapp}?text=${encodeURIComponent('Hola! Quiero cotizar una página web profesional para mi negocio')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-8 py-3.5 rounded-full bg-[#0090ff] text-white font-semibold hover:bg-[#0070d6] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all"
                    >
                        Solicitar cotización gratis
                    </a>
                </div>
            </section>
        </AppLayout>
    );
}
