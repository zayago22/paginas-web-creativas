/**
 * LazySection — renders children only when the section is ~200px from the viewport.
 * Works with React.lazy() + Suspense for true code splitting.
 *
 * Usage:
 *   const HeavySection = lazy(() => import('../Sections/HeavySection'));
 *   <LazySection component={HeavySection} someProps={...} />
 */
import { Suspense, lazy, useEffect, useRef, useState } from 'react';

export function LazySection({ component: Component, fallback = null, rootMargin = '200px 0px', ...props }) {
    const [shouldRender, setShouldRender] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Already visible or near viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={containerRef}>
            {shouldRender
                ? <Suspense fallback={fallback ?? <SectionSkeleton />}><Component {...props} /></Suspense>
                : (fallback ?? <SectionSkeleton />)
            }
        </div>
    );
}

// Minimal skeleton so layout doesn't shift while section loads
function SectionSkeleton() {
    return <div className="lazy-section-placeholder" aria-hidden="true" />;
}
