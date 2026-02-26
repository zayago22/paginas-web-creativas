import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

const FEATURES = [
    { icon: '🛍️', title: 'Catálogo ilimitado', desc: 'Sube tantos productos como quieras con variantes, fotos y descripciones.' },
    { icon: '💳', title: 'Stripe, PayPal y Conekta', desc: 'Acepta tarjetas, OXXO, transferencias y pagos internacionales.' },
    { icon: '📦', title: 'Gestión de pedidos', desc: 'Panel para ver, procesar y dar seguimiento a cada venta.' },
    { icon: '🚚', title: 'Envíos y paqueterías', desc: 'Integración con Fedex, DHL, Estafeta y envío a domicilio propio.' },
    { icon: '🎟️', title: 'Cupones y descuentos', desc: 'Crea promociones, descuentos por volumen y temporadas especiales.' },
    { icon: '📈', title: 'Reportes de ventas', desc: 'Visualiza ingresos, productos más vendidos y comportamiento de clientes.' },
];

export default function TiendasOnline() {
    const whatsapp = 'https://wa.me/5215526711438';

    return (
        <AppLayout>
            <Head title="Tiendas Online y E-Commerce Profesional" />

            {/* Hero */}
            <section className="pt-44 pb-20">
                <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link href="/servicios" className="inline-flex items-center gap-1 text-sm text-[#0090ff] mb-6 hover:underline">
                            ← Todos los servicios
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            Tiendas online que{' '}
                            <span className="bg-gradient-to-r from-[#00bfff] to-[#0090ff] bg-clip-text text-transparent">
                                venden 24/7
                            </span>
                        </h1>
                        <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                            E-commerce completo con carrito, pagos en línea y gestión de inventario.
                            Tu tienda siempre abierta, sin límites geográficos. Desde $14,999 MXN.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={`${whatsapp}?text=${encodeURIComponent('Hola! Me interesa crear una tienda online para mi negocio')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 rounded-full bg-[#0090ff] text-white font-semibold hover:bg-[#0070d6] hover:-translate-y-0.5 transition-all"
                            >
                                Cotizar mi tienda online
                            </a>
                        </div>
                    </div>
                    <div className="bg-[#141d2f] border border-[#0090ff]/30 rounded-2xl p-8">
                        <p className="text-4xl font-black text-[#00bfff] mb-1">$14,999 MXN</p>
                        <p className="text-[#94a3b8] text-sm mb-6">Precio base, pago único</p>
                        <ul className="space-y-3">
                            {['Diseño personalizado de tienda', 'Hasta 100 productos iniciales', 'Pasarelas de pago incluidas', 'Gestión de inventario', 'SSL + dominio gratis (1 año)', 'Capacitación y soporte 30 días'].map(f => (
                                <li key={f} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                                    <span className="text-[#00bfff]">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-center mb-12">Todo lo que necesita tu tienda</h2>
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

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold mb-4">¿Listo para vender en línea?</h2>
                    <p className="text-[#94a3b8] mb-8">Empieza hoy y ten tu tienda funcionando en 20 días hábiles.</p>
                    <a
                        href={`${whatsapp}?text=${encodeURIComponent('Hola! Quiero cotizar una tienda online para mi negocio')}`}
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
