<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_role')->nullable(); // "Dueño de e-commerce"
            $table->string('client_company')->nullable();
            $table->string('client_avatar')->nullable();
            $table->text('content');
            $table->tinyInteger('rating')->default(5); // 1-5
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
