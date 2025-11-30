import DocumentCard from '../components/Card/DocumentCard';

export default function BerkasAdministrasi() {
  const documentTypes = [
    {
      title: 'Pendaftaran Seminar Proposal',
      description: 'Berkas dan persyaratan untuk pendaftaran seminar proposal tugas akhir',
      type: 'seminar-proposal',
      color: 'blue',
      route: '/berkas/seminar-proposal'
    },
    {
      title: 'Pendaftaran Seminar Hasil',
      description: 'Berkas dan persyaratan untuk pendaftaran seminar hasil tugas akhir',
      type: 'seminar-hasil',
      color: 'green',
      route: '/berkas/seminar-hasil'
    },
    {
      title: 'Pendaftaran Seminar Komprehensif',
      description: 'Berkas dan persyaratan untuk pendaftaran ujian komprehensif. Ujian kompre adalah ujian akhir sebelum wisuda.',
      type: 'seminar-kompre',
      color: 'pink',
      route: '/berkas/seminar-kompre'
    },
    {
      title: 'Pendaftaran Kerja Praktik',
      description: 'Berkas dan persyaratan untuk pendaftaran kerja praktik',
      type: 'kerja-praktik',
      color: 'orange',
      route: '/berkas/kerja-praktik'
    },
    {
      title: 'Berkas Administrasi Lainnya',
      description: 'Dokumen dan formulir administrasi lainnya yang mungkin diperlukan selama masa studi',
      type: 'administrasi-lainnya',
      color: 'red',
      route: '/berkas/administrasi-lainnya'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Informasi Kebutuhan Administrasi</h1>
        <p className="text-gray-600">
          Pilih jenis administrasi untuk mengunduh berkas dan formulir yang diperlukan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentTypes.map((doc, index) => (
          <DocumentCard
            key={index}
            title={doc.title}
            description={doc.description}
            type={doc.type}
            color={doc.color}
            route={doc.route}
          />
        ))}
      </div>
    </div>
  );
}