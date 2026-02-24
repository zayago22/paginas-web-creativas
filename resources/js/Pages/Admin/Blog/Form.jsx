import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

function AdminNav({ active }) {
    const links = [
        { label: 'Dashboard', href: '/admin', key: 'dashboard' },
        { label: 'Proyectos', href: '/admin/proyectos', key: 'projects' },
        { label: 'Blog', href: '/admin/blog', key: 'blog' },
        { label: 'Leads', href: '/admin/leads', key: 'leads' },
    ];
    return (
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
            <Link href="/" className="flex items-center gap-2 font-bold text-sm">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0090ff] to-[#00bfff] flex items-center justify-center text-xs font-black text-white">P</div>
                <span>Admin Panel</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
                {links.map(l => (
                    <Link key={l.key} href={l.href} className={l.key === active ? 'text-[#0090ff] font-semibold' : 'text-[#94a3b8] hover:text-white transition'}>
                        {l.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default function BlogForm({ post, categories }) {
    const isEdit = !!post;

    const { data, setData, post: submitForm, processing, errors } = useForm({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        category: post?.category || categories[0],
        tags: post?.tags || [],
        meta_title: post?.meta_title || '',
        meta_description: post?.meta_description || '',
        status: post?.status || 'draft',
        published_at: post?.published_at ? post.published_at.split('T')[0] : '',
        featured_image: null,
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    const [tagInput, setTagInput] = useState('');
    const [preview, setPreview] = useState(post?.featured_image ? `/storage/${post.featured_image}` : null);

    const addTag = () => {
        const val = tagInput.trim();
        if (val && !data.tags.includes(val)) {
            setData('tags', [...data.tags, val]);
            setTagInput('');
        }
    };

    const removeTag = (t) => {
        setData('tags', data.tags.filter(x => x !== t));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('featured_image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/blog/${post.id}` : '/admin/blog';
        submitForm(url, { forceFormData: true });
    };

    const inputClass = "w-full px-4 py-3 bg-[#0c1222] border border-white/10 rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#0090ff] focus:border-transparent transition-all text-sm";
    const labelClass = "block text-sm font-medium text-[#94a3b8] mb-1.5";

    return (
        <>
            <Head title={isEdit ? `Editar: ${post.title}` : 'Nuevo Artículo'} />
            <div className="min-h-screen bg-[#0c1222]">
                <AdminNav active="blog" />

                <div className="max-w-[900px] mx-auto px-8 py-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/admin/blog" className="text-[#64748b] hover:text-white transition text-sm">
                            ← Volver
                        </Link>
                        <h1 className="text-2xl font-extrabold">{isEdit ? 'Editar Artículo' : 'Nuevo Artículo'}</h1>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Main Content */}
                        <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl p-6 space-y-5">
                            <h2 className="text-sm font-bold text-[#0090ff] uppercase tracking-wider mb-2">Contenido</h2>

                            {/* Title */}
                            <div>
                                <label className={labelClass}>Título *</label>
                                <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className={inputClass} placeholder="Título del artículo" required />
                                {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className={labelClass}>Extracto *</label>
                                <textarea value={data.excerpt} onChange={e => setData('excerpt', e.target.value)} className={`${inputClass} min-h-[80px]`} placeholder="Resumen corto del artículo (máx 500 chars)" maxLength={500} required />
                                <div className="mt-1 text-xs text-[#64748b] text-right">{data.excerpt.length}/500</div>
                                {errors.excerpt && <p className="mt-1 text-sm text-red-400">{errors.excerpt}</p>}
                            </div>

                            {/* Content */}
                            <div>
                                <label className={labelClass}>Contenido *</label>
                                <textarea value={data.content} onChange={e => setData('content', e.target.value)} className={`${inputClass} min-h-[300px] font-mono text-xs`} placeholder="Contenido del artículo (soporta HTML)" required />
                                {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
                            </div>

                            {/* Featured Image */}
                            <div>
                                <label className={labelClass}>Imagen Destacada</label>
                                <div className="flex items-center gap-4">
                                    {preview && (
                                        <img src={preview} alt="Preview" className="w-24 h-16 rounded-xl object-cover" />
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-[#94a3b8] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0090ff]/10 file:text-[#0090ff] hover:file:bg-[#0090ff]/20" />
                                </div>
                                {errors.featured_image && <p className="mt-1 text-sm text-red-400">{errors.featured_image}</p>}
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl p-6 space-y-5">
                            <h2 className="text-sm font-bold text-[#0090ff] uppercase tracking-wider mb-2">Configuración</h2>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Category */}
                                <div>
                                    <label className={labelClass}>Categoría *</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className={inputClass}>
                                        {categories.map(c => (
                                            <option key={c} value={c} className="bg-[#141d2f]">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className={labelClass}>Estado *</label>
                                    <select value={data.status} onChange={e => setData('status', e.target.value)} className={inputClass}>
                                        <option value="draft" className="bg-[#141d2f]">Borrador</option>
                                        <option value="published" className="bg-[#141d2f]">Publicado</option>
                                        <option value="scheduled" className="bg-[#141d2f]">Programado</option>
                                    </select>
                                </div>
                            </div>

                            {/* Published at */}
                            {(data.status === 'published' || data.status === 'scheduled') && (
                                <div>
                                    <label className={labelClass}>Fecha de publicación</label>
                                    <input type="date" value={data.published_at} onChange={e => setData('published_at', e.target.value)} className={inputClass} />
                                </div>
                            )}

                            {/* Tags */}
                            <div>
                                <label className={labelClass}>Etiquetas</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={e => setTagInput(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                                        className={inputClass}
                                        placeholder="Añadir etiqueta y Enter..."
                                    />
                                    <button type="button" onClick={addTag} className="px-4 py-2 bg-[#0090ff]/10 text-[#0090ff] rounded-xl text-sm font-semibold hover:bg-[#0090ff]/20 transition shrink-0">
                                        +
                                    </button>
                                </div>
                                {data.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.tags.map(t => (
                                            <span key={t} className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full font-medium flex items-center gap-1.5">
                                                {t}
                                                <button type="button" onClick={() => removeTag(t)} className="hover:text-red-400 transition">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl p-6 space-y-5">
                            <h2 className="text-sm font-bold text-[#0090ff] uppercase tracking-wider mb-2">SEO</h2>

                            <div>
                                <label className={labelClass}>Meta Título</label>
                                <input type="text" value={data.meta_title} onChange={e => setData('meta_title', e.target.value)} className={inputClass} placeholder="Título para buscadores (máx 70 chars)" maxLength={70} />
                                <div className="mt-1 text-xs text-[#64748b] text-right">{data.meta_title.length}/70</div>
                            </div>

                            <div>
                                <label className={labelClass}>Meta Descripción</label>
                                <textarea value={data.meta_description} onChange={e => setData('meta_description', e.target.value)} className={`${inputClass} min-h-[80px]`} placeholder="Descripción para buscadores (máx 160 chars)" maxLength={160} />
                                <div className="mt-1 text-xs text-[#64748b] text-right">{data.meta_description.length}/160</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3">
                            <Link href="/admin/blog" className="px-5 py-2.5 text-[#94a3b8] hover:text-white transition text-sm font-medium">
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-gradient-to-r from-[#0090ff] to-[#00d4aa] text-white font-semibold rounded-xl text-sm hover:opacity-90 transition disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : isEdit ? 'Actualizar' : 'Publicar Artículo'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
