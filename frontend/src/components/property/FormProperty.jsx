import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createProperty } from "../../api/propertiApi.js";
import http from "../../utils/http.js";
import PackageCard from "../promosi/PackageCard.jsx";
import { DEFAULT_PACKAGES } from "../promosi/promoData.js";
import "../promosi/Promosi.css";

export default function PromosiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [packages, setPackages] = useState(DEFAULT_PACKAGES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState(DEFAULT_PACKAGES[0]?.id || null);
  const [form, setForm] = useState({
    kategori: "Rumah",
    judul: "",
    deskripsi: "",
    alamat: "",
    luas_properti: "",
    harga: "",
    tanggal_tayang: "",
    tanggal_kadaluarsa: "",
    paket_iklan_id: DEFAULT_PACKAGES[0]?.id || null,
    user_id: null,
    foto_properti: null,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setForm((prev) => ({ ...prev, user_id: parsedUser.id }));
    }

    const query = new URLSearchParams(location.search);
    const queryPackageId = Number(query.get("paketId"));

    http.get("/iklan")
      .then((response) => {
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          setPackages(response.data.data);
          const defaultId = response.data.data[0].id;
          const selectedId = responsePackageIdIsValid(response.data.data, queryPackageId)
            ? queryPackageId
            : defaultId;
          setSelectedPackageId(selectedId);
          setForm((prev) => ({ ...prev, paket_iklan_id: selectedId }));
        }
      })
      .catch(() => {
        setError("Gagal memuat paket iklan. Silakan muat ulang halaman.");
      })
      .finally(() => setLoading(false));
  }, [location.search]);

  const responsePackageIdIsValid = (packagesData, packageId) => {
    return Number.isInteger(packageId) && packageId > 0 && packagesData.some((paket) => paket.id === packageId);
  };

  const handleInput = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleInput("foto_properti", file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.user_id) {
      setError("Silakan login terlebih dahulu untuk memasang iklan.");
      return;
    }

    if (!selectedPackageId) {
      setError("Pilih paket iklan terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("deskripsi", form.deskripsi);
    formData.append("alamat", form.alamat);
    formData.append("luas_properti", form.luas_properti);
    formData.append("harga", form.harga);
    formData.append("tanggal_tayang", form.tanggal_tayang);
    formData.append("tanggal_kadaluarsa", form.tanggal_kadaluarsa);
    formData.append("kategori_properti_id", 1);
    formData.append("paket_iklan_id", selectedPackageId);
    formData.append("user_id", form.user_id);

    if (form.foto_properti) {
      formData.append("foto_properti", form.foto_properti);
    }

    try {
      setLoading(true);
      await createProperty(formData);
      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat mengirim form.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
                    <div className={`selected-package-summary ${(() => {
                      const n = (selectedPackage.nama_paket || '').toLowerCase();
                      if (n.includes('bronze')) return 'bronze';
                      if (n.includes('silver')) return 'silver';
                      if (n.includes('gold')) return 'gold';
                      return '';
                    })()} `}>
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
                  <span>Judul Properti</span>
                  <input
                    type="text"
                    value={form.judul}
                    onChange={(e) => handleInput("judul", e.target.value)}
                    placeholder="Contoh: Rumah Minimalis 2 Lantai"
                    required
                  />
                </label>

                <label className="promo-form-group">
                  <span>Harga</span>
                  <input
                    type="text"
                    value={form.harga}
                    onChange={(e) => handleInput("harga", e.target.value)}
                    placeholder="Contoh: 850000000"
                    required
                  />
                </label>

                <label className="promo-form-group">
                  <span>Luas Properti (m²)</span>
                  <input
                    type="text"
                    value={form.luas_properti}
                    onChange={(e) => handleInput("luas_properti", e.target.value)}
                    placeholder="Contoh: 120"
                    required
                  />
                </label>

                <label className="promo-form-group promo-form-full">
                  <span>Alamat</span>
                  <input
                    type="text"
                    value={form.alamat}
                    onChange={(e) => handleInput("alamat", e.target.value)}
                    placeholder="Contoh: Jl. Mawar No. 123, Jaksel"
                    required
                  />
                </label>

                <label className="promo-form-group promo-form-full">
                  <span>Deskripsi</span>
                  <textarea
                    value={form.deskripsi}
                    onChange={(e) => handleInput("deskripsi", e.target.value)}
                    placeholder="Tuliskan deskripsi properti Anda"
                    rows={4}
                    required
                  />
                </label>

                <label className="promo-form-group">
                  <span>Tanggal Tayang</span>
                  <input
                    type="date"
                    value={form.tanggal_tayang}
                    onChange={(e) => handleInput("tanggal_tayang", e.target.value)}
                    required
                  />
                </label>

                <label className="promo-form-group">
                  <span>Tanggal Kadaluarsa</span>
                  <input
                    type="date"
                    value={form.tanggal_kadaluarsa}
                    onChange={(e) => handleInput("tanggal_kadaluarsa", e.target.value)}
                    required
                  />
                </label>

                <label className="promo-form-group promo-form-full">
                  <span>Foto Properti</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {error && (
                <div className="error-text" style={{ color: "#b91c1c", marginBottom: "16px" }}>
                  {error}
                </div>
              )}

              <div className="promo-form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Mengirim..." : "Kirim Permintaan Pasang Iklan"}
                </button>
              </div>

              {submitted && (
                <p className="success-text">
                  Terima kasih! Permintaan pasang iklan Anda telah dikirim, kembali ke beranda...
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
