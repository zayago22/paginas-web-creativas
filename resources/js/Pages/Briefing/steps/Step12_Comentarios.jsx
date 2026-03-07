const MAX_CHARS = 1000;

export default function Step12_Comentarios({ data, onChange }) {
    const comentarios = data.comentarios || '';
    const remaining = MAX_CHARS - comentarios.length;

    return (
        <div className="space-y-3">
            <div className="relative">
                <textarea
                    value={comentarios}
                    onChange={e => {
                        if (e.target.value.length <= MAX_CHARS) {
                            onChange({ ...data, comentarios: e.target.value });
                        }
                    }}
                    placeholder="Cualquier detalle, contexto, restricción o idea que no hayas podido expresar en los pasos anteriores..."
                    rows={7}
                    className="w-full px-4 py-4 rounded-2xl outline-none resize-none transition"
                    style={{
                        background: 'var(--briefing-surface)',
                        border: '1.5px solid var(--briefing-border)',
                        color: 'var(--briefing-text)',
                        fontSize: '16px',
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: '1.7',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#6C63FF'; e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--briefing-border)'; e.target.style.boxShadow = 'none'; }}
                />
            </div>
            <p
                className="text-right text-xs"
                style={{ color: remaining < 100 ? '#F87171' : 'var(--briefing-text-dim)' }}
            >
                {remaining} caracteres restantes
            </p>

            <div
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.15)' }}
            >
                <span style={{ fontSize: '18px' }}>✨</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--briefing-text-muted)' }}>
                    Este es tu espacio libre. Si hay algo importante que no encajó
                    en las preguntas anteriores, cuéntanoslo aquí.
                </p>
            </div>
        </div>
    );
}
