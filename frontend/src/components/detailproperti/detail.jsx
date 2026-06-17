import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  ChevronDown, 
  AlertTriangle, 
  Star,
  Info
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      
      {/* Hero Banner Section */}
      <div 
        className="relative h-[300px] md:h-[450px] bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')` 
        }}
      >
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-end p-4 md:p-8 text-white relative pb-12">
          <div className="mb-3">
            <span className="bg-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              ● Official Developer
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-1">Southgate Residence</h1>
          <p className="text-sm md:text-base opacity-90 mb-2">Developer: Sinar Mas Land</p>
          
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm opacity-90">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>TB Simatupang, Jakarta Selatan</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-orange-500 text-white font-bold px-1.5 py-0.5 rounded text-xs flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-current" /> 4.9
              </span>
              <span className="underline cursor-pointer">17 Ulasan &gt;</span>
            </div>
          </div>

          <button className="absolute bottom-4 right-4 md:right-8 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-sm shadow-md transition-colors">
            <MessageCircle className="w-5 h-5 fill-current" />
            Whatsapp
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Content Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Price and Title Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-red-100 text-red-600 font-bold text-xs px-2 py-0.5 rounded">
                -11%
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                Tanah
              </span>
              <span className="bg-amber-100 text-amber-700 font-semibold text-xs px-2 py-0.5 rounded">
                PREMIER
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900">
                Rp 3,26 Miliar Total
              </h2>
              <span className="text-sm text-gray-400 line-through">Rp 3,7 M</span>
              <span className="text-xs text-red-500 font-medium flex items-center">
                ↓ Turun Rp 407,5 Jutaan
              </span>
            </div>

            <div className="text-sm text-blue-600 font-medium mb-4 cursor-pointer hover:underline">
              Rp 4 Juta /m² <ChevronDown className="inline w-4 h-4" />
            </div>

            <div className="border-t border-b border-gray-100 py-3 mb-4">
              <p className="text-sm text-gray-600 flex items-center gap-1.5 cursor-pointer hover:text-blue-600">
                <span className="text-blue-500">🕒</span> 
                <span>Cicilan mulai Rp 16 Jutaan/bulan &gt;</span>
              </p>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-snug">
              Tanah 815 M² Strategis 5Mnt Exit Toll 15Mnt ke Jakarta Selatan
            </h3>
            
            <p className="text-sm text-gray-500 mb-2">Cinere, Depok</p>
            
            <button className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline mb-4">
              <MapPin className="w-4 h-4" /> Lihat Alamat
            </button>

            <p className="text-[11px] text-gray-400 italic">
              Diperbarui 18 Mei 2026 oleh Dana Mahendra
            </p>
          </div>

          {/* Overview / Tags Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-base font-bold text-gray-900 mb-4">Overview</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'Bisa', sub: 'Nego' },
                { title: 'Cash', sub: 'Keras/KPT' },
                { title: 'Bisa', sub: 'KPR' },
                { title: 'Bebas', sub: 'Banjir' }
              ].map((item, idx) => (
                <div key={idx} className="bg-blue-50/50 border border-blue-100/50 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-blue-600 font-medium">{item.title}</p>
                  <p className="text-sm font-bold text-blue-900">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-60 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Mock map background decoration */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-gray-100"></div>
              
              {/* Massive pin graphic representing the screen design */}
              <div className="absolute w-40 h-40 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <button className="relative z-10 bg-white hover:bg-gray-50 text-blue-600 font-semibold px-6 py-2.5 rounded-lg shadow-md border border-gray-200 text-sm tracking-wide transition-all">
                Lihat Perkiraan Lokasi
              </button>
            </div>
          </div>

          {/* Report Button */}
          <div className="flex justify-between items-center text-xs text-gray-400 px-1">
            <span>Ada masalah dengan properti ini?</span>
            <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> Laporkan
            </button>
          </div>

        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-4">
          
          {/* Agent Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                alt="Dana Mahendra" 
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-base">Dana Mahendra</h4>
                <p className="text-xs text-gray-500">Agen Korporat</p>
                <p className="text-[11px] text-gray-400 mt-0.5">NIB: 022010746****</p>
              </div>
              <div className="hidden lg:block bg-gray-100 p-2 rounded-lg text-gray-400">
                <Info className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
                <Phone className="w-4 h-4" />
                +62812969...
              </button>
              <button className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors">
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp
              </button>
            </div>
          </div>

          {/* Accordion 1: Guide */}
          <div className="bg-orange-50/40 border border-orange-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <span className="font-bold text-sm">㗊</span>
              </div>
              <span className="text-sm font-bold text-amber-900">Panduan Membeli Properti</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Accordion 2: Disclaimer */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-2 rounded-lg text-gray-500">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-gray-700">Disclaimer</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

        </div>

      </div>
    </div>
  );
}