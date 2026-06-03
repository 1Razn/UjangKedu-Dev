import { useMemo } from "react";
import PropertyCard from "./PropertyCard.jsx";
import "./Main_content.css";

const PROPERTIES = [
  { id: 1, title: "Rumah Modern Minimalist 2 Lantai", category: "Rumah", price: "Rp 1,2 M", location: "BSD City, Tangerang Selatan", type: "Jual", bedrooms: 3, bathrooms: 2, area: 120, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop", featured: true, agent: "Agen Premier" },
  { id: 2, title: "Apartemen Strategis Kemang", category: "Apartemen", price: "Rp 8 Jt/bln", location: "Kemang, Jakarta Selatan", type: "Sewa", bedrooms: 2, bathrooms: 1, area: 65, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop", agent: "Properti Jaya" },
  { id: 3, title: "Tanah Kavling Siap Bangun 500m²", category: "Tanah", price: "Rp 750 Jt", location: "Sentul, Bogor", type: "Booking", area: 500, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop", featured: true, agent: "Land Indonesia" },
  { id: 4, title: "Villa Tropical View Pegunungan", category: "Komersial", price: "Rp 3,5 M", location: "Lembang, Bandung", type: "Jual", bedrooms: 4, bathrooms: 3, area: 280, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&auto=format&fit=crop", agent: "Villa Premium" },
  { id: 5, title: "Ruko 3 Lantai Pinggir Jalan Utama", category: "Komersial", price: "Rp 4,8 M", location: "Serpong, Tangerang", type: "Jual", bathrooms: 3, area: 200, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop", agent: "Komersial Pro" },
  { id: 6, title: "Studio Cozy Dekat Stasiun MRT", category: "Apartemen", price: "Rp 4,5 Jt/bln", location: "Senayan, Jakarta", type: "Sewa", bedrooms: 1, bathrooms: 1, area: 32, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&auto=format&fit=crop", agent: "City Living" },
  { id: 7, title: "Tanah Investasi Dekat Tol", category: "Tanah", price: "Rp 1,1 M", location: "Cikarang, Bekasi", type: "Booking", area: 800, image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&auto=format&fit=crop", agent: "Investa Land" },
  { id: 8, title: "Rumah Cluster Premium Family", category: "Rumah", price: "Rp 2,3 M", location: "Cibubur, Jakarta Timur", type: "Jual", bedrooms: 4, bathrooms: 3, area: 180, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop", featured: true, agent: "Cluster Living" },
];

export default function Featured({ selectedCategory, onClearCategory }) {
  const filteredProperties = useMemo(() => {
    if (!selectedCategory || selectedCategory === "Semua") {
      return PROPERTIES;
    }
    return PROPERTIES.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

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
        <div className="featured-grid">
          {filteredProperties.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
