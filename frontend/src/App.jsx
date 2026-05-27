import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Categories from "./components/kategori/Kategori.jsx";
import Featured from "./components/fitur/Main_content.jsx";
import Features from "./components/fitur/List_fitur.jsx";
import CTA from "./components/Promosi/Promosi.jsx";
import Footer from "./components/footer/Footer.jsx";
import KomentarList from "./components/komentar/KomentarList.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Featured />
        <Features />
        <CTA />
        {}
        <KomentarList />
      </main>
      <Footer />
    </div>
  );
}
