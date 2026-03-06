import { useState } from 'react';

const TIPOS_WEB = [
    { id: 'landing', icon: '🏠', label: 'Landing Page', desc: 'Página única de presentación' },
    { id: 'corporativo', icon: '🏢', label: 'Sitio Corporativo', desc: 'Múltiples páginas' },
    { id: 'ecommerce', icon: '🛍️', label: 'Tienda Online / E-commerce', desc: null },
    { id: 'portafolio', icon: '📁', label: 'Portafolio', desc: null },
    { id: 'otro', icon: '🌐', label: 'Otro', desc: null },
];

const PAGINAS_OPTS = [
    'Inicio', 'Sobre Nosotros', 'Servicios', 'Portafolio / Galería',
    'Blog', 'Contacto', 'Preguntas Frecuentes', 'Tienda',
];

const Radio = ({ label, value, checked, onChange }) => (
    <button type="button" onClick={() => onChange(value)}
        className="flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 text-left"
        style={{
            border: `1.5px solid ${checked ? '#6C63FF' : '#2A2A3A'}`,
            background: checked ? 'rgba(108,99,255,0.1)' : '#1C1C28',
            color: checked ? '#F0F0F5' : '#8B8B9E',
        }}>
        <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: checked ? '#6C63FF' : '#2A2A3A' }}>
            {checked && <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#6C63FF' }} />}
        </span>
        <span className="font-medium text-sm">{label}</span>
    </button>
);

export default function Step08_NuevaWeb({ data, onChange, errors }) {
    const [otroPagina, setOtroPagina] = useState('');
    const w = data.webNueva || {};
    const update = (field, val) => onChange({ ...data, webNueva: { ...w, [field]: val } });

    const togglePagina = (p) => {
        const current = w.paginas || [];
        const next = current.includes(p) ? current.filter(x => x !== p) : [...current, p];
        update('paginas', next);
    };

    const addOtroPagina = () => {
        if (!otroPagina.trim()) return;
        const current = w.paginas || [];
        if (!current.includes(otroPagina.trim())) {
            update('paginas', [...current, otroPagina.trim()]);
        }
        setOtroPagina('');
    };

    return (
        <div className="space-y-6">
            {/* Tipo de sitio */}
            <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: '#8B8B9E' }}>
                    Tipo de sitio <span style={{ color: '#F87171' }}>*</span>
                </p>
                {errors?.tipo && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.tipo}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TIPOS_WEB.map(t => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => update('tipo', t.label)}
                            className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left"
                            style={{
                                border: `1.5px solid ${w.tipo === t.label ? '#6C63FF' : '#2A2A3A'}`,
                                background: w.tipo === t.label ? 'rgba(108,99,255,0.12)' : '#13131A',
                            }}
                        >
                            <span style={{ fontSize: '22px' }}>{t.icon}</span>
                            <div>
                                <p className="font-semibold text-sm" style={{ color: w.tipo === t.label ? '#F0F0F5' : '#8B8B9E' }}>{t.label}</p>
                                {t.desc && <p className="text-xs" style={{ color: '#4A4A5A' }}>{t.desc}</p>}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Páginas */}
            <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: '#8B8B9E' }}>
                    ¿Qué páginas necesitas? <span style={{ color: '#F87171' }}>*</span>
                </p>
                {errors?.paginas && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.paginas}</p>}
                <div className="grid grid-cols-2 gap-2">
                    {PAGINAS_OPTS.map(p => {
                        const checked = (w.paginas || []).includes(p);
                        return (
                            <button key={p} type="button" onClick={() => togglePagina(p)}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition"
                                style={{
                                    border: `1.5px solid ${checked ? '#6C63FF' : '#2A2A3A'}`,
                                    background: checked ? 'rgba(108,99,255,0.1)' : '#1C1C28',
                                    color: checked ? '#F0F0F5' : '#8B8B9E',
                                }}>
                                <span style={{ fontSize: '14px' }}>{checked ? '☑' : '☐'}</span>
                                {p}
                            </button>
                        );
                    })}
                </div>
                {/* Otro */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={otroPagina}
                        onChange={e => setOtroPagina(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addOtroPagina()}
                        placeholder="Otra página..."
                        className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none transition"
                        style={{ background: '#1C1C28', border: '1.5px solid #2A2A3A', color: '#F0F0F5', fontSize: '15px' }}
                        onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                        onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                    />
                    <button type="button" onClick={addOtroPagina}
                        className="px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                        style={{ background: '#1C1C28', border: '1.5px solid #2A2A3A', color: '#6C63FF' }}>
                        + Agregar
                    </button>
                </div>
            </div>

            {/* Textos */}
            <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: '#8B8B9E' }}>
                    ¿Tienes los textos listos? <span style={{ color: '#F87171' }}>*</span>
                </p>
                {errors?.textos && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.textos}</p>}
                <Radio label="Sí, los tengo" value="si" checked={w.textos === 'si'} onChange={v => update('textos', v)} />
                <Radio label="No, necesito ayuda con el copy" value="no" checked={w.textos === 'no'} onChange={v => update('textos', v)} />
            </div>
        </div>
    );
}
