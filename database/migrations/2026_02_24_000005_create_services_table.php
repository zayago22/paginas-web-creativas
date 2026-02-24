<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Presencia, Crecimiento, Escala
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->string('icon')->nullable(); // emoji o icon class
            $table->decimal('price', 10, 2);
            $table->string('price_label')->default('MXN'); // MXN, USD
            $table->string('price_period')->default('Pago único');
            $table->json('features'); // ["Diseño responsive", "SEO básico", ...]
            $table->boolean('featured')->default(false); // plan destacado
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('cta_text')->default('Empezar Proyecto');
            $table->string('cta_url')->nullable(); // WhatsApp link
            $table->string('badge')->nullable(); // "Más Popular"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
