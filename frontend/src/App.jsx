import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Categories from "./components/kategori/Kategori.jsx";
import Featured from "./components/fitur/Main_content.jsx";
import Features from "./components/fitur/List_fitur.jsx";
import CTA from "./components/Promosi/Promosi.jsx";
import Footer from "./components/footer/Footer.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";

function Home() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Featured />
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
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
