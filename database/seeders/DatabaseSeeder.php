<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use App\Models\Tool;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // === ADMIN USER ===
        User::create([
            'name' => 'Alex Admin',
            'email' => 'admin@paginaswebcreativas.com',
            'password' => Hash::make('password'), // CAMBIAR EN PRODUCCIÓN
        ]);

        // === SERVICIOS ===
        Service::insert([
            [
                'name' => 'Presencia',
                'slug' => 'presencia',
                'description' => 'Presencia digital profesional que transmite confianza y genera contactos.',
                'short_description' => 'Ideal para profesionistas y negocios que necesitan presencia digital.',
                'icon' => '🌐',
                'price' => 8999,
                'price_label' => 'MXN',
                'price_period' => 'Pago único',
                'features' => json_encode([
                    'Diseño responsive personalizado',
                    'Hasta 5 secciones',
                    'SEO básico on-page',
                    'Formulario de contacto + WhatsApp',
                    'SSL + Hosting 1 año incluido',
                    'Google Analytics configurado',
                ]),
                'featured' => false,
                'is_active' => true,
                'sort_order' => 1,
                'cta_text' => 'Empezar Proyecto',
                'cta_url' => null,
                'badge' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Crecimiento',
                'slug' => 'crecimiento',
                'description' => 'Vende tus productos 24/7 con una tienda optimizada para conversiones.',
                'short_description' => 'Para negocios que quieren vender online.',
                'icon' => '🛒',
                'price' => 14999,
                'price_label' => 'MXN',
                'price_period' => 'Pago único',
                'features' => json_encode([
                    'Todo del plan Presencia',
                    'Tienda online completa',
                    'Pasarelas de pago (Stripe, PayPal)',
                    'Panel de administración',
                    'SEO avanzado + sitemap',
                    'Inventario y notificaciones',
                    'Soporte 3 meses incluido',
                ]),
                'featured' => true,
                'is_active' => true,
                'sort_order' => 2,
                'cta_text' => 'Empezar Proyecto',
                'cta_url' => null,
                'badge' => 'Más Popular',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Escala',
                'slug' => 'escala',
                'description' => 'Plataforma e-learning completa para vender cursos y gestionar alumnos.',
                'short_description' => 'Para academias y creadores de cursos online.',
                'icon' => '🎓',
                'price' => 19999,
                'price_label' => 'MXN',
                'price_period' => 'Pago único',
                'features' => json_encode([
                    'Todo del plan Crecimiento',
                    'Sistema de cursos + lecciones',
                    'Suscripciones recurrentes',
                    'Certificados automáticos',
                    'Área privada de alumnos',
                    'Reportes y analíticas',
                    'Soporte 6 meses incluido',
                ]),
                'featured' => false,
                'is_active' => true,
                'sort_order' => 3,
                'cta_text' => 'Empezar Proyecto',
                'cta_url' => null,
                'badge' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // === HERRAMIENTAS ===
        $tools = [
            // Imagen
            ['name' => 'Compresor de Imágenes', 'slug' => 'compresor-imagenes', 'description' => 'Reduce el peso de tus imágenes hasta un 90% sin perder calidad visible. Procesamiento por lotes incluido.', 'short_description' => 'Reduce el peso de tus fotos sin perder calidad', 'icon' => '🗜️', 'icon_bg_color' => 'rgba(108,92,231,.12)', 'category' => 'imagen', 'component_file' => 'ImageCompressor', 'status' => 'active', 'sort_order' => 1],
            ['name' => 'Editor de Imágenes', 'slug' => 'editor-imagenes', 'description' => 'Edita tus imágenes: recorta, rota, ajusta brillo, contraste, saturación y aplica filtros profesionales.', 'short_description' => 'Recorta, rota, ajusta y aplica filtros', 'icon' => '✏️', 'icon_bg_color' => 'rgba(0,144,255,.12)', 'category' => 'imagen', 'component_file' => 'ImageEditor', 'status' => 'active', 'sort_order' => 2],
            ['name' => 'Redimensionar Imágenes', 'slug' => 'redimensionar-imagenes', 'description' => 'Cambia el tamaño de tus imágenes manteniendo la proporción original.', 'short_description' => 'Cambia el tamaño manteniendo proporción', 'icon' => '📐', 'icon_bg_color' => 'rgba(72,219,251,.12)', 'category' => 'imagen', 'component_file' => 'ImageResizer', 'status' => 'active', 'sort_order' => 3],
            ['name' => 'Convertidor a WebP', 'slug' => 'convertir-webp', 'description' => 'Convierte tus imágenes JPG y PNG al formato WebP.', 'short_description' => 'Convierte JPG/PNG al formato más rápido', 'icon' => '🔄', 'icon_bg_color' => 'rgba(0,210,211,.12)', 'category' => 'imagen', 'component_file' => 'WebPConverter', 'status' => 'active', 'sort_order' => 4],
            ['name' => 'Extractor de Colores', 'slug' => 'extractor-colores', 'description' => 'Extrae la paleta de colores dominantes de cualquier imagen.', 'short_description' => 'Extrae paleta de colores de cualquier imagen', 'icon' => '🎨', 'icon_bg_color' => 'rgba(255,159,243,.12)', 'category' => 'imagen', 'component_file' => 'ColorExtractor', 'status' => 'active', 'sort_order' => 5],
            ['name' => 'Marca de Agua', 'slug' => 'marca-agua', 'description' => 'Protege tus fotos con marca de agua de texto personalizada.', 'short_description' => 'Protege tus imágenes con marca de agua', 'icon' => '💧', 'icon_bg_color' => 'rgba(0,228,184,.12)', 'category' => 'imagen', 'component_file' => 'Watermark', 'status' => 'active', 'sort_order' => 6],
            ['name' => 'Remover Fondo', 'slug' => 'remover-fondo', 'description' => 'Elimina el fondo de tus fotos con IA. Sin registro, gratis.', 'short_description' => 'Elimina el fondo con inteligencia artificial', 'icon' => '🪄', 'icon_bg_color' => 'rgba(0,228,184,.1)', 'category' => 'imagen', 'component_file' => 'BackgroundRemover', 'status' => 'active', 'sort_order' => 7, 'meta_title' => 'Remover Fondo de Imagen Online Gratis — Páginas Web Creativas', 'meta_description' => 'Elimina el fondo de tus imágenes con inteligencia artificial. 100% gratis, sin subir nada a un servidor.'],
            ['name' => 'Recortar Imagen', 'slug' => 'recortar-imagen', 'description' => 'Recorta tus imágenes con precisión. Aspect ratios, rotación y exportación en JPG, PNG o WEBP.', 'short_description' => 'Recorta con precisión. Aspect ratios, rotación y más.', 'icon' => '✂️', 'icon_bg_color' => 'rgba(72,219,251,.1)', 'category' => 'imagen', 'component_file' => 'ImageCropper', 'status' => 'active', 'sort_order' => 8, 'meta_title' => 'Recortar Imagen Online Gratis — Páginas Web Creativas', 'meta_description' => 'Recorta y ajusta tus imágenes gratis. Aspect ratios presets, rotación y exportación en JPG, PNG o WEBP.'],
            // PDF
            ['name' => 'Compresor de PDF', 'slug' => 'comprimir-pdf', 'description' => 'Reduce el tamaño de tus PDFs sin perder calidad. Procesamiento 100% en tu navegador.', 'short_description' => 'Reduce el tamaño de tus PDFs sin perder calidad. 100% en tu navegador.', 'icon' => '📄', 'icon_bg_color' => 'rgba(255,107,107,.1)', 'category' => 'pdf', 'component_file' => 'PDFCompressor', 'status' => 'active', 'sort_order' => 9, 'meta_title' => 'Comprimir PDF Online Gratis — Páginas Web Creativas', 'meta_description' => 'Comprime tus archivos PDF gratis y sin subir nada a un servidor. Procesamiento 100% en tu navegador.'],
            ['name' => 'Unir PDFs', 'slug' => 'unir-pdf', 'description' => 'Combina varios PDFs en uno solo. Arrastra para reordenar. Máx. 20 archivos.', 'short_description' => 'Combina varios PDFs en uno solo. Arrastra para reordenar.', 'icon' => '📎', 'icon_bg_color' => 'rgba(0,191,255,.1)', 'category' => 'pdf', 'component_file' => 'PDFMerge', 'status' => 'active', 'sort_order' => 10, 'meta_title' => 'Unir PDFs Online Gratis — Páginas Web Creativas', 'meta_description' => 'Combina múltiples archivos PDF en uno solo. Gratis, sin registro, 100% en tu navegador.'],
            ['name' => 'Dividir PDF', 'slug' => 'dividir-pdf', 'description' => 'Separa páginas de un PDF. Extrae solo las que necesitas o divide en partes.', 'short_description' => 'Separa páginas de un PDF. Extrae solo las que necesitas.', 'icon' => '✂️', 'icon_bg_color' => 'rgba(254,202,87,.1)', 'category' => 'pdf', 'component_file' => 'PDFSplit', 'status' => 'active', 'sort_order' => 11, 'meta_title' => 'Dividir PDF Online Gratis — Páginas Web Creativas', 'meta_description' => 'Divide y extrae páginas de tus PDFs gratis. Sin subir archivos a ningún servidor.'],
            ['name' => 'Imagen a PDF', 'slug' => 'imagen-a-pdf', 'description' => 'Convierte tus imágenes a un documento PDF. Ordénalas como quieras.', 'short_description' => 'Convierte tus imágenes a un documento PDF. Ordénalas como quieras.', 'icon' => '🖼️', 'icon_bg_color' => 'rgba(108,92,231,.1)', 'category' => 'pdf', 'component_file' => 'ImageToPDF', 'status' => 'active', 'sort_order' => 12, 'meta_title' => 'Convertir Imagen a PDF Online Gratis — Páginas Web Creativas', 'meta_description' => 'Convierte JPG, PNG y WEBP a PDF gratis. Combina varias imágenes en un solo documento.'],
            // Utilidad
            ['name' => 'Generador de QR', 'slug' => 'generador-qr', 'description' => 'Crea códigos QR personalizados para URLs, WhatsApp y redes sociales.', 'short_description' => 'Crea códigos QR personalizados', 'icon' => '📱', 'icon_bg_color' => 'rgba(254,202,87,.12)', 'category' => 'utilidad', 'component_file' => 'QRGenerator', 'status' => 'active', 'sort_order' => 13],
            ['name' => 'Generador de Favicon', 'slug' => 'generador-favicon', 'description' => 'Genera todos los favicons para tu web desde una sola imagen. ZIP con todos los tamaños y site.webmanifest.', 'short_description' => 'Genera todos los favicons para tu web desde una sola imagen.', 'icon' => '⭐', 'icon_bg_color' => 'rgba(254,202,87,.1)', 'category' => 'utilidad', 'component_file' => 'FaviconGenerator', 'status' => 'active', 'sort_order' => 14, 'meta_title' => 'Generador de Favicon Online Gratis — Páginas Web Creativas', 'meta_description' => 'Genera favicon.ico, apple-touch-icon y todos los tamaños necesarios. Gratis y al instante.'],
            ['name' => 'Generador de Gradientes', 'slug' => 'generador-gradientes-css', 'description' => 'Crea gradientes CSS lineales, radiales y cónicos. Preview en tiempo real y código listo para copiar.', 'short_description' => 'Crea gradientes CSS perfectos. Copia el código listo para usar.', 'icon' => '🎨', 'icon_bg_color' => 'rgba(108,92,231,.1)', 'category' => 'utilidad', 'component_file' => 'GradientGenerator', 'status' => 'active', 'sort_order' => 15, 'meta_title' => 'Generador de Gradientes CSS Online — Páginas Web Creativas', 'meta_description' => 'Crea gradientes CSS lineales, radiales y cónicos. Preview en tiempo real y código listo para copiar.'],
            ['name' => 'Generador de Meta Tags', 'slug' => 'generador-meta-tags', 'description' => 'Genera todas las meta tags HTML para SEO y redes sociales. Preview en tiempo real.', 'short_description' => 'Genera meta tags y Open Graph para SEO. Preview de Google, Facebook y Twitter.', 'icon' => '🏷️', 'icon_bg_color' => 'rgba(0,144,255,.1)', 'category' => 'utilidad', 'component_file' => 'MetaTagGenerator', 'status' => 'active', 'sort_order' => 16, 'meta_title' => 'Generador de Meta Tags y Open Graph Gratis — Páginas Web Creativas', 'meta_description' => 'Genera todas las meta tags HTML para SEO y redes sociales. Preview en tiempo real.'],
            ['name' => 'Generador de Box Shadow', 'slug' => 'generador-box-shadow', 'description' => 'Crea box-shadows CSS con controles visuales y preview en tiempo real.', 'short_description' => 'Diseña sombras CSS perfectas con preview en vivo.', 'icon' => '📐', 'icon_bg_color' => 'rgba(72,219,251,.1)', 'category' => 'utilidad', 'component_file' => 'BoxShadowGenerator', 'status' => 'active', 'sort_order' => 17, 'meta_title' => 'Generador de Box Shadow CSS Online — Páginas Web Creativas', 'meta_description' => 'Crea box-shadows CSS con controles visuales y preview en tiempo real.'],
            ['name' => 'Generador de Contraseñas', 'slug' => 'generador-contrasenas', 'description' => 'Genera contraseñas seguras con cripto-aleatoriedad real. Indicador de fortaleza incluido.', 'short_description' => 'Genera contraseñas seguras al instante. Cripto-aleatoriedad real.', 'icon' => '🔐', 'icon_bg_color' => 'rgba(0,228,184,.1)', 'category' => 'utilidad', 'component_file' => 'PasswordGenerator', 'status' => 'active', 'sort_order' => 18, 'meta_title' => 'Generador de Contraseñas Seguras Online — Páginas Web Creativas', 'meta_description' => 'Genera contraseñas fuertes y seguras con verdadera aleatoriedad criptográfica. Gratis.'],
        ];

        foreach ($tools as $tool) {
            Tool::create($tool);
        }

        // === TESTIMONIOS (ejemplo — reemplazar con los reales) ===
        Testimonial::insert([
            [
                'client_name' => 'María Rodríguez',
                'client_role' => 'Consultora de Negocios',
                'client_company' => null,
                'client_avatar' => null,
                'content' => 'Superaron mis expectativas. Mi página web no solo se ve increíble, sino que ya está generando contactos de clientes nuevos cada semana.',
                'rating' => 5,
                'project_id' => null,
                'featured' => true,
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_name' => 'Carlos López',
                'client_role' => 'Dueño de e-commerce',
                'client_company' => null,
                'client_avatar' => null,
                'content' => 'Invertí en mi tienda online y en el primer mes ya recuperé la inversión. El proceso fue rápido y siempre estuvieron disponibles.',
                'rating' => 5,
                'project_id' => null,
                'featured' => true,
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_name' => 'Ana Fernández',
                'client_role' => 'Instructora Online',
                'client_company' => null,
                'client_avatar' => null,
                'content' => 'Necesitaba una plataforma para vender mis cursos y me entregaron exactamente lo que imaginé. Profesionales al 100%.',
                'rating' => 5,
                'project_id' => null,
                'featured' => true,
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // === BLOG POSTS (SEO target) ===
        BlogPost::insert([
            [
                'title' => '¿Cuánto cuesta una página web en México en 2026?',
                'slug' => 'cuanto-cuesta-pagina-web-mexico-2026',
                'excerpt' => 'Desglosamos los precios reales del diseño web profesional en México. Desde opciones económicas hasta proyectos enterprise.',
                'content' => '<h2>Precios de páginas web en México</h2><p>El costo de una página web en México varía significativamente dependiendo del tipo de proyecto...</p>',
                'featured_image' => null,
                'category' => 'precios',
                'tags' => json_encode(['precios', 'México', 'diseño web']),
                'meta_title' => '¿Cuánto cuesta una página web en México? Precios 2026',
                'meta_description' => 'Conoce los precios reales de diseño web profesional en México 2026. Comparativa de opciones desde $5,000 hasta $50,000+ MXN.',
                'reading_time' => '5 min',
                'user_id' => 1,
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'views' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'WordPress vs Laravel: ¿Cuál elegir para tu proyecto?',
                'slug' => 'wordpress-vs-laravel-cual-elegir',
                'excerpt' => 'Comparativa honesta entre WordPress y Laravel. Ventajas, desventajas y en qué casos conviene cada uno.',
                'content' => '<h2>WordPress vs Laravel</h2><p>Esta es una de las preguntas más frecuentes que recibimos...</p>',
                'featured_image' => null,
                'category' => 'tecnologia',
                'tags' => json_encode(['WordPress', 'Laravel', 'desarrollo web']),
                'meta_title' => 'WordPress vs Laravel 2026: Comparativa completa',
                'meta_description' => 'WordPress vs Laravel: descubre cuál es mejor para tu proyecto web. Comparativa actualizada con pros, contras y casos de uso.',
                'reading_time' => '7 min',
                'user_id' => 1,
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'views' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => '¿Por qué tu web no genera clientes? 5 errores comunes',
                'slug' => 'por-que-tu-web-no-genera-clientes',
                'excerpt' => 'Si tu página web no convierte visitantes en clientes, probablemente cometes alguno de estos errores.',
                'content' => '<h2>5 razones por las que tu web no convierte</h2><p>Tener una página web es solo el primer paso...</p>',
                'featured_image' => null,
                'category' => 'estrategia',
                'tags' => json_encode(['conversiones', 'estrategia', 'SEO']),
                'meta_title' => '5 razones por las que tu página web no genera clientes',
                'meta_description' => 'Descubre los 5 errores más comunes que evitan que tu página web genere clientes y cómo solucionarlos.',
                'reading_time' => '4 min',
                'user_id' => 1,
                'status' => 'published',
                'published_at' => now()->subDays(15),
                'views' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // === PROYECTOS (placeholder — reemplazar con los reales) ===
        $projectCategories = ['web', 'ecommerce', 'elearning', 'landing', 'web', 'app'];
        for ($i = 1; $i <= 6; $i++) {
            Project::create([
                'title' => "Proyecto Cliente {$i}",
                'slug' => "proyecto-cliente-{$i}",
                'description' => "Descripción del proyecto {$i}. Reemplazar con información real del proyecto.",
                'category' => $projectCategories[$i - 1],
                'featured' => true,
                'is_active' => true,
                'sort_order' => $i,
                'completed_at' => now()->subMonths($i),
            ]);
        }
    }
}
