<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $existingSlugs = DB::table('tools')->pluck('slug')->toArray();

        $newTools = [
            // Imagen
            [
                'name' => 'Remover Fondo',
                'slug' => 'remover-fondo',
                'description' => 'Elimina el fondo de tus fotos con IA. Sin registro, gratis.',
                'short_description' => 'Elimina el fondo con inteligencia artificial',
                'icon' => '🪄',
                'icon_bg_color' => 'rgba(0,228,184,.1)',
                'category' => 'imagen',
                'component_file' => 'BackgroundRemover',
                'meta_title' => 'Remover Fondo de Imagen Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Elimina el fondo de tus imágenes con inteligencia artificial. 100% gratis, sin subir nada a un servidor.',
                'status' => 'active',
                'sort_order' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Recortar Imagen',
                'slug' => 'recortar-imagen',
                'description' => 'Recorta tus imágenes con precisión. Aspect ratios, rotación y exportación en JPG, PNG o WEBP.',
                'short_description' => 'Recorta con precisión. Aspect ratios, rotación y más.',
                'icon' => '✂️',
                'icon_bg_color' => 'rgba(72,219,251,.1)',
                'category' => 'imagen',
                'component_file' => 'ImageCropper',
                'meta_title' => 'Recortar Imagen Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Recorta y ajusta tus imágenes gratis. Aspect ratios presets, rotación y exportación en JPG, PNG o WEBP.',
                'status' => 'active',
                'sort_order' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // PDF
            [
                'name' => 'Compresor de PDF',
                'slug' => 'comprimir-pdf',
                'description' => 'Reduce el tamaño de tus PDFs sin perder calidad. Procesamiento 100% en tu navegador.',
                'short_description' => 'Reduce el tamaño de tus PDFs sin perder calidad. 100% en tu navegador.',
                'icon' => '📄',
                'icon_bg_color' => 'rgba(255,107,107,.1)',
                'category' => 'pdf',
                'component_file' => 'PDFCompressor',
                'meta_title' => 'Comprimir PDF Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Comprime tus archivos PDF gratis y sin subir nada a un servidor. Procesamiento 100% en tu navegador.',
                'status' => 'active',
                'sort_order' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Unir PDFs',
                'slug' => 'unir-pdf',
                'description' => 'Combina varios PDFs en uno solo. Arrastra para reordenar. Máx. 20 archivos.',
                'short_description' => 'Combina varios PDFs en uno solo. Arrastra para reordenar.',
                'icon' => '📎',
                'icon_bg_color' => 'rgba(0,191,255,.1)',
                'category' => 'pdf',
                'component_file' => 'PDFMerge',
                'meta_title' => 'Unir PDFs Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Combina múltiples archivos PDF en uno solo. Gratis, sin registro, 100% en tu navegador.',
                'status' => 'active',
                'sort_order' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dividir PDF',
                'slug' => 'dividir-pdf',
                'description' => 'Separa páginas de un PDF. Extrae solo las que necesitas o divide en partes.',
                'short_description' => 'Separa páginas de un PDF. Extrae solo las que necesitas.',
                'icon' => '✂️',
                'icon_bg_color' => 'rgba(254,202,87,.1)',
                'category' => 'pdf',
                'component_file' => 'PDFSplit',
                'meta_title' => 'Dividir PDF Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Divide y extrae páginas de tus PDFs gratis. Sin subir archivos a ningún servidor.',
                'status' => 'active',
                'sort_order' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Imagen a PDF',
                'slug' => 'imagen-a-pdf',
                'description' => 'Convierte tus imágenes a un documento PDF. Ordénalas como quieras.',
                'short_description' => 'Convierte tus imágenes a un documento PDF. Ordénalas como quieras.',
                'icon' => '🖼️',
                'icon_bg_color' => 'rgba(108,92,231,.1)',
                'category' => 'pdf',
                'component_file' => 'ImageToPDF',
                'meta_title' => 'Convertir Imagen a PDF Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Convierte JPG, PNG y WEBP a PDF gratis. Combina varias imágenes en un solo documento.',
                'status' => 'active',
                'sort_order' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Utilidad
            [
                'name' => 'Generador de Favicon',
                'slug' => 'generador-favicon',
                'description' => 'Genera todos los favicons para tu web desde una sola imagen. ZIP con todos los tamaños y site.webmanifest.',
                'short_description' => 'Genera todos los favicons para tu web desde una sola imagen.',
                'icon' => '⭐',
                'icon_bg_color' => 'rgba(254,202,87,.1)',
                'category' => 'utilidad',
                'component_file' => 'FaviconGenerator',
                'meta_title' => 'Generador de Favicon Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Genera favicon.ico, apple-touch-icon y todos los tamaños necesarios. Gratis y al instante.',
                'status' => 'active',
                'sort_order' => 14,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Generador de Gradientes',
                'slug' => 'generador-gradientes-css',
                'description' => 'Crea gradientes CSS lineales, radiales y cónicos. Preview en tiempo real y código listo para copiar.',
                'short_description' => 'Crea gradientes CSS perfectos. Copia el código listo para usar.',
                'icon' => '🎨',
                'icon_bg_color' => 'rgba(108,92,231,.1)',
                'category' => 'utilidad',
                'component_file' => 'GradientGenerator',
                'meta_title' => 'Generador de Gradientes CSS Online — Páginas Web Creativas',
                'meta_description' => 'Crea gradientes CSS lineales, radiales y cónicos. Preview en tiempo real y código listo para copiar.',
                'status' => 'active',
                'sort_order' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Generador de Meta Tags',
                'slug' => 'generador-meta-tags',
                'description' => 'Genera todas las meta tags HTML para SEO y redes sociales. Preview en tiempo real.',
                'short_description' => 'Genera meta tags y Open Graph para SEO. Preview de Google, Facebook y Twitter.',
                'icon' => '🏷️',
                'icon_bg_color' => 'rgba(0,144,255,.1)',
                'category' => 'utilidad',
                'component_file' => 'MetaTagGenerator',
                'meta_title' => 'Generador de Meta Tags y Open Graph Gratis — Páginas Web Creativas',
                'meta_description' => 'Genera todas las meta tags HTML para SEO y redes sociales. Preview en tiempo real.',
                'status' => 'active',
                'sort_order' => 16,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Generador de Box Shadow',
                'slug' => 'generador-box-shadow',
                'description' => 'Crea box-shadows CSS con controles visuales y preview en tiempo real.',
                'short_description' => 'Diseña sombras CSS perfectas con preview en vivo.',
                'icon' => '📐',
                'icon_bg_color' => 'rgba(72,219,251,.1)',
                'category' => 'utilidad',
                'component_file' => 'BoxShadowGenerator',
                'meta_title' => 'Generador de Box Shadow CSS Online — Páginas Web Creativas',
                'meta_description' => 'Crea box-shadows CSS con controles visuales y preview en tiempo real.',
                'status' => 'active',
                'sort_order' => 17,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Generador de Contraseñas',
                'slug' => 'generador-contrasenas',
                'description' => 'Genera contraseñas seguras con cripto-aleatoriedad real. Indicador de fortaleza incluido.',
                'short_description' => 'Genera contraseñas seguras al instante. Cripto-aleatoriedad real.',
                'icon' => '🔐',
                'icon_bg_color' => 'rgba(0,228,184,.1)',
                'category' => 'utilidad',
                'component_file' => 'PasswordGenerator',
                'meta_title' => 'Generador de Contraseñas Seguras Online — Páginas Web Creativas',
                'meta_description' => 'Genera contraseñas fuertes y seguras con verdadera aleatoriedad criptográfica. Gratis.',
                'status' => 'active',
                'sort_order' => 18,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($newTools as $tool) {
            if (!in_array($tool['slug'], $existingSlugs)) {
                DB::table('tools')->insert($tool);
            }
        }

        // Update existing BackgroundRemover from coming_soon to active
        DB::table('tools')
            ->where('slug', 'remover-fondo')
            ->update([
                'status' => 'active',
                'component_file' => 'BackgroundRemover',
                'icon_bg_color' => 'rgba(0,228,184,.1)',
                'meta_title' => 'Remover Fondo de Imagen Online Gratis — Páginas Web Creativas',
                'meta_description' => 'Elimina el fondo de tus imágenes con inteligencia artificial. 100% gratis, sin subir nada a un servidor.',
                'updated_at' => now(),
            ]);
    }

    public function down(): void
    {
        $slugs = [
            'remover-fondo', 'recortar-imagen', 'comprimir-pdf', 'unir-pdf',
            'dividir-pdf', 'imagen-a-pdf', 'generador-favicon',
            'generador-gradientes-css', 'generador-meta-tags',
            'generador-box-shadow', 'generador-contrasenas',
        ];
        DB::table('tools')->whereIn('slug', $slugs)->delete();
    }
};
