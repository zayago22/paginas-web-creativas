<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $exists = DB::table('tools')->where('slug', 'generador-link-whatsapp')->exists();
        if ($exists) return;

        $maxSort = DB::table('tools')->max('sort_order') ?? 18;

        DB::table('tools')->insert([
            'name'              => 'Generador de Link WhatsApp',
            'slug'              => 'generador-link-whatsapp',
            'description'       => 'Genera un enlace directo a WhatsApp con mensaje personalizado. Copia el link o el código HTML listo para tu web.',
            'short_description' => 'Genera enlaces directos de WhatsApp con mensaje personalizado.',
            'icon'              => '💬',
            'icon_bg_color'     => 'rgba(37, 211, 102, 0.1)',
            'category'          => 'utilidad',
            'component_file'    => 'WhatsAppLinkGenerator',
            'meta_title'        => 'Generador de Link de WhatsApp Gratis — Páginas Web Creativas',
            'meta_description'  => 'Crea enlaces directos de WhatsApp con mensaje predeterminado. Copia el link o el código HTML para tu web.',
            'status'            => 'active',
            'sort_order'        => $maxSort + 1,
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);
    }

    public function down(): void
    {
        DB::table('tools')->where('slug', 'generador-link-whatsapp')->delete();
    }
};
