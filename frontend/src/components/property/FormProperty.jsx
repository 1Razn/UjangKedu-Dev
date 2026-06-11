import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../utils/http.js";
import PackageCard from "../promosi/PackageCard.jsx";
import { DEFAULT_PACKAGES } from "../promosi/promoData.js";
import "../promosi/Promosi.css";

export default function PromosiPage() {
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(DEFAULT_PACKAGES[0]?.id || null);
  const [form, setForm] = useState({
    kategori: "Rumah",
    nama: "",
    email: "",
    telepon: "",
    properti: "",
    pesan: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    http.get("/iklan")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          setPackages(response.data.data);
          setSelectedPackageId(response.data.data[0].id);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInput = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const selectedPackage = packages.find((paket) => paket.id === selectedPackageId);

  return (
    <div className="promosi-page">
      <section className="section promo-hero">
        <div className="container">
          <div className="promo-hero-body">
            <div>
              <h1 className="section-title">Promosi Paket Iklan BOTY</h1>
              <p className="section-subtitle">
                Pilih paket iklan yang sesuai dengan kebutuhan listing Anda. Dari starter
                sampai premium, paket kami dirancang untuk membantu properti Anda dilihat lebih banyak.
              </p>
              <div className="promo-hero-actions">
                <Link to="/" className="btn btn-outline">Kembali ke Beranda</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="package-list">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Daftar Paket Iklan</h2>
            <p className="section-subtitle">Paket iklan untuk memperkuat visibilitas properti Anda.</p>
          </div>
          {loading ? (
            <p>Memuat paket iklan...</p>
          ) : (
            <div className="promo-grid">
              {packages.map((paket) => (
                <PackageCard
                  key={paket.id}
                  paket={paket}
                  selected={paket.id === selectedPackageId}
                  onSelect={setSelectedPackageId}
                />
              ))}
            </div>
          )}
          <div className="promo-form-wrapper">
            <div className="form-header">
              <div>
                <h2 className="section-title">Form Pasang Iklan</h2>
                <p className="section-subtitle">Isi data properti Anda dan pilih paket yang paling sesuai.</p>
              </div>
              {selectedPackage && (
                <div className="selected-package-summary">
                  <strong>Paket yang dipilih:</strong>
                  <span>{selectedPackage.nama_paket} ({selectedPackage.durasi_iklan})</span>
                </div>
              )}
            </div>

            <form className="promo-form" onSubmit={handleSubmit}>
              <div className="promo-form-grid">
                <label className="promo-form-group">
                  <span>Kategori Iklan</span>
                  <select
                    value={form.kategori}
                    onChange={(e) => handleInput("kategori", e.target.value)}
                  >
                    <option value="Rumah">Rumah</option>
                    <option value="Apartemen">Apartemen</option>
                    <option value="Tanah">Tanah</option>
                    <option value="Komersial">Komersial</option>
                  </select>
                </label>
                <label className="promo-form-group">
                  <span>Nama Anda</span>
                  <input
                    type="text"
                    value={form.nama}
                    onChange={(e) => handleInput("nama", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </label>
                <label className="promo-form-group">
                  <span>Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInput("email", e.target.value)}
                    placeholder="contoh@email.com"
                    required
                  />
                </label>
                <label className="promo-form-group">
                  <span>Nomor Telepon / WhatsApp</span>
                  <input
                    type="tel"
                    value={form.telepon}
                    onChange={(e) => handleInput("telepon", e.target.value)}
                    placeholder="0812xxxxxxx"
                    required
                  />
                </label>
                <label className="promo-form-group promo-form-full">
                  <span>Nama Properti / Listing</span>
                  <input
                    type="text"
                    value={form.properti}
                    onChange={(e) => handleInput("properti", e.target.value)}
                    placeholder="Contoh: Rumah Minimalis 2 Lantai"
                    required
                  />
                </label>
                <label className="promo-form-group promo-form-full">
                  <span>Catatan / Keterangan tambahan</span>
                  <textarea
                    value={form.pesan}
                    onChange={(e) => handleInput("pesan", e.target.value)}
                    placeholder="Tuliskan kebutuhan khusus atau permintaan tambahan"
                    rows={4}
                  />
                </label>
              </div>

              <div className="promo-form-actions">
                <button type="submit" className="btn btn-primary">
                  Kirim Permintaan Pasang Iklan
                </button>
              </div>

              {submitted && (
                <p className="success-text">
                  Terima kasih! Permintaan pasang iklan Anda telah dikirim.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
