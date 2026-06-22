import { use } from "react";
import http from "../utils/http.js";

const resolveImageUrl = (src) => {
  if (!src) return "https://placehold.co/600x400?text=Gambar+Properti";
  
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  
  return src;
};

const mapPropertyData = (item) => ({
  id: item.id,
  title: item.judul || item.title || "Properti Tanpa Nama",
  price: item.harga ? `Rp ${Number(item.harga).toLocaleString('id-ID')}` : "Hubungi Kami",
  location: item.alamat || item.location || "Lokasi belum diatur",
  type: item.tipe || item.type || "Jual",
  category: item.category || item.nama_kategori || "Rumah",
  area: item.luas_properti || item.area || 0,
  agent: item.agent_name || item.agent || "Agen Tidak Diketahui",
  tanggal_tayang: item.tanggal_tayang || item.tanggal || null,
  luas_tanah: item.luas_tanah ?? item.luas_properti ?? null,
  image: resolveImageUrl(item.foto_properti || item.image),
  description: item.deskripsi || item.description,
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