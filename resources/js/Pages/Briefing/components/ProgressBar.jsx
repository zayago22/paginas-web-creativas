import ThemeToggle from '../../../Components/ThemeToggle';

// Barra de progreso — siempre visible arriba
export default function ProgressBar({ current, total }) {
    const pct = Math.round((current / total) * 100);
    return (
        <div
            className="fixed top-0 left-0 right-0 z-50"
            style={{ background: 'var(--briefing-card)', borderBottom: '1px solid var(--briefing-border)' }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Paso ${current} de ${total}`}
        >
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
                {/* Logo pequeño */}
                <a href="/" className="shrink-0 text-xs font-semibold" style={{ color: '#6C63FF', fontFamily: "'Syne', sans-serif" }}>
                    PWC
                </a>

                {/* Barra */}
                <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--briefing-border)' }}>
                    <div
                        className="h-1.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6C63FF 0%, #8B84FF 100%)' }}
                    />
                </div>

                {/* Contador */}
                <span className="shrink-0 text-xs font-medium" style={{ color: 'var(--briefing-text-muted)', minWidth: '50px', textAlign: 'right' }}>
                    {current} <span style={{ color: 'var(--briefing-border)' }}>/</span> <span style={{ color: '#6C63FF' }}>{total}</span>
                </span>

                {/* Theme toggle */}
                <ThemeToggle />
            </div>
        </div>
    );
}
