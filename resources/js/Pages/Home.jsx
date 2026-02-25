import { Head, useForm } from '@inertiajs/react';
import { lazy, useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { GradientText, Reveal } from '../Components/Home/shared';
import { LazySection } from '../Components/LazySection';

// ── Lazy sections (split into separate chunks) ──────────────────────────────
const ProcessSection     = lazy(() => import('../Sections/ProcessSection'));
const ServicesSection    = lazy(() => import('../Sections/ServicesSection'));
const PortfolioSection   = lazy(() => import('../Sections/PortfolioSection'));
const TestimonialsSection = lazy(() => import('../Sections/TestimonialsSection'));
const ToolsSection       = lazy(() => import('../Sections/ToolsSection'));
const PricingSection     = lazy(() => import('../Sections/PricingSection'));
const BlogSection        = lazy(() => import('../Sections/BlogSection'));
const ContactSection     = lazy(() => import('../Sections/ContactSection'));
const CtaSection         = lazy(() => import('../Sections/CtaSection'));

// ============================================
// HOME PAGE
// ============================================
export default function Home({ services, projects, testimonials, tools, blogPosts, stats }) {
    const whatsappBase = 'https://wa.me/5215526711438';

    return (
        <AppLayout>
            <Head title="Diseño Web Profesional en México" />

            {/* ===== HERO (eager — above fold) ===== */}
            <section className="pt-40 pb-24 text-center">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0090ff]/8 border border-[#0090ff]/15 text-sm text-[#0090ff] font-medium mb-8 animate-fade-in-down">
                        <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
                        Aceptando proyectos — 2026
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-6 animate-fade-in-up">
                        Creamos páginas web que<br />
                        <GradientText>generan clientes reales</GradientText>
                    </h1>

                    <p className="text-lg text-[#94a3b8] max-w-[580px] mx-auto mb-10 leading-relaxed animate-fade-in-up-delayed">
                        Diseño web profesional que convierte visitantes en ventas. Sin plantillas genéricas. Sin sorpresas. Resultados medibles desde el día uno.
                    </p>

                    <div className="flex justify-center mb-12">
                        <ContactInput whatsappBase={whatsappBase} />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#94a3b8]">
                        {['+100 proyectos entregados', 'Respuesta en menos de 24h', '98% clientes satisfechos'].map(text => (
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

            {/* ===== STATS (eager — above fold) ===== */}
            <section className="py-16 border-y border-white/[0.06]">
                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {[
                        { num: `+${stats.projects || 100}`, label: 'Proyectos Entregados' },
                        { num: `${stats.years}+`, label: 'Años de Experiencia' },
                        { num: `${stats.satisfaction}%`, label: 'Clientes Satisfechos' },
                        { num: stats.response_time, label: 'Tiempo de Respuesta' },
                    ].map((s, i) => (
                        <Reveal key={i} delay={i * 100}>
                            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#0090ff] to-[#00e4b8] bg-clip-text text-transparent">{s.num}</div>
                            <div className="text-sm text-[#94a3b8] mt-1">{s.label}</div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ===== LAZY SECTIONS ===== */}
            <LazySection component={ProcessSection} />
            <LazySection component={ServicesSection} services={services} whatsappBase={whatsappBase} />
            <LazySection component={PortfolioSection} projects={projects} />
            <LazySection component={TestimonialsSection} testimonials={testimonials} />
            <LazySection component={ToolsSection} tools={tools} />
            <LazySection component={PricingSection} services={services} whatsappBase={whatsappBase} />
            <LazySection component={BlogSection} blogPosts={blogPosts} />
            <LazySection component={ContactSection} services={services} whatsappBase={whatsappBase} />
            <LazySection component={CtaSection} whatsappBase={whatsappBase} />
        </AppLayout>
    );
}

// ============================================
// CONTACT INPUT (Hero CTA)
// ============================================
function ContactInput({ whatsappBase }) {
    const { data, setData, post, processing, reset } = useForm({ email: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.email) {
            post('/api/leads', {
                data: { email: data.email, source: 'hero_cta' },
                onSuccess: () => { setSent(true); reset(); },
                preserveScroll: true,
            });
        } else {
            window.open(whatsappBase, '_blank');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center bg-[#141d2f] border border-white/[0.06] rounded-full pl-6 pr-1.5 py-1.5 max-w-[480px] w-full focus-within:border-[#0090ff] transition">
            <input
                type="email"
                placeholder="Tu correo electrónico"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                className="bg-transparent border-none outline-none text-white font-outfit text-sm flex-1 py-2.5 placeholder-[#64748b]"
            />
            <button type="submit" disabled={processing}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-sm hover:scale-[1.03] hover:shadow-[0_6px_25px_rgba(0,144,255,.35)] transition-all whitespace-nowrap disabled:opacity-50">
                {sent ? '✓ Enviado' : 'Cotizar Gratis →'}
            </button>
        </form>
    );
}
