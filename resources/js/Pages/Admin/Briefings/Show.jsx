import { Head, Link, router } from '@inertiajs/react';

const Field = ({ label, value }) => {
    if (!value && value !== 0) return null;
    const display = Array.isArray(value) ? value.join(', ') : String(value);
    if (!display.trim()) return null;
    return (
        <div>
            <p className="text-xs font-medium text-[#94a3b8] mb-0.5">{label}</p>
            <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{display}</p>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 className="text-sm font-bold text-[#0090ff] uppercase tracking-wider">{title}</h3>
        {children}
    </div>
);

export default function AdminBriefingShow({ briefing }) {
    const d = briefing.data || {};

    const deleteMe = () => {
        if (confirm(`¿Eliminar briefing #${briefing.id} de ${briefing.empresa}?`)) {
            router.delete(`/admin/briefings/${briefing.id}`);
        }
    };

    return (
        <>
            <Head title={`Briefing #${briefing.id} — ${briefing.empresa}`} />
            <div className="p-6 max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <Link href="/admin/briefings" className="text-sm text-[#94a3b8] hover:text-white mb-2 inline-block">
                            ← Volver
                        </Link>
                        <h1 className="text-2xl font-bold">{briefing.empresa}</h1>
                        <p className="text-[#94a3b8] text-sm">Briefing #{briefing.id} · {briefing.created_at}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        {briefing.pdf_url && (
                            <a
                                href={briefing.pdf_url}
                                target="_blank"
                                className="px-4 py-2 rounded-lg text-sm font-semibold transition"
                                style={{ background: 'rgba(74,222,128,0.12)', color: '#4ADE80' }}
                            >
                                📄 Descargar PDF
                            </a>
                        )}
                        <button
                            onClick={deleteMe}
                            className="px-4 py-2 rounded-lg text-sm font-semibold transition"
                            style={{ background: 'rgba(248,113,113,0.12)', color: '#F87171' }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>

                {/* Datos de contacto */}
                <Section title="01 · Contacto">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Nombre" value={briefing.nombre} />
                        <Field label="Empresa" value={briefing.empresa} />
                        <Field label="Email" value={briefing.email} />
                        <Field label="Teléfono" value={briefing.telefono} />
                    </div>
                </Section>

                <Section title="02 · Negocio">
                    <Field label="Industria" value={d.negocio?.industria} />
                    <Field label="¿Qué hace?" value={d.negocio?.descripcion} />
                    <Field label="Diferenciador" value={d.negocio?.diferenciador} />
                </Section>

                <Section title="03 · Servicios">
                    {(d.servicios || []).map((s, i) => (
                        <div key={i} className="pl-3 border-l-2" style={{ borderColor: '#6C63FF' }}>
                            <p className="font-semibold text-sm text-white">{s.nombre}</p>
                            {s.descripcion && <p className="text-xs text-[#94a3b8]">{s.descripcion}</p>}
                        </div>
                    ))}
                </Section>

                <Section title="04 · Logo">
                    {d.logoSkipped ? (
                        <p className="text-sm text-[#94a3b8]">Sin logo — incluirlo en el proyecto</p>
                    ) : d.logoUrl ? (
                        <img src={d.logoUrl} alt="Logo" className="max-h-24 object-contain" />
                    ) : (
                        <p className="text-sm text-[#94a3b8]">—</p>
                    )}
                </Section>

                <Section title="05 · Colores">
                    {d.colores?.length ? (
                        <div className="flex flex-wrap gap-3">
                            {d.colores.map((c, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg border border-white/10" style={{ background: c, display: 'inline-block' }} />
                                    <span className="text-xs font-mono text-[#94a3b8]">{c}</span>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-[#94a3b8]">No definidos</p>}
                </Section>

                <Section title="06 · Tipografía">
                    <Field label="¿Tiene fuentes?" value={d.tipografia?.tieneFuentes === 'si' ? 'Sí' : 'No'} />
                    {d.tipografia?.fuentes && <Field label="Fuentes" value={d.tipografia.fuentes} />}
                </Section>

                <Section title="07 · Web Actual">
                    <Field label="¿Tiene web?" value={d.webActual?.tieneWeb === 'si' ? 'Sí' : 'No'} />
                    {d.webActual?.tieneWeb === 'si' && (
                        <>
                            <Field label="URL" value={d.webActual?.url} />
                            <Field label="¿Qué no le gusta?" value={d.webActual?.noLeGusta} />
                            <Field label="¿Mantener dominio?" value={d.webActual?.mantenerDominio} />
                        </>
                    )}
                </Section>

                <Section title="08 · Nueva Web">
                    <Field label="Tipo" value={d.webNueva?.tipo} />
                    <Field label="Páginas" value={d.webNueva?.paginas} />
                    <Field label="Textos" value={d.webNueva?.textos === 'si' ? 'Los tiene listos' : 'Necesita ayuda con el copy'} />
                </Section>

                <Section title="09 · Audiencia">
                    <Field label="Cliente ideal" value={d.audiencia?.descripcion} />
                    <Field label="Idiomas" value={d.audiencia?.idiomas} />
                </Section>

                {d.inspiracion?.some(i => i.url) && (
                    <Section title="10 · Inspiración">
                        {d.inspiracion.filter(i => i.url).map((insp, i) => (
                            <div key={i}>
                                <a href={insp.url} target="_blank" rel="noopener" className="text-sm text-[#0090ff] hover:underline">{insp.url}</a>
                                {insp.comentario && <p className="text-xs text-[#94a3b8] mt-0.5">{insp.comentario}</p>}
                            </div>
                        ))}
                    </Section>
                )}

                {d.archivos?.length > 0 && (
                    <Section title="11 · Archivos">
                        {d.archivos.map((a, i) => (
                            <a key={i} href={a.url} target="_blank" rel="noopener"
                               className="flex items-center gap-2 text-sm text-[#0090ff] hover:underline">
                                📎 {a.name}
                            </a>
                        ))}
                    </Section>
                )}

                {d.comentarios && (
                    <Section title="12 · Comentarios">
                        <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{d.comentarios}</p>
                    </Section>
                )}

                {/* Acciones de estado */}
                <div className="flex gap-3">
                    {['nuevo', 'revisado', 'en_proceso'].map(s => (
                        <button
                            key={s}
                            onClick={() => router.put(`/admin/briefings/${briefing.id}`, { status: s }, { preserveScroll: true })}
                            className="px-4 py-2 rounded-lg text-sm font-semibold capitalize transition"
                            style={{
                                background: briefing.status === s ? '#0090ff' : 'rgba(255,255,255,0.05)',
                                color: briefing.status === s ? '#fff' : '#94a3b8',
                            }}
                        >
                            {s.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
