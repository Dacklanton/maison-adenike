'use client';

import React, { useState, useEffect } from 'react';
import {
  LodgingItem,
  LODGING_ADDONS,
  calculateEstimatedTotal,
  generateWhatsAppBookingUrl,
} from '@/data/lodging';

interface LodgingDrawerProps {
  item: LodgingItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LodgingDrawer: React.FC<LodgingDrawerProps> = ({ item, isOpen, onClose }) => {
  const [nights, setNights] = useState<number>(1);
  const [guests, setGuests] = useState<number>(2);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    if (item) {
      setNights(1);
      setGuests(Math.min(2, item.capacity.max));
      setSelectedAddonIds([]);
      setActiveImageIndex(0);
    }
  }, [item]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const currentTotal = calculateEstimatedTotal({
    item,
    nights,
    guests,
    selectedAddonIds,
  });

  const whatsappUrl = generateWhatsAppBookingUrl({
    item,
    nights,
    guests,
    selectedAddonIds,
  });

  const toggleAddon = (id: string) => {
    setSelectedAddonIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const images = item.gallery.length > 0 ? item.gallery : [item.featuredImage];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-[#1A1A17] text-[#FAF7F2] h-full overflow-y-auto shadow-2xl border-l border-[#C5A059]/30 flex flex-col justify-between"
        onClick={e => e.stopPropagation()}
        style={{
          animation: 'drawerSlideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* En-tête fixe avec bouton de fermeture */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#1A1A17]/95 backdrop-blur border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium font-sans">
              {item.apartmentLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer le tiroir"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Corps du Drawer avec scroll */}
        <div className="px-6 py-6 space-y-7 flex-1">
          {/* Galerie Photo Principale */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
              <img
                src={images[activeImageIndex] || item.featuredImage}
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#1A1A17]/80 text-[#C5A059] border border-[#C5A059]/40 backdrop-blur-md">
                  {item.badge}
                </span>
              </div>
            </div>

            {/* Vignettes si multiples photos */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 scale-105'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${item.name} aperçu ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Titre & Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF7F2] tracking-wide mb-2">
              {item.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-[#FAF7F2]/70 font-sans mb-3">
              <span className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                {item.capacity.label}
              </span>
              <span>•</span>
              <span className="text-[#C5A059] font-medium">
                {item.priceDisplay} {item.priceUnit}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#FAF7F2]/80 font-light font-sans">
              {item.fullDescription}
            </p>
          </div>

          {/* BLOC INCLUSION ESSENTIELLE & SALLE D'EAU */}
          <div className="p-4 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/40 space-y-2">
            <div className="flex items-center gap-2 text-[#C5A059] font-medium text-xs uppercase tracking-wider">
              <span>✦</span>
              <span>Inclusions Claires & Espaces Communs</span>
            </div>
            <p className="text-sm font-serif italic text-[#FAF7F2] leading-snug">
              « {item.highlightInclusion} »
            </p>
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#FAF7F2]/70 font-sans">
              <div className="flex items-center gap-1.5">
                <span className="text-[#C5A059]">✔</span> {item.specs.bathroom}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#C5A059]">✔</span> {item.specs.livingRoomAccess}
              </div>
            </div>
          </div>

          {/* Équipements de la chambre */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold font-sans">
              Caractéristiques & Commodités
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.specs.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#FAF7F2]/85 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-white/10" />

          {/* CALCULATEUR DYNAMIQUE DE SÉJOUR */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-widest text-[#FAF7F2] font-semibold font-sans">
                Simulateur de Séjour & Options
              </h3>
              <span className="text-xs text-[#C5A059] font-sans">Calcul instantané</span>
            </div>

            {/* Sélecteurs Nuitées et Personnes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1.5 font-sans">
                  Nombre de Nuits
                </label>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setNights(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-base transition-colors"
                  >
                    -
                  </button>
                  <span className="font-serif text-lg text-white font-semibold">
                    {nights} {nights > 1 ? 'nuits' : 'nuit'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNights(prev => prev + 1)}
                    className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-base transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <label className="block text-[11px] uppercase tracking-wider text-white/60 mb-1.5 font-sans">
                  Voyageurs
                </label>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-base transition-colors"
                  >
                    -
                  </button>
                  <span className="font-serif text-lg text-white font-semibold">
                    {guests} {guests > 1 ? 'pers.' : 'pers.'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests(prev => Math.min(item.capacity.max, prev + 1))}
                    className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-base transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add-ons list */}
            <div className="space-y-2.5 pt-2">
              <label className="block text-xs uppercase tracking-wider text-white/70 font-sans">
                Options à la carte recommandées :
              </label>
              {LODGING_ADDONS.map(addon => {
                const isChecked = selectedAddonIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`cursor-pointer flex items-start gap-3 p-3 rounded-lg border transition-all select-none ${
                      isChecked
                        ? 'bg-[#C5A059]/15 border-[#C5A059]'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent div
                      className="mt-1 w-4 h-4 rounded border-white/30 text-[#C5A059] focus:ring-0 focus:outline-none cursor-pointer accent-[#C5A059]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white font-sans">
                          {addon.name}
                        </span>
                        <span className="text-xs font-medium text-[#C5A059] font-sans">
                          {addon.priceLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/60 font-sans leading-tight mt-0.5">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PIED DE TIROIR FIXE AVEC TOTAL & WHATSAPP */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-[#1A1A17]/98 backdrop-blur-md border-t border-[#C5A059]/30 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-white/60 font-sans block">
                Estimation totale pour {nights} nuit(s) :
              </span>
              <span className="text-2xl sm:text-3xl font-serif text-[#C5A059] font-bold">
                {currentTotal.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <span className="text-[10px] text-white/50 text-right max-w-[140px] font-sans">
              Prix direct sans frais intermédiaire
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-sm uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#25D366]/20 transition-transform active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2C6.505 2 2.012 6.486 2.012 12.004c0 1.907.539 3.69 1.472 5.213L2.001 22l4.945-1.45a9.98 9.98 0 005.085 1.385c5.526 0 10.019-4.486 10.019-10.005C22.05 6.486 17.557 2 12.031 2zm0 18.257c-1.637 0-3.176-.464-4.502-1.267l-.323-.194-2.946.864.88-2.868-.21-.334a8.214 8.214 0 01-1.258-4.454c0-4.57 3.72-8.283 8.359-8.283 4.638 0 8.358 3.713 8.358 8.283 0 4.57-3.72 8.283-8.358 8.283zm4.58-6.195c-.251-.126-1.485-.733-1.715-.816-.23-.084-.397-.126-.565.126-.168.25-.65.816-.797.983-.146.168-.293.189-.544.063-.251-.126-1.06-.39-2.02-1.246-.746-.665-1.25-1.487-1.396-1.739-.147-.251-.016-.387.11-.512.113-.113.251-.294.377-.44.126-.147.168-.252.251-.419.084-.168.042-.315-.021-.441-.063-.126-.565-1.363-.775-1.867-.204-.49-.411-.424-.564-.432l-.481-.008c-.168 0-.44.063-.67.315-.23.252-.88.86-.88 2.097 0 1.238.902 2.435 1.027 2.603.126.168 1.776 2.712 4.303 3.803.601.26 1.07.415 1.436.531.604.192 1.154.165 1.588.1.484-.072 1.485-.607 1.694-1.194.21-.587.21-1.09.147-1.194-.063-.105-.23-.168-.481-.294z"/>
              </svg>
              <span>Réserver via WhatsApp</span>
            </a>

            <a
              href="tel:+2290155456363"
              className="px-4 py-3.5 rounded-xl border border-white/20 text-white/90 hover:text-white hover:border-[#C5A059] flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors font-sans"
              title="Appel direct Conciergerie"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>01 55 45 63 63</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LodgingDrawer;
