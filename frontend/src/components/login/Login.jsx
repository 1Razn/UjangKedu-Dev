import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/authApi.js";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(form.email, form.password);
      
      if (response.success) {
        // ✅ Simpan token & data user ke localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // ✅ Redirect berdasarkan role
        if (response.data.user.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      const message = err.response?.data?.message || "Email atau password salah";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <Link to="/" className="login-brand">
            <span className="brand-light">Booking Tanah</span>
            <span className="brand-amp">&</span>
            <br />
            <span className="brand-dark">Property</span>
          </Link>

          <p className="login-subtitle">
            Masuk ke akun BOTY Anda untuk melanjutkan.
          </p>

          {/* ✅ Tampilkan error jika ada */}
          {error && (
            <div style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
              border: "1px solid #fca5a5"
            }}>
              ⚠️ {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="login-field">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="login-row">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="login-forgot">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="login-submit"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Memproses..." : "Login"}
            </button>
          </form>

          {/* ✅ Info Akun Test */}
          <div style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#f0f9ff",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#0369a1",
            border: "1px solid #bae6fd"
          }}>
            <strong> Akun Test:</strong><br />
            Admin: admin@boty.com / admin123<br />
            User: user123@gmail.com / user123
          </div>

          <div className="login-footer">
            <p>© Copyright 2026 BOTY</p>
          </div>
        </div>

        <div className="login-right" />
      </div>
    </div>
  );
}