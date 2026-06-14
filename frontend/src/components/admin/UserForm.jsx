import { useState, useEffect } from "react";
import { getUserById, createUser, updateUser } from "../../api/userApi.js";
import "./UserForm.css";

export default function UserForm({ userId, onCancel, onSuccess }) {
  const isEdit = !!userId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_hp: "",
    password: "",
    role: "User",
    foto_profil: null
  });

  useEffect(() => {
    if (isEdit && userId) {
      loadUserData();
    }
  }, [userId]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await getUserById(userId);
      setFormData({
        nama: userData.nama || "",
        email: userData.email || "",
        no_hp: userData.no_hp || "",
        password: "",
        role: userData.role || "User",
        foto_profil: null
      });
      if (userData.foto_profil) {
        setPreviewImage(`http://localhost:3000/${userData.foto_profil}`);
      }
    } catch (err) {
      setError("Gagal memuat data user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        foto_profil: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("no_hp", formData.no_hp);
      formDataToSend.append("role", formData.role);

      if (formData.password) {
        formDataToSend.append("password", formData.password);
      }

      if (formData.foto_profil) {
        formDataToSend.append("foto_profil", formData.foto_profil);
      }

      if (isEdit) {
        await updateUser(userId, formDataToSend);
      } else {
        await createUser(formDataToSend);
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit && !formData.nama) {
    return (
      <div className="form-container">
        <div className="form-loading">
          <div className="loading-spinner"></div>
          <p>Memuat data user...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">
          {isEdit ? "Edit User" : "Tambah User Baru"}
        </h2>
        <button className="btn-close" onClick={onCancel}>
          ✕
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Nama Lengkap *</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap"
              maxLength="30"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="contoh@email.com"
              maxLength="35"
            />
          </div>

          <div className="form-group">
            <label>No. Telepon *</label>
            <input
              type="tel"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
              required
              placeholder="081234567890"
              maxLength="13"
              pattern="[0-9]+"
            />
          </div>

          <div className="form-group">
            <label>Password {isEdit && "(kosongkan jika tidak ingin mengubah)"}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEdit}
              placeholder={isEdit ? "Kosongkan jika tidak diubah" : "Minimal 6 karakter"}
              minLength={isEdit ? 0 : 6}
              maxLength="30"
            />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Foto Profil</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                name="foto_profil"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                id="foto_profil"
              />
              <label htmlFor="foto_profil" className="file-input-label">
                📁 Pilih File
              </label>
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setPreviewImage("");
                      setFormData(prev => ({ ...prev, foto_profil: null }));
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : (isEdit ? "Update User" : "Tambah User")}
          </button>
        </div>
      </form>
    </div>
  );
}