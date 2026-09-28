import React from 'react';
import type { Metadata } from 'next';
import LodgingCatalog from '@/components/LodgingCatalog';
import FloatingDiscovery from '@/components/FloatingDiscovery';

export const metadata: Metadata = {
  title: 'Résidences & Espaces d’Exception — Maison Adénikè | Ouidah, Bénin',
  description:
    'Découvrez les suites et appartements de maître de la Maison Adénikè à Ouidah : l’Appartement 1 (Domaine Historique), l’Aile Contemporaine et la privatisation complète de la Cour d’Honneur pour réceptions et séjours d’apparat.',
  openGraph: {
    title: 'Résidences & Espaces d’Exception — Maison Adénikè',
    description:
      'Havre de haute hospitalité béninoise : teck noble, textiles indigo teints à la main, salles d’eau privatives et salons lumineux à Ouidah.',
    images: ['/assets/images/rooms/grand-salon-led-terracotta.jpg'],
  },
};

export default function ChambresPage() {
  return (
    <main className="min-h-screen bg-[#14100E] text-[#FAF7F2] relative">
      {/* ==========================================================================
          1. HERO PLEIN ÉCRAN AVEC BOUCLE VIDÉO DRONE & TRAVELING SALONS
          ========================================================================== */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Vidéo de fond en boucle */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/rooms/grand-salon-led-terracotta.jpg"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtleZoom"
          >
            <source src="/assets/videos/try4.mp4" type="video/mp4" />
            <source src="/TRY4.mp4" type="video/mp4" />
          </video>

          {/* Double voile dégradé cinématographique sobre & sombre */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#14100E]/80 via-[#14100E]/55 to-[#14100E]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(20,16,14,0.7)_100%)]" />
        </div>

        {/* Contenu textuel Hero */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 backdrop-blur-md text-[#C5A059] text-xs uppercase tracking-[0.25em] font-sans font-medium">
            <span>✦</span>
            <span>Maison Adénikè • Ouidah</span>
            <span>✦</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FAF7F2] tracking-tight leading-[1.1] drop-shadow-lg">
            Résidences &amp; Espaces <br />
            <span className="italic font-light text-[#C5A059]">d’Exception</span>
          </h1>

          <p className="text-base sm:text-xl text-[#FAF7F2]/85 font-light font-sans max-w-2xl mx-auto leading-relaxed drop-shadow">
            Du repos intimiste aux réceptions d’apparat au cœur de Ouidah. Des suites parées de teck noble, de textiles d’art et de calme absolu.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#catalogue"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C5A059] text-[#14100E] font-semibold text-xs sm:text-sm uppercase tracking-widest hover:bg-[#d8b56f] transition-all shadow-xl shadow-[#C5A059]/20 flex items-center justify-center gap-2.5 active:scale-95"
            >
              <span>Découvrir le Catalogue</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>

            <a
              href="https://wa.me/2290155456363?text=Bonjour%20Maison%20Adénikè%2C%20je%20souhaite%20connaître%20les%20disponibilités%20des%20lodges%20et%20demeures."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-xs sm:text-sm uppercase tracking-widest backdrop-blur-md transition-all flex items-center justify-center gap-2.5"
            >
              <span>Conciergerie WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Indicateur de défilement fluide */}
        <a
          href="#catalogue"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-[#C5A059] transition-colors"
          aria-label="Faire défiler vers le catalogue"
        >
          <span className="text-[10px] uppercase tracking-widest font-sans">Explorer</span>
          <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#C5A059] animate-bounce" />
          </div>
        </a>
      </section>

      {/* ==========================================================================
          2. TRIPTYQUE HISTOIRE & LIEU (AVEC VUES RÉELLES SALONS)
          ========================================================================== */}
      <section className="py-20 bg-[#1A1A17] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Colonne 1 : Narration */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium font-sans">
                L’Art de l’Hospitalité
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF7F2]">
                L’Écrin Historique et Contemporain
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light font-sans leading-relaxed">
                Née d’une passion pour l’art de vivre ouidannais, la Maison Adénikè réunit le charme intemporel de l’ébénisterie béninoise et la modernité lumineuse de ses espaces partagés.
              </p>
              <div className="pt-2 text-xs text-[#C5A059] font-serif italic">
                « Ibi yìí L’ọkàn ń Sinmi » — Le sanctuaire où le cœur s’apaise.
              </div>
            </div>

            {/* Colonne 2 : Photo Grand Salon Réel */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-white/10 group">
              <img
                src="/assets/images/rooms/grand-salon-led-terracotta.jpg"
                alt="Grand Salon lumineux de l'Appartement 1 avec rétro-éclairage LED et table en teck"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white font-sans">Grand Salon d’Appartement 1 • Plafond Lumineux</span>
              </div>
            </div>

            {/* Colonne 3 : Photo Salon Indigo Traditionnel */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-white/10 group">
              <img
                src="/assets/images/rooms/salon-indigo-traditionnel.jpg"
                alt="Salon en teck avec textiles d'art indigo teints à la main"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white font-sans">Textiles traditionnels indigo teints à la main</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          3. CATALOGUE INTERACTIF STYLE MENU GASTRONOMIQUE
          ========================================================================== */}
      <LodgingCatalog />

      {/* ==========================================================================
          4. COMPOSANT FLOTTANT DE DÉCOUVERTE ALÉATOIRE DISCRET
          ========================================================================== */}
      <FloatingDiscovery />
    </main>
  );
}
