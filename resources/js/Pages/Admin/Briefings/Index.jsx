import { Head, Link, router } from '@inertiajs/react';

const STATUS_COLORS = {
    nuevo:      { bg: 'rgba(108,99,255,0.12)', text: '#8B84FF', border: 'rgba(108,99,255,0.3)' },
    revisado:   { bg: 'rgba(74,222,128,0.12)', text: '#4ADE80', border: 'rgba(74,222,128,0.3)' },
    en_proceso: { bg: 'rgba(251,191,36,0.12)', text: '#FBBF24', border: 'rgba(251,191,36,0.3)' },
};

export default function AdminBriefingsIndex({ briefings }) {
    return (
        <>
            <Head title="Briefings — Admin" />
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Briefings</h1>
                        <p className="text-sm text-[#94a3b8] mt-1">{briefings.total} briefings recibidos</p>
                    </div>
                    <a
                        href="/briefing"
                        target="_blank"
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#0090ff] text-white hover:bg-[#0070d6] transition"
                    >
                        Ver formulario →
                    </a>
                </div>

                <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.06]" style={{ background: '#0f172a' }}>
                                {['#', 'Empresa', 'Contacto', 'Estado', 'Fecha', 'Acciones'].map(h => (
                                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {briefings.data.map((b) => {
                                const sc = STATUS_COLORS[b.status] || STATUS_COLORS.nuevo;
                                return (
                                    <tr key={b.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                                        <td className="px-4 py-3 text-sm text-[#94a3b8]">#{b.id}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-sm">{b.empresa}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-sm">{b.nombre}</p>
                                            <p className="text-xs text-[#94a3b8]">{b.email}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                defaultValue={b.status}
                                                onChange={e => router.put(`/admin/briefings/${b.id}`, { status: e.target.value }, { preserveScroll: true })}
                                                className="text-xs font-semibold px-2 py-1 rounded-lg outline-none"
                                                style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                                            >
                                                <option value="nuevo">Nuevo</option>
                                                <option value="revisado">Revisado</option>
                                                <option value="en_proceso">En proceso</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-[#94a3b8]">{b.created_at}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/briefings/${b.id}`}
                                                    className="text-xs px-3 py-1.5 rounded-lg transition"
                                                    style={{ background: 'rgba(0,144,255,0.12)', color: '#0090ff' }}
                                                >
                                                    Ver
                                                </Link>
                                                {b.pdf_url && (
                                                    <a
                                                        href={b.pdf_url}
                                                        target="_blank"
                                                        className="text-xs px-3 py-1.5 rounded-lg transition"
                                                        style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}
                                                    >
                                                        PDF
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {briefings.data.length === 0 && (
                        <div className="py-16 text-center text-[#94a3b8]">
                            <p className="text-4xl mb-3">📋</p>
                            <p>No hay briefings aún.</p>
                            <a href="/briefing" className="text-sm text-[#0090ff] mt-2 inline-block">Ver formulario</a>
                        </div>
                    )}
                </div>

                {/* Paginación */}
                {briefings.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {briefings.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className="px-3 py-1.5 rounded-lg text-sm transition"
                                style={{
                                    background: link.active ? '#0090ff' : 'rgba(255,255,255,0.05)',
                                    color: link.active ? '#fff' : '#94a3b8',
                                    pointerEvents: link.url ? 'auto' : 'none',
                                    opacity: link.url ? 1 : 0.4,
                                }}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
