import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi.js";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  });

  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      logout();
      setUser(null);
      navigate("/");
    }
  };


  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon"><img src="../../../public/logo.png" alt="Logo" /></span>
          <span className="navbar-logo-text">BOTY</span>
        </Link>
        
        <nav className={`navbar-links ${open ? "open" : ""}`}>
          <Link to="/wishlist" className="navbar-link">Wishlist</Link>
          <Link to="/laporan" className="navbar-link">Laporan</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
          {user?.role === "Admin" && (
            <Link to="/admin" className="navbar-link">Admin</Link>
          )}
        </nav>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="user-greeting hide-sm">
                <i className="fa-regular fa-user"></i> Halo, {user.nama}
              </span>
              <button 
                onClick={handleLogout}
                className="btn-logout hide-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost hide-sm">Masuk</Link>
              <Link to="/login" className="btn-primary">Daftar</Link>
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