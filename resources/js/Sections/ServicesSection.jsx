import { CheckIcon, GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

export default function ServicesSection({ services, whatsappBase }) {
    return (
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
    );
}
