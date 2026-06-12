import { useState, useEffect, useMemo } from "react";
import PropertyCard from "./PropertyCard.jsx";
import http from "../../utils/http.js"; 
import "./Main_content.css";

export default function Featured({ selectedCategory, onClearCategory }) {
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const response = await http.get("/properti");
        const rawData = response.data.data || response.data;

        const mappedData = rawData.map(item => ({
          id: item.id,
          title: item.nama_properti || item.nama || item.title || "Properti Tanpa Nama",
          category: item.kategori || item.category || "Rumah", 
          
          price: item.harga ? `Rp ${Number(item.harga).toLocaleString('id-ID')}` : (item.price || "Harga tidak tersedia"),
          
          location: item.lokasi || item.alamat || item.location || "Lokasi belum diatur",
          type: item.tipe || item.type || "Jual", 
          bedrooms: item.kamar_tidur || item.bedrooms || "-",
          bathrooms: item.kamar_mandi || item.bathrooms || "-",
          area: item.luas_tanah || item.luas || item.area || 0,
        
          image: item.foto_properti || item.foto || item.image || "https://placehold.co/600x400?text=Gambar+Properti",
          
          featured: item.featured == 1 || item.featured === true,
          agent: item.nama_agen || item.agent || "Agen BOTY"
        }));

        setProperties(mappedData);
      } catch (err) {
        console.error("Gagal memuat properti dari server:", err);
        setError("Gagal memuat daftar properti.");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
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
            <p>
              Menampilkan kategori: <strong>{selectedCategory}</strong>
            </p>
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