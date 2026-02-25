import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport width is ≤ breakpoint (default 768px).
 * Uses matchMedia so it stays in sync on window resize.
 */
export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined'
            ? window.innerWidth <= breakpoint
            : false
    );

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const handler = (e) => setIsMobile(e.matches);
        // Set immediately in case SSR initial value was wrong
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [breakpoint]);

    return isMobile;
}
