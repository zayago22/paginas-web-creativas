const Radio = ({ label, value, checked, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(value)}
        className="flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 text-left"
        style={{
            border: `1.5px solid ${checked ? '#6C63FF' : 'var(--briefing-border)'}`,
            background: checked ? 'rgba(108,99,255,0.1)' : 'var(--briefing-surface)',
            color: checked ? 'var(--briefing-text)' : 'var(--briefing-text-muted)',
        }}
    >
        <span
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition"
            style={{ borderColor: checked ? '#6C63FF' : 'var(--briefing-border)' }}
        >
            {checked && <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#6C63FF' }} />}
        </span>
        <span className="font-medium text-sm">{label}</span>
    </button>
);

export default function Step06_Tipografia({ data, onChange, errors }) {
    const tieneFuentes = data.tipografia?.tieneFuentes;
    const update = (field, val) => onChange({ ...data, tipografia: { ...(data.tipografia || {}), [field]: val } });

    return (
        <div className="space-y-5">
            <div className="space-y-3">
                {errors?.tieneFuentes && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.tieneFuentes}</p>}
                <Radio label="Sí, tengo fuentes definidas" value="si" checked={tieneFuentes === 'si'} onChange={v => update('tieneFuentes', v)} />
                <Radio label="No, aún no las tengo" value="no" checked={tieneFuentes === 'no'} onChange={v => update('tieneFuentes', v)} />
            </div>

            {tieneFuentes === 'si' && (
                <div className="space-y-1.5">
                    <label className="block text-sm font-medium" style={{ color: 'var(--briefing-text-muted)' }}>
                        ¿Cuáles son?
                    </label>
                    <input
                        type="text"
                        value={data.tipografia?.fuentes || ''}
                        onChange={e => update('fuentes', e.target.value)}
                        placeholder="Ej: Montserrat, Helvetica, Gotham..."
                        className="w-full px-4 py-3.5 rounded-xl outline-none transition"
                        style={{
                            background: 'var(--briefing-surface)',
                            border: '1.5px solid var(--briefing-border)',
                            color: 'var(--briefing-text)',
                            fontSize: '16px',
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                        onBlur={e => { e.target.style.borderColor = 'var(--briefing-border)'; }}
                    />
                </div>
            )}

            {tieneFuentes === 'no' && (
                <div
                    className="p-4 rounded-xl flex items-start gap-3"
                    style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}
                >
                    <span style={{ fontSize: '20px' }}>🎨</span>
                    <p className="text-sm leading-relaxed" style={{ color: '#4ADE80' }}>
                        ¡No hay problema! Nosotros te recomendaremos las mejores tipografías para tu marca.
                    </p>
                </div>
            )}
        </div>
    );
}
