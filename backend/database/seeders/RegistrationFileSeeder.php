<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RegistrationFile;
use App\Models\User;

class RegistrationFileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mahasiswa = User::where('role', 'mahasiswa')->get();

        if ($mahasiswa->isEmpty()) {
            $this->command->warn('Pastikan sudah ada user dengan role mahasiswa sebelum menjalankan seeder ini.');
            return;
        }

        $fileTypes = ['proposal', 'hasil', 'kompre', 'kp'];
        $fileNames = [
            'proposal' => 'Proposal Tugas Akhir',
            'hasil' => 'Laporan Hasil Tugas Akhir',
            'kompre' => 'Laporan Komprehensif',
            'kp' => 'Laporan Kerja Praktek',
        ];

        foreach ($mahasiswa as $mhs) {
            // Setiap mahasiswa punya 2-3 berkas
            $numFiles = rand(2, 3);
            $selectedTypes = (array) array_rand(array_flip($fileTypes), $numFiles);
            
            foreach ($selectedTypes as $type) {
                $fileName = $fileNames[$type] . ' - ' . $mhs->name . '.pdf';
                
                RegistrationFile::create([
                    'user_id' => $mhs->id,
                    'type' => $type,
                    'filename' => $fileName,
                    'file_path' => 'files/registration/' . $mhs->id . '/' . str_replace(' ', '_', strtolower($type)) . '.pdf',
                ]);
            }
        }

        $this->command->info('Registration File seeder berhasil dijalankan!');
    }
}
