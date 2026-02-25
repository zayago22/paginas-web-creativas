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
            'name' => 'Admin',
            'email' => 'contacto@paginaswebcreativas.com',
            'password' => Hash::make('Clave2230!'),
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
            ['name' => 'Compresor de Imágenes', 'slug' => 'compresor-imagenes', 'description' => 'Reduce el peso de tus imágenes hasta un 90% sin perder calidad visible. Procesamiento por lotes incluido.', 'short_description' => 'Reduce el peso de tus fotos sin perder calidad', 'icon' => '🗜️', 'icon_bg_color' => 'rgba(108,92,231,.12)', 'category' => 'imagen', 'component_file' => 'ImageCompressor', 'status' => 'active', 'sort_order' => 1],
            ['name' => 'Editor de Imágenes', 'slug' => 'editor-imagenes', 'description' => 'Edita tus imágenes: recorta, rota, ajusta brillo, contraste, saturación y aplica filtros profesionales.', 'short_description' => 'Recorta, rota, ajusta y aplica filtros', 'icon' => '✂️', 'icon_bg_color' => 'rgba(0,144,255,.12)', 'category' => 'imagen', 'component_file' => 'ImageEditor', 'status' => 'active', 'sort_order' => 2],
            ['name' => 'Redimensionar Imágenes', 'slug' => 'redimensionar-imagenes', 'description' => 'Cambia el tamaño de tus imágenes manteniendo la proporción original.', 'short_description' => 'Cambia el tamaño manteniendo proporción', 'icon' => '📐', 'icon_bg_color' => 'rgba(72,219,251,.12)', 'category' => 'imagen', 'component_file' => 'ImageResizer', 'status' => 'active', 'sort_order' => 3],
            ['name' => 'Convertidor a WebP', 'slug' => 'convertir-webp', 'description' => 'Convierte tus imágenes JPG y PNG al formato WebP.', 'short_description' => 'Convierte JPG/PNG al formato más rápido', 'icon' => '🔄', 'icon_bg_color' => 'rgba(0,210,211,.12)', 'category' => 'imagen', 'component_file' => 'WebPConverter', 'status' => 'active', 'sort_order' => 4],
            ['name' => 'Extractor de Colores', 'slug' => 'extractor-colores', 'description' => 'Extrae la paleta de colores dominantes de cualquier imagen.', 'short_description' => 'Extrae paleta de colores de cualquier imagen', 'icon' => '🎨', 'icon_bg_color' => 'rgba(255,159,243,.12)', 'category' => 'imagen', 'component_file' => 'ColorExtractor', 'status' => 'active', 'sort_order' => 5],
            ['name' => 'Marca de Agua', 'slug' => 'marca-agua', 'description' => 'Protege tus fotos con marca de agua de texto personalizada.', 'short_description' => 'Protege tus imágenes con marca de agua', 'icon' => '💧', 'icon_bg_color' => 'rgba(0,228,184,.12)', 'category' => 'imagen', 'component_file' => 'Watermark', 'status' => 'active', 'sort_order' => 6],
            ['name' => 'Generador de QR', 'slug' => 'generador-qr', 'description' => 'Crea códigos QR personalizados para URLs, WhatsApp y redes sociales.', 'short_description' => 'Crea códigos QR personalizados', 'icon' => '📱', 'icon_bg_color' => 'rgba(254,202,87,.12)', 'category' => 'utilidad', 'component_file' => 'QRGenerator', 'status' => 'active', 'sort_order' => 7],
            ['name' => 'Remover Fondo', 'slug' => 'remover-fondo', 'description' => 'Elimina el fondo de tus fotos con IA.', 'short_description' => 'Elimina fondo con inteligencia artificial', 'icon' => '🪄', 'icon_bg_color' => 'rgba(124,92,252,.12)', 'category' => 'imagen', 'component_file' => 'BackgroundRemover', 'status' => 'coming_soon', 'sort_order' => 8],
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
