import ColorPickerModal from '../components/ColorPickerModal';

export default function Step05_Colores({ data, onChange }) {
    const colores = data.colores || [];
    return (
        <div className="space-y-5">
            <ColorPickerModal
                colors={colores}
                onChange={(colors) => onChange({ ...data, colores: colors })}
            />
            <p className="text-xs" style={{ color: 'var(--briefing-text-dim)' }}>
                Haz click en el círculo "+" para agregar un color. Máximo 4.
            </p>
            {colores.length === 0 && (
                <div
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--briefing-card)', border: '1px solid var(--briefing-border)' }}
                >
                    <span style={{ color: 'var(--briefing-text-muted)', fontSize: '13px' }}>
                        Si aún no tienes colores definidos, puedes continuar sin agregarlos — nuestro equipo te hará propuestas.
                    </span>
                </div>
            )}
        </div>
    );
}
