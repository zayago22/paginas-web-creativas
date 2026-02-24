import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

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

export default function ProjectForm({ project, categories }) {
    const isEdit = !!project;
    const galleryInput = useRef();

    const [slugEdited, setSlugEdited] = useState(isEdit);

    const toSlug = (str) => str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/[\s-]+/g, '-');

    const { data, setData, post, processing, errors } = useForm({
        title: project?.title || '',
        slug: project?.slug || '',
        description: project?.description || '',
        client_name: project?.client_name || '',
        category: project?.category || categories[0],
        url: project?.url || '',
        technologies: project?.technologies || [],
        featured: project?.featured || false,
        is_active: project?.is_active ?? true,
        sort_order: project?.sort_order || 0,
        completed_at: project?.completed_at ? project.completed_at.split('T')[0] : '',
        image: null,
        remove_image: false,
        gallery: [],
        gallery_keep: project?.gallery || [],
        ...(isEdit ? { _method: 'PUT' } : {}),
    });

    const [techInput, setTechInput] = useState('');
    const [mainPreview, setMainPreview] = useState(project?.image_url || null);
    // newGalleryPreviews: array of { file, url }
    const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);

    const totalImages = data.gallery_keep.length + newGalleryPreviews.length;
    const maxGallery = 10;

    // ── Main image ────────────────────────────────────────────────────
    const handleMainImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setData('remove_image', false);
            setMainPreview(URL.createObjectURL(file));
        }
    };

    // ── Gallery: add new files ────────────────────────────────────────
    const handleGalleryFiles = (e) => {
        const files = Array.from(e.target.files);
        const remaining = maxGallery - totalImages;
        const toAdd = files.slice(0, remaining);
        const previews = toAdd.map(f => ({ file: f, url: URL.createObjectURL(f) }));
        const merged = [...newGalleryPreviews, ...previews];
        setNewGalleryPreviews(merged);
        setData('gallery', merged.map(p => p.file));
        e.target.value = '';
    };

    // ── Gallery: remove existing ──────────────────────────────────────
    const removeExisting = (path) => {
        setData('gallery_keep', data.gallery_keep.filter(p => p !== path));
    };

    // ── Gallery: remove new ───────────────────────────────────────────
    const removeNew = (idx) => {
        const merged = newGalleryPreviews.filter((_, i) => i !== idx);
        setNewGalleryPreviews(merged);
        setData('gallery', merged.map(p => p.file));
    };

    // ── Technologies ──────────────────────────────────────────────────
    const addTech = () => {
        const val = techInput.trim();
        if (val && !data.technologies.includes(val)) {
            setData('technologies', [...data.technologies, val]);
            setTechInput('');
        }
    };
    const removeTech = (t) => setData('technologies', data.technologies.filter(x => x !== t));

    const submit = (e) => {
        e.preventDefault();
        const url = isEdit ? `/admin/proyectos/${project.id}` : '/admin/proyectos';
        post(url, { forceFormData: true });
    };

    const inputClass = "w-full px-4 py-3 bg-[#0c1222] border border-white/10 rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#0090ff] focus:border-transparent transition-all text-sm";
    const labelClass = "block text-sm font-medium text-[#94a3b8] mb-1.5";

    return (
        <>
            <Head title={isEdit ? `Editar: ${project.title}` : 'Nuevo Proyecto'} />
            <div className="min-h-screen bg-[#0c1222]">
                <AdminNav active="projects" />

                <div className="max-w-[860px] mx-auto px-8 py-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/admin/proyectos" className="text-[#64748b] hover:text-white transition text-sm">← Volver</Link>
                        <h1 className="text-2xl font-extrabold">{isEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h1>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* ── Datos generales ── */}
                        <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl p-6 space-y-5">
                            <h2 className="text-xs font-bold text-[#0090ff] uppercase tracking-wider">Información</h2>

                            <div>
                                <label className={labelClass}>Título *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => {
                                        setData('title', e.target.value);
                                        if (!slugEdited) {
                                            setData('slug', toSlug(e.target.value));
                                        }
                                    }}
                                    className={inputClass}
                                    placeholder="Nombre del proyecto"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                            </div>

                            {/* ── Slug / SEO URL ── */}
                            <div>
                                <label className={labelClass}>
                                    Slug (URL)
                                    <span className="ml-2 text-[#64748b] font-normal text-xs">— afecta el SEO</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] text-sm select-none pointer-events-none">/portafolio/</span>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={e => {
                                            setSlugEdited(true);
                                            setData('slug', toSlug(e.target.value));
                                        }}
                                        className={`${inputClass} pl-[110px] font-mono`}
                                        placeholder="mi-proyecto-web"
                                    />
                                </div>
                                {data.slug && (
                                    <p className="mt-1.5 text-xs text-[#64748b] truncate">
                                        URL: <span className="text-[#94a3b8]">http://localhost:8025/portafolio/{data.slug}</span>
                                    </p>
                                )}
                                {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Descripción *</label>
                                <textarea value={data.description} onChange={e => setData('description', e.target.value)} className={`${inputClass} min-h-[120px]`} placeholder="Describe el proyecto..." required />
                                {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Cliente</label>
                                    <input type="text" value={data.client_name} onChange={e => setData('client_name', e.target.value)} className={inputClass} placeholder="Nombre del cliente" />
                                </div>
                                <div>
                                    <label className={labelClass}>Categoría *</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className={inputClass}>
                                        {categories.map(c => (
                                            <option key={c} value={c} className="bg-[#141d2f]">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>URL del sitio</label>
                                    <input type="url" value={data.url} onChange={e => setData('url', e.target.value)} className={inputClass} placeholder="https://..." />
                                </div>
                                <div>
                                    <label className={labelClass}>Fecha completado</label>
                                    <input type="date" value={data.completed_at} onChange={e => setData('completed_at', e.target.value)} className={inputClass} />
                                </div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <label className={labelClass}>Tecnologías</label>
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }} className={inputClass} placeholder="Ej: React, Laravel... y Enter" />
                                    <button type="button" onClick={addTech} className="px-4 py-2 bg-[#0090ff]/10 text-[#0090ff] rounded-xl text-sm font-semibold hover:bg-[#0090ff]/20 transition shrink-0">+</button>
                                </div>
                                {data.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.technologies.map(t => (
                                            <span key={t} className="px-3 py-1 bg-[#0090ff]/10 text-[#0090ff] text-xs rounded-full font-medium flex items-center gap-1.5">
                                                {t}
                                                <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400 transition">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.featured} onChange={e => setData('featured', e.target.checked)} className="w-4 h-4 rounded bg-[#0c1222] border-white/20 text-[#0090ff] focus:ring-[#0090ff]" />
                                    <span className="text-sm text-[#94a3b8]">Destacado</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 rounded bg-[#0c1222] border-white/20 text-[#0090ff] focus:ring-[#0090ff]" />
                                    <span className="text-sm text-[#94a3b8]">Activo</span>
                                </label>
                            </div>
                        </div>

                        {/* ── Imagen principal ── */}
                        <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl p-6 space-y-4">
                            <h2 className="text-xs font-bold text-[#0090ff] uppercase tracking-wider">Imagen Principal</h2>
                            <p className="text-xs text-[#64748b]">Se muestra en la lista y portada del proyecto.</p>

                            <div className="flex items-center gap-5">
                                {mainPreview ? (
                                    <div className="relative shrink-0">
                                        <img src={mainPreview} alt="Principal" className="w-28 h-20 rounded-xl object-cover border border-white/10" />
                                        <button
                                            type="button"
                                            onClick={() => { setMainPreview(null); setData('image', null); setData('remove_image', true); }}
                                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-400 transition"
                                        >×</button>
                                    </div>
                                ) : (
                                    <div className="w-28 h-20 rounded-xl bg-[#0c1222] border border-dashed border-white/20 flex items-center justify-center text-[#64748b] text-xs shrink-0">Sin imagen</div>
                                )}
                                <label className="cursor-pointer px-4 py-2.5 bg-[#0090ff]/10 text-[#0090ff] rounded-xl text-sm font-semibold hover:bg-[#0090ff]/20 transition">
                                    Seleccionar imagen
                                    <input type="file" accept="image/*" onChange={handleMainImage} className="hidden" />
                                </label>
                            </div>
                            {errors.image && <p className="text-sm text-red-400">{errors.image}</p>}
                        </div>

                        {/* ── Galería ── */}
                        <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xs font-bold text-[#0090ff] uppercase tracking-wider">Galería del Proyecto</h2>
                                    <p className="text-xs text-[#64748b] mt-1">Máximo 10 imágenes para mostrar el trabajo en detalle.</p>
                                </div>
                                <span className={`text-sm font-bold ${totalImages >= maxGallery ? 'text-yellow-400' : 'text-[#94a3b8]'}`}>
                                    {totalImages}/{maxGallery}
                                </span>
                            </div>

                            {/* Existing gallery */}
                            {data.gallery_keep.length > 0 && (
                                <div>
                                    <p className="text-xs text-[#64748b] mb-2 uppercase tracking-wider">Imágenes actuales</p>
                                    <div className="grid grid-cols-5 gap-3">
                                        {data.gallery_keep.map((path, i) => (
                                            <div key={path} className="relative group">
                                                <img
                                                    src={`/storage/${path}`}
                                                    alt={`Galería ${i + 1}`}
                                                    className="w-full aspect-video rounded-lg object-cover border border-white/10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExisting(path)}
                                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/90 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-400"
                                                >×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* New gallery previews */}
                            {newGalleryPreviews.length > 0 && (
                                <div>
                                    <p className="text-xs text-[#64748b] mb-2 uppercase tracking-wider">Nuevas imágenes</p>
                                    <div className="grid grid-cols-5 gap-3">
                                        {newGalleryPreviews.map((item, i) => (
                                            <div key={i} className="relative group">
                                                <img
                                                    src={item.url}
                                                    alt={`Nueva ${i + 1}`}
                                                    className="w-full aspect-video rounded-lg object-cover border border-[#0090ff]/30"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNew(i)}
                                                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/90 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-400"
                                                >×</button>
                                                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[#0090ff]/80 rounded text-white text-[10px] font-bold">NEW</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload button */}
                            {totalImages < maxGallery && (
                                <label className="flex items-center gap-3 cursor-pointer px-4 py-3 border border-dashed border-white/20 rounded-xl hover:border-[#0090ff]/50 hover:bg-[#0090ff]/5 transition">
                                    <div className="w-10 h-10 rounded-xl bg-[#0090ff]/10 flex items-center justify-center text-[#0090ff] text-xl font-light shrink-0">+</div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Agregar imágenes</p>
                                        <p className="text-xs text-[#64748b]">Puedes agregar hasta {maxGallery - totalImages} imagen(es) más • JPG, PNG, WebP • máx 5MB c/u</p>
                                    </div>
                                    <input
                                        ref={galleryInput}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryFiles}
                                        className="hidden"
                                    />
                                </label>
                            )}

                            {totalImages >= maxGallery && (
                                <p className="text-xs text-yellow-400 text-center py-2">Límite de {maxGallery} imágenes alcanzado. Elimina alguna para agregar más.</p>
                            )}

                            {errors['gallery.*'] && <p className="text-sm text-red-400">{errors['gallery.*']}</p>}
                        </div>

                        {/* ── Actions ── */}
                        <div className="flex items-center justify-end gap-3">
                            <Link href="/admin/proyectos" className="px-5 py-2.5 text-[#94a3b8] hover:text-white transition text-sm font-medium">Cancelar</Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-gradient-to-r from-[#0090ff] to-[#00d4aa] text-white font-semibold rounded-xl text-sm hover:opacity-90 transition disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : isEdit ? 'Actualizar Proyecto' : 'Crear Proyecto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

