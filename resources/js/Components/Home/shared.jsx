/**
 * Shared helpers used by all Home page sections.
 * Isolated here so each lazy section doesn't duplicate them
 * and Vite can tree-shake unused exports.
 */
import { useEffect, useRef, useState } from 'react';

// ============================================
// REVEAL ON SCROLL HOOK
// ============================================
export function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // On low-end / small screens reveal instantly — skip animation cost
        const isMobileLow =
            window.innerWidth <= 640 ||
            (typeof navigator.hardwareConcurrency !== 'undefined' && navigator.hardwareConcurrency <= 4);

        if (isMobileLow) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

export function Reveal({ children, className = '', delay = 0 }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            data-reveal
            className={`transition-all duration-700 ease-out
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export function SectionLabel({ icon, text }) {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0090ff]/10 text-[#0090ff] border border-[#0090ff]/15 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0090ff] animate-pulse" />
            {text}
        </div>
    );
}

export function GradientText({ children }) {
    return (
        <span className="bg-gradient-to-r from-[#0090ff] via-[#00bfff] to-[#00e4b8] bg-clip-text text-transparent">
            {children}
        </span>
    );
}

export const CheckIcon = () => (
    <svg className="w-4 h-4 text-[#00e4b8] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
