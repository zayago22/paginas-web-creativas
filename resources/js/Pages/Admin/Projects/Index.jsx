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

export default function ProjectsIndex({ projects, flash }) {
    const handleDelete = (id) => {
        if (confirm('¿Eliminar este proyecto?')) {
            router.delete(`/admin/proyectos/${id}`);
        }
    };

    return (
        <>
            <Head title="Proyectos — Admin" />
            <div className="min-h-screen bg-[#0c1222]">
                <AdminNav active="projects" />

                <div className="max-w-[1200px] mx-auto px-8 py-10">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-extrabold">Proyectos</h1>
                        <Link
                            href="/admin/proyectos/create"
                            className="px-5 py-2.5 bg-gradient-to-r from-[#0090ff] to-[#00d4aa] text-white font-semibold rounded-xl text-sm hover:opacity-90 transition"
                        >
                            + Nuevo Proyecto
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
                                        <th className="text-left px-6 py-3">Imagen</th>
                                        <th className="text-left px-6 py-3">Título</th>
                                        <th className="text-left px-6 py-3">Categoría</th>
                                        <th className="text-left px-6 py-3">Destacado</th>
                                        <th className="text-left px-6 py-3">Activo</th>
                                        <th className="text-left px-6 py-3">Fecha</th>
                                        <th className="text-left px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-[#64748b]">
                                                No hay proyectos aún.
                                            </td>
                                        </tr>
                                    )}
                                    {projects.data.map(project => (
                                        <tr key={project.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                            <td className="px-6 py-3">
                                                {project.image_url ? (
                                                    <img src={project.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-[#0c1222] flex items-center justify-center text-[#64748b] text-xs">N/A</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-3 font-medium">{project.title}</td>
                                            <td className="px-6 py-3">
                                                <span className="px-2.5 py-1 rounded-full bg-[#0090ff]/10 text-[#0090ff] text-xs font-semibold capitalize">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3">
                                                {project.featured ? (
                                                    <span className="text-yellow-400">⭐</span>
                                                ) : (
                                                    <span className="text-[#64748b]">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={`w-2.5 h-2.5 rounded-full inline-block ${project.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                                            </td>
                                            <td className="px-6 py-3 text-[#64748b]">{project.completed_at || '—'}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/proyectos/${project.id}/edit`}
                                                        className="px-3 py-1.5 bg-[#0090ff]/10 text-[#0090ff] rounded-lg text-xs font-semibold hover:bg-[#0090ff]/20 transition"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
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
                        {projects.links && projects.links.length > 3 && (
                            <div className="flex items-center justify-center gap-1 px-6 py-4 border-t border-white/[0.06]">
                                {projects.links.map((link, i) => (
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
