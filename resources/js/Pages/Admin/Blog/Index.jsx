import { Head, Link, router } from '@inertiajs/react';

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

const statusStyles = {
    draft: 'bg-gray-500/10 text-gray-400',
    published: 'bg-green-500/10 text-green-400',
    scheduled: 'bg-yellow-500/10 text-yellow-400',
};

const statusLabels = {
    draft: 'Borrador',
    published: 'Publicado',
    scheduled: 'Programado',
};

export default function BlogIndex({ posts, flash }) {
    const handleDelete = (id) => {
        if (confirm('¿Eliminar este artículo?')) {
            router.delete(`/admin/blog/${id}`);
        }
    };

    return (
        <>
            <Head title="Blog — Admin" />
            <div className="min-h-screen bg-[#0c1222]">
                <AdminNav active="blog" />

                <div className="max-w-[1200px] mx-auto px-8 py-10">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-extrabold">Artículos del Blog</h1>
                        <Link
                            href="/admin/blog/create"
                            className="px-5 py-2.5 bg-gradient-to-r from-[#0090ff] to-[#00d4aa] text-white font-semibold rounded-xl text-sm hover:opacity-90 transition"
                        >
                            + Nuevo Artículo
                        </Link>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/[0.06] text-[#64748b] text-xs uppercase tracking-wider">
                                        <th className="text-left px-6 py-3">Título</th>
                                        <th className="text-left px-6 py-3">Categoría</th>
                                        <th className="text-left px-6 py-3">Estado</th>
                                        <th className="text-left px-6 py-3">Vistas</th>
                                        <th className="text-left px-6 py-3">Publicado</th>
                                        <th className="text-left px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.data.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-[#64748b]">
                                                No hay artículos aún.
                                            </td>
                                        </tr>
                                    )}
                                    {posts.data.map(post => (
                                        <tr key={post.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                            <td className="px-6 py-3 font-medium max-w-[300px] truncate">{post.title}</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold capitalize">
                                                    {post.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[post.status] || 'bg-gray-500/10 text-gray-400'}`}>
                                                    {statusLabels[post.status] || post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-[#94a3b8]">{post.views?.toLocaleString() || 0}</td>
                                            <td className="px-6 py-3 text-[#64748b]">{post.published_at || '—'}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/blog/${post.id}/edit`}
                                                        className="px-3 py-1.5 bg-[#0090ff]/10 text-[#0090ff] rounded-lg text-xs font-semibold hover:bg-[#0090ff]/20 transition"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {posts.links && posts.links.length > 3 && (
                            <div className="flex items-center justify-center gap-1 px-6 py-4 border-t border-white/[0.06]">
                                {posts.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                            link.active
                                                ? 'bg-[#0090ff] text-white'
                                                : link.url
                                                ? 'text-[#94a3b8] hover:bg-white/[0.05]'
                                                : 'text-[#64748b] cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
