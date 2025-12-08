<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrained('users');
            $table->foreignId('category_id')->constrained('categories');
            $table->string('title');
            $table->text('content');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('is_important')->default(false);
            $table->dateTime('published_at')->nullable();
            $table->dateTime('archived_at')->nullable();
            $table->foreignId('archived_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
