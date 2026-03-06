import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';

function Section({ title, icon, stepNum, onEdit, children }) {
    const [open, setOpen] = useState(true);
    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #2A2A3A', background: '#13131A' }}
        >
            <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer"
                onClick={() => setOpen(o => !o)}
                style={{ borderBottom: open ? '1px solid #2A2A3A' : 'none' }}
            >
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ color: '#6C63FF', fontFamily: "'Syne', sans-serif" }}>
                        {String(stepNum).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-sm" style={{ color: '#F0F0F5', fontFamily: "'Syne', sans-serif" }}>
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={e => { e.stopPropagation(); onEdit(); }}
                        className="p-1.5 rounded-lg transition"
                        style={{ color: '#8B8B9E', background: '#1C1C28' }}
                        title="Editar"
                    >
                        <Pencil size={13} />
                    </button>
                    {open ? <ChevronUp size={16} style={{ color: '#8B8B9E' }} /> : <ChevronDown size={16} style={{ color: '#8B8B9E' }} />}
                </div>
            </div>
            {open && <div className="p-5 space-y-3">{children}</div>}
        </div>
    );
}

function Field({ label, value }) {
    if (!value && value !== 0) return null;
    const display = Array.isArray(value) ? value.join(', ') : String(value);
    if (!display.trim()) return null;
    return (
        <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: '#8B8B9E' }}>{label}</p>
            <p className="text-sm leading-relaxed" style={{ color: '#F0F0F5' }}>{display}</p>
        </div>
    );
}

export default function SummaryView({ formData, onGoToStep }) {
    const d = formData;
    return (
        <div className="space-y-3">
            <Section title="Datos de Contacto" stepNum={1} onEdit={() => onGoToStep(1)}>
                <Field label="Nombre" value={d.nombre} />
                <Field label="Empresa" value={d.empresa} />
                <Field label="Email" value={d.email} />
                <Field label="Teléfono" value={d.telefono} />
            </Section>

            <Section title="Negocio" stepNum={2} onEdit={() => onGoToStep(2)}>
                <Field label="Industria" value={d.negocio?.industria} />
                <Field label="¿Qué hace?" value={d.negocio?.descripcion} />
                <Field label="Diferenciador" value={d.negocio?.diferenciador} />
            </Section>

            <Section title="Servicios" stepNum={3} onEdit={() => onGoToStep(3)}>
                {(d.servicios || []).map((s, i) => (
                    <div key={i}>
                        <p className="text-sm font-semibold" style={{ color: '#F0F0F5' }}>• {s.nombre}</p>
                        {s.descripcion && <p className="text-xs pl-3" style={{ color: '#8B8B9E' }}>{s.descripcion}</p>}
                    </div>
                ))}
            </Section>

            <Section title="Logo" stepNum={4} onEdit={() => onGoToStep(4)}>
                {d.logoSkipped ? (
                    <p className="text-sm" style={{ color: '#8B8B9E' }}>Sin logo aún — incluirlo en el proyecto</p>
                ) : d.logoUrl ? (
                    <img src={d.logoUrl} alt="Logo" className="max-h-20 object-contain rounded" />
                ) : (
                    <p className="text-sm" style={{ color: '#8B8B9E' }}>—</p>
                )}
            </Section>

            <Section title="Colores" stepNum={5} onEdit={() => onGoToStep(5)}>
                {d.colores?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {d.colores.map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full border border-white/10 inline-block" style={{ background: c }} />
                                <span className="text-xs font-mono" style={{ color: '#8B8B9E' }}>{c}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm" style={{ color: '#8B8B9E' }}>Sin colores definidos</p>
                )}
            </Section>

            <Section title="Tipografía" stepNum={6} onEdit={() => onGoToStep(6)}>
                <Field label="¿Tiene fuentes?" value={d.tipografia?.tieneFuentes === 'si' ? 'Sí' : 'No'} />
                {d.tipografia?.fuentes && <Field label="Fuentes" value={d.tipografia.fuentes} />}
            </Section>

            <Section title="Web Actual" stepNum={7} onEdit={() => onGoToStep(7)}>
                <Field label="¿Tiene web?" value={d.webActual?.tieneWeb === 'si' ? 'Sí' : 'No'} />
                {d.webActual?.tieneWeb === 'si' && (
                    <>
                        <Field label="URL" value={d.webActual?.url} />
                        <Field label="¿Qué no le gusta?" value={d.webActual?.noLeGusta} />
                        <Field label="¿Mantener dominio?" value={d.webActual?.mantenerDominio} />
                    </>
                )}
            </Section>

            <Section title="Nueva Web" stepNum={8} onEdit={() => onGoToStep(8)}>
                <Field label="Tipo" value={d.webNueva?.tipo} />
                <Field label="Páginas" value={d.webNueva?.paginas} />
                <Field label="Textos" value={d.webNueva?.textos === 'si' ? 'Los tiene listos' : 'Necesita ayuda con el copy'} />
            </Section>

            <Section title="Audiencia" stepNum={9} onEdit={() => onGoToStep(9)}>
                <Field label="Cliente ideal" value={d.audiencia?.descripcion} />
                <Field label="Idiomas" value={d.audiencia?.idiomas} />
            </Section>

            <Section title="Inspiración" stepNum={10} onEdit={() => onGoToStep(10)}>
                {(d.inspiracion || []).filter(i => i.url).map((insp, i) => (
                    <div key={i}>
                        <a href={insp.url} target="_blank" rel="noopener" className="text-sm" style={{ color: '#6C63FF' }}>{insp.url}</a>
                        {insp.comentario && <p className="text-xs mt-0.5" style={{ color: '#8B8B9E' }}>{insp.comentario}</p>}
                    </div>
                ))}
                {!d.inspiracion?.some(i => i.url) && <p className="text-sm" style={{ color: '#8B8B9E' }}>Sin referencias</p>}
            </Section>

            <Section title="Archivos" stepNum={11} onEdit={() => onGoToStep(11)}>
                {(d.archivos || []).length ? (
                    d.archivos.map((a, i) => <p key={i} className="text-sm" style={{ color: '#F0F0F5' }}>📎 {a.name}</p>)
                ) : (
                    <p className="text-sm" style={{ color: '#8B8B9E' }}>Sin archivos</p>
                )}
            </Section>

            <Section title="Comentarios" stepNum={12} onEdit={() => onGoToStep(12)}>
                <Field label="Comentarios adicionales" value={d.comentarios || '—'} />
            </Section>
        </div>
    );
}
