import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="relative group">
            <button
                onClick={toggleTheme}
                role="switch"
                aria-checked={isDark}
                aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className={[
                    'relative w-11 h-11 rounded-full flex items-center justify-center no-transition-on-load',
                    'transition-all duration-300 ease-in-out',
                    'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0090ff] focus-visible:outline-offset-2',
                    isDark
                        ? 'bg-[#1e293b] shadow-[0_0_14px_rgba(234,179,8,0.2)] hover:shadow-[0_0_22px_rgba(234,179,8,0.4)]'
                        : 'bg-[#f0f4f8] border border-[#e2e8f0] hover:bg-[#e2eaf4]',
                ].join(' ')}
            >
                <span
                    className="text-[1.1rem] select-none pointer-events-none"
                    style={{
                        display: 'inline-block',
                        transition: 'transform 300ms ease',
                        transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-20deg) scale(0.88)',
                    }}
                >
                    {isDark ? '☀️' : '🌙'}
                </span>
            </button>

            {/* Tooltip */}
            <span
                role="tooltip"
                className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-[#1e293b] text-[#f1f5f9] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl z-50"
            >
                {isDark ? 'Modo claro' : 'Modo oscuro'}
            </span>
        </div>
    );
}
