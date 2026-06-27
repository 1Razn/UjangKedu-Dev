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
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

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
          {/* Button Kembali ke Home */}
          <button
            onClick={() => navigate("/")}
            className="login-back-home"
            type="button"
          >
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda
          </button>

          <Link to="/" className="login-brand">
            <span className="brand-light">Booking Tanah </span>
            <span className="brand-amp"> dan </span>
            <br />
            <span className="brand-dark">Property</span>
          </Link>

          <p className="login-subtitle">Masuk ke akun BOTY Anda untuk melanjutkan.</p>

          {error && (
            <div className="login-error">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <i className="fa-solid fa-envelope login-field-icon"></i>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="login-field">
              <i className="fa-solid fa-lock login-field-icon"></i>
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
                <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
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

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? (
                <> <i className="fa-solid fa-spinner fa-spin"></i> Memproses... </>
              ) : (
                <> <i className="fa-solid fa-right-to-bracket"></i> Login </>
              )}
            </button>
          </form>

          <div className="login-register-link">
            <span>Belum punya akun? </span>
            <Link to="/register" className="login-register-text">
              Daftar di sini
            </Link>
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