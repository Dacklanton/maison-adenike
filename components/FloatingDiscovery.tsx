'use client';

import React, { useState, useEffect } from 'react';
import { DISCOVERY_FACTS, DiscoveryFact } from '@/data/lodging';

export const FloatingDiscovery: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFact, setCurrentFact] = useState<DiscoveryFact>(DISCOVERY_FACTS[0]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let hideTimeout: NodeJS.Timeout;
    let nextTimeout: NodeJS.Timeout;

    const scheduleNextShow = (delayMs: number) => {
      nextTimeout = setTimeout(() => {
        // Pick a random fact different from the current one
        const availableFacts = DISCOVERY_FACTS.filter(f => f.id !== currentFact.id);
        const randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)] || DISCOVERY_FACTS[0];
        setCurrentFact(randomFact);
        setIsVisible(true);

        // Hide after 6 seconds
        hideTimeout = setTimeout(() => {
          setIsVisible(false);
          // Next appearance after 15 to 25 seconds
          const randomInterval = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000;
          scheduleNextShow(randomInterval);
        }, 6000);
      }, delayMs);
    };

    // Initial appearance after 3.5 seconds
    scheduleNextShow(3500);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [dismissed, currentFact.id]);

  if (dismissed || !isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] sm:w-96 transition-all duration-700 ease-out transform translate-y-0 opacity-100"
      style={{
        animation: 'slideUpSmooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <div className="relative bg-[#1A1A17]/95 backdrop-blur-md border border-[#C5A059]/40 rounded-xl p-4 shadow-2xl shadow-black/60 text-[#FAF7F2]">
        {/* Lueur d'or supérieure */}
        <div className="absolute -top-[1px] left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />

        <div className="flex items-start gap-3.5">
          {/* Badge icône dorée */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] mt-0.5">
            <span className="text-xs">✦</span>
          </div>

          <div className="flex-1 pr-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C5A059]">
                {currentFact.tag}
              </span>
              <span className="text-[9px] text-[#FAF7F2]/40">•</span>
              <span className="text-[10px] text-[#FAF7F2]/60">
                {currentFact.category}
              </span>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#FAF7F2]/90 font-light font-sans">
              {currentFact.text}
            </p>
          </div>

          {/* Bouton fermeture discret */}
          <button
            type="button"
            onClick={() => {
              setIsVisible(false);
              setDismissed(true);
            }}
            className="flex-shrink-0 text-[#FAF7F2]/40 hover:text-[#FAF7F2] p-1 transition-colors"
            aria-label="Fermer la notification"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Barre de progression subtile (6s) */}
        <div className="mt-3 w-full bg-white/10 h-[2px] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C5A059] to-[#B3542E]"
            style={{
              animation: 'progressFill 6s linear forwards',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FloatingDiscovery;
