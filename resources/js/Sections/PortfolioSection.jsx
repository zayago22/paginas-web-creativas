import { Link } from '@inertiajs/react';
import { GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

export default function PortfolioSection({ projects }) {
    return (
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
                                    <img src={proj.image_url} alt={proj.title} loading="lazy" decoding="async"
                                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
    );
}
