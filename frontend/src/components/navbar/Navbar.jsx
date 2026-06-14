import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi.js";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      logout();
      setUser(null);
      navigate("/");
    }
  };

  const links = ["Jual", "Sewa", "Booking Tanah"];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon"></span>
          <span className="navbar-logo-text">BOTY</span>
        </Link>
        
        <nav className={`navbar-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <a key={l} href="#" className="navbar-link">{l}</a>
          ))}
          <Link to="/laporan" className="navbar-link">Laporan</Link>
          {user?.role === "Admin" && (
            <Link to="/admin" className="navbar-link">Admin</Link>
          )}
        </nav>

        <div className="navbar-actions">
          {user ? (
            <>
              <span style={{ fontSize: "14px", marginRight: "12px" }}>
                👋 {user.nama}
              </span>
              <button 
                onClick={handleLogout}
                className="btn btn-ghost hide-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost hide-sm">Masuk</Link>
              <Link to="/login" className="btn btn-primary">Daftar</Link>
            </>
          )}
          <button 
            className="icon-btn show-sm" 
            onClick={() => setOpen(!open)} 
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}