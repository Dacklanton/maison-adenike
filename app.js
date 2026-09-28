/**
 * MAISON ADÉNIKÈ — Moteur Interactif & Expérience Client Multi-Pages
 * Numéros Officiels WhatsApp & Appel direct :
 * 1. 01 55 45 63 63 (+229 0155456363)
 * 2. 01 53 83 83 63 (+229 0153838363)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCurtainTransition();
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initHeroAmbientAudio();
  initBookingEngines();
  initVodounModal();
  initWhatsAppConciergeWidget();
  initLightbox();
  initGalleryFilters();
  initEventsFilter();
  initRestaurantMenuTabs();
  initRestaurantBookingBridge();
  initAwwwardsFastBooking();
  initRestaurantMenuCardModal();
  initDishHoverPreview();
  initCurrentYear();
});

/* ==========================================================================
   1. NAVIGATION FLOTTANTE & EFFET SCROLL
   ========================================================================== */
function initHeaderScroll() {
  const headerWrapper = document.querySelector('.header-wrapper');
  const topBanner = document.querySelector('.vodoun-top-banner');
  if (!headerWrapper) return;

  const handleScroll = () => {
    const isScrolled = window.scrollY > 25;
    if (isScrolled) {
      headerWrapper.classList.add('header-scrolled');
      document.body.classList.add('is-scrolled');
      if (topBanner) topBanner.classList.add('banner-hidden');
    } else {
      headerWrapper.classList.remove('header-scrolled');
      document.body.classList.remove('is-scrolled');
      if (topBanner) topBanner.classList.remove('banner-hidden');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MENU MOBILE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   3. ANIMATIONS D'APPARITION (REVEAL)
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. GÉNÉRATION DES DEMANDES WHATSAPP (01 55 45 63 63 / 01 53 83 83 63)
   ========================================================================== */
const WHATSAPP_PHONE_PRIMARY = '2290155456363';
const WHATSAPP_PHONE_SECONDARY = '2290153838363';

function buildWhatsAppMessage({ service, date, time, guests, name, notes, phoneTarget = WHATSAPP_PHONE_PRIMARY }) {
  let msg = `Bonjour Maison Adénikè, je souhaite effectuer une réservation :\n\n`;
  msg += `🛎️ *Service :* ${service}\n`;
  if (date) msg += `📅 *Date souhaitée :* ${date}\n`;
  if (time) msg += `⏰ *Heure / Créneau :* ${time}\n`;
  if (guests) msg += `👥 *Nombre de personnes :* ${guests}\n`;
  if (name) msg += `👤 *Nom complet :* ${name}\n`;
  if (notes) msg += `✍️ *Demandes particulières :* ${notes}\n`;
  msg += `\n💳 *Condition d'acompte :* J'ai bien noté qu'un acompte par MoMo sera exigé pour valider ma réservation, et que le solde sera réglé sur place à mon arrivée.\n`;
  msg += `\nMerci de me confirmer les disponibilités et les modalités de paiement MoMo.`;

  return `https://wa.me/${phoneTarget}?text=${encodeURIComponent(msg)}`;
}

function initBookingEngines() {
  // 1. Formulaire principal présent sur la page
  const mainForm = document.getElementById('mainBookingForm');
  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const serviceChecked = mainForm.querySelector('input[name="mainService"]:checked');
      const service = serviceChecked ? serviceChecked.value : 'Séjour / Restaurant';
      const date = mainForm.querySelector('#mainDate')?.value || '';
      const time = mainForm.querySelector('#mainTime')?.value || '';
      const guests = mainForm.querySelector('#mainGuests')?.value || '2 personnes';
      const name = mainForm.querySelector('#mainName')?.value || '';
      const notes = mainForm.querySelector('#mainNotes')?.value || '';

      const waUrl = buildWhatsAppMessage({ service, date, time, guests, name, notes });
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 2. Modal universel de réservation avec Dual Payment Stack
  const modalBackdrop = document.getElementById('reservationModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalForm = document.getElementById('modalBookingForm');
  const openButtons = document.querySelectorAll('[data-open-booking]');

  // Éléments de calcul dynamique & ventilation tarifaire
  const breakdownTotal = document.getElementById('breakdownTotal');
  const breakdownDeposit = document.getElementById('breakdownDeposit');
  const breakdownBalance = document.getElementById('breakdownBalance');
  const modalSubmitBtn = document.getElementById('modalSubmitBtn');
  const paymentInstructionBox = document.getElementById('paymentInstructionBox');
  const depositToggleBtns = document.querySelectorAll('.deposit-toggle-btn');
  const paymentTabBtns = document.querySelectorAll('.payment-tab-btn');

  let currentDepositPct = 30;
  let currentPaymentMethod = 'momo';

  const basePrices = {
    'Chambre / Lodge': 45000,
    'Lodge & Suites': 45000,
    'Lodge': 45000,
    'Restaurant Adénikè': 25000,
    'Séjour / Événement': 150000,
    'Vodoun Days 2027': 85000,
    'Concert Ricos Campos (24 Octobre 2026)': 35000,
    'Concert Fanicko (31 Octobre 2026)': 35000,
    'Artiste Mystère (24 Octobre 2026)': 35000,
    'Artiste Mystère (31 Octobre 2026)': 35000,
    'Artiste Mystère': 35000,
  };

  const paymentInstructions = {
    momo: '📲 <strong>Paiement instantané MTN Mobile Money :</strong> Un prompt de notification push sera déclenché vers votre numéro MTN Bénin pour composer votre code secret et verrouiller immédiatement votre réservation.',
    flooz: '📲 <strong>Paiement instantané Moov Money Flooz :</strong> Validation immédiate par prompt USSD Moov Bénin. Zéro frais caché.',
    card: '💳 <strong>Cartes Internationales Visa & Mastercard :</strong> Passerelle bancaire sécurisée 3D-Secure avec conversion automatique des devises.',
    concierge: '🛎️ <strong>Concierge Direct :</strong> Échange en direct avec la conciergerie de la Maison Adénikè sur WhatsApp pour bloquer votre créneau avec garantie d\'arrivée.',
  };

  const formatFCFA = (val) => new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';

  const updatePriceBreakdown = () => {
    if (!modalForm) return;
    const selectedRadio = modalForm.querySelector('input[name="modalService"]:checked');
    const selectedVal = selectedRadio ? selectedRadio.value : 'Chambre / Lodge';
    
    let total = basePrices[selectedVal] || 45000;
    let deposit = Math.round((total * currentDepositPct) / 100);
    let balance = total - deposit;

    if (breakdownTotal) breakdownTotal.textContent = formatFCFA(total);
    if (breakdownDeposit) breakdownDeposit.textContent = formatFCFA(deposit);
    if (breakdownBalance) breakdownBalance.textContent = formatFCFA(balance);
    if (modalSubmitBtn) {
      modalSubmitBtn.innerHTML = `<span>Valider ma Réservation & l'Acompte (${formatFCFA(deposit)})</span><span class="btn-icon-capsule" style="background: rgba(255, 255, 255, 0.2); color: #FFFFFF;">&rarr;</span>`;
    }
  };

  // Gestion des boutons de pourcentage d'acompte (30% / 50%)
  depositToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      depositToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDepositPct = parseInt(btn.getAttribute('data-deposit-pct'), 10) || 30;
      updatePriceBreakdown();
    });
  });

  // Gestion des onglets de méthode de paiement (MoMo, Flooz, Carte, Concierge)
  paymentTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paymentTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPaymentMethod = btn.getAttribute('data-payment-channel') || 'momo';
      if (paymentInstructionBox && paymentInstructions[currentPaymentMethod]) {
        paymentInstructionBox.innerHTML = paymentInstructions[currentPaymentMethod];
      }
    });
  });

  // Gestion du changement de service radio
  if (modalForm) {
    const serviceRadios = modalForm.querySelectorAll('input[name="modalService"]');
    serviceRadios.forEach(radio => {
      radio.addEventListener('change', updatePriceBreakdown);
    });
  }

  const openModal = (preselectedService = null) => {
    if (!modalBackdrop) return;
    if (preselectedService && modalForm) {
      const radios = modalForm.querySelectorAll('input[name="modalService"]');
      radios.forEach(r => {
        if (r.value.toLowerCase().includes(preselectedService.toLowerCase()) || preselectedService.toLowerCase().includes(r.value.toLowerCase())) {
          r.checked = true;
        }
      });
    }
    updatePriceBreakdown();
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.openBookingModal = openModal;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-booking]');
    if (btn) {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'Chambre / Lodge';
      openModal(service);
    }
  });

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'Chambre / Lodge';
      openModal(service);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const serviceChecked = modalForm.querySelector('input[name="modalService"]:checked');
      const service = serviceChecked ? serviceChecked.value : 'Chambre / Lodge';
      const date = modalForm.querySelector('#modalDate')?.value || '';
      const time = modalForm.querySelector('#modalTime')?.value || '';
      const guests = modalForm.querySelector('#modalGuests')?.value || '2 personnes';
      const name = modalForm.querySelector('#modalName')?.value || '';
      const phone = modalForm.querySelector('#modalPhone')?.value || '';

      const total = basePrices[service] || 45000;
      const deposit = Math.round((total * currentDepositPct) / 100);
      const balance = total - deposit;

      let paymentLabel = 'MTN Mobile Money (MoMo Bénin)';
      if (currentPaymentMethod === 'flooz') paymentLabel = 'Moov Money (Flooz Bénin)';
      if (currentPaymentMethod === 'card') paymentLabel = 'Carte Bancaire Internationale (Visa/Mastercard)';
      if (currentPaymentMethod === 'concierge') paymentLabel = 'Paiement Concierge Direct';

      let msg = `✨ *Nouvelle Réservation — Maison Adénikè*\n\n`;
      msg += `🛎️ *Service :* ${service}\n`;
      if (date) msg += `📅 *Date d'arrivée :* ${date}\n`;
      if (time) msg += `⏰ *Heure / Créneau :* ${time}\n`;
      msg += `👥 *Nombre de convives :* ${guests}\n`;
      if (name) msg += `👤 *Client :* ${name}\n`;
      if (phone) msg += `📱 *Contact / MoMo :* ${phone}\n\n`;
      msg += `💰 *Ventilation Tarifaire :*\n`;
      msg += `• Total indicatif : ${formatFCFA(total)}\n`;
      msg += `• Acompte sécurisé (${currentDepositPct}%) : *${formatFCFA(deposit)}*\n`;
      msg += `• Solde restant sur place : ${formatFCFA(balance)}\n`;
      msg += `• Canal de règlement choisi : *${paymentLabel}*\n\n`;
      msg += `Merci de me confirmer la disponibilité et de m'adresser la validation.`;

      const waUrl = `https://wa.me/${WHATSAPP_PHONE_PRIMARY}?text=${encodeURIComponent(msg)}`;
      closeModal();
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

/* ==========================================================================
   4-TER. FLOATING WHATSAPP CONCIERGE WIDGET (24H/7J)
   ========================================================================== */
function initWhatsAppConciergeWidget() {
  const toggleBtn = document.getElementById('waConciergeToggle');
  const linesMenu = document.getElementById('waConciergeLines');
  const widgetContainer = document.getElementById('waConciergeWidget');

  if (!toggleBtn || !linesMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = linesMenu.classList.contains('is-open');
    if (isOpen) {
      linesMenu.classList.remove('is-open');
    } else {
      linesMenu.classList.add('is-open');
    }
  });

  document.addEventListener('click', (e) => {
    if (widgetContainer && !widgetContainer.contains(e.target)) {
      linesMenu.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && linesMenu.classList.contains('is-open')) {
      linesMenu.classList.remove('is-open');
    }
  });
}

/* ==========================================================================
   4-BIS. MODAL DÉDIÉ SPÉCIAL VODOUN DAYS 2027 (02 AU 09 JANVIER 2027)
   ========================================================================== */
function initVodounModal() {
  const vodounModal = document.getElementById('vodounModal');
  const vodounClose = document.getElementById('vodounModalClose');
  const vodounForm = document.getElementById('vodounBookingForm');
  const vodounTriggers = document.querySelectorAll('[data-open-vodoun-modal]');

  if (!vodounModal) return;

  const openVodoun = () => {
    vodounModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeVodoun = () => {
    vodounModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  vodounTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openVodoun();
    });
  });

  if (vodounClose) {
    vodounClose.addEventListener('click', closeVodoun);
  }

  vodounModal.addEventListener('click', (e) => {
    if (e.target === vodounModal) closeVodoun();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && vodounModal.classList.contains('open')) {
      closeVodoun();
    }
  });

  if (vodounForm) {
    vodounForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pack = vodounForm.querySelector('input[name="vodounPack"]:checked')?.value || 'Pack Festival Vodoun Days';
      const date = vodounForm.querySelector('#vodounDate')?.value || 'Du 2 au 9 Janvier 2027';
      const guests = vodounForm.querySelector('#vodounGuests')?.value || '2 personnes';
      const name = vodounForm.querySelector('#vodounName')?.value || '';
      const notes = vodounForm.querySelector('#vodounNotes')?.value || '';

      const waUrl = buildWhatsAppMessage({
        service: `⭐ VODOUN DAYS 2027 (Ouidah) — ${pack}`,
        date: date,
        time: 'Semaine Festival (02-09 Janv 2027)',
        guests: guests,
        name: name,
        notes: notes
      });

      closeVodoun();
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

/* ==========================================================================
   5. LIGHTBOX & FILTRES GALERIE
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || !lightboxImg || !lightboxTitle) return;

  const openItem = (src, title) => {
    lightboxImg.src = src;
    lightboxTitle.textContent = title;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeBox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-photo');
      const caption = item.querySelector('.gallery-caption');
      if (img) {
        openItem(img.src, caption ? caption.textContent : 'Moment Adénikè');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeBox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeBox();
    }
  });
}

function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
          setTimeout(() => item.classList.add('is-visible'), 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   FILTRAGE DYNAMIQUE DES ÉVÉNEMENTS & AGENDA CULTUREL
   ========================================================================== */
function initEventsFilter() {
  const filterBtns = document.querySelectorAll('.event-filter-pill');
  const eventCards = document.querySelectorAll('.event-card');
  if (!filterBtns.length || !eventCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-event-filter');
      eventCards.forEach(card => {
        const cat = card.getAttribute('data-event-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

function initCurrentYear() {
  const yearEls = document.querySelectorAll('#currentYear');
  const yr = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = yr);

  // Set min date
  const todayStr = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    if (!input.min) input.min = todayStr;
  });
}

/* ==========================================================================
   AMBIANCE SONORE NATURELLE & ACOUSTIQUE (WEB AUDIO API NATIVE)
   ========================================================================== */
function initHeroAmbientAudio() {
  const audioBtn = document.getElementById('heroAudioToggle');
  if (!audioBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let oscillators = [];

  const startAmbientSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.09, audioCtx.currentTime + 3);

      // Filtre passe-bas pour une chaleur acoustique apaisante
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, audioCtx.currentTime);
      masterGain.connect(filter);
      filter.connect(audioCtx.destination);

      // Harmonie pentatonique chaleureuse (La2, Mi3, La3, Do#4)
      const freqs = [110, 164.81, 220, 277.18];
      oscillators = freqs.map((f, i) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        oscGain.gain.setValueAtTime(0.06 / (i + 1), audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        return osc;
      });

      isPlaying = true;
      audioBtn.classList.add('active');
      audioBtn.innerHTML = '<span class="audio-pulse-dot"></span> <span>Ambiance Sonore Active</span>';
    } catch (e) {
      console.warn('Audio ambiant non disponible', e);
    }
  };

  const stopAmbientSound = () => {
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      setTimeout(() => {
        oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        oscillators = [];
        isPlaying = false;
        audioBtn.classList.remove('active');
        audioBtn.innerHTML = '<span class="audio-pulse-dot"></span> <span>Ambiance sonore</span>';
      }, 1200);
    }
  };

  audioBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!isPlaying) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  });
}

/* ==========================================================================
   12. RIDEAU D'OUVERTURE SIGNATURE — 4 PILULES ALTERNÉES (SPLIT-CURTAIN REVEAL)
   ========================================================================== */
function initCurtainTransition() {
  const overlay = document.getElementById('pageCurtainTransition');
  if (!overlay) return;

  const skipBtn = document.getElementById('curtainSkipBtn');
  let hasExited = false;

  const exitCurtain = () => {
    if (hasExited) return;
    hasExited = true;

    overlay.classList.add('is-exiting');

    // Libère les interactions et supprime le rideau du DOM après l'animation
    setTimeout(() => {
      overlay.classList.add('is-hidden');
      try {
        overlay.remove();
      } catch (e) {}
    }, 1050);
  };

  // 1. Bouton Passer explicite
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exitCurtain();
    });
  }

  // 2. Clic ou tap n'importe où sur l'écran pour passer immédiatement
  overlay.addEventListener('click', () => {
    exitCurtain();
  });

  // 3. Déclenchement automatique luxueux : affichage ~1.1s puis transition alternée
  const autoExitTimer = setTimeout(() => {
    exitCurtain();
  }, 1250);

  // 4. Écoute de la touche Échap
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !hasExited) {
      clearTimeout(autoExitTimer);
      exitCurtain();
    }
  }, { once: true });

  // 5. Sécurité absolue : libération forcée en cas de délai inattendu
  setTimeout(() => {
    if (!hasExited) exitCurtain();
  }, 2400);
}

/* ==========================================================================
   13. ONGLET CARTE DE SAISON RESTAURANT & PONT DE RÉSERVATION LUXE
   ========================================================================== */
function initRestaurantMenuTabs() {
  const tabButtons = document.querySelectorAll('.rest-tab-btn');
  const tabPanes = document.querySelectorAll('.rest-tab-pane');
  if (!tabButtons.length || !tabPanes.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      if (!targetId) return;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

function initRestaurantBookingBridge() {
  const form = document.getElementById('restBookingSelectorForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dateVal = document.getElementById('restDateInput')?.value;
    const timeVal = document.getElementById('restTimeInput')?.value;
    const guestsVal = document.getElementById('restGuestsInput')?.value;

    const modalDate = document.getElementById('modalDate');
    const modalTime = document.getElementById('modalTime');
    const modalGuests = document.getElementById('modalGuests');

    if (modalDate && dateVal) modalDate.value = dateVal;
    if (modalTime && timeVal) modalTime.value = timeVal;
    if (modalGuests && guestsVal) modalGuests.value = guestsVal;

    // Cocher le service Restaurant dans le modal
    const restRadio = document.querySelector('input[name="modalService"][value="Restaurant Adénikè"]');
    if (restRadio) {
      restRadio.checked = true;
      restRadio.dispatchEvent(new Event('change'));
    }

    // Ouvrir le modal universel
    const modal = document.getElementById('reservationModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
}

/* ==========================================================================
   14. FAST BOOKING BAR & CARTES PRODUITS AWWWARDS (RESTAURANT & CHAMBRES)
   ========================================================================== */
function initAwwwardsFastBooking() {
  // 1. Barre Rapide Restaurant
  const restForm = document.getElementById('awwRestaurantBookingForm');
  if (restForm) {
    restForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dateVal = document.getElementById('awwRestDate')?.value;
      const timeVal = document.getElementById('awwRestTime')?.value;
      const guestsVal = document.getElementById('awwRestGuests')?.value;

      const modalDate = document.getElementById('modalDate');
      const modalTime = document.getElementById('modalTime');
      const modalGuests = document.getElementById('modalGuests');

      if (modalDate && dateVal) modalDate.value = dateVal;
      if (modalTime && timeVal) modalTime.value = timeVal;
      if (modalGuests && guestsVal) modalGuests.value = guestsVal;

      const restRadio = document.querySelector('input[name="modalService"][value="Restaurant Adénikè"]');
      if (restRadio) {
        restRadio.checked = true;
        restRadio.dispatchEvent(new Event('change'));
      }

      const modal = document.getElementById('reservationModal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // 2. Barre Rapide Chambres
  const chambresForm = document.getElementById('awwChambresBookingForm');
  if (chambresForm) {
    chambresForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkinVal = document.getElementById('awwChambresCheckin')?.value;
      const guestsVal = document.getElementById('awwChambresGuests')?.value;

      const modalDate = document.getElementById('modalDate');
      const modalGuests = document.getElementById('modalGuests');

      if (modalDate && checkinVal) modalDate.value = checkinVal;
      if (modalGuests && guestsVal) modalGuests.value = guestsVal;

      const lodgeRadio = document.querySelector('input[name="modalService"][value="Chambre / Lodge"]');
      if (lodgeRadio) {
        lodgeRadio.checked = true;
        lodgeRadio.dispatchEvent(new Event('change'));
      }

      const modal = document.getElementById('reservationModal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // 3. Boutons Circulaires '+' des Cartes Produits
  const productButtons = document.querySelectorAll('.aww-card-action-btn');
  productButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'Restaurant Adénikè';
      const productName = btn.getAttribute('data-product') || '';

      const serviceRadio = document.querySelector(`input[name="modalService"][value="${serviceName}"]`);
      if (serviceRadio) {
        serviceRadio.checked = true;
        serviceRadio.dispatchEvent(new Event('change'));
      }

      const modalName = document.getElementById('modalName');
      if (modalName && productName && !modalName.value) {
        // Pré-indication discrète si le champ nom est libre
      }

      const modal = document.getElementById('reservationModal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

/* ==========================================================================
   15. CARTE DE RESTAURANT DÉPLIANTE (MODAL PLEIN ÉCRAN HAUTE GASTRONOMIE)
   ========================================================================== */
function initRestaurantMenuCardModal() {
  const modal = document.getElementById('restaurantMenuModal');
  const closeBtn = document.getElementById('menuCardCloseBtn');
  const openButtons = document.querySelectorAll('[data-open-menu-card]');
  if (!modal) return;

  const openCard = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCard = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Si le modal existe sur la page actuelle, ouverture directe
      if (modal) {
        e.preventDefault();
        openCard();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCard();
    });
  }

  // Fermeture par clic sur l'arrière-plan flouté (hors carte)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCard();
    }
  });

  // Fermeture par la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeCard();
    }
  });

  // Commande instantanée WhatsApp au clic sur un plat de la carte
  const allCardRows = document.querySelectorAll('.menu-card-row');
  allCardRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const dish = row.getAttribute('data-dish') || 'votre plat signature';
      const price = row.getAttribute('data-price') || '';
      const text = `Bonjour Maison Adénikè, je souhaite commander depuis la carte du Restaurant :\n\n🍽️ *Plat :* ${dish}\n💰 *Tarif :* ${price}\n\nMerci de m'indiquer le délai de préparation et les modalités.`;
      const waUrl = `https://wa.me/2290155456363?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // Ouverture automatique si le paramètre ?menu=open ou le hash #carte-complete est présent
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('menu') === 'open' || window.location.hash === '#carte-complete') {
    setTimeout(() => {
      openCard();
    }, 450);
  }
}

/* ==========================================================================
   APERÇU FLOTTANT DU PLAT AU SURVOL (DISH HOVER PREVIEW)
   ========================================================================== */
function initDishHoverPreview() {
  // Préchargement immédiat de toutes les photos des plats
  const dishImages = [
    'assets/images/plat-signature.jpg',
    'assets/images/bomiwo-royal-5000.jpg',
    'assets/images/bomiwo-demi-3000.jpg',
    'assets/images/poisson-frit-riz-rouge.jpg',
    'assets/images/plateau-poulet-pate.jpg',
    'assets/images/poisson-braise-riz.jpg',
    'assets/images/festin-canaris-terre-cuite.jpg',
    'assets/images/poulet-braise-assiette.jpg',
    'assets/images/salade-composee.jpg',
    'assets/images/macaroni-saute.jpg',
    'assets/images/sandwich-panuzzo.jpg',
    'assets/images/pizza-artisanale.jpg'
  ];
  dishImages.forEach(url => {
    const img = new Image();
    img.src = url;
  });

  let previewEl = document.getElementById('dishHoverPreview');
  if (!previewEl) {
    previewEl = document.createElement('div');
    previewEl.id = 'dishHoverPreview';
    previewEl.className = 'dish-hover-preview';
    previewEl.setAttribute('aria-hidden', 'true');
    previewEl.innerHTML = `
      <img src="" alt="Aperçu du plat" class="dish-hover-preview-img">
      <div class="dish-hover-preview-info">
        <span class="dish-hover-preview-title"></span>
        <span class="dish-hover-preview-meta">Maison Adénikè ✦ Ouidah</span>
      </div>
    `;
    document.body.appendChild(previewEl);
  }

  const previewImg = previewEl.querySelector('.dish-hover-preview-img');
  const previewTitle = previewEl.querySelector('.dish-hover-preview-title');
  const previewMeta = previewEl.querySelector('.dish-hover-preview-meta');

  let activeRow = null;
  const PREVIEW_WIDTH = 220;
  const PREVIEW_HEIGHT = 155;

  const updatePosition = (clientX, clientY) => {
    let x = clientX + 24;
    let y = clientY - 75;

    // Débordement bord droit
    if (x + PREVIEW_WIDTH > window.innerWidth - 18) {
      x = clientX - PREVIEW_WIDTH - 24;
    }
    // Débordement bas
    if (y + PREVIEW_HEIGHT > window.innerHeight - 18) {
      y = window.innerHeight - PREVIEW_HEIGHT - 18;
    }
    // Débordement haut
    if (y < 16) {
      y = 16;
    }

    previewEl.style.left = `${Math.round(x)}px`;
    previewEl.style.top = `${Math.round(y)}px`;
  };

  const showDish = (row, clientX, clientY) => {
    activeRow = row;
    const imgSrc = row.getAttribute('data-dish-img');
    const dishTitle = row.getAttribute('data-dish') || 'Plat Gastronomique';
    const dishPrice = row.getAttribute('data-price') || '';

    if (imgSrc) {
      if (previewImg.getAttribute('src') !== imgSrc) {
        previewImg.src = imgSrc;
      }
      previewImg.alt = dishTitle;
      previewTitle.textContent = dishTitle;
      previewMeta.textContent = dishPrice ? `${dishPrice} ✦ Ouidah` : 'Maison Adénikè ✦ Ouidah';

      updatePosition(clientX, clientY);
      previewEl.classList.add('is-visible');
    }
  };

  const hideDish = () => {
    activeRow = null;
    previewEl.classList.remove('is-visible');
  };

  const rows = document.querySelectorAll('.menu-card-row[data-dish-img]');
  rows.forEach(row => {
    row.removeAttribute('title');

    row.addEventListener('mouseenter', (e) => {
      showDish(row, e.clientX, e.clientY);
    });

    row.addEventListener('mousemove', (e) => {
      if (activeRow !== row || !previewEl.classList.contains('is-visible')) {
        showDish(row, e.clientX, e.clientY);
      } else {
        updatePosition(e.clientX, e.clientY);
      }
    });

    row.addEventListener('mouseleave', (e) => {
      if (!row.contains(e.relatedTarget)) {
        hideDish();
      }
    });
  });

  // Masquer sur sortie de la fenêtre
  document.addEventListener('mouseleave', hideDish);
}

