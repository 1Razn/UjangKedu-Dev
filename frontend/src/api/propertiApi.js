import http from "../utils/http.js";

const backendBaseUrl = "http://localhost:3000";

const resolveImageUrl = (src) => {
  if (!src) return "https://placehold.co/600x400?text=Gambar+Properti";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return `${backendBaseUrl}/${src}`;
};

const mapPropertyData = (item) => ({
  id: item.id,
  title: item.judul || item.title || "Properti Tanpa Nama",
  price: item.harga || item.price,
  location: item.alamat || item.location || "Lokasi belum diatur",
  type: item.tipe || item.type || "Jual",
  category: item.category || item.nama_kategori || "Rumah",
  bedrooms: item.kamar_tidur || item.bedrooms || "-",
  bathrooms: item.kamar_mandi || item.bathrooms || "-",
  area: item.luas_properti || item.area || 0,
  tanggal_tayang: item.tanggal_tayang || item.tanggal || null,
  luas_tanah: item.luas_tanah ?? item.luas_properti ?? null,
  luas_bangunan: item.luas_bangunan ?? null,
  jumlah_lantai: item.jumlah_lantai ?? item.lantai ?? null,
  daya_listrik: item.daya_listrik ?? item.listrik ?? null,
  garasi: item.garasi ?? item.carport ?? null,
  alamat_lengkap: item.alamat_lengkap || item.alamat || null,
  image: resolveImageUrl(item.foto_properti || item.image),
  featured: item.featured === 1 || item.featured === true,
  agent: item.agent_name || item.nama_agen || item.agent || "Agen BOTY",
  year: item.tahun_dibangun || item.year,
  certificate: item.sertifikat || item.certificate,
  description: item.deskripsi || item.description,
  facilities: typeof item.fasilitas === "string" ? item.fasilitas.split(",") : (item.facilities || []),
  gallery: typeof item.galeri === "string" ? item.galeri.split(",") : (item.gallery || [resolveImageUrl(item.foto_properti || item.image)])
});

export async function getProperties() {
  const response = await http.get("/properti");
  const rawData = response.data.data || response.data;
  return Array.isArray(rawData) ? rawData.map(mapPropertyData) : [];
}

export async function getPropertyByIdApi(id) {
  const response = await http.get(`/properti/${id}`);
  const rawData = response.data.data || response.data;
  return mapPropertyData(rawData);
}

export async function createProperty(data) {
  const response = await http.post("/properti", data);
  return response.data;
}