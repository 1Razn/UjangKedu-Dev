import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http.js";
import "./KelolaProperty.css";

export default function KelolaProperti() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [adPackages, setAdPackages] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    alamat: "",
    luas_properti: "",
    harga: "",
    kategori_properti_id: "",
    paket_iklan_id: "",
    foto_properti: null,
    previewFoto: ""
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const getUserIdFromStorage = () => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        return userData.id;
      } catch (e) {
        console.error("Gagal parsing data user", e);
      }
    }
    return null;
  };

  const fetchProperties = async () => {
    try {
      const userId = getUserIdFromStorage();
      const response = await http.get("/properti");
      const allProperties = response.data.data || response.data;
      const userProperties = allProperties.filter(p => p.user_id === userId);
      setProperties(userProperties);
    } catch (error) {
      console.error("Gagal memuat properti:", error);
      showNotification("Gagal memuat data properti", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await http.get("/kategori");
      setCategories(response.data.data || response.data);
    } catch (error) {
      console.error("Gagal memuat kategori:", error);
    }
  };

  const fetchAdPackages = async () => {
    try {
      const response = await http.get("/iklan");
      setAdPackages(response.data.data || response.data);
    } catch (error) {
      console.error("Gagal memuat paket iklan:", error);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Apakah Anda yakin ingin menghapus properti ini?")) return;

    try {
      await http.delete(`/properti/${id}`);
      setProperties(properties.filter(p => p.id !== id));
      showNotification("Properti berhasil dihapus", "success");
    } catch (error) {
      console.error("Gagal menghapus properti:", error);
      showNotification("Gagal menghapus properti", "error");
    }
  };

  const handleEdit = (e, property) => {
    e.preventDefault();
    e.stopPropagation();
    
    setEditingProperty(property);
    setFormData({
      judul: property.judul,
      deskripsi: property.deskripsi,
      alamat: property.alamat,
      luas_properti: property.luas_properti,
      harga: property.harga,
      kategori_properti_id: property.kategori_properti_id,
      paket_iklan_id: property.paket_iklan_id,
      foto_properti: null,
      previewFoto: property.foto_properti
    });
    setShowEditForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("judul", formData.judul);
    formDataToSend.append("deskripsi", formData.deskripsi);
    formDataToSend.append("alamat", formData.alamat);
    formDataToSend.append("luas_properti", formData.luas_properti);
    formDataToSend.append("harga", formData.harga);
    formDataToSend.append("kategori_properti_id", formData.kategori_properti_id);
    formDataToSend.append("paket_iklan_id", formData.paket_iklan_id);

    if (formData.foto_properti) {
      formDataToSend.append("foto_properti", formData.foto_properti);
    }

    try {
      await http.put(`/properti/${editingProperty.id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      showNotification("Properti berhasil diperbarui", "success");

      setShowEditForm(false);
      setEditingProperty(null);
      fetchProperties();
    } catch (error) {
      console.error("Gagal menyimpan properti:", error);
      showNotification("Gagal menyimpan properti", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        foto_properti: file,
        previewFoto: URL.createObjectURL(file)
      }));
    }
  };

  const getImageUrl = (filename) => {
    if (!filename) return "/placeholder.jpg";
    if (filename.startsWith("http://") || filename.startsWith("https://")) {
      return filename;
    }
    return `/uploads/properti/${filename}`;
  };

  const isExpired = (tanggalKadaluarsa) => {
    return new Date(tanggalKadaluarsa) < new Date();
  };

  useEffect(() => {
    fetchProperties();
    fetchCategories();
    fetchAdPackages();
  }, []);

  if (loading) {
    return (
      <div className="kelola-properti-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Memuat properti Anda...</p>
        </div>
      </div>
    );
  }

  if (showEditForm && editingProperty) {
    return (
      <div className="kelola-properti-container">
        <div className="form-header">
          <h2>Edit Properti: {editingProperty.judul}</h2>
          <button onClick={() => { setShowEditForm(false); setEditingProperty(null); }} className="btn-back">
            ← Kembali
          </button>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label>Judul Properti *</label>
            <input type="text" name="judul" value={formData.judul} onChange={handleInputChange} required placeholder="Contoh: Rumah Mewah 2 Lantai di Jakarta Selatan" />
          </div>

          <div className="form-group">
            <label>Deskripsi *</label>
            <textarea name="deskripsi" value={formData.deskripsi} onChange={handleInputChange} required rows="5" placeholder="Jelaskan detail properti Anda..." />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Alamat Lengkap *</label>
              <textarea name="alamat" value={formData.alamat} onChange={handleInputChange} required rows="2" placeholder="Masukkan alamat lengkap" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Harga (Rp) *</label>
              <input type="text" name="harga" value={formData.harga} onChange={handleInputChange} required placeholder="Contoh: 500000000" />
            </div>

            <div className="form-group">
              <label>Luas Properti (m²) *</label>
              <input type="number" name="luas_properti" value={formData.luas_properti} onChange={handleInputChange} required placeholder="Contoh: 120" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Kategori *</label>
              <select name="kategori_properti_id" value={formData.kategori_properti_id} onChange={handleInputChange} required>
                <option value="">Pilih Kategori</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nama_kategori}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Paket Iklan *</label>
              <select name="paket_iklan_id" value={formData.paket_iklan_id} onChange={handleInputChange} required>
                <option value="">Pilih Paket</option>
                {adPackages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.nama_paket} - {pkg.durasi_iklan} (Rp {parseInt(pkg.harga).toLocaleString('id-ID')})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Foto Properti</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
            {formData.previewFoto && (
              <div className="image-preview">
                <img src={getImageUrl(formData.previewFoto)} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Update Properti</button>
            <button type="button" onClick={() => { setShowEditForm(false); setEditingProperty(null); }} className="btn-cancel">Batal</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="kelola-properti-container">
      <div className="page-header">
        <div>
          <h1>Kelola Properti Saya</h1>
          <p>Kelola dan pantau semua properti yang Anda posting</p>
        </div>
        <Link to="/promosi" className="btn-add">
          + Tambah Properti Baru
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏠</div>
          <h3>Belum Ada Properti</h3>
          <p>Anda belum memposting properti apapun. Mulai posting properti pertama Anda sekarang!</p>
          <Link to="/promosi" className="btn-add">
            Posting Properti Pertama
          </Link>
        </div>
      ) : (
        <div className="properties-grid">
          {properties.map(property => (
            <Link 
              key={property.id} 
              to={`/property/${property.id}`} 
              className="property-card-link"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="property-card-manage">
                <div className="property-image">
                  <img src={getImageUrl(property.foto_properti)} alt={property.judul} />
                  {isExpired(property.tanggal_kadaluarsa) && (
                    <span className="badge-expired">Kadaluarsa</span>
                  )}
                </div>
                <div className="property-info">
                  <h3>{property.judul}</h3>
                  <p className="property-price">Rp {parseInt(property.harga).toLocaleString('id-ID')}</p>
                  <p className="property-location">📍 {property.alamat.substring(0, 50)}...</p>
                  <div className="property-meta">
                    <span>📐 {property.luas_properti} m²</span>
                    <span>📅 Tayang s/d {new Date(property.tanggal_kadaluarsa).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="property-actions">
                    <button onClick={(e) => handleEdit(e, property)} className="btn-edit">
                      ✏️ Edit
                    </button>
                    <button onClick={(e) => handleDelete(e, property.id)} className="btn-delete">
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.type === "success" ? "✅" : "❌"} {notification.message}
        </div>
      )}
    </div>
  );
}