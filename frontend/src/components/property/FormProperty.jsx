import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createProperty } from "../../api/propertiApi.js";
import { getPackages } from "../../api/paketIklanApi.js";
import PackageCard from "../promosi/PackageCard.jsx";
import "../promosi/Promosi.css";

export default function PromosiPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [form, setForm] = useState({
    kategori: "Rumah",
    judul: "",
    deskripsi: "",
    alamat: "",
    luas_properti: "",
    harga: "",
    tanggal_tayang: "",
    tanggal_kadaluarsa: "",
    paket_iklan_id: null,
    user_id: null,
    foto_properti: null,
  });
  const [submitted, setSubmitted] = useState(false);

  // Fetch paket iklan dari database
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setForm((prev) => ({ ...prev, user_id: parsedUser.id }));
    }

    const query = new URLSearchParams(location.search);
    const queryPackageId = Number(query.get("paketId"));

    async function fetchPackages() {
      try {
        setLoading(true);
        const data = await getPackages();
        const packagesData = Array.isArray(data) ? data : [];
        
        if (packagesData.length > 0) {
          setPackages(packagesData);
          const defaultId = packagesData[0].id;
          const selectedId = isValidPackageId(packagesData, queryPackageId)
            ? queryPackageId
            : defaultId;
          setSelectedPackageId(selectedId);
          setForm((prev) => ({ ...prev, paket_iklan_id: selectedId }));
        } else {
          setError("Tidak ada paket iklan yang tersedia.");
        }
      } catch (err) {
        console.error("Gagal memuat paket iklan:", err);
        setError("Gagal memuat paket iklan. Silakan muat ulang halaman.");
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, [location.search]);

  const isValidPackageId = (packagesData, packageId) => {
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

    // Validasi tanggal
    const today = new Date().toISOString().split('T')[0];
    if (form.tanggal_tayang < today) {
      setError("Tanggal tayang tidak boleh di masa lalu.");
      return;
    }

    if (form.tanggal_kadaluarsa <= form.tanggal_tayang) {
      setError("Tanggal kadaluarsa harus lebih besar dari tanggal tayang.");
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
    formData.append("kategori_properti_id", getKategoriId(form.kategori));
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
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat mengirim form.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk mapping kategori ke ID
  const getKategoriId = (kategoriNama) => {
    const kategoriMap = {
      "Rumah": 1,
      "Ruko": 2,
      "Tanah": 3,
      "Apartemen": 4,
      "Kost": 5
    };
    return kategoriMap[kategoriNama] || 1;
  };

  const selectedPackage = packages.find((paket) => paket.id === selectedPackageId);

  return (
    <div className="promosi-page">
      {/* <section className="section promo-hero">
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
      </section> */}

      <section className="section" id="package-list">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Daftar Paket Iklan</h2>
            <div className="promo-hero-actions">
                <Link to="/" className="btn btn-outline">Kembali ke Beranda</Link>
              </div>
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
                })()}`}>
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
                    <option value="Ruko">Ruko</option>
                    <option value="Kost">Kost</option>
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
                    maxLength="100"
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
                    maxLength="15"
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
                    maxLength="10"
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
                  Terima kasih! Iklan Anda telah berhasil diposting. Kembali ke beranda...
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}