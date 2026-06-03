import { useEffect, useState } from "react";
import http from "../../utils/http";
import "./Kategori.css";

const FALLBACK_CATEGORIES = [
  { id: 1, label: "Rumah", count: "12.450 listing" },
  { id: 2, label: "Apartemen", count: "5.230 listing" },
  { id: 3, label: "Tanah", count: "8.920 listing" },
  { id: 4, label: "Komersial", count: "3.140 listing" },
];

function randomCount() {
  return `${Math.floor(Math.random() * 300 + 50)} listing`;
}

export default function Categories({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get("/kategori")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          const mapped = response.data.data.map((item) => ({
            id: item.id,
            label: item.nama_kategori,
            count: randomCount(),
          }));
          setCategories(mapped);
        }
      })
      .catch(() => {
        // keep fallback categories
      })
      .finally(() => setLoading(false));
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
                <div className="category-icon"></div>
                <div>
                  <h3>{category.label}</h3>
                  <p>{category.count}</p>
                </div>
              </button>
            );
          })}
          {loading && <p className="loading-text">Memuat kategori...</p>}
        </div>
      </div>
    </section>
  );
}
