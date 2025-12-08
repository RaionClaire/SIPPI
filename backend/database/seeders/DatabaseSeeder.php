<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed users first
        User::factory()->create([
            'name' => 'Admin SIPPI',
            'email' => 'admin@sippi.ac.id',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        User::factory()->create([
            'name' => 'Budi Santoso',
            'email' => 'budi@student.ac.id',
            'password' => bcrypt('password'),
            'role' => 'mahasiswa'
        ]);

        User::factory()->create([
            'name' => 'Siti Rahayu',
            'email' => 'siti@student.ac.id',
            'password' => bcrypt('password'),
            'role' => 'mahasiswa'
        ]);

        User::factory()->create([
            'name' => 'Andi Wijaya',
            'email' => 'andi@student.ac.id',
            'password' => bcrypt('password'),
            'role' => 'mahasiswa'
        ]);

        // Call other seeders
        $this->call([
            CategorySeeder::class,
            AnnouncementSeeder::class,
            RegistrationFileSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
