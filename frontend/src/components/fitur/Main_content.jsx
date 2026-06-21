import { useState, useEffect, useMemo } from "react";
import PropertyCard from "./PropertyCard.jsx";
import http from "../../utils/http.js";
import { getCategories } from "../../api/KategoriApi.js";
import "./Main_content.css";

export default function Featured({ selectedCategory, onClearCategory }) {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch properti
        const propertiResponse = await http.get("/properti");
        const rawData = propertiResponse.data.data || propertiResponse.data;
        
        // Fetch kategori dari database
        const kategoriResponse = await getCategories();
        const kategoriData = Array.isArray(kategoriResponse) ? kategoriResponse : [];
        
        // Buat mapping kategori ID ke nama
        const kategoriMap = {};
        kategoriData.forEach(kat => {
          kategoriMap[kat.id] = kat.nama_kategori;
        });
        
        const mappedData = rawData.map(item => ({
          id: item.id,
          title: item.judul || "Properti Tanpa Nama",
          category: kategoriMap[item.kategori_properti_id] || item.category || "Rumah", 
          price: item.harga ? `Rp ${Number(item.harga).toLocaleString('id-ID')}` : "Harga tidak tersedia",
          location: item.alamat || "Lokasi belum diatur",
          type: item.tipe || "Jual",
          bedrooms: item.kamar_tidur || "-",
          bathrooms: item.kamar_mandi || "-",
          area: item.luas_properti || 0,
          image: item.foto_properti || "https://placehold.co/600x400?text=Gambar+Properti",
          featured: item.featured == 1 || item.featured === true,
          agent: item.agent_name || item.nama_agen || "Agen BOTY"
        }));

        setProperties(mappedData);
        setCategories(kategoriData);
        setError(null);
      } catch (err) {
        console.error("Gagal memuat data:", err);
        setError("Gagal memuat data properti atau kategori.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProperties = useMemo(() => {
    if (!selectedCategory || selectedCategory === "Semua") {
      return properties;
    }
    return properties.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, properties]);

  return (
    <section className="section featured">
      <div className="container">
        <div className="featured-head">
          <div>
            <h2 className="section-title">Properti Unggulan</h2>
            <p className="section-subtitle">Pilihan terbaik untuk Anda</p>
          </div>
          <a href="#" className="btn btn-outline">Lihat Semua</a>
        </div>
        
        {selectedCategory && selectedCategory !== "Semua" && (
          <div className="featured-filter">
            <p>Menampilkan kategori: <strong>{selectedCategory}</strong></p>
            <button className="btn btn-outline btn-sm" onClick={onClearCategory}>
              Hapus Filter
            </button>
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Memuat properti unggulan... ⏳</p>
        ) : error ? (
          <p style={{ textAlign: "center", padding: "20px", color: "red" }}>{error}</p>
        ) : filteredProperties.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>Belum ada properti untuk kategori ini.</p>
        ) : (
          <div className="featured-grid">
            {filteredProperties.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}