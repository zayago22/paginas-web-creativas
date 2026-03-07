import { useState, useEffect, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Plus } from 'lucide-react';

export default function ColorPickerModal({ colors, onChange }) {
    const [activeIdx, setActiveIdx] = useState(null);
    const pickerRef = useRef(null);

    // Cerrar picker al click fuera
    useEffect(() => {
        if (activeIdx === null) return;
        const handler = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setActiveIdx(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [activeIdx]);

    const addColor = () => {
        if (colors.length >= 4) return;
        onChange([...colors, '#6C63FF']);
        setActiveIdx(colors.length);
    };

    const removeColor = (idx) => {
        const next = colors.filter((_, i) => i !== idx);
        onChange(next);
        setActiveIdx(null);
    };

    const updateColor = (color) => {
        const next = [...colors];
        next[activeIdx] = color;
        onChange(next);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                {colors.map((color, i) => (
                    <div key={i} className="relative">
                        <button
                            type="button"
                            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                            className="w-14 h-14 rounded-2xl border-2 transition-all duration-200 shadow-lg"
                            style={{
                                background: color,
                                borderColor: activeIdx === i ? 'var(--briefing-text)' : 'rgba(255,255,255,0.15)',
                                transform: activeIdx === i ? 'scale(1.1)' : 'scale(1)',
                            }}
                            title={color}
                        />
                        <button
                            type="button"
                            onClick={() => removeColor(i)}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white transition"
                            style={{ background: '#F87171' }}
                        >
                            <X size={10} />
                        </button>
                    </div>
                ))}

                {/* Botón añadir */}
                {colors.length < 4 && (
                    <button
                        type="button"
                        onClick={addColor}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition"
                        style={{ border: '1.5px dashed var(--briefing-border)', color: 'var(--briefing-text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#6C63FF'; e.currentTarget.style.color = '#6C63FF'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--briefing-border)'; e.currentTarget.style.color = 'var(--briefing-text-muted)'; }}
                    >
                        <Plus size={20} />
                    </button>
                )}
            </div>

            {/* Picker inline cuando hay activo */}
            {activeIdx !== null && (
                <div
                    ref={pickerRef}
                    className="p-4 rounded-2xl"
                    style={{ background: 'var(--briefing-surface)', border: '1px solid var(--briefing-border)', display: 'inline-block' }}
                >
                    <HexColorPicker color={colors[activeIdx] || '#6C63FF'} onChange={updateColor} />
                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg" style={{ background: colors[activeIdx] }} />
                        <input
                            type="text"
                            value={colors[activeIdx] || ''}
                            onChange={e => updateColor(e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded-lg text-sm font-mono"
                            style={{
                                background: 'var(--briefing-bg)',
                                border: '1px solid var(--briefing-border)',
                                color: 'var(--briefing-text)',
                                fontSize: '14px',
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
