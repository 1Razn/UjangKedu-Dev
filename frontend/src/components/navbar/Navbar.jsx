import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Jual", "Sewa", "Booking Tanah", "Agen"];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="navbar-logo">
          <span className="navbar-logo-icon"></span>
          <span className="navbar-logo-text">BOTY</span>
        </a>

        <nav className={`navbar-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <a key={l} href="#" className="navbar-link">{l}</a>
          ))}
        </nav>

        <div className="navbar-actions">
          <button className="icon-btn hide-sm" aria-label="Wishlist"></button>
          <button className="icon-btn hide-sm" aria-label="Chat"></button>
          <button className="icon-btn hide-sm" aria-label="Notifikasi"></button>
          <button className="btn btn-ghost hide-sm">Masuk</button>
          <button className="btn btn-primary"> Pasang Iklan</button>
          <button className="icon-btn show-sm" onClick={() => setOpen(!open)} aria-label="Menu">
            
          </button>
        </div>
      </div>
    </header>
  );
}
