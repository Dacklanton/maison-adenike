'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const BrandBook: React.FC = () => {
  const TOTAL_SPREADS = 7;
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const nextSpread = () => {
    if (currentSpread < TOTAL_SPREADS - 1) {
      setCurrentSpread((prev) => prev + 1);
    }
  };

  const prevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
        showToast('Mode plein écran activé');
      }).catch(() => {
        showToast('Plein écran non supporté');
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        showToast('Mode plein écran désactivé');
      });
    }
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://maison-adenike.vercel.app/livre';
    const text = `Découvrez la Maison Adénikè à Ouidah : chambres d'hôtes de charme, restaurant de terroir et cadre verdoyant au Bénin.\n\n📖 Consulter le livret en ligne :\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPDF = () => {
    showToast('Préparation du document PDF...', 1600);
    setTimeout(() => {
      window.print();
    }, 350);
  };

  const handleExportPNG = async () => {
    showToast('Génération de la capture haute définition...', 2000);
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.html2canvas && bookRef.current) {
        // @ts-ignore
        const canvas = await window.html2canvas(bookRef.current, { scale: 2, useCORS: true, backgroundColor: null });
        const link = document.createElement('a');
        const tag = currentSpread === 0 ? 'Couverture' : currentSpread === TOTAL_SPREADS - 1 ? 'Dos' : `Spread-${currentSpread}`;
        link.download = `Maison-Adenike-Livret-${tag}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('Page exportée avec succès !');
      } else {
        window.print();
      }
    } catch (e) {
      window.print();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSpread();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSpread(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSpread(TOTAL_SPREADS - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpread]);

  const getPaginationLabel = () => {
    if (currentSpread === 0) return 'Page 01 / 12';
    if (currentSpread === TOTAL_SPREADS - 1) return 'Page 12 / 12';
    const left = String(currentSpread * 2).padStart(2, '0');
    const right = String(currentSpread * 2 + 1).padStart(2, '0');
    return `${left} — ${right} / 12`;
  };

  return (
    <div className="relative w-full h-screen bg-[#080605] text-[#FAF8F5] overflow-hidden flex flex-col justify-between select-none">
      
      {/* Texture & Gradients de fond */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(197,160,89,0.08)_0%,transparent_60%)]" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#120D0A]/95 border border-[#C5A059] text-white px-6 py-2 rounded-full text-xs tracking-widest shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <span className="text-[#C5A059]">✦</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="h-14 px-6 flex items-center justify-between z-40 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <a href="/" className="flex items-center gap-3 text-inherit no-underline">
          <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 overflow-hidden shadow-md flex items-center justify-center bg-[#C5A059]/10">
            <Image src="/assets/images/logo-adenike.png" alt="Logo Maison Adénikè" width={26} height={26} className="object-contain" />
          </div>
          <div>
            <span className="font-serif tracking-[0.2em] text-xs uppercase block font-semibold text-[#E2C275]">Maison Adénikè</span>
            <span className="text-[9px] text-[#A69282] tracking-[0.2em] uppercase">Résidence &amp; Table • Ouidah</span>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="/restaurant"
            className="text-xs tracking-wider px-3.5 py-1 rounded-full border border-[#C5A059]/30 bg-[#1A130F]/70 text-[#F7E9C4] hover:bg-[#C5A059] hover:text-[#080605] transition-all"
          >
            🍽️ Le Restaurant
          </a>
          <a
            href="/chambres"
            className="text-xs tracking-wider px-3.5 py-1 rounded-full border border-[#C5A059]/30 bg-[#1A130F]/70 text-[#F7E9C4] hover:bg-[#C5A059] hover:text-[#080605] transition-all"
          >
            🛏️ Nos Chambres
          </a>
          <a
            href="https://wa.me/2290155456363"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#C5A059] bg-[#C5A059]/15 text-[#FFF] hover:bg-[#C5A059] hover:text-[#080605] transition-all"
          >
            🛎️ Réserver
          </a>
        </div>
      </header>

      {/* Scène 3D Interactive */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10" style={{ perspective: '2400px' }}>
        
        <div className="absolute bottom-[6%] w-[75%] max-w-[980px] h-10 bg-radial-gradient from-black/90 to-transparent blur-xl pointer-events-none" />

        {/* Flèches latérales */}
        {currentSpread > 0 && (
          <button
            type="button"
            onClick={prevSpread}
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#120D0A]/80 border border-[#C5A059]/30 text-[#C5A059] items-center justify-center hover:bg-[#C5A059] hover:text-black transition-all z-30 shadow-xl"
            title="Page précédente"
          >
            ←
          </button>
        )}

        {currentSpread < TOTAL_SPREADS - 1 && (
          <button
            type="button"
            onClick={nextSpread}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#120D0A]/80 border border-[#C5A059]/30 text-[#C5A059] items-center justify-center hover:bg-[#C5A059] hover:text-black transition-all z-30 shadow-xl"
            title="Page suivante"
          >
            →
          </button>
        )}

        {/* Le Livre Format Carré de Prestige 21x21 cm */}
        <motion.div
          ref={bookRef}
          layout
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className={`relative shadow-[0_35px_80px_rgba(0,0,0,0.85)] rounded-lg overflow-hidden border border-[#C5A059]/30 ${
            currentSpread === 0 || currentSpread === TOTAL_SPREADS - 1
              ? 'w-[88vw] max-w-[500px] aspect-square'
              : 'w-[94vw] max-w-[1020px] aspect-[2/1]'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Pliure centrale */}
          {currentSpread > 0 && currentSpread < TOTAL_SPREADS - 1 && (
            <div className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2 bg-gradient-to-r from-black/25 via-black/5 to-black/25 pointer-events-none z-30 shadow-[inset_1px_0_0_rgba(255,255,255,0.08),inset_-1px_0_0_rgba(255,255,255,0.08)]" />
          )}

          {/* SPREAD 0 : COUVERTURE FERMÉE (PAGE 1) */}
          {currentSpread === 0 && (
            <motion.div
              key="spread-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-gradient-to-br from-[#221813] to-[#0E0A08] border-[3px] border-double border-[#C5A059] p-8 flex flex-col justify-between items-center text-center shadow-inner relative"
            >
              <div className="absolute inset-3 border border-[#C5A059]/30 pointer-events-none" />
              
              <div>
                <span className="text-[10px] tracking-[0.35em] text-[#C5A059] uppercase block mb-3 font-semibold">
                  ✦ RÉSIDENCE DE CHARME &amp; TABLE GOURMANDE ✦
                </span>
                <div className="w-20 h-20 mx-auto rounded-full border border-[#C5A059] p-1 shadow-lg shadow-[#C5A059]/20 flex items-center justify-center bg-[#C5A059]/10">
                  <Image src="/assets/images/logo-adenike.png" alt="Monogramme MA" width={64} height={64} className="rounded-full object-cover" />
                </div>
              </div>

              <div>
                <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6E5] via-[#E2C275] to-[#C5A059] uppercase mb-1">
                  L'ÉCRIN DE OUIDAH
                </h1>
                <p className="font-serif italic text-sm text-[#F7E9C4] mb-3">Maison d'Hôtes &amp; Saveurs Locales</p>
                <p className="text-xs text-[#C2B0A1] max-w-sm mx-auto leading-relaxed">
                  Un havre de paix ombragé, une table béninoise authentique et des chambres confortables pour un séjour inoubliable à Ouidah.
                </p>

                <button
                  type="button"
                  onClick={nextSpread}
                  className="mt-5 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#E2C275] to-[#C5A059] text-[#080605] font-bold text-xs tracking-widest uppercase shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
                >
                  <span>Découvrir la maison</span>
                  <span>→</span>
                </button>
              </div>

              <div>
                <div className="font-serif text-xs tracking-[0.25em] text-[#E2C275] mb-1">MAISON ADÉNIKÈ</div>
                <span className="text-[9px] tracking-[0.3em] text-[#C5A059] uppercase font-semibold">Hébergement &amp; Restaurant • Ouidah, Bénin</span>
              </div>
            </motion.div>
          )}

          {/* SPREAD 1 : LE PORTAIL & L'ACCUEIL (PAGES 02 & 03) */}
          {currentSpread === 1 && (
            <div className="w-full h-full flex bg-[#FAF8F5] text-[#1F1612]">
              {/* Page 02 : Portail réel en bambou & vignettes */}
              <div className="w-1/2 h-full p-6 flex flex-col justify-between border-r border-[#E8DFD3]">
                <div className="h-[88%] flex flex-col gap-2">
                  <div className="relative w-full h-[65%] rounded overflow-hidden shadow-sm border border-[#C5A059]/25">
                    <Image src="/assets/images/portail-bambou-adenike.jpg" alt="Le portail d'accueil de la Maison Adénikè" fill className="object-cover" />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/85 text-white text-[9px] rounded-full border border-[#C5A059] uppercase tracking-wider">
                      ✦ Bienvenue à la Maison Adénikè
                    </span>
                  </div>
                  <div className="w-full h-[35%] grid grid-cols-2 gap-2">
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/chambre-confort-adenike.jpg" alt="Chambres d'hôtes soignées" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Lodges d'hôtes &amp; confort soigné</span>
                    </div>
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/terrasse-restaurant-adenike.jpg" alt="Terrasse extérieure" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Terrasse extérieure accueillante</span>
                    </div>
                  </div>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span className="text-[#C5A059] font-serif">Maison Adénikè</span>
                  <span>02</span>
                </div>
              </div>

              {/* Page 03 : Texte L'Adresse Confidentielle */}
              <div className="w-1/2 h-full p-6 flex flex-col justify-between">
                <div className="h-[88%] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A83B24] tracking-widest block mb-1">✦ Chapitre I • L'Adresse Confidentielle</span>
                    <h2 className="font-serif text-xl font-bold mb-2 text-[#1F1612]">Un Sanctuaire Préservé <span className="italic font-normal text-[#A83B24]">à Ouidah</span></h2>
                    <p className="font-serif italic text-xs text-[#5C4B40] border-l-2 border-[#C5A059] pl-2.5 mb-2 leading-relaxed">
                      « Derrière son portail traditionnel s'ouvre une demeure discrète, sécurisée et verdoyante, pensée pour recevoir personnalités, délégations et hôtes d'exception. »
                    </p>
                    <p className="text-[11px] leading-relaxed text-[#3D2D23] mb-2">
                      Idéalement située au cœur de la cité historique de Ouidah, la Maison Adénikè conjugue intimité absolue, calme reposant et haute hospitalité. Protégée par son jardin arboré de manguiers centenaires et sa cour aérée, la résidence offre un cadre sécurisé où chaque hôte bénéficie d'une conciergerie sur-mesure.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#F5EFEB] p-1.5 rounded border border-[#C5A059]/30">
                    <div className="relative w-14 h-11 rounded overflow-hidden flex-shrink-0 border border-[#C5A059]/20">
                      <Image src="/assets/images/chambre-confort-adenike.jpg" alt="Chambres soignées et calmes" fill className="object-cover" />
                    </div>
                    <div className="text-[10px] text-[#5C4B40] leading-tight">
                      <strong className="block text-[#1F1612] font-serif">Intimité &amp; Sérénité</strong>
                      Un havre préservé du tumulte pour vos séjours officiels, professionnels ou privés.
                    </div>
                  </div>

                  <ul className="text-[10px] space-y-1 text-[#1F1612]">
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> Discrétion absolue, calme et sécurité au cœur de Ouidah.</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> Accueil d'élite et conciergerie privée à l'écoute de vos besoins.</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> Emplacement stratégique pour vos déplacements et visites historiques.</li>
                  </ul>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span>03</span>
                  <span className="text-[#C5A059] font-serif">L'Adresse Confidentielle</span>
                </div>
              </div>
            </div>
          )}

          {/* SPREAD 2 : LE RESTAURANT & LA CARTE (PAGES 04 & 05) */}
          {currentSpread === 2 && (
            <div className="w-full h-full flex bg-[#FAF8F5] text-[#1F1612]">
              {/* Page 04 : Présentation du plat Bômiwo Royal */}
              <div className="w-1/2 h-full p-6 flex flex-col justify-between border-r border-[#E8DFD3]">
                <div className="h-[88%] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A83B24] tracking-widest block mb-1">✦ Chapitre II • Table &amp; Terroir d'Honneur</span>
                    <h2 className="font-serif text-xl font-bold mb-1 text-[#1F1612]">Le Cérémonial du <span className="italic font-normal text-[#A83B24]">Bômiwo Royal</span></h2>
                    <p className="font-serif italic text-[11px] text-[#5C4B40] border-l-2 border-[#C5A059] pl-2 mb-2 leading-relaxed">
                      « Une célébration vivante des saveurs royales béninoises, sublimant le mythique Bômiwo et les cuissons d'argile sous notre pergola de bambou. »
                    </p>
                  </div>

                  {/* Visuel du plat Bômiwo sur canaris d'argile et feuille de bananier */}
                  <div className="relative w-full h-[44%] rounded overflow-hidden shadow-sm border border-[#C5A059]/30">
                    <Image src="/assets/images/bomiwo-specialite-adenike.jpg" alt="Plat signature Bômiwo Royal en canaris traditionnels de la Maison Adénikè" fill className="object-cover" />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/85 text-white text-[8px] rounded-full border border-[#C5A059] uppercase tracking-wider">
                      ✦ Spécialité d'Honneur • Cuisson d'Argile ✦
                    </span>
                  </div>

                  {/* Descriptif authentique du rituel */}
                  <div className="bg-[#F5EFEB] p-2 rounded border border-[#C5A059]/30 text-[10px] text-[#5C4B40]">
                    <strong className="block text-[#1F1612] font-serif mb-0.5">Pâte Rouge d'Héritage au Feu de Bois</strong>
                    Cuisiné chaque jour à Ouidah en canaris de terre cuite, le Bômiwo mijote dans un bouillon aromatique. Dressé sur feuille de bananier avec volaille fermière, escargots du terroir et piments doux pilés au mortier.
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="bg-[#C5A059]/15 border border-[#C5A059] px-2.5 py-0.5 rounded-full text-[#26160F]">Festin Complet : 5 000 FCFA</span>
                    <span className="bg-[#C5A059]/15 border border-[#C5A059] px-2.5 py-0.5 rounded-full text-[#26160F]">Demi-Portion : 3 000 FCFA</span>
                  </div>

                  <p className="text-[9px] text-[#5C4B40] italic">
                    ✦ Merci de passer commande à l'avance pour qu'on puisse vous satisfaire au mieux.
                  </p>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span className="text-[#C5A059] font-serif">Maison Adénikè</span>
                  <span>04</span>
                </div>
              </div>

              {/* Page 05 : Grille de 6 photos de plats réels avec tarifs officiels */}
              <div className="w-1/2 h-full p-6 flex flex-col justify-between">
                <div className="h-[88%] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A83B24] tracking-widest block mb-0.5">✦ Chapitre II (suite) • La Carte Officielle</span>
                    <h2 className="font-serif text-lg font-bold text-[#1F1612]">L'Excellence Culinaire <span className="italic font-normal text-[#A83B24]">de Ouidah</span></h2>
                    <p className="text-[9px] text-[#5C4B40] italic">Cuisinée chaque jour à Ouidah au feu de bois et en canaris d'argile.</p>
                  </div>

                  {/* Grille 3x2 des 6 plats réels */}
                  <div className="grid grid-cols-3 grid-rows-2 gap-2 flex-1 mt-2">
                    {/* Plat 1 : Bar Braisé (8 500 F) */}
                    <div className="flex flex-col rounded overflow-hidden border border-[#C5A059]/25 shadow-xs bg-white">
                      <div className="relative w-full h-[70%] bg-black">
                        <Image src="/assets/images/poisson-braise-riz.jpg" alt="Bar Braisé au Feu de Bois" fill className="object-cover" />
                        <span className="absolute top-1 right-1 bg-black/90 border border-[#C5A059] text-[#E2C275] text-[7px] font-bold px-1 rounded-full">8 500 F</span>
                      </div>
                      <div className="h-[30%] bg-[#FAF8F5] p-1 flex flex-col justify-center text-center">
                        <span className="font-serif text-[8px] font-bold uppercase truncate text-[#1F1612]">Bar Braisé</span>
                        <span className="text-[7px] text-[#A83B24] font-semibold truncate">Pêche côtière &amp; alloco</span>
                      </div>
                    </div>

                    {/* Plat 2 : Poulet Bicyclette (7 500 F) */}
                    <div className="flex flex-col rounded overflow-hidden border border-[#C5A059]/25 shadow-xs bg-white">
                      <div className="relative w-full h-[70%] bg-black">
                        <Image src="/assets/images/poulet-braise-assiette.jpg" alt="Poulet Bicyclette Fermier" fill className="object-cover" />
                        <span className="absolute top-1 right-1 bg-black/90 border border-[#C5A059] text-[#E2C275] text-[7px] font-bold px-1 rounded-full">7 500 F</span>
                      </div>
                      <div className="h-[30%] bg-[#FAF8F5] p-1 flex flex-col justify-center text-center">
                        <span className="font-serif text-[8px] font-bold uppercase truncate text-[#1F1612]">Poulet Bicyclette</span>
                        <span className="text-[7px] text-[#A83B24] font-semibold truncate">Volaille à la braise</span>
                      </div>
                    </div>

                    {/* Plat 3 : Riz au Gras Poisson (2 500 / 3 000 F) */}
                    <div className="flex flex-col rounded overflow-hidden border border-[#C5A059]/25 shadow-xs bg-white">
                      <div className="relative w-full h-[70%] bg-black">
                        <Image src="/assets/images/plat-poisson-entier-riz-gras.jpg" alt="Riz au gras poisson de jour" fill className="object-cover" />
                        <span className="absolute top-1 right-1 bg-black/90 border border-[#C5A059] text-[#E2C275] text-[7px] font-bold px-1 rounded-full">2.5k / 3k F</span>
                      </div>
                      <div className="h-[30%] bg-[#FAF8F5] p-1 flex flex-col justify-center text-center">
                        <span className="font-serif text-[8px] font-bold uppercase truncate text-[#1F1612]">Riz au Gras Poisson</span>
                        <span className="text-[7px] text-[#A83B24] font-semibold truncate">Poisson frais du jour</span>
                      </div>
                    </div>

                    {/* Plat 4 : Bomiwo de Luxe Complet (5 000 F) */}
                    <div className="flex flex-col rounded overflow-hidden border border-[#C5A059]/25 shadow-xs bg-white">
                      <div className="relative w-full h-[70%] bg-black">
                        <Image src="/assets/images/bomiwo-specialite-adenike.jpg" alt="Bomiwo de luxe complet" fill className="object-cover" />
                        <span className="absolute top-1 right-1 bg-black/90 border border-[#C5A059] text-[#E2C275] text-[7px] font-bold px-1 rounded-full">5 000 F</span>
                      </div>
                      <div className="h-[30%] bg-[#FAF8F5] p-1 flex flex-col justify-center text-center">
                        <span className="font-serif text-[8px] font-bold uppercase truncate text-[#1F1612]">Bomiwo de Luxe</span>
                        <span className="text-[7px] text-[#A83B24] font-semibold truncate">Festin en canaris</span>
                      </div>
                    </div>

                    {/* Plat 5 : Bomiwo Demi-Portion (3 000 F) */}
                    <div className="flex flex-col rounded overflow-hidden border border-[#C5A059]/25 shadow-xs bg-white">
                      <div className="relative w-full h-[70%] bg-black">
                        <Image src="/assets/images/bomiwo-assiette-individuelle.jpg" alt="Bomiwo demi-portion" fill className="object-cover" />
                        <span className="absolute top-1 right-1 bg-black/90 border border-[#C5A059] text-[#E2C275] text-[7px] font-bold px-1 rounded-full">3 000 F</span>
                      </div>
                      <div className="h-[30%] bg-[#FAF8F5] p-1 flex flex-col justify-center text-center">
                        <span className="font-serif text-[8px] font-bold uppercase truncate text-[#1F1612]">Bomiwo 1 Assiette</span>
                        <span className="text-[7px] text-[#A83B24] font-semibold truncate">Sur feuille de bananier</span>
                      </div>
                    </div>

                    {/* Plat 6 : Atassi Royal (3 000 / 3 500 F) */}
                    <div className="flex flex-col rounded overflow-hidden border border-[#C5A059]/25 shadow-xs bg-white">
                      <div className="relative w-full h-[70%] bg-black">
                        <Image src="/assets/images/festin-canaris-terre-cuite.jpg" alt="Atassi Royal traditionnel" fill className="object-cover" />
                        <span className="absolute top-1 right-1 bg-black/90 border border-[#C5A059] text-[#E2C275] text-[7px] font-bold px-1 rounded-full">3k / 3.5k F</span>
                      </div>
                      <div className="h-[30%] bg-[#FAF8F5] p-1 flex flex-col justify-center text-center">
                        <span className="font-serif text-[8px] font-bold uppercase truncate text-[#1F1612]">Atassi Royal</span>
                        <span className="text-[7px] text-[#A83B24] font-semibold truncate">Riz &amp; haricots d'Adénikè</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#F5EFEB] p-1.5 rounded border border-[#C5A059]/25 text-[9px] mt-2">
                    <span className="text-[#5C4B40] italic">✦ Commande à l'avance recommandée.</span>
                    <span className="font-serif font-bold text-[#26160F]">Tél : 01 55 45 63 63</span>
                  </div>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span>05</span>
                  <span className="text-[#C5A059] font-serif">La Carte du Terroir</span>
                </div>
              </div>
            </div>
          )}

          {/* SPREAD 3 : LES CHAMBRES & L'HÉBERGEMENT (PAGES 06 & 07) */}
          {currentSpread === 3 && (
            <div className="w-full h-full flex bg-[#FAF8F5] text-[#1F1612]">
              {/* Page 06 : Photo réelle de la chambre */}
              <div className="w-1/2 h-full p-6 flex flex-col justify-between border-r border-[#E8DFD3]">
                <div className="h-[88%] flex flex-col gap-2">
                  <div className="relative w-full h-[65%] rounded overflow-hidden shadow-sm border border-[#C5A059]/25">
                    <Image src="/assets/images/chambre-confort-adenike.jpg" alt="Chambre soignée et lumineuse" fill className="object-cover" />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/85 text-white text-[9px] rounded-full border border-[#C5A059] uppercase tracking-wider">
                      ✦ Nos Chambres • Confort &amp; Sérénité
                    </span>
                  </div>
                  <div className="w-full h-[35%] grid grid-cols-2 gap-2">
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/espace-lounge-teck.jpg" alt="Espace détente" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Salon détente &amp; bois massif</span>
                    </div>
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/sejour-ouidah.jpg" alt="Terrasse privative" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Terrasse privative au calme</span>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span className="text-[#C5A059] font-serif">Maison Adénikè</span>
                  <span>06</span>
                </div>
              </div>

              {/* Page 07 : Demeures de Charme & Repos Absolu (chambres.html) */}
              <div className="w-1/2 h-full p-6 flex flex-col justify-between">
                <div className="h-[88%] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A83B24] tracking-widest block mb-1">✦ Chapitre III • Lodges &amp; Demeures de Charme</span>
                    <h2 className="font-serif text-xl font-bold mb-1.5 text-[#1F1612]">Demeures de Charme <span className="italic font-normal text-[#A83B24]">&amp; Repos Absolu</span></h2>
                    <p className="font-serif italic text-xs text-[#5C4B40] border-l-2 border-[#C5A059] pl-2.5 mb-2 leading-relaxed">
                      « Des suites d'exception façonnées de teck noble et de lin brut au cœur de Ouidah, pensées pour un repos absolu et l'intimité d'une escale hors du temps. »
                    </p>
                    <p className="text-[11px] leading-relaxed text-[#3D2D23] mb-2">
                      Fidèle à notre devise yoruba <em>« Ibi yìí L'ọkàn ń Sinmi »</em>, la Maison Adénikè offre à ses hôtes l'alliance rare du confort moderne et de la sérénité de Ouidah. Climatisation silencieuse, grands lits King-Size avec literie d'exception et terrasses ouvrant sur le jardin.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#F5EFEB] p-1.5 rounded border border-[#C5A059]/30">
                    <div className="relative w-14 h-11 rounded overflow-hidden flex-shrink-0 border border-[#C5A059]/20">
                      <Image src="/assets/images/espace-lounge-teck.jpg" alt="Salon détente en teck" fill className="object-cover" />
                    </div>
                    <div className="text-[10px] text-[#5C4B40] leading-tight">
                      <strong className="block text-[#1F1612] font-serif">Salon en Bois de Teck</strong>
                      Espace de travail et salon lounge pour vos moments de quiétude et vos dossiers confidentiels.
                    </div>
                  </div>

                  <ul className="text-[10px] space-y-1 text-[#1F1612]">
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> <strong>Suite Royale (55 000 F/nuit)</strong> : Lit King-Size, salon lounge, terrasse privative.</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> <strong>Lodge Exécutif (45 000 F/nuit)</strong> : Espace bureau, climatisation silencieuse.</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> <strong>Lodge Sérénité (38 000 F/nuit)</strong> : Calme absolu, petit-déjeuner inclus.</li>
                  </ul>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span>07</span>
                  <span className="text-[#C5A059] font-serif">Lodges &amp; Repos</span>
                </div>
              </div>
            </div>
          )}

          {/* SPREAD 4 : SOIRÉES & ÉVÉNEMENTS (PAGES 08 & 09) */}
          {currentSpread === 4 && (
            <div className="w-full h-full flex bg-[#FAF8F5] text-[#1F1612]">
              <div className="w-1/2 h-full p-6 flex flex-col justify-between border-r border-[#E8DFD3]">
                <div className="h-[88%] flex flex-col gap-2">
                  <div className="relative w-full h-[65%] rounded overflow-hidden shadow-sm border border-[#C5A059]/25">
                    <Image src="/assets/images/affiche-concert-24-octobre.jpg" alt="Affiche concerts et soirées" fill className="object-cover" />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/85 text-white text-[9px] rounded-full border border-[#C5A059] uppercase tracking-wider">
                      ✦ Soirées Vivantes &amp; Concerts
                    </span>
                  </div>
                  <div className="w-full h-[35%] grid grid-cols-2 gap-2">
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/ambiance-fete-adenike.jpg" alt="Fêtes sous les guirlandes" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Fêtes sous les guirlandes</span>
                    </div>
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/events/ricos-campos-24-octobre.jpg" alt="Concerts acoustiques" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Concerts acoustiques intimistes</span>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span className="text-[#C5A059] font-serif">Maison Adénikè</span>
                  <span>08</span>
                </div>
              </div>

              <div className="w-1/2 h-full p-6 flex flex-col justify-between">
                <div className="h-[88%] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A83B24] tracking-widest block mb-1">✦ Chapitre IV • L'Agenda Culturel &amp; Festif</span>
                    <h2 className="font-serif text-xl font-bold mb-1.5 text-[#1F1612]">Moments d'Exception <span className="italic font-normal text-[#A83B24]">&amp; Scène Vivante</span></h2>
                    <p className="font-serif italic text-xs text-[#5C4B40] border-l-2 border-[#C5A059] pl-2.5 mb-2 leading-relaxed">
                      « L'émotion des nuits sous les étoiles : à la Maison Adénikè, les soirées s'étirent au rythme des voix béninoises et des cuissons au feu de braise. »
                    </p>
                    <p className="text-[11px] leading-relaxed text-[#3D2D23] mb-2">
                      La Maison Adénikè accueille les grands moments de convivialité de Ouidah. Dîners-concerts acoustiques exclusifs sous la voûte en bambou ornée de calebasses, accueil officiel des Vodoun Days (du 2 au 9 janvier 2027), dîners secrets sous canisse en 5 services et veillées au coin du brasero.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#F5EFEB] p-1.5 rounded border border-[#C5A059]/30">
                    <div className="relative w-14 h-11 rounded overflow-hidden flex-shrink-0 border border-[#C5A059]/20">
                      <Image src="/assets/images/bar-cocktails.jpg" alt="Le bar" fill className="object-cover" />
                    </div>
                    <div className="text-[10px] text-[#5C4B40] leading-tight">
                      <strong className="block text-[#1F1612] font-serif">Soto Royal &amp; Bar d'Adénikè</strong>
                      Liqueur d'héritage macérée aux écorces nobles (4 500 FCFA), cocktails maison et nectars frais.
                    </div>
                  </div>

                  <ul className="text-[10px] space-y-1 text-[#1F1612]">
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> <strong>Vodoun Days 2027</strong> : Hébergement préservé et festins royaux du 2 au 9 janvier.</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> <strong>Concerts Lives sous Pergola</strong> : 2 Salons VIP champagne (100 000 F/salon).</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> <strong>Dîners Secrets sous Canisse</strong> : Table impériale en 5 services (24 convives max).</li>
                  </ul>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span>09</span>
                  <span className="text-[#C5A059] font-serif">Soirées &amp; Célébrations</span>
                </div>
              </div>
            </div>
          )}

          {/* SPREAD 5 : PRIVATISATION & GROUPES (PAGES 10 & 11) */}
          {currentSpread === 5 && (
            <div className="w-full h-full flex bg-[#FAF8F5] text-[#1F1612]">
              <div className="w-1/2 h-full p-6 flex flex-col justify-between border-r border-[#E8DFD3]">
                <div className="h-[88%] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A83B24] tracking-widest block mb-1">✦ Chapitre V • Privatisation &amp; Réceptions</span>
                    <h2 className="font-serif text-xl font-bold mb-1.5 text-[#1F1612]">Privatisation du Domaine <span className="italic font-normal text-[#A83B24]">&amp; Banquets</span></h2>
                    <p className="font-serif italic text-xs text-[#5C4B40] border-l-2 border-[#C5A059] pl-2.5 mb-2 leading-relaxed">
                      « Réservez l'entièreté de la Maison Adénikè pour vos mariages civils, comités de direction, délégations officielles ou retraites d'entreprises. »
                    </p>
                    <p className="text-[11px] leading-relaxed text-[#3D2D23] mb-2">
                      Pour vos réceptions exigeant une confidentialité absolue et un cadre sécurisé, la Maison Adénikè met l'intégralité de son domaine à votre disposition exclusive. Chambres, pergola de bambou, cour arborée et terrasses vous sont entièrement réservées sans public extérieur, avec notre brigade dédiée.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#F5EFEB] p-1.5 rounded border border-[#C5A059]/30">
                    <div className="relative w-14 h-11 rounded overflow-hidden flex-shrink-0 border border-[#C5A059]/20">
                      <Image src="/assets/images/equipe-mur-rouge.jpg" alt="L'équipe de la maison" fill className="object-cover" />
                    </div>
                    <div className="text-[10px] text-[#5C4B40] leading-tight">
                      <strong className="block text-[#1F1612] font-serif">Brigade de Cuisine Dédiée</strong>
                      Buffets Bômiwo en canaris d'argile, poissons braisés côtiers et service soigné sur-mesure.
                    </div>
                  </div>

                  <ul className="text-[10px] space-y-1 text-[#1F1612]">
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> Domaine clos et sécurisé 24h/24, calme et discrétion totale.</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> Banquets d'exception jusqu'à 80 convives ou réunions de direction.</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#C5A059]">✦</span> Devis personnalisé avec date garantie par acompte Mobile Money.</li>
                  </ul>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span className="text-[#C5A059] font-serif">Maison Adénikè</span>
                  <span>10</span>
                </div>
              </div>

              <div className="w-1/2 h-full p-6 flex flex-col justify-between">
                <div className="h-[88%] flex flex-col gap-2">
                  <div className="relative w-full h-[65%] rounded overflow-hidden shadow-sm border border-[#C5A059]/25">
                    <Image src="/assets/images/terrasse-restaurant-adenike.jpg" alt="Terrasse le soir" fill className="object-cover" />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 bg-black/85 text-white text-[9px] rounded-full border border-[#C5A059] uppercase tracking-wider">
                      ✦ Réceptions &amp; Grandes Tablées
                    </span>
                  </div>
                  <div className="w-full h-[35%] grid grid-cols-2 gap-2">
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/evenements-reception.jpg" alt="Banquets de fête" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Banquets &amp; repas de famille</span>
                    </div>
                    <div className="relative h-full rounded overflow-hidden border border-[#C5A059]/20">
                      <Image src="/assets/images/diner-terrasse.jpg" alt="Dîners sous les étoiles" fill className="object-cover" />
                      <span className="absolute bottom-0 inset-x-0 p-1 bg-gradient-to-t from-black/80 to-transparent text-[8px] text-[#F7E9C4] truncate px-1.5">Dîners sous les étoiles</span>
                    </div>
                  </div>
                </div>

                <div className="text-[9px] uppercase tracking-widest text-[#8A766A] flex justify-between border-t border-[#C5A059]/20 pt-1.5">
                  <span>11</span>
                  <span className="text-[#C5A059] font-serif">Vos Moments Privés</span>
                </div>
              </div>
            </div>
          )}

          {/* SPREAD 6 : DOS DE COUVERTURE FERMÉE (PAGE 12) */}
          {currentSpread === 6 && (
            <motion.div
              key="spread-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-gradient-to-br from-[#221813] to-[#0E0A08] border-[3px] border-double border-[#C5A059] p-8 flex flex-col justify-between items-center text-center shadow-inner relative"
            >
              <div className="absolute inset-3 border border-[#C5A059]/30 pointer-events-none" />

              <div>
                <span className="text-[10px] tracking-[0.35em] text-[#C5A059] uppercase block mb-2 font-semibold">
                  ✦ NOUS VOUS ATTENDONS AVEC JOIE ✦
                </span>
                <div className="w-16 h-16 mx-auto rounded-full border border-[#C5A059] p-1 shadow-md shadow-[#C5A059]/20 flex items-center justify-center bg-[#C5A059]/10">
                  <Image src="/assets/images/logo-adenike.png" alt="Logo" width={48} height={48} className="rounded-full object-cover" />
                </div>
                <h2 className="font-serif text-lg tracking-widest text-white uppercase mt-2">MAISON ADÉNIKÈ</h2>
                <p className="font-serif italic text-xs text-[#E2C275]">Résidence de Charme • Restaurant • Événements</p>
                <p className="text-[10px] text-[#C5A059] mt-1 italic">« Ibi yìí L'ọkàn ń Sinmi »</p>
              </div>

              <div>
                <div className="bg-[#FAF8F5] p-2 rounded-lg border border-[#C5A059] inline-block shadow-lg">
                  <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 block" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="#FAF8F5"/>
                    <rect x="10" y="10" width="24" height="24" stroke="#1C1512" strokeWidth="4" fill="none"/>
                    <rect x="16" y="16" width="12" height="12" fill="#C5A059"/>
                    <rect x="66" y="10" width="24" height="24" stroke="#1C1512" strokeWidth="4" fill="none"/>
                    <rect x="72" y="16" width="12" height="12" fill="#C5A059"/>
                    <rect x="10" y="66" width="24" height="24" stroke="#1C1512" strokeWidth="4" fill="none"/>
                    <rect x="16" y="72" width="12" height="12" fill="#C5A059"/>
                    <rect x="42" y="12" width="6" height="6" fill="#1C1512"/>
                    <rect x="52" y="12" width="6" height="6" fill="#C5A059"/>
                    <rect x="42" y="24" width="6" height="6" fill="#C5A059"/>
                    <rect x="12" y="42" width="6" height="6" fill="#1C1512"/>
                    <rect x="24" y="42" width="6" height="6" fill="#C5A059"/>
                    <rect x="36" y="36" width="12" height="6" fill="#1C1512"/>
                    <rect x="42" y="48" width="16" height="16" fill="#1C1512"/>
                    <rect x="46" y="52" width="8" height="8" fill="#C5A059"/>
                    <rect x="66" y="42" width="8" height="8" fill="#1C1512"/>
                    <rect x="80" y="42" width="8" height="8" fill="#C5A059"/>
                    <rect x="42" y="72" width="6" height="16" fill="#1C1512"/>
                    <rect x="54" y="78" width="10" height="6" fill="#C5A059"/>
                    <rect x="72" y="72" width="14" height="14" fill="#1C1512"/>
                  </svg>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-[#F7E9C4] mt-1.5">Scannez pour réserver en ligne</p>
              </div>

              <div className="leading-tight">
                <p className="text-[10px] text-white font-semibold uppercase tracking-wider">Réservations &amp; Conciergerie 7j/7</p>
                <p className="font-serif text-sm tracking-wider text-[#E2C275] my-0.5">+229 01 55 45 63 63 &nbsp;•&nbsp; 01 53 83 83 63</p>
                <p className="text-[9px] text-[#F7E9C4]">Ligne Diaspora / Europe : +33 7 80 73 25 94</p>
                <p className="text-[9px] text-[#A69282] mt-0.5">Quartier Lêbou / Gomè, Ouidah, Bénin</p>
                <p className="text-[8px] text-[#C2B0A1] italic mt-0.5">✦ Acompte MTN MoMo requis pour validation ferme</p>
                
                <button
                  type="button"
                  onClick={() => setCurrentSpread(0)}
                  className="mt-3 px-5 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E2C275] hover:bg-[#C5A059] hover:text-black text-[10px] tracking-widest uppercase transition-all"
                >
                  Feuilleter à nouveau ↺
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </main>

      {/* Floating Glass Dock */}
      <footer 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-black/60 border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl"
        role="toolbar"
        aria-label="Commandes du carnet"
      >
        <button
          type="button"
          onClick={prevSpread}
          disabled={currentSpread === 0}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-[#C5A059]/30 text-[#F7E9C4] hover:bg-[#C5A059] hover:text-black disabled:opacity-20 disabled:pointer-events-none transition-all"
          title="Page précédente"
        >
          ←
        </button>

        <div className="font-serif text-xs tracking-widest text-[#E2C275] font-semibold min-w-[100px] text-center">
          {getPaginationLabel()}
        </div>

        <button
          type="button"
          onClick={nextSpread}
          disabled={currentSpread === TOTAL_SPREADS - 1}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-[#C5A059]/30 text-[#F7E9C4] hover:bg-[#C5A059] hover:text-black disabled:opacity-20 disabled:pointer-events-none transition-all"
          title="Page suivante"
        >
          →
        </button>

        <div className="w-[1px] h-5 bg-white/15" />

        <button
          type="button"
          onClick={toggleFullscreen}
          className="text-xs text-[#FAF8F5] hover:text-[#E2C275] transition-colors flex items-center gap-1.5"
          title="Mode plein écran"
        >
          <span>⛶</span>
          <span className="hidden sm:inline">Plein écran</span>
        </button>

        <button
          type="button"
          onClick={handleExportPNG}
          className="text-xs text-[#FAF8F5] hover:text-[#E2C275] transition-colors flex items-center gap-1.5"
          title="Exporter la page affichée en PNG"
        >
          <span>📷</span>
          <span className="hidden sm:inline">Exporter PNG</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadPDF}
          className="text-xs text-[#E2C275] bg-[#C5A059]/20 border border-[#C5A059]/40 px-3 py-1 rounded-full hover:bg-[#C5A059] hover:text-black transition-all flex items-center gap-1.5"
          title="Imprimer en PDF"
        >
          <span>📄</span>
          <span>Imprimer PDF</span>
        </button>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="text-xs text-[#25D366] hover:scale-105 transition-transform flex items-center gap-1.5"
          title="Réserver sur WhatsApp"
        >
          <span>💬</span>
          <span className="hidden sm:inline">Réserver</span>
        </button>
      </footer>

    </div>
  );
};

export default BrandBook;
