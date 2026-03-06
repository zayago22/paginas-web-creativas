const Radio = ({ label, value, checked, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(value)}
        className="flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-200 text-left"
        style={{
            border: `1.5px solid ${checked ? '#6C63FF' : '#2A2A3A'}`,
            background: checked ? 'rgba(108,99,255,0.1)' : '#1C1C28',
            color: checked ? '#F0F0F5' : '#8B8B9E',
        }}
    >
        <span
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: checked ? '#6C63FF' : '#2A2A3A' }}
        >
            {checked && <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#6C63FF' }} />}
        </span>
        <span className="font-medium text-sm">{label}</span>
    </button>
);

const inputBase = {
    background: '#1C1C28',
    border: '1.5px solid #2A2A3A',
    color: '#F0F0F5',
    fontSize: '16px',
    fontFamily: "'DM Sans', sans-serif",
};

export default function Step07_WebActual({ data, onChange, errors }) {
    const tieneWeb = data.webActual?.tieneWeb;
    const update = (field, val) => onChange({ ...data, webActual: { ...(data.webActual || {}), [field]: val } });

    return (
        <div className="space-y-5">
            {errors?.tieneWeb && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.tieneWeb}</p>}
            <Radio label="Sí, tengo web" value="si" checked={tieneWeb === 'si'} onChange={v => update('tieneWeb', v)} />
            <Radio label="No, todavía no" value="no" checked={tieneWeb === 'no'} onChange={v => update('tieneWeb', v)} />

            {tieneWeb === 'si' && (
                <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium" style={{ color: '#8B8B9E' }}>
                            URL de tu web actual <span style={{ color: '#F87171' }}>*</span>
                        </label>
                        <input
                            type="url"
                            value={data.webActual?.url || ''}
                            onChange={e => update('url', e.target.value)}
                            placeholder="https://tuempresa.com"
                            className="w-full px-4 py-3.5 rounded-xl outline-none transition"
                            style={{ ...inputBase, borderColor: errors?.url ? '#F87171' : '#2A2A3A' }}
                            onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                            onBlur={e => { e.target.style.borderColor = errors?.url ? '#F87171' : '#2A2A3A'; }}
                        />
                        {errors?.url && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.url}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium" style={{ color: '#8B8B9E' }}>¿Qué NO te gusta de ella?</label>
                        <textarea
                            value={data.webActual?.noLeGusta || ''}
                            onChange={e => update('noLeGusta', e.target.value)}
                            placeholder="Ej: Es lenta, el diseño es viejo, no se ve bien en celular..."
                            rows={3}
                            className="w-full px-4 py-3.5 rounded-xl outline-none resize-none transition"
                            style={inputBase}
                            onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                            onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium" style={{ color: '#8B8B9E' }}>
                            ¿Quieres mantener el dominio actual?
                            {errors?.mantenerDominio && <span style={{ color: '#F87171' }}> *</span>}
                        </label>
                        {['Sí', 'No', 'No sé'].map(opt => (
                            <Radio
                                key={opt}
                                label={opt}
                                value={opt}
                                checked={data.webActual?.mantenerDominio === opt}
                                onChange={v => update('mantenerDominio', v)}
                            />
                        ))}
                        {errors?.mantenerDominio && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.mantenerDominio}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
