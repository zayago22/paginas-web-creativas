import { Link } from '@inertiajs/react';
import { GradientText, Reveal, SectionLabel } from '../Components/Home/shared';

export default function BlogSection({ blogPosts }) {
    return (
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
    );
}
