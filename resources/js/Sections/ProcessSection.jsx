import { GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

export default function ProcessSection() {
    return (
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
    );
}
