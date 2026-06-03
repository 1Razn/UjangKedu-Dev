// Data dummy untuk dashboard admin BOTY (tanpa backend, hanya simulasi)

export const initialUsers = [
  { id: 1, name: "Andi Pratama", email: "andi.pratama@mail.com", phone: "0812-3456-7890", joinedAt: "2024-01-12", listings: 4, status: "active" },
  { id: 2, name: "Bunga Lestari", email: "bunga.lestari@mail.com", phone: "0813-9988-1122", joinedAt: "2024-02-03", listings: 1, status: "active" },
  { id: 3, name: "Citra Dewi", email: "citra.dewi@mail.com", phone: "0852-7766-5544", joinedAt: "2024-02-21", listings: 8, status: "active" },
  { id: 4, name: "Dimas Saputra", email: "dimas.saputra@mail.com", phone: "0878-1212-3434", joinedAt: "2024-03-05", listings: 12, status: "blocked" },
  { id: 5, name: "Eka Wijaya", email: "eka.wijaya@mail.com", phone: "0856-4545-6767", joinedAt: "2024-03-18", listings: 2, status: "active" },
  { id: 6, name: "Fajar Nugroho", email: "fajar.nugroho@mail.com", phone: "0821-3322-1100", joinedAt: "2024-04-02", listings: 0, status: "active" },
  { id: 7, name: "Gita Ramadhani", email: "gita.r@mail.com", phone: "0811-5566-7788", joinedAt: "2024-04-25", listings: 5, status: "active" },
  { id: 8, name: "Hendra Kusuma", email: "hendra.k@mail.com", phone: "0838-9090-1212", joinedAt: "2024-05-10", listings: 3, status: "active" },
];

export const initialReports = [
  {
    id: 101,
    property: "Rumah Mewah Murah Tipe 45 - Bekasi",
    reporter: "Bunga Lestari",
    reportedUserId: 4,
    reportedUser: "Dimas Saputra",
    reason: "Meminta DP transfer di luar platform, lalu tidak bisa dihubungi.",
    date: "2024-05-20",
    status: "proven",
  },
  {
    id: 102,
    property: "Apartemen Studio Full Furnish - Jakarta Selatan",
    reporter: "Andi Pratama",
    reportedUserId: 3,
    reportedUser: "Citra Dewi",
    reason: "Foto tidak sesuai dengan unit asli, harga berubah saat survey.",
    date: "2024-05-28",
    status: "pending",
  },
  {
    id: 103,
    property: "Tanah Kavling Strategis - Depok",
    reporter: "Eka Wijaya",
    reportedUserId: 7,
    reportedUser: "Gita Ramadhani",
    reason: "Sertifikat tanah diduga palsu / ganda.",
    date: "2024-06-01",
    status: "pending",
  },
  {
    id: 104,
    property: "Kontrakan Harga Miring - Tangerang",
    reporter: "Hendra Kusuma",
    reportedUserId: 5,
    reportedUser: "Eka Wijaya",
    reason: "Iklan duplikat dan menyesatkan calon penyewa.",
    date: "2024-06-02",
    status: "rejected",
  },
];

export const statusLabel = {
  active: "Aktif",
  blocked: "Diblokir",
  pending: "Menunggu",
  proven: "Terbukti Penipuan",
  rejected: "Ditolak",
};
