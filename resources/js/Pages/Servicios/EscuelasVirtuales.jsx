import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

const FEATURES = [
    { icon: '📚', title: 'Cursos con lecciones y videos', desc: 'Organiza tu contenido en módulos y lecciones con video embebido o subido.' },
    { icon: '📝', title: 'Exámenes y quizzes', desc: 'Evalúa el aprendizaje de tus alumnos con preguntas automáticas.' },
    { icon: '🏅', title: 'Certificados digitales', desc: 'Emite certificados personalizados al completar un curso.' },
    { icon: '💰', title: 'Membresías y pagos recurrentes', desc: 'Cobra mensualidad o acceso por curso. Integración con Stripe y PayPal.' },
    { icon: '📊', title: 'Progreso del alumno', desc: 'Dashboard con avance, tiempo de estudio y calificaciones.' },
    { icon: '🎥', title: 'Integración con Zoom/Meet', desc: 'Clases en vivo directamente desde la plataforma.' },
];

export default function EscuelasVirtuales() {
    const whatsapp = 'https://wa.me/5215526711438';

    return (
        <AppLayout>
            <Head title="Escuelas Virtuales y Plataformas E-Learning" />

            {/* Hero */}
            <section className="pt-44 pb-20">
                <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Link href="/servicios" className="inline-flex items-center gap-1 text-sm text-[#0090ff] mb-6 hover:underline">
                            ← Todos los servicios
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            Escuelas virtuales para{' '}
                            <span className="bg-gradient-to-r from-[#7c5cfc] to-[#0090ff] bg-clip-text text-transparent">
                                monetizar tu conocimiento
                            </span>
                        </h1>
                        <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                            Plataforma e-learning completa con cursos, exámenes, certificados y pagos automáticos.
                            Ideal para coaches, docentes y empresas. Desde $19,999 MXN.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href={`${whatsapp}?text=${encodeURIComponent('Hola! Me interesa crear una escuela virtual o plataforma e-learning')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 rounded-full bg-[#7c5cfc] text-white font-semibold hover:bg-[#6a48f5] hover:-translate-y-0.5 transition-all"
                            >
                                Cotizar mi plataforma
                            </a>
                        </div>
                    </div>
                    <div className="bg-[#141d2f] border border-[#7c5cfc]/30 rounded-2xl p-8">
                        <p className="text-4xl font-black text-[#7c5cfc] mb-1">$19,999 MXN</p>
                        <p className="text-[#94a3b8] text-sm mb-6">Precio base, pago único</p>
                        <ul className="space-y-3">
                            {['Cursos y módulos ilimitados', 'Exámenes y certificados', 'Pasarela de pagos incluida', 'Membresías recurrentes', 'Videollamadas integradas', 'Soporte técnico 60 días'].map(f => (
                                <li key={f} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                                    <span className="text-[#7c5cfc]">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-center mb-12">Todo lo que incluye tu plataforma</h2>
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
                    <h2 className="text-3xl font-extrabold mb-4">Empieza a vender tus cursos online</h2>
                    <p className="text-[#94a3b8] mb-8">Agenda una llamada gratuita y descubre cómo digitalizar tu escuela o negocio educativo.</p>
                    <a
                        href={`${whatsapp}?text=${encodeURIComponent('Hola! Quiero cotizar una plataforma e-learning / escuela virtual')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-8 py-3.5 rounded-full bg-[#7c5cfc] text-white font-semibold hover:bg-[#6a48f5] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,92,252,.3)] transition-all"
                    >
                        Solicitar cotización gratis
                    </a>
                </div>
            </section>
        </AppLayout>
    );
}
