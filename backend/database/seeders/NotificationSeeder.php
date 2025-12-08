<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;
use App\Models\User;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $announcements = \App\Models\Announcement::all();

        if ($users->isEmpty() || $announcements->isEmpty()) {
            $this->command->warn('Pastikan sudah ada user dan announcements sebelum menjalankan seeder ini.');
            return;
        }

        $messages = [
            'Pengumuman baru telah dipublikasikan. Silakan cek halaman pengumuman untuk detail lengkap.',
            'Ada pengumuman penting untuk Anda. Klik untuk melihat detail.',
            'Pengumuman terbaru tersedia. Jangan lewatkan informasi penting ini!',
            'Informasi baru telah ditambahkan. Segera baca pengumuman ini.',
        ];

        foreach ($users as $user) {
            // Setiap user dapat 3-5 notifikasi
            $numNotifications = rand(3, 5);
            $selectedAnnouncements = $announcements->random(min($numNotifications, $announcements->count()));
            
            foreach ($selectedAnnouncements as $announcement) {
                $isRead = rand(0, 10) > 3; // 70% notifikasi sudah dibaca
                $message = $messages[array_rand($messages)];
                
                Notification::create([
                    'user_id' => $user->id,
                    'announcement_id' => $announcement->id,
                    'message' => $message,
                    'is_read' => $isRead,
                    'created_at' => now()->subDays(rand(1, 20)),
                ]);
            }
        }

        $this->command->info('Notification seeder berhasil dijalankan!');
    }
}
