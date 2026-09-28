import React, { useState } from 'react';

interface WhatsAppWidgetProps {
  primaryPhone?: string;
  secondaryPhone?: string;
  defaultMessage?: string;
  className?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  primaryPhone = '2290155456363',
  secondaryPhone = '2290153838363',
  defaultMessage = 'Bonjour Maison Adénikè, je souhaite des informations pour une réservation.',
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const getUrl = (phone: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-end flex-col ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip / Speech Bubble */}
      <div
        className={`mb-3 transition-all duration-300 transform origin-bottom-right ${
          showTooltip || showPicker
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-[#121212]/95 backdrop-blur-md text-[#FDFBF7] px-4 py-2.5 rounded-2xl shadow-xl border border-[#C5A059]/40 text-xs font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span>Conciergerie Maison Adénikè — <strong>Réponse immédiate</strong></span>
        </div>
      </div>

      {/* Quick Line Selection Dropdown when clicked */}
      {showPicker && (
        <div className="mb-2 w-64 bg-[#1A1A1A] border border-[#C5A059]/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-[#C5A059] mb-2 px-1">
            Choisir votre ligne WhatsApp
          </div>
          <div className="flex flex-col gap-1.5">
            <a
              href={getUrl(primaryPhone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-white text-xs transition"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-[#FDFBF7]">Ligne 1 (Principale)</span>
                <span className="text-[11px] text-gray-400">01 55 45 63 63</span>
              </div>
              <span className="text-[10px] bg-[#25D366] text-black font-bold px-2 py-0.5 rounded-full">Direct</span>
            </a>
            <a
              href={getUrl(secondaryPhone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs transition"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-[#FDFBF7]">Ligne 2 (Secondaire)</span>
                <span className="text-[11px] text-gray-400">01 53 83 83 63</span>
              </div>
              <span className="text-[10px] bg-white/20 text-white font-medium px-2 py-0.5 rounded-full">Disponible</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        aria-label="Contacter la Conciergerie Maison Adénikè sur WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl border-2 border-[#C5A059] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#C5A059]/30"
      >
        {/* Pulsing halo */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"></span>

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current relative z-10 transition-transform duration-300 group-hover:rotate-12"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 2C6.505 2 2.012 6.486 2.012 12.004c0 1.907.539 3.69 1.472 5.213L2.001 22l4.945-1.45a9.98 9.98 0 005.085 1.385c5.526 0 10.019-4.486 10.019-10.005C22.05 6.486 17.557 2 12.031 2zm0 18.257c-1.637 0-3.176-.464-4.502-1.267l-.323-.194-2.946.864.88-2.868-.21-.334a8.214 8.214 0 01-1.258-4.454c0-4.57 3.72-8.283 8.359-8.283 4.638 0 8.358 3.713 8.358 8.283 0 4.57-3.72 8.283-8.358 8.283zm4.58-6.195c-.251-.126-1.485-.733-1.715-.816-.23-.084-.397-.126-.565.126-.168.25-.65.816-.797.983-.146.168-.293.189-.544.063-.251-.126-1.06-.39-2.02-1.246-.746-.665-1.25-1.487-1.396-1.739-.147-.251-.016-.387.11-.512.113-.113.251-.294.377-.44.126-.147.168-.252.251-.419.084-.168.042-.315-.021-.441-.063-.126-.565-1.363-.775-1.867-.204-.49-.411-.424-.564-.432l-.481-.008c-.168 0-.44.063-.67.315-.23.252-.88.86-.88 2.097 0 1.238.902 2.435 1.027 2.603.126.168 1.776 2.712 4.303 3.803.601.26 1.07.415 1.436.531.604.192 1.154.165 1.588.1.484-.072 1.485-.607 1.694-1.194.21-.587.21-1.09.147-1.194-.063-.105-.23-.168-.481-.294z" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
