import { Head, Link } from '@inertiajs/react';
import { lazy, Suspense } from 'react';

// Dynamically import tool components
const toolComponents = {
    ImageCompressor: lazy(() => import('../../Components/Tools/ImageCompressor')),
    ImageEditor: lazy(() => import('../../Components/Tools/ImageEditor')),
    ImageResizer: lazy(() => import('../../Components/Tools/ImageResizer')),
    WebPConverter: lazy(() => import('../../Components/Tools/WebPConverter')),
    ColorExtractor: lazy(() => import('../../Components/Tools/ColorExtractor')),
    Watermark: lazy(() => import('../../Components/Tools/Watermark')),
    QRGenerator: lazy(() => import('../../Components/Tools/QRGenerator')),
    PDFCompressor: lazy(() => import('../../Components/Tools/PDFCompressor')),
    PDFMerge: lazy(() => import('../../Components/Tools/PDFMerge')),
    PDFSplit: lazy(() => import('../../Components/Tools/PDFSplit')),
    ImageToPDF: lazy(() => import('../../Components/Tools/ImageToPDF')),
    BackgroundRemover: lazy(() => import('../../Components/Tools/BackgroundRemover')),
    ImageCropper: lazy(() => import('../../Components/Tools/ImageCropper')),
    FaviconGenerator: lazy(() => import('../../Components/Tools/FaviconGenerator')),
    GradientGenerator: lazy(() => import('../../Components/Tools/GradientGenerator')),
    MetaTagGenerator: lazy(() => import('../../Components/Tools/MetaTagGenerator')),
    BoxShadowGenerator: lazy(() => import('../../Components/Tools/BoxShadowGenerator')),
    PasswordGenerator: lazy(() => import('../../Components/Tools/PasswordGenerator')),
    WhatsAppLinkGenerator: lazy(() => import('../../Components/Tools/WhatsAppLinkGenerator')),
};

export default function ToolShow({ tool }) {
    const ToolComponent = toolComponents[tool.component_file];

    return (
        <>
            <Head>
                <title>{tool.meta_title}</title>
                {tool.meta_description && <meta name="description" content={tool.meta_description} />}
            </Head>

            {/* Topbar */}
            <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/[0.06] bg-[#07090f]">
                <Link href="/" className="flex items-center gap-2.5 font-bold text-sm">
                    <img src="/images/logo.svg" alt="Páginas Web Creativas" className="h-14 w-auto" />
                </Link>
                <div className="text-sm font-semibold">{tool.icon} {tool.name}</div>
                <Link href="/herramientas" className="text-sm text-[#8899aa] hover:text-[#0090ff] transition">
                    ← Todas las herramientas
                </Link>
            </div>

            {/* Tool Content */}
            <div className="min-h-[calc(100vh-65px)]">
                {ToolComponent ? (
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-[60vh]">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-full border-2 border-[#0090ff] border-t-transparent animate-spin mx-auto mb-4" />
                                <p className="text-sm text-[#8899aa]">Cargando herramienta...</p>
                            </div>
                        </div>
                    }>
                        <ToolComponent />
                    </Suspense>
                ) : (
                    <div className="flex items-center justify-center h-[60vh] text-center">
                        <div>
                            <div className="text-5xl mb-4">🚧</div>
                            <h2 className="text-xl font-bold mb-2">Herramienta en desarrollo</h2>
                            <p className="text-sm text-[#8899aa]">Esta herramienta estará disponible próximamente.</p>
                            <Link href="/herramientas" className="inline-flex mt-6 px-6 py-2 rounded-full bg-[#0090ff] text-white text-sm font-semibold hover:shadow-lg transition">
                                Ver herramientas disponibles
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
