<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description');
            $table->string('icon'); // emoji
            $table->string('icon_bg_color')->default('rgba(0,144,255,.12)');
            $table->string('category')->default('imagen'); // imagen, utilidad, pdf
            $table->string('component_file'); // nombre del archivo HTML/React
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->json('keywords')->nullable(); // para SEO
            $table->enum('status', ['active', 'coming_soon', 'beta'])->default('active');
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->integer('usage_count')->default(0); // tracking de uso
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tools');
    }
};
