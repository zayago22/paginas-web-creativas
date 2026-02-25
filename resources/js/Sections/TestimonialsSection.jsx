import { GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

export default function TestimonialsSection({ testimonials }) {
    const gradients = [
        'from-[#0090ff] to-[#00bfff]',
        'from-[#00e4b8] to-[#00a86b]',
        'from-[#7c5cfc] to-[#a78bfa]',
    ];

    return (
        <section className="py-28" id="testimonios">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
                <Reveal>
                    <SectionLabel text="Testimonios" />
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Lo que dicen <GradientText>nuestros clientes</GradientText></h2>
                </Reveal>
                <div className="grid md:grid-cols-3 gap-7 mt-16">
                    {testimonials.map((t, i) => (
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
                    ))}
                </div>
            </div>
        </section>
    );
}
