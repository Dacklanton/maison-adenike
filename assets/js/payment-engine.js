/**
 * ==========================================================================
 * MOTEUR UNIVERSEL DE PAIEMENT SÉCURISÉ — MAISON ADÉNIKÈ
 * ==========================================================================
 * Intégration officielle FedaPay Checkout.js (MTN MoMo, Moov Flooz, Cartes Visa / Mastercard)
 * Conforme aux standards bancaires BCEAO & PCI-DSS
 */

(function () {
  'use strict';

  // 1. CHARGEMENT DYNAMIQUE DU SDK FEDAPAY SI NÉCESSAIRE
  function ensureFedaPaySDK(callback) {
    if (typeof window.FedaPay !== 'undefined') {
      if (callback) callback();
      return;
    }

    const existingScript = document.querySelector('script[src*="fedapay.com/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => { if (callback) callback(); });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.fedapay.com/checkout.js?v=1.1.7';
    script.async = true;
    script.onload = () => {
      console.log('✅ SDK FedaPay Checkout chargé avec succès.');
      if (callback) callback();
    };
    script.onerror = () => {
      console.error('❌ Erreur de chargement du SDK FedaPay.');
    };
    document.head.appendChild(script);
  }

  // Initialisation anticipée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ensureFedaPaySDK());
  } else {
    ensureFedaPaySDK();
  }

  // 2. UTILITAIRES DE PARSING CLIENT
  function splitFullName(fullName) {
    if (!fullName || typeof fullName !== 'string') {
      return { firstname: 'Client', lastname: 'Maison Adénikè' };
    }
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return { firstname: parts[0], lastname: 'Client' };
    }
    const firstname = parts[0];
    const lastname = parts.slice(1).join(' ');
    return { firstname, lastname };
  }

  function cleanPhoneNumber(phone) {
    if (!phone) return '0155456363';
    return phone.replace(/[^\d+]/g, '');
  }

  function formatFCFA(amount) {
    return Math.round(amount).toLocaleString('fr-FR') + ' FCFA';
  }

  // 3. AFFICHAGE DE LA MODALE DE REÇU HAUTE HOSPITALITÉ
  function renderReceiptModal(details) {
    let receiptModal = document.getElementById('adenikeReceiptModal');
    if (!receiptModal) {
      receiptModal = document.createElement('div');
      receiptModal.id = 'adenikeReceiptModal';
      receiptModal.className = 'reservation-modal-backdrop';
      receiptModal.style.zIndex = '99999';
      document.body.appendChild(receiptModal);
    }

    const trxId = details.transactionId || ('ADK-' + Date.now().toString().slice(-6));
    const now = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Message WhatsApp avec identifiant officiel de transaction
    const waLines = [
      `🏛️ *Confirmation de Réservation & Acompte Reçu — Maison Adénikè*`,
      ``,
      `✦ *Réf. Transaction :* \`${trxId}\``,
      `✦ *Client :* ${details.customerName}`,
      `✦ *Service réservé :* ${details.service}`,
      `✦ *Acompte réglé :* *${formatFCFA(details.amount)}* via FedaPay`,
      details.date ? `✦ *Date prévue :* ${details.date}` : '',
      details.guests ? `✦ *Convives / Personnes :* ${details.guests}` : '',
      ``,
      `Merci de confirmer la bonne prise en compte de ma réservation.`
    ].filter(Boolean);

    const waUrl = `https://wa.me/${window.FEDAPAY_CONFIG?.merchantPhone || '2290155456363'}?text=${encodeURIComponent(waLines.join('\n'))}`;

    receiptModal.innerHTML = `
      <div class="reservation-modal-card" style="max-width: 540px; border: 1.5px solid var(--c-gold, #C5A059); box-shadow: 0 20px 60px rgba(0,0,0,0.6); background: #1A1A17; color: #FAF7F2; text-align: left;">
        <div style="background: linear-gradient(135deg, rgba(197, 160, 89, 0.15), rgba(179, 84, 46, 0.15)); padding: 1.5rem; border-bottom: 1px solid rgba(197, 160, 89, 0.3); text-align: center; position: relative;">
          <div style="width: 56px; height: 56px; margin: 0 auto 0.75rem; border-radius: 50%; background: #24221D; border: 2px solid #C5A059; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; box-shadow: 0 0 20px rgba(197, 160, 89, 0.4);">
            ✨
          </div>
          <span style="font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.2em; color: #C5A059; font-weight: 700;">Reçu Officiel Sécurisé</span>
          <h3 style="margin: 0.35rem 0 0; font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #FAF7F2;">Paiement Confirmé avec Succès</h3>
          <p style="margin: 0.25rem 0 0; font-size: 0.8125rem; color: rgba(250, 247, 242, 0.7);">Maison Adénikè • Ouidah, Bénin</p>
          <button id="closeReceiptBtn" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #FAF7F2; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>

        <div style="padding: 1.5rem; font-size: 0.875rem; line-height: 1.6;">
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(197, 160, 89, 0.2); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.4rem;">
              <span style="color: rgba(250, 247, 242, 0.6);">Numéro de Transaction :</span>
              <strong style="color: #C5A059; font-family: monospace; font-size: 0.95rem;">${trxId}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: rgba(250, 247, 242, 0.6);">Date & Heure :</span>
              <span>${now}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: rgba(250, 247, 242, 0.6);">Client :</span>
              <strong>${details.customerName}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: rgba(250, 247, 242, 0.6);">Service / Hébergement :</span>
              <span>${details.service}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; border-top: 1px dashed rgba(197, 160, 89, 0.3); font-size: 1.05rem;">
              <span style="color: #FAF7F2; font-weight: 600;">Montant Acompte Réglé :</span>
              <strong style="color: #C5A059;">${formatFCFA(details.amount)}</strong>
            </div>
          </div>

          <div style="background: rgba(197, 160, 89, 0.08); border-left: 3px solid #C5A059; padding: 0.75rem 1rem; border-radius: 0 6px 6px 0; margin-bottom: 1.5rem; font-size: 0.8125rem; color: rgba(250, 247, 242, 0.85);">
            🛡️ <strong>Acompte Verrouillé :</strong> Votre place est officiellement garantie. Le solde restant dû sera réglé sur place à votre arrivée.
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; background: #25D366; color: #FFFFFF; font-weight: 700; padding: 0.85rem; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); transition: transform 0.2s;">
              <span>💬 Transmettre mon reçu à la Conciergerie (WhatsApp)</span>
            </a>
            <button id="printReceiptBtn" type="button" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.2); color: #FAF7F2; padding: 0.65rem; border-radius: 8px; cursor: pointer; font-size: 0.8125rem;">
              🖨️ Imprimer / Télécharger le reçu
            </button>
          </div>
        </div>
      </div>
    `;

    receiptModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('closeReceiptBtn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        receiptModal.classList.remove('open');
        document.body.style.overflow = '';
      };
    }

    const printBtn = document.getElementById('printReceiptBtn');
    if (printBtn) {
      printBtn.onclick = () => {
        window.print();
      };
    }
  }

  // 4. API UNIVERSELLE DE PAIEMENT
  window.MaisonAdenikePayment = {
    /**
     * Déclenche la fenêtre de paiement officielle FedaPay
     * @param {Object} opts
     * @param {number} opts.amount Montant en FCFA
     * @param {string} opts.description Description du paiement
     * @param {string} opts.service Nom du service réservé
     * @param {string} opts.customerName Nom complet du client
     * @param {string} [opts.customerEmail] Email du client
     * @param {string} [opts.customerPhone] Téléphone du client
     * @param {string} [opts.date] Date de réservation
     * @param {string} [opts.guests] Nombre de convives
     * @param {Function} [opts.onSuccess] Callback en cas de succès
     */
    triggerCheckout: function (opts) {
      const config = window.FEDAPAY_CONFIG || {};
      const { firstname, lastname } = splitFullName(opts.customerName);
      const cleanPhone = cleanPhoneNumber(opts.customerPhone);
      const email = opts.customerEmail || (cleanPhone.replace('+', '') + '@maisonadenike.com');

      ensureFedaPaySDK(function () {
        if (typeof window.FedaPay === 'undefined') {
          alert("Le module de paiement n'a pas pu être chargé. Veuillez contacter la conciergerie via WhatsApp.");
          return;
        }

        try {
          const widget = window.FedaPay.init({
            public_key: config.publicKey,
            environment: config.environment || 'sandbox',
            transaction: {
              amount: Math.round(opts.amount),
              description: opts.description || `Réservation Maison Adénikè - ${opts.service || 'Séjour'}`
            },
            customer: {
              firstname: firstname,
              lastname: lastname,
              email: email,
              phone_number: {
                number: cleanPhone,
                country: 'bj'
              }
            },
            onComplete: function ({ reason, transaction }) {
              console.log('FedaPay onComplete:', reason, transaction);
              if (reason === window.FedaPay.CHECKOUT_COMPLETED) {
                const trxId = transaction ? (transaction.reference || transaction.id) : null;
                renderReceiptModal({
                  transactionId: trxId,
                  customerName: opts.customerName,
                  service: opts.service || 'Séjour / Repas',
                  amount: opts.amount,
                  date: opts.date,
                  guests: opts.guests
                });
                if (typeof opts.onSuccess === 'function') {
                  opts.onSuccess(transaction);
                }
              } else if (reason === window.FedaPay.DIALOG_DISMISSED) {
                console.log('Paiement interrompu par le client.');
              }
            }
          });

          widget.open();
        } catch (err) {
          console.error('Erreur initialisation FedaPay:', err);
          alert('Une erreur est survenue lors de l’ouverture du paiement. Veuillez réessayer.');
        }
      });
    }
  };

  // 5. INTERCEPTION AUTOMATIQUE DU FORMULAIRE DE RÉSERVATION UNIVERSEL
  function hookUniversalBookingForm() {
    const modalForm = document.getElementById('modalBookingForm');
    if (!modalForm) return;

    modalForm.addEventListener('submit', function (e) {
      // Vérifier le canal de paiement actif
      const activeTab = document.querySelector('.payment-tab-btn.active');
      const channel = activeTab ? activeTab.getAttribute('data-payment-channel') : 'momo';

      // Si le client a choisi Conciergerie, on laisse le comportement normal WhatsApp
      if (channel === 'concierge') {
        return; // Le gestionnaire existant dans app.js ouvrira WhatsApp
      }

      // Pour MoMo, Flooz ou Carte CB, on intercepte et déclenche FedaPay !
      e.preventDefault();
      e.stopPropagation();

      const serviceChecked = modalForm.querySelector('input[name="modalService"]:checked');
      const service = serviceChecked ? serviceChecked.value : 'Restaurant Adénikè';
      const date = modalForm.querySelector('#modalDate')?.value || '';
      const time = modalForm.querySelector('#modalTime')?.value || '';
      const guests = modalForm.querySelector('#modalGuests')?.value || '2 personnes';
      const name = modalForm.querySelector('#modalName')?.value || 'Client';
      const phone = modalForm.querySelector('#modalPhone')?.value || '';
      const email = modalForm.querySelector('#modalEmail')?.value || '';

      // Lecture du montant calculé
      const breakdownDeposit = document.getElementById('breakdownDeposit');
      let amount = 7500;
      if (breakdownDeposit) {
        const parsed = parseInt(breakdownDeposit.textContent.replace(/[^\d]/g, ''), 10);
        if (!isNaN(parsed) && parsed > 0) amount = parsed;
      }

      // Fermer la modal de saisie
      const modalBackdrop = document.getElementById('reservationModal');
      if (modalBackdrop) modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';

      // Lancer FedaPay
      window.MaisonAdenikePayment.triggerCheckout({
        amount: amount,
        service: service,
        description: `Acompte officiel Maison Adénikè • ${service} (${name})`,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        date: date ? `${date} à ${time}` : null,
        guests: guests
      });
    }, true); // Capturing phase pour intercepter avant le listener standard
  }

  // Initialisation des écouteurs au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookUniversalBookingForm);
  } else {
    hookUniversalBookingForm();
  }

})();
