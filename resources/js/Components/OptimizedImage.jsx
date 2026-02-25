/**
 * OptimizedImage — responsive image with:
 * - lazy loading by default
 * - explicit width/height to prevent CLS
 * - <picture> + <source> so mobile gets a smaller srcset
 * - explicit alt text for accessibility
 *
 * Usage:
 *   <OptimizedImage
 *     src="/storage/projects/photo.jpg"
 *     alt="Proyecto XYZ"
 *     width={800} height={600}
 *     mobileWidth={400}
 *     className="rounded-xl object-cover"
 *   />
 *
 * If srcMobile is not provided, the component generates sizes srcset automatically.
 */
export default function OptimizedImage({
    src,
    srcMobile,
    alt,
    width = 800,
    height = 600,
    mobileWidth = 400,
    loading = 'lazy',
    className = '',
    style = {},
    ...rest
}) {
    if (!src) {
        return (
            <div
                className={`bg-[#141d2f] flex items-center justify-center text-[#64748b] text-xs ${className}`}
                style={{ width: '100%', aspectRatio: `${width}/${height}`, ...style }}
                aria-hidden="true"
            >
                <svg className="w-8 h-8 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
            </div>
        );
    }

    // If separate mobile src provided, use <picture>
    if (srcMobile && srcMobile !== src) {
        return (
            <picture>
                <source media="(max-width: 640px)" srcSet={srcMobile} width={mobileWidth} height={Math.round(mobileWidth * height / width)} />
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={loading}
                    decoding="async"
                    className={className}
                    style={style}
                    {...rest}
                />
            </picture>
        );
    }

    // Single src with srcset sizes hint for responsive display
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding="async"
            sizes={`(max-width: 640px) ${mobileWidth}px, ${width}px`}
            className={className}
            style={style}
            {...rest}
        />
    );
}
