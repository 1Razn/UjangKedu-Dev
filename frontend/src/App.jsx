import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Categories from "./components/kategori/Kategori.jsx";
import Featured from "./components/fitur/Main_content.jsx";
import Features from "./components/fitur/List_fitur.jsx";
import CTA from "./components/Promosi/Promosi.jsx";
import Footer from "./components/footer/Footer.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import PromosiPage from "./components/Promosi/PromosiPage.jsx";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <Featured selectedCategory={selectedCategory} onClearCategory={() => setSelectedCategory("Semua")} />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/promosi" element={<PromosiPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
