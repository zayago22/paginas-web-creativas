import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function BlogIndex({ posts, categories, filters }) {
    return (
        <AppLayout>
            <Head title="Blog — Recursos de Diseño Web y Marketing" />

            <section className="pt-40 pb-16 text-center">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0090ff]/10 text-[#0090ff] border border-[#0090ff]/15 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0090ff] animate-pulse" />
                        Blog
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Recursos para{' '}
                        <span className="bg-gradient-to-r from-[#0090ff] via-[#00bfff] to-[#00e4b8] bg-clip-text text-transparent">
                            tu negocio
                        </span>
                    </h1>
                    <p className="text-lg text-[#94a3b8] max-w-[550px] mx-auto leading-relaxed">
                        Consejos prácticos de diseño web, SEO y marketing digital para emprendedores en México.
                    </p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                        <button onClick={() => router.get('/blog', {}, { preserveState: true })}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition
                                    ${!filters?.category ? 'bg-[#0090ff] text-white' : 'bg-white/5 text-[#94a3b8] border border-white/[0.06] hover:border-[#0090ff]/20'}`}>
                            Todos
                        </button>
                        {categories.map(cat => (
                            <button key={cat}
                                    onClick={() => router.get('/blog', { category: cat }, { preserveState: true })}
                                    className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition
                                        ${filters?.category === cat ? 'bg-[#0090ff] text-white' : 'bg-white/5 text-[#94a3b8] border border-white/[0.06] hover:border-[#0090ff]/20'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-28">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {posts.data.map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`}
                                  className="group block bg-[#141d2f] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#0090ff]/20 hover:-translate-y-1 transition-all">
                                <div className="h-44 bg-gradient-to-br from-[#0090ff]/10 to-[#00e4b8]/5 flex items-center justify-center">
                                    {post.image_url ? (
                                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl opacity-40">📝</span>
                                    )}
                                </div>
                                <div className="p-6">
                                    <span className="inline-block px-3 py-1 rounded-full text-[.7rem] font-semibold uppercase bg-[#0090ff]/10 text-[#0090ff] mb-3 capitalize">{post.category}</span>
                                    <h3 className="font-bold leading-snug mb-2 group-hover:text-[#0090ff] transition">{post.title}</h3>
                                    <p className="text-sm text-[#94a3b8] leading-relaxed line-clamp-2">{post.excerpt}</p>
                                    <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.06] text-xs text-[#64748b]">
                                        <span>{post.reading_time} de lectura</span>
                                        <span>{post.published_at}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {posts.links && posts.links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-16">
                            {posts.links.map((link, i) => (
                                <Link key={i} href={link.url || '#'}
                                      className={`px-4 py-2 rounded-lg text-sm font-medium transition
                                          ${link.active ? 'bg-[#0090ff] text-white' : 'bg-white/5 text-[#94a3b8] border border-white/[0.06] hover:border-[#0090ff]/20'}
                                          ${!link.url ? 'opacity-40 pointer-events-none' : ''}`}
                                      dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
