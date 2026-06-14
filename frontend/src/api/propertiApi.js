import http from "../utils/http.js";

const mapPropertyData = (item) => ({
  id: item.id,
  title: item.judul || item.title || "Properti Tanpa Nama",
  price: item.harga || item.price,
  location: item.alamat || item.location || "Lokasi belum diatur",
  type: item.tipe || item.type || "Jual",
  category: item.category || item.nama_kategori || "Rumah", // ✅ Sekarang akan dapat dari backend
  bedrooms: item.kamar_tidur || item.bedrooms || "-",
  bathrooms: item.kamar_mandi || item.bathrooms || "-",
  area: item.luas_properti || item.area || 0,
  image: item.foto_properti || item.image || "https://placehold.co/600x400?text=Gambar+Properti",
  featured: item.featured === 1 || item.featured === true,
  agent: item.agent_name || item.nama_agen || item.agent || "Agen BOTY", // ✅ Ambil dari JOIN user
  year: item.tahun_dibangun || item.year,
  certificate: item.sertifikat || item.certificate,
  description: item.deskripsi || item.description,
  facilities: typeof item.fasilitas === "string" ? item.fasilitas.split(",") : (item.facilities || []),
  gallery: typeof item.galeri === "string" ? item.galeri.split(",") : (item.gallery || [item.foto_properti || item.image])
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