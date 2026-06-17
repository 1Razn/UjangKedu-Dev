import { useState } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const TABS = [
  { id: "jual", label: "Jual" },
  { id: "sewa", label: "Sewa" },
  { id: "booking", label: "Booking Tanah" },
];

const POPULAR = ["Rumah BSD", "Apartemen Jakarta", "Tanah Bogor", "Villa Bandung"];

export default function Hero() {
  const navigate = useNavigate(); // ✅ Tambahkan pemicu navigasi di sini
  const [tab, setTab] = useState("jual");
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // ✅ Jalankan perpindahan halaman ke rute pencarian custom kita
    navigate("/search-custom"); 
  };

  return (
    <section className="hero">
      <div className="hero-pattern" />
      <div className="container hero-inner">
        <div className="hero-headline">
          <h1>Temukan Properti Impian Anda</h1>
          <p>Ribuan listing rumah, apartemen, tanah & komersial dari agen terpercaya di seluruh Indonesia.</p>
        </div>

        <div className="hero-search">
          <div className="hero-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`hero-tab ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <form className="hero-search-form" onSubmit={handleSearch}>
            <div className="hero-input-wrap">
              
              <input
                type="text"
                placeholder="Cari lokasi, kota, atau area..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              Cari
            </button>
          </form>
        </div>

        <div className="hero-popular">
          <span>Pencarian populer:</span>
          {POPULAR.map((p) => (
            <a key={p} href="#" className="hero-tag">{p}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
