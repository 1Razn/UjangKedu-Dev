import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Kategori from "./components/kategori/Kategori.jsx";
import MainContent from "./components/fitur/Main_content.jsx";
import ListFitur from "./components/fitur/List_fitur.jsx";
import Promosi from "./components/promosi/Promosi.jsx";
import Footer from "./components/footer/Footer.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import UserForm from "./components/admin/UserForm.jsx"; // ✅ Tambahkan import ini
import PropertyDetail from "./components/property/PropertyDetail.jsx";
import SearchResults from "./components/search/SearchResults.jsx";
import PromosiPage from "./components/property/FormProperty.jsx";
import Login from "./components/login/Login.jsx";
import Laporan from "./components/laporan/Laporan.jsx";
import PropertySearch from "./components/property/PropertySearch.jsx"; // ✅ Import halaman pencarian buatanmu

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Kategori
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <MainContent selectedCategory={selectedCategory} onClearCategory={() => setSelectedCategory("Semua")} />
        <ListFitur />
        <Promosi />
      </main>
      <Footer />
    </div>
  );
}

function WithChrome({ children }) {
  return (
    <div className="app">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/promosi" element={<PromosiPage />} />
      
      {/* ✅ Route Admin */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/user/edit/:id" element={<UserForm />} /> {/* ✅ Tambahkan ini */}
      <Route path="/admin/user/add" element={<UserForm />} /> {/* ✅ Tambahkan ini */}
      
      <Route path="/login" element={<Login />} />
      <Route path="/property/:id" element={<WithChrome><PropertyDetail /></WithChrome>} />
      <Route path="/search" element={<WithChrome><SearchResults /></WithChrome>} />
      <Route path="/laporan" element={<WithChrome><Laporan /></WithChrome>} />
      
      {/* ✅ Rute halaman khusus pencarian filter huruf awal milikmu */}
      <Route path="/search-custom" element={<WithChrome><PropertySearch /></WithChrome>} />
    </Routes>
  );
}