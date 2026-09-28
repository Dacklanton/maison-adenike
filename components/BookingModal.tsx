import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: 'restaurant' | 'chambre' | 'evenement' | 'vodoun';
  primaryPhone?: string;
  secondaryPhone?: string;
}

type PaymentMethod = 'momo' | 'flooz' | 'card' | 'concierge';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'chambre',
  primaryPhone = '2290155456363',
}) => {
  const [service, setService] = useState<string>(defaultService);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('12:30');
  const [guests, setGuests] = useState<string>('2 personnes');
  const [fullName, setFullName] = useState<string>('');
  const [depositPercent, setDepositPercent] = useState<number>(30);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [momoNumber, setMomoNumber] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  if (!isOpen) return null;

  // Calcul indicatif selon service
  const basePrices: Record<string, number> = {
    chambre: 45000,
    restaurant: 25000,
    evenement: 150000,
    vodoun: 85000,
  };

  const estimatedTotal = basePrices[service] || 45000;
  const depositAmount = Math.round((estimatedTotal * depositPercent) / 100);
  const balanceDue = estimatedTotal - depositAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let methodLabel = 'MTN Mobile Money (MoMo)';
    if (paymentMethod === 'flooz') methodLabel = 'Moov Money (Flooz)';
    if (paymentMethod === 'card') methodLabel = 'Carte Bancaire (Visa/Mastercard)';
    if (paymentMethod === 'concierge') methodLabel = 'Garantie Concierge Direct';

    let msg = `✨ *Nouvelle Demande de Réservation — Maison Adénikè*\n\n`;
    msg += `🛎️ *Expérience :* ${service.toUpperCase()}\n`;
    if (date) msg += `📅 *Date :* ${date}\n`;
    if (time) msg += `⏰ *Heure :* ${time}\n`;
    msg += `👥 *Nombre de convives :* ${guests}\n`;
    if (fullName) msg += `👤 *Client :* ${fullName}\n`;
    if (momoNumber) msg += `📱 *Numéro de paiement :* ${momoNumber}\n`;
    if (specialRequests) msg += `✍️ *Demandes particulières :* ${specialRequests}\n`;

    msg += `\n💰 *Ventilation Tarifaire :*\n`;
    msg += `• Estimation Totale : ${estimatedTotal.toLocaleString('fr-FR')} FCFA\n`;
    msg += `• Acompte sécurisé (${depositPercent}%) : ${depositAmount.toLocaleString('fr-FR')} FCFA\n`;
    msg += `• Solde à l'arrivée : ${balanceDue.toLocaleString('fr-FR')} FCFA\n`;
    msg += `• Mode de règlement choisi : *${methodLabel}*\n\n`;
    msg += `Merci de me confirmer la disponibilité et d'envoyer le push de validation.`;

    const url = `https://wa.me/${primaryPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-[#121212] text-[#FDFBF7] rounded-[2rem] border border-[#C5A059]/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Double-Bezel Header */}
        <div className="relative p-6 border-b border-[#C5A059]/20 bg-gradient-to-b from-[#1A1A1A] to-[#121212] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#C5A059] p-0.5 bg-black/40 flex items-center justify-center">
              <span className="text-[#C5A059] font-serif font-bold text-sm">MA</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#C5A059]">
                Sanctuaire de Haute Hospitalité • Ouidah
              </span>
              <h2 className="text-xl font-serif font-semibold text-white">
                Réservation & Escale Privée
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center text-xl transition"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          
          {/* Service Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              1. Sélectionnez votre expérience
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'chambre', label: 'Suite & Lodge', icon: '🛏️' },
                { id: 'restaurant', label: 'Table & Dîner', icon: '🍽️' },
                { id: 'evenement', label: 'Événement', icon: '🎉' },
                { id: 'vodoun', label: 'Vodoun Days', icon: '✨' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setService(item.id)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition ${
                    service === item.id
                      ? 'bg-[#C5A059]/20 border-[#C5A059] text-white shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dates & Convives */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">Date d'arrivée</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">Heure souhaitée</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">Nombre d'hôtes</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
              >
                <option value="1 personne">1 personne</option>
                <option value="2 personnes">2 personnes</option>
                <option value="3 à 4 personnes">3 à 4 personnes</option>
                <option value="5 personnes et plus">5 personnes et plus</option>
              </select>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">Nom complet</label>
              <input
                type="text"
                required
                placeholder="Ex. Sophie Mensah"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-medium mb-1">Numéro Mobile (MoMo / WhatsApp)</label>
              <input
                type="tel"
                placeholder="Ex. 01 55 45 63 63"
                value={momoNumber}
                onChange={(e) => setMomoNumber(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>
          </div>

          {/* Transparent Payment Breakdown */}
          <div className="p-4 rounded-2xl bg-[#1A1A1A]/90 border border-[#C5A059]/20 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Montant indicatif séjour / table :</span>
              <span className="font-semibold text-white">{estimatedTotal.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#C5A059] flex items-center gap-1 font-medium">
                <span>Acompte requis ({depositPercent}%) :</span>
                <span className="inline-flex gap-1 ml-1">
                  <button
                    type="button"
                    onClick={() => setDepositPercent(30)}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${depositPercent === 30 ? 'bg-[#C5A059] text-black font-bold' : 'bg-white/10 text-gray-300'}`}
                  >
                    30%
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepositPercent(50)}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${depositPercent === 50 ? 'bg-[#C5A059] text-black font-bold' : 'bg-white/10 text-gray-300'}`}
                  >
                    50%
                  </button>
                </span>
              </span>
              <span className="font-bold text-[#C5A059] text-sm">
                {depositAmount.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2">
              <span className="text-gray-400">Solde réglé sur place à l'arrivée :</span>
              <span className="font-medium text-gray-300">{balanceDue.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>

          {/* Dual Payment Stack Tabs */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
              2. Canal de paiement sécurisé
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {[
                { id: 'momo', label: 'MTN MoMo', badge: 'Push Bénin' },
                { id: 'flooz', label: 'Moov Flooz', badge: 'Push Bénin' },
                { id: 'card', label: 'Carte Bancaire', badge: 'Visa / MC' },
                { id: 'concierge', label: 'Concierge Direct', badge: 'Arrivée' },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setPaymentMethod(tab.id as PaymentMethod)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition ${
                    paymentMethod === tab.id
                      ? 'bg-[#C5A059]/15 border-[#C5A059] text-white shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold text-xs text-white">{tab.label}</span>
                  <span className="text-[10px] text-[#C5A059] mt-1">{tab.badge}</span>
                </button>
              ))}
            </div>

            {/* Instruction Box based on selected tab */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300">
              {paymentMethod === 'momo' && (
                <div className="flex items-start gap-2.5">
                  <span className="text-yellow-400 text-base">📲</span>
                  <div>
                    <strong className="text-white">Paiement instantané MTN Mobile Money :</strong>
                    <p className="mt-0.5 text-gray-400 text-[11px]">
                      Dès validation, un prompt de notification push sera envoyé sur votre numéro MTN Bénin pour taper votre code secret et verrouiller immédiatement votre réservation.
                    </p>
                  </div>
                </div>
              )}
              {paymentMethod === 'flooz' && (
                <div className="flex items-start gap-2.5">
                  <span className="text-blue-400 text-base">📲</span>
                  <div>
                    <strong className="text-white">Paiement instantané Moov Flooz :</strong>
                    <p className="mt-0.5 text-gray-400 text-[11px]">
                      Validation sécurisée par prompt USSD Moov Money Bénin. Zéro frais caché.
                    </p>
                  </div>
                </div>
              )}
              {paymentMethod === 'card' && (
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 text-base">💳</span>
                  <div>
                    <strong className="text-white">Cartes Internationales Visa & Mastercard :</strong>
                    <p className="mt-0.5 text-gray-400 text-[11px]">
                      Passerelle bancaire 3D-Secure avec conversion automatique des devises (EUR/USD vers FCFA).
                    </p>
                  </div>
                </div>
              )}
              {paymentMethod === 'concierge' && (
                <div className="flex items-start gap-2.5">
                  <span className="text-[#C5A059] text-base">🛎️</span>
                  <div>
                    <strong className="text-white">Concierge Direct & Paiement sur Place :</strong>
                    <p className="mt-0.5 text-gray-400 text-[11px]">
                      Échange en direct avec la gouvernante de la Maison Adénikè sur WhatsApp pour bloquer votre créneau avec garantie d'arrivée.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security & Reassurance Text */}
          <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-white/5 p-2.5 rounded-xl border border-white/5">
            <svg className="w-4 h-4 text-[#C5A059] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Paiement sécurisé instantané par Mobile Money & Carte Bancaire • Confirmation immédiate par SMS & WhatsApp</span>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-full bg-[#C5A059] hover:bg-[#B08B46] text-black font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(197,160,89,0.4)] hover:shadow-[0_6px_28px_rgba(197,160,89,0.6)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Valider ma Réservation & l'Acompte ({depositAmount.toLocaleString('fr-FR')} FCFA)</span>
            <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center text-black">
              &rarr;
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
