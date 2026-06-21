import { useEffect, useState } from "react";
import http from "../../utils/http";
import "./Kategori.css";

const FALLBACK_CATEGORIES = [
  { id: 1, label: "Rumah", count: "0 listing", icon: "fa-house" },
  { id: 2, label: "Apartemen", count: "0 listing", icon: "fa-building" },
  { id: 3, label: "Tanah", count: "0 listing", icon: "fa-layer-group" },
  { id: 4, label: "Ruko", count: "0 listing", icon: "fa-store" },
  { id: 5, label: "Kost", count: "0 listing", icon: "fa-bed" },
];

export default function Categories({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        
        // 1. Fetch kategori dari database
        const kategoriRes = await http.get("/kategori");
        const kategoriData = kategoriRes.data?.data || [];

        // 2. Fetch semua properti untuk menghitung listing per kategori
        const propertiRes = await http.get("/properti");
        const propertiData = propertiRes.data?.data || [];

        // 3. Hitung jumlah properti per kategori_properti_id
        const countMap = {};
        propertiData.forEach((p) => {
          const katId = p.kategori_properti_id;
          if (katId) {
            countMap[katId] = (countMap[katId] || 0) + 1;
          }
        });

        // 4. Mapping kategori dengan icon dan jumlah listing real
        const iconMap = {
          1: "fa-house",
          2: "fa-building",
          3: "fa-layer-group",
          4: "fa-store",
          5: "fa-bed"
        };

        if (kategoriData.length > 0) {
          const mapped = kategoriData.map((item) => ({
            id: item.id,
            label: item.nama_kategori,
            count: `${countMap[item.id] || 0} listing`,
            icon: iconMap[item.id] || "fa-house"
          }));
          setCategories(mapped);
        } else {
          setCategories(FALLBACK_CATEGORIES);
        }
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
        setCategories(FALLBACK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleSelect = (label) => {
    onSelectCategory(selectedCategory === label ? "Semua" : label);
  };

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Kategori Properti</h2>
          <p className="section-subtitle">
            Pilih kategori properti yang ingin Anda cari atau pasarkan.
          </p>
        </div>
        <div className="categories-grid">
          {categories.map((category) => {
            const isActive = selectedCategory === category.label;
            return (
              <button
                key={category.id}
                className={`category-card ${isActive ? "active" : ""}`}
                type="button"
                onClick={() => handleSelect(category.label)}
              >
                <div className="category-icon">
                  <i className={`fa-solid ${category.icon}`}></i>
                </div>
                <div>
                  <h3>{category.label}</h3>
                  <p>{category.count}</p>
                </div>
              </button>
            );
          })}
          {loading && <p className="loading-text">Memuat kategori... ⏳</p>}
        </div>
      </div>
    </section>
  );
}