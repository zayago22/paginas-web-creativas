const IDIOMAS = ['Español', 'Inglés', 'Portugués', 'Otro'];

export default function Step09_Audiencia({ data, onChange, errors }) {
    const a = data.audiencia || {};
    const update = (field, val) => onChange({ ...data, audiencia: { ...a, [field]: val } });

    const toggleIdioma = (idioma) => {
        const current = a.idiomas || [];
        const next = current.includes(idioma) ? current.filter(i => i !== idioma) : [...current, idioma];
        update('idiomas', next);
    };

    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <label className="block text-sm font-medium" style={{ color: '#8B8B9E' }}>
                    Describe a tu cliente ideal <span style={{ color: '#F87171' }}>*</span>
                </label>
                <textarea
                    value={a.descripcion || ''}
                    onChange={e => update('descripcion', e.target.value)}
                    placeholder="Edad, género, intereses, dónde vive, qué problema tiene que tú resuelves..."
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl outline-none resize-none transition"
                    style={{
                        background: '#1C1C28',
                        border: `1.5px solid ${errors?.descripcion ? '#F87171' : '#2A2A3A'}`,
                        color: '#F0F0F5',
                        fontSize: '16px',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={e => { e.target.style.borderColor = '#6C63FF'; }}
                    onBlur={e => { e.target.style.borderColor = errors?.descripcion ? '#F87171' : '#2A2A3A'; }}
                />
                {errors?.descripcion && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.descripcion}</p>}
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: '#8B8B9E' }}>
                    ¿En qué idioma(s) debe estar la web? <span style={{ color: '#F87171' }}>*</span>
                </p>
                {errors?.idiomas && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.idiomas}</p>}
                <div className="grid grid-cols-2 gap-2">
                    {IDIOMAS.map(idioma => {
                        const checked = (a.idiomas || []).includes(idioma);
                        return (
                            <button
                                key={idioma}
                                type="button"
                                onClick={() => toggleIdioma(idioma)}
                                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition"
                                style={{
                                    border: `1.5px solid ${checked ? '#6C63FF' : '#2A2A3A'}`,
                                    background: checked ? 'rgba(108,99,255,0.1)' : '#1C1C28',
                                    color: checked ? '#F0F0F5' : '#8B8B9E',
                                }}
                            >
                                <span>{checked ? '☑' : '☐'}</span>
                                {idioma}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
