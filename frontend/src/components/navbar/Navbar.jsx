import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Jual", "Sewa", "Booking Tanah", "Agen"];

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
          <Link to="/admin" className="navbar-link">Admin</Link>
        </nav>

        <div className="navbar-actions">
          <button className="icon-btn hide-sm" aria-label="Wishlist"></button>
          <button className="icon-btn hide-sm" aria-label="Chat"></button>
          <button className="icon-btn hide-sm" aria-label="Notifikasi"></button>
          <button className="btn btn-ghost hide-sm"> Masuk</button>
          <Link to="/promosi" className="btn btn-primary">Pasang Iklan</Link>
          <button className="icon-btn show-sm" onClick={() => setOpen(!open)} aria-label="Menu">
            {/* {open ? <X size={22} /> : <Menu size={22} />} */}
          </button>
        </div>
      </div>
    </header>
  );
}
