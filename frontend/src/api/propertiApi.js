import http from "../utils/http.js";

const mapPropertyData = (item) => ({
  id: item.id,
  title: item.nama_properti || item.title,      
  price: item.harga || item.price,              
  location: item.lokasi || item.location,        
  type: item.tipe || item.type,               
  bedrooms: item.kamar_tidur || item.bedrooms,
  bathrooms: item.kamar_mandi || item.bathrooms,
  area: item.luas_tanah || item.area,
  image: item.foto_properti || item.image,      
  featured: item.featured === 1 || item.featured === true,
  agent: item.nama_agen || item.agent,
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