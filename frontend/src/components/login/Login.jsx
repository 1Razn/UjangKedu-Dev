import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login sebagai: ${form.username || "—"}`);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <Link to="/" className="login-brand">
            <span className="brand-light">Booking Tanah</span> <span className="brand-amp">&amp;</span>
            <br />
            <span className="brand-dark">Property</span>
          </Link>

          <p className="login-subtitle">
            Don't have an account? Create your account, it takes less than a minute.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div className="login-field">
              <Lock size={18} className="login-field-icon" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password"
              >
                {showPass ? '🙈' : '👁️'}
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

            <button type="submit" className="login-submit">Login</button>
          </form>

          <div className="login-with">
            <span>Login with</span>
            <div className="login-socials">
              <button type="button" className="login-social" aria-label="Facebook">f</button>
              <button type="button" className="login-social" aria-label="Google">G</button>
              <button type="button" className="login-social" aria-label="Twitter">t</button>
            </div>
          </div>

          <div className="login-footer">
            <p>© Copyright 2019 BudgetBear - Drivester Ltd.</p>
            <p>67 Albion Street, West Yorkshire, Leeds LS1 5AA, United Kingdom.</p>
          </div>
        </div>

        <div className="login-right" />
      </div>
    </div>
  );
}
