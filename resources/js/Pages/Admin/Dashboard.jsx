import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentLeads }) {
    const statCards = [
        { label: 'Leads Nuevos', value: stats.new_leads, color: '#0090ff', icon: '🔔' },
        { label: 'Leads Este Mes', value: stats.leads_this_month, color: '#00e4b8', icon: '📊' },
        { label: 'Total Proyectos', value: stats.total_projects, color: '#7c5cfc', icon: '💼' },
        { label: 'Artículos Blog', value: stats.total_posts, color: '#feca57', icon: '📝' },
        { label: 'Testimonios', value: stats.total_testimonials, color: '#00bfff', icon: '⭐' },
        { label: 'Total Leads', value: stats.total_leads, color: '#ff6b6b', icon: '📩' },
    ];

    const statusColors = {
        blue: 'bg-blue-500/10 text-blue-400',
        yellow: 'bg-yellow-500/10 text-yellow-400',
        purple: 'bg-purple-500/10 text-purple-400',
        green: 'bg-green-500/10 text-green-400',
        red: 'bg-red-500/10 text-red-400',
        gray: 'bg-gray-500/10 text-gray-400',
    };

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-[#0c1222]">
                {/* Admin Topbar */}
                <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0090ff] to-[#00bfff] flex items-center justify-center text-xs font-black text-white">P</div>
                            <span>Admin Panel</span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link href="/admin" className="text-[#0090ff] font-semibold">Dashboard</Link>
                        <Link href="/admin/proyectos" className="text-[#94a3b8] hover:text-white transition">Proyectos</Link>
                        <Link href="/admin/blog" className="text-[#94a3b8] hover:text-white transition">Blog</Link>
                        <Link href="/admin/leads" className="text-[#94a3b8] hover:text-white transition">
                            Leads {stats.new_leads > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">{stats.new_leads}</span>
                            )}
                        </Link>
                    </nav>
                </div>

                <div className="max-w-[1200px] mx-auto px-8 py-10">
                    <h1 className="text-2xl font-extrabold mb-8">Dashboard</h1>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                        {statCards.map(s => (
                            <div key={s.label} className="p-5 bg-[#141d2f] border border-white/[0.06] rounded-xl">
                                <div className="text-2xl mb-2">{s.icon}</div>
                                <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                                <div className="text-xs text-[#64748b] mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Leads Table */}
                    <div className="bg-[#141d2f] border border-white/[0.06] rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                            <h2 className="font-bold">Leads Recientes</h2>
                            <Link href="/admin/leads" className="text-sm text-[#0090ff] hover:underline">Ver todos →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/[0.06] text-[#64748b] text-xs uppercase tracking-wider">
                                        <th className="text-left px-6 py-3">Nombre</th>
                                        <th className="text-left px-6 py-3">Email</th>
                                        <th className="text-left px-6 py-3">Servicio</th>
                                        <th className="text-left px-6 py-3">Fuente</th>
                                        <th className="text-left px-6 py-3">Status</th>
                                        <th className="text-left px-6 py-3">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentLeads.map(lead => (
                                        <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                            <td className="px-6 py-3 font-medium">{lead.name}</td>
                                            <td className="px-6 py-3 text-[#94a3b8]">{lead.email}</td>
                                            <td className="px-6 py-3 text-[#94a3b8] capitalize">{lead.service_interest || '—'}</td>
                                            <td className="px-6 py-3 text-[#94a3b8]">{lead.source}</td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[lead.status_color]}`}>
                                                    {lead.status_label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-[#64748b]">{lead.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
