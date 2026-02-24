<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt'); // resumen corto
            $table->longText('content'); // contenido completo (HTML/Markdown)
            $table->string('featured_image')->nullable();
            $table->string('category'); // precios, tecnologia, estrategia, seo, diseno
            $table->json('tags')->nullable(); // ["SEO", "Laravel", "México"]
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('reading_time')->nullable(); // "5 min"
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('status', ['draft', 'published', 'scheduled'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->integer('views')->default(0);
            $table->timestamps();

            $table->index(['status', 'published_at']);
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
