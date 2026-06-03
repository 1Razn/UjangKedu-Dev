import Navbar from "./components/navbar/Navbar.jsx";
import Hero from "./components/hero/Hero.jsx";
import Kategori from "./components/kategori/Kategori.jsx";
import Main_content from "./components/fitur/Main_content.jsx";
import List_fitur from "./components/fitur/List_fitur.jsx";
import Promosi from "./components/Promosi/Promosi.jsx";
import Footer from "./components/footer/Footer.jsx";
import KomentarList from "./components/komentar/KomentarList.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Kategori />
        <Main_content />
        <List_fitur />
        <Promosi />
        {}
        <KomentarList />
      </main>
      <Footer />
    </div>
  );
}
