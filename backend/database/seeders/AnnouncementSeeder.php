<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Announcement;
use App\Models\Category;
use App\Models\User;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();
        $categories = Category::all();

        if (!$admin || $categories->isEmpty()) {
            $this->command->warn('Pastikan sudah ada user admin dan kategori sebelum menjalankan seeder ini.');
            return;
        }

        $announcements = [
            [
                'title' => 'Jadwal Ujian Akhir Semester Genap 2024/2025',
                'category_id' => $categories->where('name', 'Akademik')->first()->id ?? 1,
                'content' => 'Kepada seluruh mahasiswa Program Studi Teknik Informatika,

Dengan ini kami informasikan bahwa Ujian Akhir Semester (UAS) Genap Tahun Akademik 2024/2025 akan dilaksanakan pada:

Tanggal: 15 - 25 Juni 2025
Waktu: Sesuai jadwal masing-masing mata kuliah
Tempat: Ruang kuliah dan laboratorium yang telah ditentukan

Ketentuan:
1. Mahasiswa wajib hadir 15 menit sebelum ujian dimulai
2. Membawa kartu identitas mahasiswa (KTM)
3. Tidak diperkenankan membawa HP/gadget kecuali diizinkan dosen
4. Berpakaian rapi dan sopan

Jadwal lengkap dapat dilihat pada portal akademik masing-masing.

Demikian informasi ini disampaikan. Terima kasih.

Hormat kami,
Prodi Teknik Informatika',
                'author_id' => $admin->id,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Pembukaan Beasiswa Prestasi Akademik Semester Genap',
                'category_id' => $categories->where('name', 'Beasiswa')->first()->id ?? 2,
                'content' => 'Pengumuman untuk seluruh mahasiswa berprestasi!

Fakultas Teknik membuka pendaftaran Beasiswa Prestasi Akademik untuk semester genap tahun ini dengan ketentuan:

Persyaratan:
- IPK minimal 3.50
- Semester 3 atau lebih tinggi
- Tidak sedang menerima beasiswa lain
- Aktif dalam kegiatan organisasi/kemahasiswaan

Berkas yang diperlukan:
1. Fotocopy KTM
2. Transkrip nilai terakhir
3. Surat keterangan aktif organisasi
4. Surat pernyataan tidak menerima beasiswa lain
5. Fotocopy rekening bank

Pendaftaran:
Tanggal: 1 - 15 Januari 2025
Tempat: Bagian Kemahasiswaan Fakultas Teknik

Untuk informasi lebih lanjut, hubungi:
Email: beasiswa@ft.univ.ac.id
Telp: (021) 12345678

Segera daftarkan diri Anda!',
                'author_id' => $admin->id,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Kompetisi Pemrograman Tingkat Nasional 2025',
                'category_id' => $categories->where('name', 'Lomba')->first()->id ?? 3,
                'content' => 'Hai Mahasiswa Teknik Informatika!

Kami mengundang kalian untuk berpartisipasi dalam Kompetisi Pemrograman Nasional 2025 yang diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika.

Detail Acara:
Nama: National Programming Competition 2025
Tanggal: 20 Februari 2025
Tempat: Auditorium Utama Kampus
Kategori: Competitive Programming, Web Development, Mobile Apps

Hadiah Total: Rp 50.000.000,-
Juara 1: Rp 20.000.000,-
Juara 2: Rp 15.000.000,-
Juara 3: Rp 10.000.000,-
+ Sertifikat dan merchandise

Pendaftaran:
- Online: www.npc2025.id
- Batas: 10 Februari 2025
- Biaya: Rp 150.000,- per tim (3 orang)

Info lebih lanjut:
Instagram: @npc2025
Email: npc2025@gmail.com
WA: 0812-3456-7890

Jangan lewatkan kesempatan emas ini! Daftarkan tim kalian sekarang!',
                'author_id' => $admin->id,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Jadwal Seminar Proposal dan Hasil Bulan Januari 2025',
                'category_id' => $categories->where('name', 'Informasi Sidang')->first()->id ?? 4,
                'content' => 'Kepada mahasiswa yang akan mengikuti Seminar Proposal dan Seminar Hasil,

Berikut kami sampaikan jadwal sidang untuk bulan Januari 2025:

SEMINAR PROPOSAL
Gelombang 1: 8-10 Januari 2025
Gelombang 2: 22-24 Januari 2025

SEMINAR HASIL
Gelombang 1: 15-17 Januari 2025
Gelombang 2: 29-31 Januari 2025

Persyaratan Umum:
1. Sudah mengumpulkan draft proposal/laporan
2. Form persetujuan pembimbing
3. Bukti bimbingan minimal 8x
4. Bebas administrasi akademik

Pendaftaran:
- Dibuka 2 minggu sebelum pelaksanaan
- Melalui sistem informasi akademik
- Maksimal 50 peserta per gelombang

Catatan Penting:
- Wajib hadir tepat waktu
- Berpakaian formal (kemeja/blazer)
- Membawa hardcopy presentasi

Untuk informasi lebih lanjut, silakan hubungi koordinator TA:
Email: ta@informatika.univ.ac.id

Terima kasih atas perhatiannya.',
                'author_id' => $admin->id,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Pengumpulan Berkas KRS dan Herregistrasi Semester Genap',
                'category_id' => $categories->where('name', 'Administrasi')->first()->id ?? 5,
                'content' => 'Pemberitahuan untuk seluruh mahasiswa Prodi Teknik Informatika,

Dalam rangka persiapan semester genap 2024/2025, dimohon untuk melakukan herregistrasi dan pengumpulan berkas KRS dengan ketentuan sebagai berikut:

Jadwal Herregistrasi:
- Pembayaran UKT: 15 Desember 2024 - 10 Januari 2025
- Pengisian KRS Online: 2 - 15 Januari 2025
- Cetak KRS: 16 - 20 Januari 2025

Berkas yang dikumpulkan:
1. KRS yang sudah ditandatangani dosen wali
2. Bukti pembayaran UKT
3. Kartu Rencana Studi (KRS) rangkap 2
4. Surat keterangan aktif (jika diperlukan)

Tempat Pengumpulan:
Ruang Administrasi Prodi Teknik Informatika
Gedung B Lantai 2

Jam Layanan:
Senin - Jumat: 08.00 - 15.00 WIB

Sanksi Keterlambatan:
- Terlambat 1-7 hari: Denda Rp 50.000,-
- Terlambat >7 hari: Denda Rp 100.000,-

Mahasiswa yang tidak melakukan herregistrasi sampai batas waktu ditentukan dianggap cuti akademik.

Untuk pertanyaan lebih lanjut:
Telp: (021) 98765432
Email: admin@informatika.univ.ac.id

Demikian disampaikan, mohon kerjasamanya.',
                'author_id' => $admin->id,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Workshop Machine Learning dan AI - Daftar Sekarang!',
                'category_id' => $categories->where('name', 'Akademik')->first()->id ?? 1,
                'content' => 'Halo Mahasiswa Teknik Informatika!

Prodi mengadakan Workshop Machine Learning dan Artificial Intelligence untuk meningkatkan skill kalian di bidang teknologi terkini.

Detail Workshop:
Tema: "Introduction to Machine Learning and Deep Learning"
Pembicara: Dr. Ahmad Fauzi, M.Kom (Expert AI Engineer)
Tanggal: 25 Januari 2025
Waktu: 09.00 - 16.00 WIB
Tempat: Lab Komputer 3

Materi yang akan dipelajari:
- Fundamental Machine Learning
- Python for Data Science
- Neural Networks & Deep Learning
- Practical Project: Image Classification

Fasilitas:
✓ Sertifikat
✓ Modul pembelajaran
✓ Snack & lunch
✓ Free akses ke online course

Kuota: Terbatas 40 peserta
Biaya: GRATIS (Khusus mahasiswa TIF)

Pendaftaran:
Link: bit.ly/workshop-ml-2025
Batas: 20 Januari 2025

Buruan daftar sebelum kuota penuh!

Contact Person:
WA: 0856-7890-1234 (Rani)
IG: @hmtif.workshop',
                'author_id' => $admin->id,
                'status' => 'published',
                'published_at' => now(),
            ],
            [
                'title' => 'Beasiswa LPDP 2025 - Persiapkan Dokumenmu!',
                'category_id' => $categories->where('name', 'Beasiswa')->first()->id ?? 2,
                'content' => 'Kabar gembira untuk mahasiswa berprestasi!

LPDP membuka pendaftaran beasiswa untuk program magister dan doktoral dalam dan luar negeri tahun 2025.

Program yang tersedia:
- Beasiswa Magister Dalam Negeri
- Beasiswa Magister Luar Negeri
- Beasiswa Doktoral Dalam Negeri
- Beasiswa Doktoral Luar Negeri

Komponen Beasiswa:
✓ Dana pendidikan penuh
✓ Biaya hidup bulanan
✓ Biaya penelitian
✓ Biaya buku
✓ Tiket pesawat PP (untuk LN)
✓ Tunjangan keluarga (jika ada)

Persyaratan Umum:
- Warga Negara Indonesia
- IPK minimal 3.00 (S1) / 3.25 (S2 untuk S3)
- Usia maksimal 42 tahun
- LoA unconditional dari PT tujuan
- Skor TOEFL/IELTS sesuai ketentuan

Timeline:
Pendaftaran: 1 Februari - 31 Maret 2025
Seleksi Administrasi: April 2025
Seleksi Substansi: Mei - Juni 2025
Pengumuman: Juli 2025

Website resmi: www.lpdp.kemenkeu.go.id

Prodi akan mengadakan Bimbingan Teknis LPDP:
Tanggal: 28 Januari 2025
Waktu: 13.00 - 16.00 WIB
Tempat: Ruang Seminar

Info lengkap hubungi:
Email: beasiswa@informatika.univ.ac.id',
                'author_id' => $admin->id,
                'status' => 'draft',
            ],
        ];

        foreach ($announcements as $index => $announcement) {
            // Make first 2 announcements important
            $announcement['is_important'] = $index < 2;
            Announcement::create($announcement);
        }

        $this->command->info('Announcement seeder berhasil dijalankan!');
    }
}
