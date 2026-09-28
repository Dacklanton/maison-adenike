'use client';

import React from 'react';
import Image from 'next/image';

export interface EventItem {
  id: string;
  title: string;
  badge: string;
  dateFull: string;
  time: string;
  location: string;
  image: string;
  alt: string;
  whatsappMessage: string;
  bookingService: string;
  isConfirmed?: boolean;
}

/**
 * TABLEAU MODULAIRE DES ÉVÉNEMENTS — MAISON ADÉNIKÈ
 * Pour modifier l'affiche ou les textes d'un événement (ex: révélation de l'affiche du 31 octobre),
 * il suffit de mettre à jour la ligne correspondante dans ce tableau.
 */
export const EVENTS_DATA: EventItem[] = [
  {
    id: 'concert-24-octobre-2026',
    title: 'Concert Live Ricos Campos',
    badge: '✦ CONCERT LIVE EXCLUSIF',
    dateFull: 'Samedi 24 octobre 2026',
    time: 'À partir de 16h00',
    location: 'Maison Adénikè, Ouidah',
    image: '/assets/images/events/ricos-campos-24-octobre.jpg',
    alt: 'Affiche Officielle Concert Live Ricos Campos — Samedi 24 Octobre 2026 à la Maison Adénikè Ouidah',
    whatsappMessage: 'Bonjour Maison Adéniké, je souhaite réserver pour le concert de Ricos Campos du samedi 24 octobre 2026',
    bookingService: 'Concert Ricos Campos (24 Octobre 2026)',
    isConfirmed: true,
  },
  {
    id: 'concert-31-octobre-2026',
    title: 'Artiste Mystère Invité',
    badge: '✦ ARTISTE MYSTÈRE INVITÉ',
    dateFull: 'Samedi 31 octobre 2026',
    time: 'Dès 17h00',
    location: 'Maison Adénikè, Ouidah',
    image: '/assets/images/events/artiste-mystere-31-octobre.jpg',
    alt: 'Affiche Concert Artiste Mystère Invité — Samedi 31 Octobre 2026 à la Maison Adénikè Ouidah',
    whatsappMessage: 'Bonjour Maison Adéniké, je souhaite réserver pour le concert du 31 octobre',
    bookingService: 'Artiste Mystère (31 Octobre 2026)',
    isConfirmed: true,
  },
];

interface EventsSectionProps {
  onOpenBooking?: (serviceName: string) => void;
  whatsappNumber?: string;
  className?: string;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onOpenBooking,
  whatsappNumber = '2290155456363',
  className = '',
}) => {
  const getWhatsAppUrl = (msg: string) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <section
      id="concerts-mystere"
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#12100E] via-[#1A1613] to-[#12100E] text-[#FDFBF7] ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* En-tête de la section */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A83B24]/10 border border-[#D8BA8E]/30 text-[#D8BA8E] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8BA8E] animate-pulse"></span>
            <span>Concerts d'Exception • Automne 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-[#FDFBF7] mb-4">
            Les Rendez-Vous <span className="italic text-[#D8BA8E]">Mystère</span>
          </h2>

          <p className="text-[#E6D7C3]/80 text-base sm:text-lg font-light leading-relaxed">
            Deux soirées exclusives sous les étoiles de Ouidah. Musique vivante, gastronomie du terroir et atmosphère feutrée avant les festivités des Vodoun Days.
          </p>
        </div>

        {/* Grille Luxe 2 Colonnes Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch">
          {EVENTS_DATA.map((event) => (
            <article
              key={event.id}
              className="group flex flex-col justify-between rounded-3xl bg-[#1E1915]/80 border border-[#D8BA8E]/20 p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-[#D8BA8E]/50 hover:shadow-[0_20px_60px_rgba(203,161,88,0.15)]"
            >
              {/* 1. Visuel / Affiche avec zoom subtil au hover */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-6 bg-black/40">
                <img
                  src={event.image}
                  alt={event.alt}
                  className="w-full h-full object-cover object-center scale-[1.0] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>

              {/* 2. Bloc Détails & Actions */}
              <div className="flex flex-col flex-grow justify-between gap-5">
                <div>
                  {/* Badge Statut Élégant */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase text-[#D8BA8E] border border-[#D8BA8E]/40 bg-[#D8BA8E]/10">
                      {event.badge}
                    </span>
                  </div>

                  {/* Date & Heure */}
                  <div className="flex items-center gap-2.5 text-base sm:text-lg font-serif text-[#FDFBF7] mb-2">
                    <svg
                      className="w-5 h-5 text-[#D8BA8E] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                      <polyline points="12 6 12 12 16 14" strokeWidth="1.8" />
                    </svg>
                    <span>
                      <strong className="font-semibold text-[#FDFBF7]">{event.dateFull}</strong> — {event.time}
                    </span>
                  </div>

                  {/* Lieu */}
                  <div className="flex items-center gap-2.5 text-sm text-[#E6D7C3]/80">
                    <svg
                      className="w-4 h-4 text-[#D8BA8E] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                {/* Boutons d'Action Minimalistes & WhatsApp */}
                <div className="pt-4 border-t border-[#D8BA8E]/15 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking(event.bookingService);
                      } else {
                        window.open(getWhatsAppUrl(event.whatsappMessage), '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#A83B24] to-[#BD432A] hover:from-[#BD432A] hover:to-[#D8BA8E] text-[#FFFFFF] text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(168,59,36,0.35)] flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <span>Réserver ma place</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <a
                    href={getWhatsAppUrl(event.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
                    title="Réserver directement sur WhatsApp"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 2C6.505 2 2.012 6.486 2.012 12.004c0 1.907.539 3.69 1.472 5.213L2.001 22l4.945-1.45a9.98 9.98 0 005.085 1.385c5.526 0 10.019-4.486 10.019-10.005C22.05 6.486 17.557 2 12.031 2zm0 18.257c-1.637 0-3.176-.464-4.502-1.267l-.323-.194-2.946.864.88-2.868-.21-.334a8.214 8.214 0 01-1.258-4.454c0-4.57 3.72-8.283 8.359-8.283 4.638 0 8.358 3.713 8.358 8.283 0 4.57-3.72 8.283-8.358 8.283zm4.58-6.195c-.251-.126-1.485-.733-1.715-.816-.23-.084-.397-.126-.565.126-.168.25-.65.816-.797.983-.146.168-.293.189-.544.063-.251-.126-1.06-.39-2.02-1.246-.746-.665-1.25-1.487-1.396-1.739-.147-.251-.016-.387.11-.512.113-.113.251-.294.377-.44.126-.147.168-.252.251-.419.084-.168.042-.315-.021-.441-.063-.126-.565-1.363-.775-1.867-.204-.49-.411-.424-.564-.432l-.481-.008c-.168 0-.44.063-.67.315-.23.252-.88.86-.88 2.097 0 1.238.902 2.435 1.027 2.603.126.168 1.776 2.712 4.303 3.803.601.26 1.07.415 1.436.531.604.192 1.154.165 1.588.1.484-.072 1.485-.607 1.694-1.194.21-.587.21-1.09.147-1.194-.063-.105-.23-.168-.481-.294z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
