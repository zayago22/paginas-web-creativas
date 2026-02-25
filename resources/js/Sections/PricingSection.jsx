import { CheckIcon, GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

export default function PricingSection({ services, whatsappBase }) {
    return (
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
    );
}
