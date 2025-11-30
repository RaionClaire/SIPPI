export const mockAnnouncements = [
  {
    id: 1,
    title: 'Pengumuman Jadwal Ujian Akhir Semester Ganjil 2024/2025',
    category: 'Akademik',
    status: 'Penting',
    date: '20 November 2025',
    author: 'Admin Prodi',
    excerpt: 'Kepada seluruh mahasiswa Prodi Informatika, Dengan ini diumumkan bahwa jadwal ujian akhir semester genap tahun akademik 2024/2025 akan...',
    content: `Kepada seluruh mahasiswa Prodi Informatika,

Dengan ini diumumkan bahwa jadwal ujian akhir semester genap tahun akademik 2024/2025 akan dilaksanakan mulai tanggal 15 Desember 2025.

Untuk jadwal lengkap setiap mata kuliah akan diinformasikan melalui portal akademik paling lambat tanggal 1 Desember 2025. Harap semua mahasiswa mempersiapkan diri dengan baik. Apabila ada pertanyaan, silakan menghubungi bagian akademik. Terima kasih atas perhatiannya.`,
    comments: [
      { id: 1, author: 'Raka', date: '21 November 2025', text: 'Terima kasih atas informasinya.' },
      { id: 2, author: 'Caca', date: '22 November 2025', text: 'Terima kasih atas informasinya.' }
    ]
  },
  {
    id: 2,
    title: 'Workshop: Introduction to Machine Learning',
    category: 'Kegiatan',
    status: null,
    date: '17 November 2025',
    author: 'Admin Prodi',
    excerpt: 'Prodi Informatika akan mengadakan workshop dasar terkait Machine Learning. Workshop ini terbuka untuk semua mahasiswa dan akan diadakan pada tanggal 6 Desember 2025 di ruang...',
    content: 'Prodi Informatika akan mengadakan workshop dasar terkait Machine Learning. Workshop ini terbuka untuk semua mahasiswa dan akan diadakan pada tanggal 6 Desember 2025 di ruang laboratorium komputer.'
  },
  {
    id: 3,
    title: 'Pendaftaran Beasiswa Prestasi Tahun Ini Dibuka',
    category: 'Beasiswa',
    status: null,
    date: '10 November 2025',
    author: 'Admin Prodi',
    excerpt: 'Informasi untuk mahasiswa berprestasi, pendaftaran beasiswa prestasi untuk semester ini akan segera dibuka. Silahkan mengajukan berkas persyaratan ke admin prodi sebelum tanggal...',
    content: 'Informasi untuk mahasiswa berprestasi, pendaftaran beasiswa prestasi untuk semester ini akan segera dibuka. Silahkan mengajukan berkas persyaratan ke admin prodi sebelum tanggal 30 November 2025.'
  }
];

export const mockCategories = [
  { name: 'Akademik', count: 2 },
  { name: 'Beasiswa', count: 1 },
  { name: 'Kegiatan', count: 4 }
];

export const mockDocuments = {
  'seminar-proposal': [
    { id: 1, name: 'Kartu Kendali Bimbingan', description: 'Kartu untuk mencatat progres bimbingan dengan dosen pembimbing', type: 'PDF', size: '245 KB' },
    { id: 2, name: 'Lembar Persetujuan Pembimbing', description: 'Lembar persetujuan yang harus ditandatangani oleh dosen pembimbing', type: 'PDF', size: '200 KB' },
    { id: 3, name: 'Lembar Pengesahan', description: 'Lembar pengesahan yang harus ditandatangani oleh dosen pembimbing dan juga kaprodi', type: 'DOCX', size: '195 KB' }
  ],
  'seminar-hasil': [
    { id: 4, name: 'Kartu Kendali Bimbingan', description: 'Kartu untuk mencatat progres bimbingan dengan dosen pembimbing', type: 'PDF', size: '245 KB' },
    { id: 5, name: 'Lembar Persetujuan Pembimbing', description: 'Lembar persetujuan yang harus ditandatangani oleh dosen pembimbing', type: 'PDF', size: '200 KB' },
    { id: 6, name: 'Lembar Pengesahan', description: 'Lembar pengesahan yang harus ditandatangani oleh dosen pembimbing dan juga kaprodi', type: 'DOCX', size: '195 KB' }
  ],
  'seminar-kompre': [
    { id: 7, name: 'Form Berita Acara', description: 'Form berisi daftar nilai yang akan diisi oleh pembimbing dan penguji', type: 'PDF', size: '245 KB' },
    { id: 8, name: 'Formulir Bebas Tanggungan', description: 'Formulir bebas tanggungan perpustakaan dan laboratorium', type: 'PDF', size: '200 KB' },
    { id: 9, name: 'Lembar Pengesahan', description: 'Lembar pengesahan yang harus ditandatangani oleh dosen pembimbing dan juga kaprodi', type: 'DOCX', size: '195 KB' }
  ],
  'kerja-praktik': [
    { id: 10, name: 'Form Berita Acara', description: 'Form berisi daftar nilai yang akan diisi oleh pembimbing dan penguji', type: 'PDF', size: '245 KB' },
    { id: 11, name: 'Surat Pengantar Kerja Praktik', description: 'Template surat pengantar dari kampus ke perusahaan', type: 'PDF', size: '200 KB' },
    { id: 12, name: 'Kartu Kendali KP', description: 'Kartu kendali aktivitas selama kerja praktik', type: 'DOCX', size: '195 KB' }
  ],
  'administrasi-lainnya': [
    { id: 13, name: 'Surat Keterangan Mahasiswa Aktif', description: 'Template surat keterangan mahasiswa aktif', type: 'PDF', size: '245 KB' },
    { id: 14, name: 'Formulir Pengajuan Beasiswa', description: 'Formulir pengajuan berbagai jenis beasiswa', type: 'PDF', size: '200 KB' },
    { id: 15, name: 'Formulir Cuti Akademik', description: 'Formulir untuk pengajuan cuti akademik mahasiswa', type: 'DOCX', size: '195 KB' }
  ]
};

export const mockNotifications = [
  {
    id: 1,
    type: 'announcement',
    title: 'Pengumuman Baru: Jadwal Ujian',
    description: 'Admin Prodi telah memposting pengumuman baru tentang Jadwal Ujian Akhir Semester Genap 2024/2025',
    date: '20 November 2025',
    isRead: false
  },
  {
    id: 2,
    type: 'activity',
    title: 'Pengumuman',
    description: 'Pengumuman baru dengan label kegiatan telah ditambahkan: Workshop Machine Learning',
    date: '17 November 2025',
    isRead: true
  }
];

export const mockUserProfile = {
  name: 'Adinda Salsabila',
  username: 'Adinda Salsabila',
  npm: '2215061035',
  semester: 'Semester 7 (Ganjil)',
  tahunMasuk: 'Tahun 2022'
};