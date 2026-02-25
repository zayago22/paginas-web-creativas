import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AppLayout from '../Layouts/AppLayout';

// ============================================
// REVEAL ON SCROLL HOOK
// ============================================
function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

function Reveal({ children, className = '', delay = 0 }) {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`transition-all duration-700 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            ${className}`}
            style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

// ============================================
// SECTION COMPONENTS
// ============================================

function SectionLabel({ icon, text }) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0090ff]/10 text-[#0090ff] border border-[#0090ff]/15 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0090ff] animate-pulse" />
            {text}
        </div>
    );
}

function GradientText({ children }) {
    return <span className="bg-gradient-to-r from-[#0090ff] via-[#00bfff] to-[#00e4b8] bg-clip-text text-transparent">{children}</span>;
}

const CheckIcon = () => (
    <svg className="w-4 h-4 text-[#00e4b8] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

// ============================================
// HOME PAGE
// ============================================
export default function Home({ services, projects, testimonials, tools, blogPosts, stats }) {
    const whatsappBase = 'https://wa.me/5215526711438';

    return (
        <AppLayout>
            <Head title="Diseño Web Profesional en México" />

            {/* ===== HERO ===== */}
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

            {/* ===== STATS ===== */}
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

            {/* ===== CÓMO FUNCIONA ===== */}
            <section className="py-28" id="proceso">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Reveal>
                        <SectionLabel text="Proceso" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">¿Cómo <GradientText>funciona</GradientText>?</h2>
                        <p className="text-[#94a3b8] text-lg max-w-[600px] leading-relaxed">Tres pasos simples para tener tu página web profesional lista.</p>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        {[
                            { n: '01', title: 'Platicamos tu proyecto', desc: 'Nos cuentas qué necesitas, analizamos tu negocio y definimos la estrategia perfecta.' },
                            { n: '02', title: 'Diseñamos y desarrollamos', desc: 'Creamos tu sitio web a medida con diseño profesional, optimizado para móviles.' },
                            { n: '03', title: 'Lanzamos y optimizamos', desc: 'Publicamos tu sitio, configuramos SEO y te enseñamos a gestionarlo.' },
                        ].map((step, i) => (
                            <Reveal key={i} delay={i * 120}>
                                <div className="group p-10 bg-[#141d2f] border border-white/[0.06] rounded-2xl hover:border-[#0090ff]/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,.3)] transition-all relative overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0090ff] to-[#00bfff] opacity-0 group-hover:opacity-100 transition" />
                                    <div className="w-12 h-12 rounded-xl bg-[#0090ff]/10 flex items-center justify-center text-lg font-extrabold text-[#0090ff] mb-5">{step.n}</div>
                                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                    <p className="text-[#94a3b8] leading-relaxed">{step.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SERVICIOS ===== */}
            <section className="py-28" id="servicios">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <Reveal>
                        <SectionLabel text="Servicios" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Soluciones web para <GradientText>cada negocio</GradientText></h2>
                        <p className="text-[#94a3b8] text-lg max-w-[600px] mx-auto leading-relaxed">Desde páginas informativas hasta plataformas e-learning.</p>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-7 mt-16">
                        {services.map((svc, i) => (
                            <Reveal key={svc.id} delay={i * 120}>
                                <div className={`text-left p-10 bg-[#141d2f] border rounded-2xl hover:-translate-y-1 transition-all
                                    ${svc.featured ? 'border-[#0090ff]/30 bg-gradient-to-b from-[#0090ff]/6 to-[#141d2f]' : 'border-white/[0.06]'}`}>
                                    <div className="text-3xl mb-5">{svc.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{svc.name}</h3>
                                    <div className="text-3xl font-black mb-2">${Number(svc.price).toLocaleString()} <span className="text-sm font-normal text-[#94a3b8]">{svc.price_label}</span></div>
                                    <p className="text-sm text-[#94a3b8] mb-5 leading-relaxed">{svc.description}</p>
                                    <ul className="space-y-2.5 mb-6">
                                        {(svc.features || []).map((f, fi) => (
                                            <li key={fi} className="flex items-start gap-2.5 text-sm text-[#94a3b8]">
                                                <CheckIcon /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={`${whatsappBase}?text=${encodeURIComponent(`Hola! Me interesa el plan ${svc.name}`)}`}
                                       target="_blank" rel="noopener"
                                       className={`block w-full text-center py-3.5 rounded-lg font-semibold text-sm transition-all
                                           ${svc.featured
                                               ? 'bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white hover:shadow-[0_8px_30px_rgba(0,144,255,.3)]'
                                               : 'border border-white/[0.06] text-white hover:bg-[#0090ff] hover:border-[#0090ff]'}`}>
                                        Solicitar Cotización
                                    </a>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PORTAFOLIO ===== */}
            <section className="py-28" id="portafolio">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <Reveal>
                        <SectionLabel text="Portafolio" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Proyectos que <GradientText>hablan por sí solos</GradientText></h2>
                    </Reveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
                        {projects.map((proj, i) => (
                            <Reveal key={proj.id} delay={i * 100}>
                                <Link href={`/portafolio/${proj.slug}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#141d2f] border border-white/[0.06] block cursor-pointer">
                                    {proj.image_url ? (
                                        <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#64748b] text-sm">
                                            <svg className="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                            </svg>
                                            {proj.title}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1222]/90 via-[#0c1222]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                        <h4 className="text-lg font-bold">{proj.title}</h4>
                                        <p className="text-sm text-[#94a3b8] capitalize">{proj.category}</p>
                                        <div className="mt-3 flex items-center gap-1.5 text-xs text-[#0090ff] font-semibold">
                                            Ver proyecto
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIOS ===== */}
            <section className="py-28" id="testimonios">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <Reveal>
                        <SectionLabel text="Testimonios" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Lo que dicen <GradientText>nuestros clientes</GradientText></h2>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-7 mt-16">
                        {testimonials.map((t, i) => {
                            const gradients = [
                                'from-[#0090ff] to-[#00bfff]',
                                'from-[#00e4b8] to-[#00a86b]',
                                'from-[#7c5cfc] to-[#a78bfa]',
                            ];
                            return (
                                <Reveal key={t.id} delay={i * 120}>
                                    <div className="text-left p-8 bg-[#141d2f] border border-white/[0.06] rounded-2xl hover:border-[#0090ff]/15 hover:-translate-y-1 transition-all">
                                        <div className="flex gap-0.5 mb-4 text-[#feca57]">{'★'.repeat(t.rating)}</div>
                                        <p className="text-sm text-[#94a3b8] leading-[1.8] italic mb-5">"{t.content}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradients[i % 3]} flex items-center justify-center font-bold text-sm text-white`}>
                                                {t.initials}
                                            </div>
                                            <div>
                                                <h5 className="text-sm font-semibold">{t.client_name}</h5>
                                                <p className="text-xs text-[#64748b]">{t.client_role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== HERRAMIENTAS GRATUITAS ===== */}
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

            {/* ===== PRECIOS ===== */}
            <section className="py-28" id="precios">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <Reveal>
                        <SectionLabel text="Precios" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Planes <GradientText>transparentes</GradientText></h2>
                        <p className="text-[#94a3b8] text-lg max-w-[600px] mx-auto leading-relaxed">Sin letras chiquitas. Sin costos ocultos.</p>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-7 mt-16">
                        {services.map((svc, i) => (
                            <Reveal key={svc.id} delay={i * 120}>
                                <div className={`text-left p-10 rounded-2xl relative transition-all hover:-translate-y-1
                                    ${svc.featured
                                        ? 'bg-gradient-to-b from-[#0090ff]/8 to-[#141d2f] border border-[#0090ff]/30'
                                        : 'bg-[#141d2f] border border-white/[0.06]'}`}>
                                    {svc.badge && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-xs font-bold text-white whitespace-nowrap">
                                            {svc.badge}
                                        </div>
                                    )}
                                    <div className="text-sm font-semibold text-[#94a3b8] mb-2">{svc.name}</div>
                                    <div className="text-4xl font-black mb-1">${Number(svc.price).toLocaleString()} <span className="text-sm font-normal text-[#94a3b8]">{svc.price_label}</span></div>
                                    <div className="text-sm text-[#64748b] mb-6">{svc.price_period}</div>
                                    <p className="text-sm text-[#94a3b8] leading-relaxed mb-6 pb-6 border-b border-white/[0.06]">{svc.short_description || svc.description}</p>
                                    <ul className="space-y-3 mb-8">
                                        {(svc.features || []).map((f, fi) => (
                                            <li key={fi} className="flex items-start gap-2.5 text-sm text-[#94a3b8]">
                                                <CheckIcon /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={`${whatsappBase}?text=${encodeURIComponent(`Hola! Me interesa el plan ${svc.name} ($${Number(svc.price).toLocaleString()})`)}`}
                                       target="_blank" rel="noopener"
                                       className={`block w-full text-center py-3.5 rounded-lg font-semibold text-sm transition-all
                                           ${svc.featured
                                               ? 'bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white hover:shadow-[0_8px_30px_rgba(0,144,255,.3)]'
                                               : 'border border-white/[0.06] text-white hover:border-[#0090ff] hover:bg-[#0090ff]/5'}`}>
                                        {svc.cta_text || 'Empezar Proyecto'} →
                                    </a>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== BLOG PREVIEW ===== */}
            <section className="py-28" id="blog">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <Reveal>
                        <SectionLabel text="Blog" />
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Recursos para <GradientText>hacer crecer tu negocio</GradientText></h2>
                    </Reveal>
                    <div className="grid md:grid-cols-3 gap-7 mt-16">
                        {blogPosts.map((post, i) => (
                            <Reveal key={post.id} delay={i * 120}>
                                <Link href={`/blog/${post.slug}`}
                                      className="group block text-left bg-[#141d2f] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#0090ff]/20 hover:-translate-y-1 transition-all">
                                    <div className="h-44 bg-gradient-to-br from-[#0090ff]/10 to-[#00e4b8]/5 flex items-center justify-center text-3xl opacity-60">
                                        {post.category === 'precios' ? '💰' : post.category === 'tecnologia' ? '⚡' : '📊'}
                                    </div>
                                    <div className="p-6">
                                        <span className="inline-block px-3 py-1 rounded-full text-[.7rem] font-semibold uppercase bg-[#0090ff]/10 text-[#0090ff] mb-3">{post.category}</span>
                                        <h4 className="font-bold leading-snug mb-2 group-hover:text-[#0090ff] transition">{post.title}</h4>
                                        <p className="text-sm text-[#94a3b8] leading-relaxed">{post.excerpt}</p>
                                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.06] text-xs text-[#64748b]">
                                            <span>{post.reading_time} de lectura</span>
                                            <span>{post.published_at}</span>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal>
                        <Link href="/blog" className="inline-flex items-center gap-2 mt-10 text-sm text-[#0090ff] font-semibold hover:underline">
                            Ver todos los artículos →
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ===== FORMULARIO DE CONTACTO ===== */}
            <section className="py-28" id="contacto">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Info lado izquierdo */}
                        <Reveal>
                            <SectionLabel text="Contacto" />
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                                ¿Listo para <GradientText>tu nuevo sitio web</GradientText>?
                            </h2>
                            <p className="text-[#94a3b8] text-lg leading-relaxed mb-10">
                                Cuéntanos sobre tu proyecto y te contactaremos en menos de 24 horas con una propuesta personalizada.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { icon: '💬', title: 'WhatsApp directo', desc: 'Respuesta inmediata en horario laboral', action: `${whatsappBase}?text=${encodeURIComponent('Hola! Quiero cotizar mi proyecto web')}` },
                                    { icon: '✉️', title: 'contacto@paginaswebcreativas.com', desc: 'Te respondemos en menos de 24h', action: 'mailto:contacto@paginaswebcreativas.com' },
                                ].map((item, i) => (
                                    <a key={i} href={item.action} target={i === 0 ? '_blank' : undefined} rel="noopener"
                                       className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-[#0090ff]/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#0090ff]/20 transition">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold group-hover:text-[#0090ff] transition">{item.title}</h4>
                                            <p className="text-sm text-[#64748b]">{item.desc}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 mt-10 pt-8 border-t border-white/[0.06]">
                                <div className="flex -space-x-2">
                                    {['MR', 'CL', 'AF'].map((initials, i) => {
                                        const colors = ['from-[#0090ff] to-[#00bfff]', 'from-[#00e4b8] to-[#00a86b]', 'from-[#7c5cfc] to-[#a78bfa]'];
                                        return (
                                            <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${colors[i]} flex items-center justify-center text-[.65rem] font-bold text-white border-2 border-[#0c1222]`}>
                                                {initials}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">+100 clientes satisfechos</p>
                                    <div className="flex gap-0.5 text-[#feca57] text-xs">★★★★★</div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Formulario lado derecho */}
                        <Reveal delay={200}>
                            <ContactForm services={services} />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== CTA FINAL ===== */}
            <section className="py-28">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Reveal>
                        <div className="text-center p-16 md:p-20 rounded-3xl bg-gradient-to-br from-[#0090ff]/10 to-[#00e4b8]/5 border border-[#0090ff]/15 relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#0090ff] blur-[120px] opacity-[0.15]" />
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative">
                                Tu competencia ya tiene<br /><GradientText>presencia online</GradientText>
                            </h2>
                            <p className="text-lg text-[#94a3b8] mb-8 max-w-[500px] mx-auto relative">
                                No te quedes atrás. Cotiza tu proyecto hoy y empieza a captar clientes.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                                <a href="#contacto"
                                   className="px-9 py-4 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-base hover:shadow-[0_8px_35px_rgba(0,144,255,.35)] hover:-translate-y-0.5 transition-all">
                                    📝 Solicitar Cotización
                                </a>
                                <a href={`${whatsappBase}?text=${encodeURIComponent('Hola! Quiero cotizar mi proyecto web')}`}
                                   target="_blank" rel="noopener"
                                   className="px-9 py-4 rounded-full border border-white/[0.06] text-white font-semibold text-base hover:border-[#00e4b8] hover:bg-[#00e4b8]/5 transition-all">
                                    💬 WhatsApp Directo
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
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

// ============================================
// CONTACT FORM (Section)
// ============================================
function ContactForm({ services }) {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', service_interest: '', message: '',
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrors({});

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                },
                body: JSON.stringify({ ...form, source: 'contact_form' }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 422 && data.errors) {
                    setErrors(data.errors);
                } else {
                    throw new Error(data.message || 'Error al enviar');
                }
                setStatus('error');
                return;
            }

            setStatus('success');
            setForm({ name: '', email: '', phone: '', service_interest: '', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="p-10 bg-[#141d2f] border border-[#00e4b8]/20 rounded-2xl text-center">
                <div className="w-16 h-16 rounded-full bg-[#00e4b8]/10 flex items-center justify-center text-3xl mx-auto mb-5">✓</div>
                <h3 className="text-xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p className="text-[#94a3b8] mb-6">Te contactaremos en menos de 24 horas.</p>
                <button onClick={() => setStatus('idle')}
                        className="text-sm text-[#0090ff] font-semibold hover:underline">
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    const inputClass = (field) =>
        `w-full px-5 py-3.5 bg-[#0c1222] border rounded-xl text-sm text-white placeholder-[#4a5568] outline-none transition-colors
         ${errors[field] ? 'border-red-500/50 focus:border-red-500' : 'border-white/[0.06] focus:border-[#0090ff]'}`;

    return (
        <form onSubmit={handleSubmit} className="p-8 md:p-10 bg-[#141d2f] border border-white/[0.06] rounded-2xl space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium mb-2">Nombre *</label>
                    <input type="text" placeholder="Tu nombre" value={form.name}
                           onChange={e => updateField('name', e.target.value)}
                           className={inputClass('name')} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" placeholder="tu@email.com" value={form.email}
                           onChange={e => updateField('email', e.target.value)}
                           className={inputClass('email')} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium mb-2">Teléfono</label>
                    <input type="tel" placeholder="+52 55 1234 5678" value={form.phone}
                           onChange={e => updateField('phone', e.target.value)}
                           className={inputClass('phone')} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Servicio de interés</label>
                    <select value={form.service_interest}
                            onChange={e => updateField('service_interest', e.target.value)}
                            className={`${inputClass('service_interest')} appearance-none cursor-pointer`}>
                        <option value="" className="bg-[#0c1222]">Seleccionar...</option>
                        {services.map(svc => (
                            <option key={svc.slug} value={svc.slug} className="bg-[#0c1222]">
                                {svc.name} — ${Number(svc.price).toLocaleString()} MXN
                            </option>
                        ))}
                        <option value="otro" className="bg-[#0c1222]">Otro / No estoy seguro</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Cuéntanos sobre tu proyecto</label>
                <textarea placeholder="Describe brevemente lo que necesitas..." value={form.message}
                          onChange={e => updateField('message', e.target.value)}
                          rows={4}
                          className={`${inputClass('message')} resize-none`} />
            </div>

            <button type="submit" disabled={status === 'sending'}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-base hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0">
                {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                    </span>
                ) : 'Enviar Mensaje →'}
            </button>

            {status === 'error' && !Object.keys(errors).length && (
                <p className="text-red-400 text-sm text-center">Hubo un error. Intenta de nuevo o contáctanos por WhatsApp.</p>
            )}

            <p className="text-xs text-[#4a5568] text-center">
                Al enviar aceptas ser contactado. No compartimos tu información.
            </p>
        </form>
    );
}
