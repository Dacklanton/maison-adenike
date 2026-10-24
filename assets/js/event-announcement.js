/**
 * ==========================================================================
 * POPUP ANNONCE SPÉCIALE CONCERT (RICOS CAMPOS - 24 OCTOBRE 2026)
 * Maison Adénikè • Ouidah, Bénin
 * Double-Bezel & Effet Flash Éclat (Awwwards-Tier Engineering)
 * ==========================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY_SESSION = 'adenike_concert_24oct_dismissed';
  const STORAGE_KEY_LOCAL_TIME = 'adenike_concert_24oct_dismiss_time';
  const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 heures

  document.addEventListener('DOMContentLoaded', () => {
    const backdrop = document.getElementById('eventAnnouncementBackdrop');
    const shell = backdrop ? backdrop.querySelector('.event-announcement-shell') : null;
    const closeBtn = document.getElementById('announcementCloseBtn');
    const bookDirectBtn = document.getElementById('announcementBookDirectBtn');
    const dismissTodayBtn = document.getElementById('announcementDismissToday');
    const floatingLauncher = document.getElementById('eventFloatingLauncher');
    const curtain = document.getElementById('pageCurtainTransition');

    if (!backdrop) return;

    // Vérifier si l'annonce a été écartée pour la session ou pour 24h
    const isDismissedForSession = () => sessionStorage.getItem(STORAGE_KEY_SESSION) === 'true';
    const isDismissedForDay = () => {
      const savedTime = localStorage.getItem(STORAGE_KEY_LOCAL_TIME);
      if (!savedTime) return false;
      const parsedTime = parseInt(savedTime, 10);
      if (isNaN(parsedTime)) return false;
      return Date.now() - parsedTime < DISMISS_DURATION_MS;
    };

    const shouldAutoOpen = !isDismissedForSession() && !isDismissedForDay();

    // Ouvrir le popup avec réinitialisation du flash lumineux
    const openAnnouncement = () => {
      if (floatingLauncher) {
        floatingLauncher.classList.remove('is-active');
      }

      backdrop.classList.add('is-visible');
      backdrop.setAttribute('aria-hidden', 'false');

      // Réamorçage propre de l'animation de flash de lumière sur l'affiche
      const flashBeam = backdrop.querySelector('.announcement-flash-beam');
      if (flashBeam) {
        flashBeam.style.animation = 'none';
        void flashBeam.offsetWidth; // Force reflow
        flashBeam.style.animation = '';
      }

      // Accessibilité : focus sur le bouton de fermeture
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 250);
      }
    };

    // Fermer le popup
    const closeAnnouncement = (rememberForDay = false) => {
      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('aria-hidden', 'true');

      sessionStorage.setItem(STORAGE_KEY_SESSION, 'true');
      if (rememberForDay) {
        localStorage.setItem(STORAGE_KEY_LOCAL_TIME, Date.now().toString());
      }

      // Activer le lanceur flottant discret pour réouverture ultérieure
      if (floatingLauncher) {
        setTimeout(() => {
          floatingLauncher.classList.add('is-active');
        }, 300);
      }
    };

    // Si déjà écarté, activer directement le lanceur discret
    if (!shouldAutoOpen && floatingLauncher) {
      setTimeout(() => {
        floatingLauncher.classList.add('is-active');
      }, 1200);
    }

    // Gestion du timing d'apparition automatique
    if (shouldAutoOpen) {
      if (curtain) {
        let opened = false;
        const triggerOpenAfterCurtain = () => {
          if (opened) return;
          opened = true;
          setTimeout(openAnnouncement, 350);
        };

        // MutationObserver pour détecter le retrait ou la disparition du rideau
        const observer = new MutationObserver(() => {
          if (!document.body.contains(curtain) || curtain.classList.contains('is-hidden')) {
            observer.disconnect();
            triggerOpenAfterCurtain();
          }
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true });

        // Sécurité de secours : ouverture après le délai d'animation normal du rideau (max 2.4s)
        setTimeout(() => {
          observer.disconnect();
          triggerOpenAfterCurtain();
        }, 2400);
      } else {
        // Aucun rideau sur la page : ouverture fluide après 800ms
        setTimeout(openAnnouncement, 800);
      }
    }

    // Événements de fermeture
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAnnouncement(false);
      });
    }

    if (dismissTodayBtn) {
      dismissTodayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAnnouncement(true);
      });
    }

    // Clic sur le backdrop flou (extérieur du shell)
    backdrop.addEventListener('click', (e) => {
      if (shell && !shell.contains(e.target)) {
        closeAnnouncement(false);
      }
    });

    // Touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('is-visible')) {
        closeAnnouncement(false);
      }
    });

    // Bouton de réservation directe VIP : liaison immédiate avec le modal de réservation
    if (bookDirectBtn) {
      bookDirectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeAnnouncement(false);

        // Déclencher le modal universel de réservation avec le service pré-sélectionné
        setTimeout(() => {
          if (typeof window.openBookingModal === 'function') {
            window.openBookingModal('Concert Ricos Campos (24 Octobre 2026)');
          } else {
            // Repli vers la section de réservation
            const bookingSec = document.getElementById('reservations');
            if (bookingSec) {
              bookingSec.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 300);
      });
    }

    // Bouton lanceur flottant discret
    if (floatingLauncher) {
      floatingLauncher.addEventListener('click', (e) => {
        e.preventDefault();
        openAnnouncement();
      });
    }

    // Exposition globale sur window pour invocation manuelle si besoin
    window.openEventAnnouncement = openAnnouncement;
    window.closeEventAnnouncement = closeAnnouncement;
  });
})();
