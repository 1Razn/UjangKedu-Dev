import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http.js";
import PackageCard from "./PackageCard.jsx";
import { DEFAULT_PACKAGES } from "./promoData.js";
import "./Promosi.css";

export default function CTA() {
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http.get("/iklan")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          setPackages(response.data.data.slice(0, 3));
        }
      })
      .catch(() => {
        // fallback to static packages
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section promo-preview">
      <div className="container">
        <div className="promo-header">
          <div>
            <h2 className="section-title">Promosi Paket Iklan</h2>
            <p className="section-subtitle">
              Pilih paket iklan yang tepat untuk meningkatkan visibilitas properti Anda di BOTY.
            </p>
          </div>
          <Link to="/promosi" className="btn btn-outline">Lihat Semua Paket</Link>
        </div>

        <div className="promo-grid">
          {packages.map((paket) => (
            <PackageCard
              key={paket.id}
              paket={paket}
              linkTo={`/promosi?paketId=${paket.id}`}
            />
          ))}
        </div>

        <div className="cta-card">
          <div className="cta-left">
            <h3>Ingin tampil lebih cepat?</h3>
            <p className="cta-desc">
              Daftar sebagai agen dan pasang iklan dengan fitur premium agar listing Anda dilihat lebih banyak.
            </p>
            <div className="cta-buttons">
              <Link to="/promosi" className="btn btn-primary btn-lg">Pasang Iklan</Link>
            </div>
          </div>
          <div className="cta-right">
            <div className="cta-stats">
              <div><strong>50K+</strong><span>Listing</span></div>
              <div><strong>200+</strong><span>Kota</span></div>
              <div><strong>4.8★</strong><span>Rating Pengguna</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
