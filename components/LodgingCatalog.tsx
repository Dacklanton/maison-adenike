'use client';

import React, { useState } from 'react';
import { LODGING_CATALOG, LodgingItem } from '@/data/lodging';
import { LodgingDrawer } from './LodgingDrawer';

type CategoryFilter = 'all' | 'appartement-1' | 'appartement-2' | 'privatisation';

export const LodgingCatalog: React.FC = () => {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [hoveredItem, setHoveredItem] = useState<LodgingItem | null>(LODGING_CATALOG[0]);
  const [selectedItem, setSelectedItem] = useState<LodgingItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const filteredItems = LODGING_CATALOG.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const handleOpenDrawer = (item: LodgingItem) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <section className="relative py-24 bg-[#14100E] text-[#FAF7F2] overflow-hidden" id="catalogue">
      {/* Lignes ornementales d'ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de section style Palace */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs uppercase tracking-widest font-sans">
            <span>✦</span>
            <span>Haute Hôtellerie & Demeures de Caractère</span>
            <span>✦</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#FAF7F2] tracking-wide">
            Le Menu des Demeures &amp; Espaces
          </h2>

          <p className="text-sm sm:text-base text-[#FAF7F2]/70 font-light font-sans max-w-2xl mx-auto">
            Chaque suite et appartement a été pensé comme une alcôve de silence et d’artisanat d’art.
            Survolez chaque proposition pour en dévoiler l’atmosphère singulière.
          </p>

          {/* Onglets de filtrage */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#C5A059] text-[#14100E] shadow-md shadow-[#C5A059]/30 font-semibold'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Tous les Espaces ({LODGING_CATALOG.length})
            </button>

            <button
              type="button"
              onClick={() => setFilter('appartement-1')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                filter === 'appartement-1'
                  ? 'bg-[#C5A059] text-[#14100E] shadow-md shadow-[#C5A059]/30 font-semibold'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Appartement 1 • Domaine Historique
            </button>

            <button
              type="button"
              onClick={() => setFilter('appartement-2')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                filter === 'appartement-2'
                  ? 'bg-[#C5A059] text-[#14100E] shadow-md shadow-[#C5A059]/30 font-semibold'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Appartement 2 • Aile Contemporaine
            </button>

            <button
              type="button"
              onClick={() => setFilter('privatisation')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                filter === 'privatisation'
                  ? 'bg-[#C5A059] text-[#14100E] shadow-md shadow-[#C5A059]/30 font-semibold'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              Cour d’Honneur &amp; Privatisation
            </button>
          </div>
        </div>

        {/* Disposition Asymétrique Haute Édition : Liste Gastronomique + Panneau Hover Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Colonne Liste Gastronomique (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
            {filteredItems.map(item => {
              const isHovered = hoveredItem?.id === item.id;
              const isComingSoon = item.status === 'coming-soon';

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item)}
                  onClick={() => handleOpenDrawer(item)}
                  className={`group relative py-6 px-4 -mx-4 transition-all duration-300 cursor-pointer rounded-xl ${
                    isHovered ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1.5">
                    {/* Nom + Badge */}
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                        isHovered ? 'scale-150 bg-[#C5A059]' : 'bg-white/30'
                      }`} />
                      <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] group-hover:text-[#C5A059] transition-colors">
                        {item.name}
                      </h3>
                      {item.badge && (
                        <span className={`hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isComingSoon
                            ? 'bg-[#B3542E]/20 text-[#E08A63] border-[#B3542E]/40'
                            : 'bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/40'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Prix */}
                    <div className="sm:text-right flex-shrink-0">
                      <span className="text-lg sm:text-xl font-serif text-[#C5A059] font-medium">
                        {item.priceDisplay}
                      </span>
                      <span className="text-xs text-white/50 ml-1 font-sans">
                        {item.priceUnit}
                      </span>
                    </div>
                  </div>

                  {/* Caractéristiques & Inclusions en une ligne élégante */}
                  <p className="text-xs sm:text-[13px] text-white/60 font-light font-sans line-clamp-2 pl-5 mb-3">
                    {item.shortDescription}
                  </p>

                  <div className="flex items-center justify-between pl-5 pt-1 text-xs">
                    <div className="flex items-center gap-3 text-white/40 font-sans">
                      <span className="flex items-center gap-1">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                        {item.capacity.label}
                      </span>
                      <span>•</span>
                      <span className="text-[#C5A059]/90 italic font-serif">
                        {item.highlightInclusion}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#C5A059] font-medium uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      <span>Configurer &amp; Réserver</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Colonne Panneau Visuel Flottant (Hover Preview) (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 hidden lg:block">
            {hoveredItem ? (
              <div className="relative rounded-2xl overflow-hidden bg-[#1A1A17] border border-[#C5A059]/30 shadow-2xl p-4 space-y-4 transition-all duration-500">
                {/* Image grand format avec transition */}
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black">
                  <img
                    src={hoveredItem.featuredImage}
                    alt={hoveredItem.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-semibold bg-[#1A1A17]/85 text-[#C5A059] border border-[#C5A059]/40 backdrop-blur-md">
                      {hoveredItem.apartmentLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-0.5">
                      Aperçu Immédiat
                    </span>
                    <h4 className="text-lg font-serif font-medium">
                      {hoveredItem.name}
                    </h4>
                  </div>
                </div>

                {/* Détails du panneau */}
                <div className="space-y-3 px-1">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs space-y-1.5 font-sans">
                    <div className="text-[#C5A059] font-medium flex items-center gap-1.5">
                      <span>✦</span>
                      <span>{hoveredItem.highlightInclusion}</span>
                    </div>
                    <p className="text-white/70 leading-relaxed font-light">
                      {hoveredItem.specs.livingRoomAccess}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[11px] text-white/50 block font-sans uppercase">Tarif indicatif</span>
                      <span className="text-xl font-serif text-[#C5A059] font-semibold">
                        {hoveredItem.priceDisplay}
                      </span>
                      <span className="text-xs text-white/50 ml-1 font-sans">{hoveredItem.priceUnit}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenDrawer(hoveredItem)}
                      className="px-5 py-2.5 rounded-xl bg-[#C5A059] text-[#14100E] font-semibold text-xs uppercase tracking-wider hover:bg-[#d6b26c] transition-all shadow-md active:scale-95 flex items-center gap-2"
                    >
                      <span>Configurer &amp; Réserver</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl border border-dashed border-white/20 flex items-center justify-center text-white/40 text-sm font-sans">
                Survolez un hébergement pour en afficher la vue
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TIROIR DYNAMIQUE */}
      <LodgingDrawer
        item={selectedItem}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
};

export default LodgingCatalog;
