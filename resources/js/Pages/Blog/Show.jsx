import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function BlogShow({ post, relatedPosts }) {
    return (
        <AppLayout>
            <Head>
                <title>{post.meta_title}</title>
                <meta name="description" content={post.meta_description} />
                <meta property="og:title" content={post.meta_title} />
                <meta property="og:description" content={post.meta_description} />
                {post.image_url && <meta property="og:image" content={post.image_url} />}
            </Head>

            <article className="pt-40 pb-28">
                <div className="max-w-[760px] mx-auto px-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-[#64748b] mb-8">
                        <Link href="/" className="hover:text-[#0090ff] transition">Inicio</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-[#0090ff] transition">Blog</Link>
                        <span>/</span>
                        <span className="text-[#94a3b8] capitalize">{post.category}</span>
                    </div>

                    {/* Header */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[#0090ff]/10 text-[#0090ff] mb-4 capitalize">{post.category}</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">{post.title}</h1>
                    <p className="text-lg text-[#94a3b8] leading-relaxed mb-6">{post.excerpt}</p>

                    <div className="flex items-center gap-6 text-sm text-[#64748b] mb-10 pb-10 border-b border-white/[0.06]">
                        <span>{post.published_at}</span>
                        <span>{post.reading_time} de lectura</span>
                        <span>{post.views} vistas</span>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-bold prose-headings:text-white
                        prose-p:text-[#94a3b8] prose-p:leading-relaxed
                        prose-a:text-[#0090ff] prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white
                        prose-code:text-[#00e4b8] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        prose-blockquote:border-l-[#0090ff] prose-blockquote:text-[#94a3b8]"
                         dangerouslySetInnerHTML={{ __html: post.content }} />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-10 pt-10 border-t border-white/[0.06]">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-[#94a3b8] border border-white/[0.06]">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-16 p-10 rounded-2xl bg-gradient-to-br from-[#0090ff]/8 to-transparent border border-[#0090ff]/15 text-center">
                        <h3 className="text-xl font-bold mb-2">¿Necesitas una página web profesional?</h3>
                        <p className="text-sm text-[#94a3b8] mb-6">Diseñamos sitios que generan clientes desde $8,999 MXN</p>
                        <a href="https://wa.me/5215526711438?text=Hola! Vi su blog y me interesa un proyecto web" target="_blank" rel="noopener"
                           className="inline-flex px-8 py-3 rounded-full bg-gradient-to-r from-[#0090ff] to-[#00bfff] text-white font-bold text-sm hover:shadow-[0_8px_30px_rgba(0,144,255,.3)] transition-all">
                            💬 Cotizar por WhatsApp
                        </a>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-20">
                            <h3 className="text-xl font-bold mb-8">Artículos relacionados</h3>
                            <div className="grid sm:grid-cols-3 gap-5">
                                {relatedPosts.map(rp => (
                                    <Link key={rp.id} href={`/blog/${rp.slug}`}
                                          className="group p-5 bg-[#141d2f] border border-white/[0.06] rounded-xl hover:border-[#0090ff]/20 transition">
                                        <h4 className="font-semibold text-sm leading-snug group-hover:text-[#0090ff] transition mb-2">{rp.title}</h4>
                                        <p className="text-xs text-[#64748b] line-clamp-2">{rp.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </AppLayout>
    );
}
