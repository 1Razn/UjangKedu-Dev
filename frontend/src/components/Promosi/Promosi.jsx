import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import http from "../../utils/http.js";
import PackageCard from "./PackageCard.jsx";
import { getPackages } from "../../api/paketIklanApi.js";
import "./Promosi.css";

export default function Promosi() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const paketId = searchParams.get("paketId");

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const data = await getPackages();
        setPackages(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Gagal memuat paket iklan:", err);
        setError("Gagal memuat daftar paket iklan.");
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  const handleSelectPackage = (selectedPaketId) => {
    navigate(`/promosi?paketId=${selectedPaketId}`);
  };

  if (loading) {
    return (
      <div className="promo-page">
        <div className="container">
          <div className="promo-header">
            <div>
              <h2 className="section-title">Paket Iklan Properti</h2>
              <p className="section-subtitle">
                Pilih paket iklan yang tepat untuk meningkatkan visibilitas properti Anda di BOTY.
              </p>
            </div>
          </div>
          <div className="promo-loading">
            <div className="loading-spinner"></div>
            <p>Memuat paket iklan... ⏳</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="promo-page">
        <div className="container">
          <div className="promo-header">
            <div>
              <h2 className="section-title">Paket Iklan Properti</h2>
              <p className="section-subtitle">
                Pilih paket iklan yang tepat untuk meningkatkan visibilitas properti Anda di BOTY.
              </p>
            </div>
          </div>
          <div className="promo-error">
            <p>⚠️ {error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="promo-page">
      <div className="container">
        <div className="promo-header">
          <div>
            <h2 className="section-title">Paket Iklan Properti</h2>
            <p className="section-subtitle">
              Pilih paket iklan yang tepat untuk meningkatkan visibilitas properti Anda di BOTY.
            </p>
          </div>
        </div>

        <div className="promo-grid">
          {packages.map((paket) => (
            <PackageCard
              key={paket.id}
              paket={paket}
              selected={paketId === paket.id.toString()}
              onSelect={handleSelectPackage}
            />
          ))}
        </div>

        {packages.length === 0 && (
          <div className="promo-empty">
            <p>Belum ada paket iklan yang tersedia.</p>
          </div>
        )}

        <div className="cta-card">
          <div className="cta-left">
            <h3>Ingin Properti Anda Terjual?</h3>
            <p className="cta-desc">
              Posting iklan sekarang juga!
            </p>
            <div className="cta-buttons">
              <Link to="/promosi" className="btn btn-primary btn-lg">Pasang Iklan</Link>
            </div>
          </div>
          <div className="cta-right">
            <div className="cta-stats">
              <div> <strong>50K+</strong> <span>Listing</span> </div>
              <div> <strong>200+</strong> <span>Kota</span> </div>
              <div> <strong>4.8★</strong> <span>Rating Pengguna</span> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}