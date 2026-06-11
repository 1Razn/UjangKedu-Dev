import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropertyCard from "../fitur/PropertyCard.jsx";
import { PROPERTIES } from "../../data/properties.js";
import "../fitur/Main_content.jsx";
import "./SearchResults.css";

const TYPES = ["Semua", "Jual", "Sewa", "Booking"];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const [query, setQuery] = useState(q);

  const results = PROPERTIES.filter((p) => {
    const matchType = !type || type === "Semua" || p.type === type;
    const text = `${p.title} ${p.location}`.toLowerCase();
    const matchQuery = !q || text.includes(q.toLowerCase());
    return matchType && matchQuery;
  });

  const updateParams = (next) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    setSearchParams(params);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateParams({ q: query });
  };

  return (
    <div className="search-page">
      <div className="container">
        <Link to="/" className="detail-back search-back"> Kembali</Link>

        <form className="search-bar" onSubmit={handleSubmit}>
          <div className="search-input-wrap">
            <input
              type="text"
              placeholder="Cari lokasi, kota, atau area..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Cari</button>
        </form>

        <div className="search-filters">
          {TYPES.map((t) => {
            const isActive = (t === "Semua" && !type) || type === t;
            return (
              <button
                key={t}
                className={`search-chip ${isActive ? "active" : ""}`}
                onClick={() => updateParams({ type: t === "Semua" ? "" : t })}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="search-meta">
          <h1 className="search-heading">Hasil Pencarian</h1>
          <p className="search-count">
            {results.length} properti ditemukan
            {q ? <> untuk "<strong>{q}</strong>"</> : null}
            {type ? <> · tipe <strong>{type}</strong></> : null}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="featured-grid search-grid">
            {results.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="search-empty">
            <h2>Tidak ada properti yang cocok</h2>
            <p>Coba ubah kata kunci atau filter pencarian Anda.</p>
            <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
          </div>
        )}
      </div>
    </div>
  );
}
