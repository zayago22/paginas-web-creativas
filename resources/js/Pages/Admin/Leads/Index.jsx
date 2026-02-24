import { Head, Link, router } from '@inertiajs/react';
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

const statusTabs = [
    { key: 'all', label: 'Todos' },
    { key: 'new', label: 'Nuevos' },
    { key: 'contacted', label: 'Contactados' },
    { key: 'quoted', label: 'Cotizados' },
    { key: 'won', label: 'Ganados' },
    { key: 'lost', label: 'Perdidos' },
];

const statusStyles = {
    new: 'bg-blue-500/10 text-blue-400',
    contacted: 'bg-yellow-500/10 text-yellow-400',
    quoted: 'bg-purple-500/10 text-purple-400',
    won: 'bg-green-500/10 text-green-400',
    lost: 'bg-red-500/10 text-red-400',
};

const statusOptions = [
    { value: 'new', label: 'Nuevo' },
    { value: 'contacted', label: 'Contactado' },
    { value: 'quoted', label: 'Cotizado' },
    { value: 'won', label: 'Ganado' },
    { value: 'lost', label: 'Perdido' },
];

export default function LeadsIndex({ leads, statusCounts, filters, flash }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedLead, setSelectedLead] = useState(null);
    const [editStatus, setEditStatus] = useState('');
    const [editNotes, setEditNotes] = useState('');

    const handleFilter = (status) => {
        router.get('/admin/leads', { status: status === 'all' ? undefined : status, search: search || undefined }, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/leads', { status: filters?.status, search: search || undefined }, { preserveState: true });
    };

    const openLead = (lead) => {
        setSelectedLead(lead);
        setEditStatus(lead.status);
        setEditNotes(lead.notes || '');
    };

    const updateLead = () => {
        router.put(`/admin/leads/${selectedLead.id}`, {
            status: editStatus,
            notes: editNotes,
        }, {
            onSuccess: () => setSelectedLead(null),
        });
    };

    const deleteLead = (id) => {
        if (confirm('¿Eliminar este lead?')) {
            router.delete(`/admin/leads/${id}`);
        }
    };

    return (
        <>
            <Head title="Leads — Admin" />
            <div className="min-h-screen bg-[#0c1222]">
                <AdminNav active="leads" />

                <div className="max-w-[1200px] mx-auto px-8 py-10">
                    <h1 className="text-2xl font-extrabold mb-8">Leads / Contactos</h1>

                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                            {flash.success}
                        </div>
                    )}

                    {/* Status Tabs */}
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                        {statusTabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => handleFilter(tab.key)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                                    (filters?.status || 'all') === tab.key
                                        ? 'bg-[#0090ff] text-white'
                                        : 'bg-[#141d2f] text-[#94a3b8] hover:bg-white/[0.05]'
                                }`}
                            >
                                {tab.label}
                                <span className="ml-2 text-xs opacity-60">({statusCounts[tab.key] || 0})</span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar por nombre, email o empresa..."
                                className="flex-1 px-4 py-3 bg-[#141d2f] border border-white/10 rounded-xl text-white placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#0090ff] focus:border-transparent transition-all text-sm"
                            />
                            <button type="submit" className="px-5 py-3 bg-[#0090ff]/10 text-[#0090ff] rounded-xl text-sm font-semibold hover:bg-[#0090ff]/20 transition">
                                Buscar
                            </button>
                        </div>
                    </form>

                    {/* Table */}
                    <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/[0.06] text-[#64748b] text-xs uppercase tracking-wider">
                                        <th className="text-left px-6 py-3">Nombre</th>
                                        <th className="text-left px-6 py-3">Email</th>
                                        <th className="text-left px-6 py-3">Teléfono</th>
                                        <th className="text-left px-6 py-3">Servicio</th>
                                        <th className="text-left px-6 py-3">Fuente</th>
                                        <th className="text-left px-6 py-3">Status</th>
                                        <th className="text-left px-6 py-3">Fecha</th>
                                        <th className="text-left px-6 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.data.length === 0 && (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center text-[#64748b]">
                                                No hay leads aún.
                                            </td>
                                        </tr>
                                    )}
                                    {leads.data.map(lead => (
                                        <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                            <td className="px-6 py-3 font-medium">{lead.name}</td>
                                            <td className="px-6 py-3 text-[#94a3b8]">{lead.email}</td>
                                            <td className="px-6 py-3 text-[#94a3b8]">{lead.phone || '—'}</td>
                                            <td className="px-6 py-3 text-[#94a3b8] capitalize">{lead.service_interest || '—'}</td>
                                            <td className="px-6 py-3 text-[#94a3b8]">{lead.source}</td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[lead.status] || 'bg-gray-500/10 text-gray-400'}`}>
                                                    {lead.status_label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-[#64748b] whitespace-nowrap">{lead.created_at}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openLead(lead)}
                                                        className="px-3 py-1.5 bg-[#0090ff]/10 text-[#0090ff] rounded-lg text-xs font-semibold hover:bg-[#0090ff]/20 transition"
                                                    >
                                                        Ver
                                                    </button>
                                                    <button
                                                        onClick={() => deleteLead(lead.id)}
                                                        className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {leads.links && leads.links.length > 3 && (
                            <div className="flex items-center justify-center gap-1 px-6 py-4 border-t border-white/[0.06]">
                                {leads.links.map((link, i) => (
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

            {/* Lead Detail Modal */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
                    <div className="bg-[#141d2f] border border-white/[0.06] rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold">Detalle del Lead</h2>
                            <button onClick={() => setSelectedLead(null)} className="text-[#64748b] hover:text-white transition text-xl">×</button>
                        </div>

                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-[#64748b] text-xs uppercase">Nombre</span>
                                    <p className="font-medium mt-1">{selectedLead.name}</p>
                                </div>
                                <div>
                                    <span className="text-[#64748b] text-xs uppercase">Email</span>
                                    <p className="mt-1 text-[#0090ff]">{selectedLead.email}</p>
                                </div>
                                <div>
                                    <span className="text-[#64748b] text-xs uppercase">Teléfono</span>
                                    <p className="mt-1">{selectedLead.phone || '—'}</p>
                                </div>
                                <div>
                                    <span className="text-[#64748b] text-xs uppercase">Empresa</span>
                                    <p className="mt-1">{selectedLead.company || '—'}</p>
                                </div>
                                <div>
                                    <span className="text-[#64748b] text-xs uppercase">Servicio</span>
                                    <p className="mt-1 capitalize">{selectedLead.service_interest || '—'}</p>
                                </div>
                                <div>
                                    <span className="text-[#64748b] text-xs uppercase">Fuente</span>
                                    <p className="mt-1">{selectedLead.source}</p>
                                </div>
                            </div>

                            {selectedLead.message && (
                                <div>
                                    <span className="text-[#64748b] text-xs uppercase">Mensaje</span>
                                    <p className="mt-1 p-3 bg-[#0c1222] rounded-xl text-[#94a3b8]">{selectedLead.message}</p>
                                </div>
                            )}

                            <hr className="border-white/[0.06]" />

                            {/* Edit Status */}
                            <div>
                                <label className="text-[#64748b] text-xs uppercase block mb-1.5">Cambiar Estado</label>
                                <select
                                    value={editStatus}
                                    onChange={e => setEditStatus(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0c1222] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0090ff] focus:border-transparent"
                                >
                                    {statusOptions.map(o => (
                                        <option key={o.value} value={o.value} className="bg-[#141d2f]">{o.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="text-[#64748b] text-xs uppercase block mb-1.5">Notas internas</label>
                                <textarea
                                    value={editNotes}
                                    onChange={e => setEditNotes(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#0c1222] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0090ff] focus:border-transparent min-h-[100px]"
                                    placeholder="Agregar notas sobre este lead..."
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="px-4 py-2 text-[#94a3b8] hover:text-white transition text-sm"
                                >
                                    Cerrar
                                </button>
                                <button
                                    onClick={updateLead}
                                    className="px-5 py-2.5 bg-gradient-to-r from-[#0090ff] to-[#00d4aa] text-white font-semibold rounded-xl text-sm hover:opacity-90 transition"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
