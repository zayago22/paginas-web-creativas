import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

export default function NavigationButtons({ onBack, onNext, isFirst, isLast, isLoading, nextLabel }) {
    return (
        <div
            className="sticky bottom-0 left-0 right-0 z-40 py-4 px-4"
            style={{ background: 'linear-gradient(to top, var(--briefing-bg) 70%, transparent)', backdropFilter: 'blur(4px)' }}
        >
            <div className="max-w-2xl mx-auto flex gap-3">
                {/* Botón Atrás (ghost) */}
                {!isFirst && (
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto"
                        style={{
                            border: '1.5px solid var(--briefing-border)',
                            color: 'var(--briefing-text-muted)',
                            background: 'transparent',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#6C63FF'; e.currentTarget.style.color = 'var(--briefing-text)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--briefing-border)'; e.currentTarget.style.color = 'var(--briefing-text-muted)'; }}
                    >
                        <ArrowLeft size={16} />
                        Atrás
                    </button>
                )}

                {/* Botón Siguiente / Enviar */}
                <button
                    type="button"
                    onClick={onNext}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200"
                    style={{
                        background: isLoading ? '#4a44b0' : '#6C63FF',
                        boxShadow: '0 4px 20px rgba(108,99,255,0.35)',
                    }}
                    onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = '#8B84FF'; }}
                    onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = '#6C63FF'; }}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Generando briefing...
                        </>
                    ) : (
                        <>
                            {nextLabel || (isLast ? 'Enviar Briefing' : 'Siguiente')}
                            {!isLast && <ArrowRight size={16} />}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
