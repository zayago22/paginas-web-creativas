const INDUSTRIAS = [
    'Salud', 'Educación', 'Tecnología', 'Retail / Comercio', 'Restaurantes / Gastronomía',
    'Bienes Raíces', 'Consultoría', 'Belleza / Bienestar', 'Legal', 'Otro',
];

const Textarea = ({ label, value, onChange, error, placeholder, required }) => (
    <div className="space-y-1.5">
        <label className="block text-sm font-medium" style={{ color: 'var(--briefing-text-muted)' }}>
            {label}{required && <span style={{ color: '#F87171' }}> *</span>}
        </label>
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full px-4 py-3.5 rounded-xl transition-all duration-200 outline-none resize-none"
            style={{
                background: 'var(--briefing-surface)',
                border: `1.5px solid ${error ? '#F87171' : 'var(--briefing-border)'}`,
                color: 'var(--briefing-text)',
                fontSize: '16px',
                fontFamily: "'DM Sans', sans-serif",
            }}
            onFocus={e => { e.target.style.borderColor = error ? '#F87171' : '#6C63FF'; e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = error ? '#F87171' : 'var(--briefing-border)'; e.target.style.boxShadow = 'none'; }}
        />
        {error && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {error}</p>}
    </div>
);

export default function Step02_Negocio({ data, onChange, errors }) {
    const update = (field) => (val) => onChange({ ...data, negocio: { ...(data.negocio || {}), [field]: val } });

    return (
        <div className="space-y-5">
            {/* Select de industria */}
            <div className="space-y-1.5">
                <label className="block text-sm font-medium" style={{ color: 'var(--briefing-text-muted)' }}>
                    Industria <span style={{ color: '#F87171' }}>*</span>
                </label>
                <select
                    value={data.negocio?.industria || ''}
                    onChange={e => update('industria')(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl transition-all duration-200 outline-none appearance-none"
                    style={{
                        background: 'var(--briefing-surface)',
                        border: `1.5px solid ${errors?.industria ? '#F87171' : 'var(--briefing-border)'}`,
                        color: data.negocio?.industria ? 'var(--briefing-text)' : 'var(--briefing-text-muted)',
                        fontSize: '16px',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    <option value="" disabled>Selecciona tu industria</option>
                    {INDUSTRIAS.map(i => (
                        <option key={i} value={i} style={{ background: 'var(--briefing-surface)', color: 'var(--briefing-text)' }}>{i}</option>
                    ))}
                </select>
                {errors?.industria && <p className="text-xs" style={{ color: '#F87171' }}>⚠ {errors.industria}</p>}
            </div>

            <Textarea
                label="¿Qué hace tu empresa?"
                value={data.negocio?.descripcion || ''}
                onChange={update('descripcion')}
                error={errors?.descripcion}
                placeholder="Describe brevemente qué ofreces y cómo ayudas a tus clientes..."
                required
            />

            <Textarea
                label="¿Qué te hace diferente de tu competencia?"
                value={data.negocio?.diferenciador || ''}
                onChange={update('diferenciador')}
                error={errors?.diferenciador}
                placeholder="¿Cuál es tu ventaja principal?"
                required
            />
        </div>
    );
}
