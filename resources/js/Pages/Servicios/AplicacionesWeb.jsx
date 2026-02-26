import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

const FEATURES = [
    { icon: '🗂️', title: 'CRMs y gestión de clientes', desc: 'Sistema para registrar, dar seguimiento y gestionar todos tus clientes y ventas.' },
    { icon: '📊', title: 'Dashboards con gráficas', desc: 'Visualiza KPIs, reportes y métricas de tu negocio en tiempo real.' },
    { icon: '🔗', title: 'API REST e integraciones', desc: 'Conéctamos tu app con terceros: ERP, CRM, pasarelas, redes sociales y más.' },
    { icon: '👥', title: 'Roles y permisos', desc: 'Control de acceso granular: administradores, empleados y clientes con vistas diferentes.' },
    { icon: '📱', title: 'Progressive Web App (PWA)', desc: 'Funciona en móvil como app nativa, sin necesidad de App Store.' },
    { icon: '🛡️', title: 'Seguridad y mantenimiento', desc: 'Auditorías de seguridad, actualizaciones y soporte técnico continuo.' },
];

const USE_CASES = [
    'Sistema de reservas y citas',
    'Portal de clientes con facturas',
    'Plataforma de pedidos internos',
    'Sistema de inventario y almacén',
    'App de seguimiento de proyectos',
    'Marketplace o directorio de negocios',
];

export default function AplicacionesWeb() {
    const whatsapp = 'https://wa.me/5215526711438';

    return (
        <AppLayout>
            <Head title="Aplicaciones Web a Medida en México" />

            {/* Hero */}
            <section className="pt-44 pb-20">
                <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link href="/servicios" className="inline-flex items-center gap-1 text-sm text-[#0090ff] mb-6 hover:underline">
                            ← Todos los servicios
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            Aplicaciones web{' '}
                            <span className="bg-gradient-to-r from-[#00e676] to-[#0090ff] bg-clip-text text-transparent">
                                a la medida
                            </span>{' '}
                            de tu negocio
                        </h1>
                        <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                            CRMs, dashboards, portales de clientes y sistemas personalizados.
                            Automatiza procesos y escala sin límites. Cotización sin compromiso.
                        </p>
                        <a
                            href={`${whatsapp}?text=${encodeURIComponent('Hola! Me interesa desarrollar una aplicación web personalizada para mi empresa')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex px-8 py-3.5 rounded-full bg-[#00e676] text-[#0a0a1a] font-bold hover:-translate-y-0.5 transition-all"
                        >
                            Solicitar análisis gratuito
                        </a>
                    </div>
                    <div className="bg-[#141d2f] border border-[#00e676]/20 rounded-2xl p-8">
                        <p className="text-2xl font-black text-[#00e676] mb-1">Cotización personalizada</p>
                        <p className="text-[#94a3b8] text-sm mb-6">Depende del alcance del proyecto</p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-3">Casos de uso frecuentes</p>
                        <ul className="space-y-2.5">
                            {USE_CASES.map(uc => (
                                <li key={uc} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                                    <span className="text-[#00e676]">→</span> {uc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-center mb-12">¿Qué construimos para ti?</h2>
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

            {/* Stack */}
            <section className="py-16 border-y border-white/[0.06]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-6">Stack tecnológico</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Laravel', 'React', 'Vue.js', 'Node.js', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Docker', 'TypeScript'].map(t => (
                            <span key={t} className="px-4 py-1.5 rounded-full bg-[#141d2f] border border-white/[0.08] text-sm text-[#94a3b8]">{t}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold mb-4">¿Tienes un proyecto en mente?</h2>
                    <p className="text-[#94a3b8] mb-8">Cuéntanos qué necesitas y en 24 horas te enviamos una propuesta técnica sin costo.</p>
                    <a
                        href={`${whatsapp}?text=${encodeURIComponent('Hola! Necesito desarrollar una aplicación web personalizada para mi empresa')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-8 py-3.5 rounded-full bg-[#0090ff] text-white font-semibold hover:bg-[#0070d6] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all"
                    >
                        Enviar mi proyecto
                    </a>
                </div>
            </section>
        </AppLayout>
    );
}
