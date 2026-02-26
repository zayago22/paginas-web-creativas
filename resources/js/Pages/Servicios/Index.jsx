import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

const SERVICES = [
    {
        slug: 'paginas-web',
        icon: '🌐',
        name: 'Páginas Web',
        price: '$8,999',
        description: 'Sitio web profesional, veloz y optimizado para SEO. Ideal para negocios que quieren crecer online.',
        features: ['Diseño moderno a medida', 'Optimizado para Google', 'Velocidad PageSpeed 90+', 'SSL + dominio incluido', 'Panel de administración'],
        color: '#0090ff',
    },
    {
        slug: 'tiendas-online',
        icon: '🛒',
        name: 'Tiendas Online',
        price: '$14,999',
        description: 'E-commerce completo con carrito, pagos en línea y gestión de inventario. Vende las 24 horas.',
        features: ['Catálogo ilimitado de productos', 'Stripe, PayPal y Conekta', 'Panel de pedidos', 'Envíos y cupones', 'Facturación automática'],
        color: '#00bfff',
        featured: true,
    },
    {
        slug: 'escuelas-virtuales',
        icon: '🎓',
        name: 'Escuelas Virtuales',
        price: '$19,999',
        description: 'Plataforma e-learning con cursos, videos, quizzes y certificados. Monetiza tu conocimiento.',
        features: ['Cursos con lecciones y videos', 'Exámenes y certificados', 'Pagos recurrentes / membresías', 'Progreso del alumno', 'Integración con Zoom/Meet'],
        color: '#7c5cfc',
    },
    {
        slug: 'aplicaciones-web',
        icon: '⚙️',
        name: 'Aplicaciones Web',
        price: 'A cotizar',
        description: 'CRMs, dashboards, portales de clientes y sistemas de gestión completamente a la medida.',
        features: ['Análisis y diseño de sistema', 'API REST + integraciones', 'Panel de administración', 'Roles y permisos', 'Soporte y mantenimiento'],
        color: '#00e676',
    },
];

export default function ServiciosIndex({ services }) {
    const whatsapp = 'https://wa.me/5215526711438';

    return (
        <AppLayout>
            <Head title="Servicios de Diseño Web" />

            {/* Hero */}
            <section className="pt-44 pb-20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0090ff]/8 border border-[#0090ff]/15 text-sm text-[#0090ff] font-medium mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
                        Aceptando proyectos — 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Servicios de{' '}
                        <span className="bg-gradient-to-r from-[#0090ff] to-[#00bfff] bg-clip-text text-transparent">
                            diseño web
                        </span>
                    </h1>
                    <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
                        Páginas web, tiendas online, escuelas virtuales y aplicaciones a medida.
                        Todo lo que tu negocio necesita para crecer en internet.
                    </p>
                </div>
            </section>

            {/* Cards */}
            <section className="py-16">
                <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-8">
                    {SERVICES.map(svc => (
                        <div
                            key={svc.slug}
                            className={`p-10 bg-[#141d2f] rounded-2xl border hover:-translate-y-1 transition-all ${svc.featured ? 'border-[#0090ff]/40' : 'border-white/[0.06]'}`}
                        >
                            <div className="text-4xl mb-4">{svc.icon}</div>
                            <h2 className="text-2xl font-bold mb-1">{svc.name}</h2>
                            <p className="text-3xl font-black mb-3" style={{ color: svc.color }}>{svc.price}</p>
                            <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">{svc.description}</p>
                            <ul className="space-y-2 mb-8">
                                {svc.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                                        <span style={{ color: svc.color }}>✓</span> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-3 flex-wrap">
                                <Link
                                    href={`/servicios/${svc.slug}`}
                                    className="px-5 py-2.5 rounded-lg border border-white/[0.08] text-sm font-semibold hover:bg-white/[0.06] transition"
                                >
                                    Ver detalles
                                </Link>
                                <a
                                    href={`${whatsapp}?text=${encodeURIComponent(`Hola! Me interesa el servicio de ${svc.name}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-lg bg-[#0090ff] text-white text-sm font-semibold hover:bg-[#0070d6] transition"
                                >
                                    Cotizar
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold mb-4">¿No sabes cuál necesitas?</h2>
                    <p className="text-[#94a3b8] mb-8">Cuéntanos tu idea y te recomendamos la solución ideal para tu presupuesto.</p>
                    <a
                        href={`${whatsapp}?text=${encodeURIComponent('Hola! Necesito asesoría para elegir el servicio web adecuado para mi negocio')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-8 py-3.5 rounded-full bg-[#0090ff] text-white font-semibold hover:bg-[#0070d6] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all"
                    >
                        Asesoría gratuita por WhatsApp
                    </a>
                </div>
            </section>
        </AppLayout>
    );
}
