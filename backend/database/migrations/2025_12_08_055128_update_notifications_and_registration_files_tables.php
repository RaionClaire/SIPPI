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
        // Update notifications table
        Schema::table('notifications', function (Blueprint $table) {
            $table->foreignId('announcement_id')->nullable()->change();
            $table->foreignId('registration_file_id')->nullable()->after('announcement_id')->constrained('registration_files')->onDelete('cascade');
            $table->enum('type', ['announcement', 'berkas_status'])->after('user_id')->default('announcement');
            $table->string('title')->after('type');
        });

        // Update registration_files table
        Schema::table('registration_files', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected'])->after('filename')->default('pending');
            $table->text('rejection_reason')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropForeign(['registration_file_id']);
            $table->dropColumn(['registration_file_id', 'type', 'title']);
        });

        Schema::table('registration_files', function (Blueprint $table) {
            $table->dropColumn(['status', 'rejection_reason']);
        });
    }
};
