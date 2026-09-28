/**
 * MAISON ADÉNIKÈ — MOTEUR INTERACTIF HÉBERGEMENT & ESPACES PALACE
 * Catalogue Gastronomique, Aperçu au Survol, Simulateur Dynamique & Toast Découverte
 */

(function () {
  'use strict';

  // --- 1. DATA MODEL OFFICIEL ---
  const LODGING_ITEMS = [
    // APPARTEMENT 1 : LE DOMAINE HISTORIQUE
    {
      id: 'apt-1-entier',
      name: 'Appartement 1 — Le Domaine Historique',
      category: 'appartement-1',
      badge: 'Disponible Immédiatement',
      badgeTone: 'emerald',
      apartmentLabel: 'Appartement Entier Privatif',
      capacityMax: 6,
      capacityLabel: 'Jusqu’à 6 personnes (3 suites privatives)',
      price: 110000,
      priceDisplay: '110 000 FCFA',
      priceUnit: '/ nuit',
      shortDescription: 'L’appartement entier privatisé : 3 chambres indépendantes avec salles d’eau attenantes, accès exclusif au grand salon lumineux contemporain et table à manger.',
      fullDescription: 'Offrez-vous l’exclusivité du Domaine Historique de la Maison Adénikè. Ce vaste appartement réunit les 3 chambres de maître (Indigo, Ocre & Terre, Azur) et vous confère la jouissance exclusive du grand salon d’apparat doté de gorges lumineuses LED, d’un meuble multimédia intégré, d’un espace lounge en teck habillé de tissus traditionnels teints et d’une grande table à manger.',
      highlightInclusion: '3 Douches/WC privatifs • Accès exclusif au grand salon lumineux & salle à manger',
      specs: {
        bed: '3 Lits King & Queen Size en teck massif',
        surface: '~130 m²',
        bathroom: '3 Salles d’eau privatives attenantes (eau chaude, douches & lavabos design)',
        livingAccess: 'Usage 100% privatif et exclusif du grand salon avec faux-plafond lumineux, TV & coin repas',
        amenities: [
          '3 Chambres climatisées avec literie en teck',
          'Grand salon d’apparat privatif avec faux-plafond rétro-éclairé',
          'Grande table à manger en teck pour repas et réunions',
          'Wi-Fi haut débit fibre optique dans tout l’appartement',
          'Téléviseur grand écran mural avec bouquet chaînes & streaming',
          'Linge de maison soigné en coton et parures traditionnelles',
          'Service conciergerie et intendance dédié',
        ],
      },
      featuredImage: 'assets/images/rooms/grand-salon-led-terracotta.jpg',
      gallery: [
        'assets/images/rooms/grand-salon-led-terracotta.jpg',
        'assets/images/rooms/salon-indigo-traditionnel.jpg',
        'assets/images/rooms/chambre-indigo.jpg',
        'assets/images/rooms/chambre-ocre-terre.jpg',
        'assets/images/rooms/chambre-azur.jpg',
      ],
    },
    {
      id: 'chambre-indigo',
      name: 'Chambre Indigo',
      category: 'appartement-1',
      badge: 'Disponible',
      badgeTone: 'gold',
      apartmentLabel: 'Appartement 1 — Le Domaine Historique',
      capacityMax: 2,
      capacityLabel: '2 personnes',
      price: 38000,
      priceDisplay: '38 000 FCFA',
      priceUnit: '/ nuit',
      shortDescription: 'Lit de maître en teck noble, parure aux motifs traditionnels bleu & blanc, salle d’eau privative attenante et coin écritoire.',
      fullDescription: 'Havre d’apaisement inspiré de la tradition textile béninoise, la Chambre Indigo accueille ses hôtes dans un cadre d’une pureté sereine. Elle se distingue par son lit en teck artisanal habillé d’une parure aux symboles bleu et blanc, sa salle d’eau privative immédiatement attenante et son accès privilégié au grand salon commun.',
      highlightInclusion: 'Douche/WC privatif inclus • Accès libre au grand salon de vie et à la terrasse',
      specs: {
        bed: 'Lit double Queen-Size en teck massif',
        surface: '~22 m²',
        bathroom: 'Salle d’eau privative attenante avec douche italienne, lavabo et WC',
        livingAccess: 'Accès libre et partagé au grand salon de vie, coin TV et table à manger',
        amenities: [
          'Climatisation silencieuse individuelle',
          'Salle d’eau privative attenante',
          'Wi-Fi haut débit fibre optique',
          'Bureau et tabouret de courtoisie en teck',
          'Literie artisanale d’exception',
          'Accès direct au grand salon lumineux',
        ],
      },
      featuredImage: 'assets/images/rooms/chambre-indigo.jpg',
      gallery: [
        'assets/images/rooms/chambre-indigo.jpg',
        'assets/images/rooms/grand-salon-led-terracotta.jpg',
        'assets/images/rooms/salon-indigo-traditionnel.jpg',
      ],
    },
    {
      id: 'chambre-ocre-terre',
      name: 'Chambre Ocre & Terre',
      category: 'appartement-1',
      badge: 'Disponible',
      badgeTone: 'terracotta',
      apartmentLabel: 'Appartement 1 — Le Domaine Historique',
      capacityMax: 2,
      capacityLabel: '2 personnes',
      price: 42000,
      priceDisplay: '42 000 FCFA',
      priceUnit: '/ nuit',
      shortDescription: 'Volets persiennes traditionnels en bois noble, parure dahoméenne bordeaux et ocre chaud, salle d’eau privative attenante.',
      fullDescription: 'Imprégnée de la chaleur des terres dahoméennes, la Chambre Ocre & Terre séduit par ses fenêtres à persiennes en bois noble laissant filtrer une douce lumière tamisée. Sa parure graphique aux teintes bordeaux et ocre et sa salle d’eau privative en font une alcôve chaleureuse et raffinée.',
      highlightInclusion: 'Douche/WC privatif inclus • Accès libre au grand salon de vie et à la terrasse',
      specs: {
        bed: 'Lit double Queen-Size en teck avec chevets intégrés',
        surface: '~24 m²',
        bathroom: 'Salle d’eau privative attenante avec douche, lavabo et WC',
        livingAccess: 'Accès libre et partagé au grand salon de vie, coin TV et table à manger',
        amenities: [
          'Volets persiennes traditionnels en bois noble',
          'Climatisation silencieuse individuelle',
          'Salle d’eau privative attenante',
          'Wi-Fi fibre optique illimité',
          'Draps de bain et peignoirs doux',
          'Accès direct au grand salon lumineux',
        ],
      },
      featuredImage: 'assets/images/rooms/chambre-ocre-terre.jpg',
      gallery: [
        'assets/images/rooms/chambre-ocre-terre.jpg',
        'assets/images/rooms/grand-salon-led-terracotta.jpg',
        'assets/images/rooms/salon-indigo-traditionnel.jpg',
      ],
    },
    {
      id: 'chambre-azur',
      name: 'Chambre Azur',
      category: 'appartement-1',
      badge: 'Disponible',
      badgeTone: 'azure',
      apartmentLabel: 'Appartement 1 — Le Domaine Historique',
      capacityMax: 2,
      capacityLabel: '2 personnes',
      price: 38000,
      priceDisplay: '38 000 FCFA',
      priceUnit: '/ nuit',
      shortDescription: 'Baignée de lumière naturelle, voilages azur lumineux, penderie sculptée en teck, miroir d’apparat de plain-pied et salle d’eau privative.',
      fullDescription: 'Ode à la clarté et à la fraîcheur océane toute proche, la Chambre Azur s’habille de voilages bleu lagon et d’une penderie majestueuse en teck sculpté. Un grand miroir d’apparat agrandit l’espace tandis que la salle de bain attenante assure une parfaite intimité.',
      highlightInclusion: 'Douche/WC privatif inclus • Accès libre au grand salon de vie et à la terrasse',
      specs: {
        bed: 'Lit double Queen-Size teck avec parure coton blanche et coussins tropicaux',
        surface: '~23 m²',
        bathroom: 'Salle d’eau privative attenante avec lavabo miroir et douche séparée',
        livingAccess: 'Accès libre et partagé au grand salon de vie, coin TV et table à manger',
        amenities: [
          'Grande penderie sculptée en teck massif',
          'Miroir d’apparat de plain-pied',
          'Voilages bleu azur et ambiance lumineuse',
          'Climatisation silencieuse individuelle',
          'Salle d’eau privative attenante',
          'Wi-Fi haut débit fibre',
        ],
      },
      featuredImage: 'assets/images/rooms/chambre-azur.jpg',
      gallery: [
        'assets/images/rooms/chambre-azur.jpg',
        'assets/images/rooms/grand-salon-led-terracotta.jpg',
        'assets/images/rooms/salon-indigo-traditionnel.jpg',
      ],
    },

    // APPARTEMENT 2 : L'AILE CONTEMPORAINE (FIN OCTOBRE)
    {
      id: 'apt-2-entier',
      name: 'Appartement 2 — L’Aile Contemporaine',
      category: 'appartement-2',
      badge: 'Disponible fin Octobre',
      badgeTone: 'octobre',
      apartmentLabel: 'Appartement Entier Privatif',
      capacityMax: 6,
      capacityLabel: 'Jusqu’à 6 personnes (3 chambres contemporaines)',
      price: 120000,
      priceDisplay: '120 000 FCFA',
      priceUnit: '/ nuit (indicatif)',
      shortDescription: 'Nouvelle aile architecturale : 3 suites au design contemporain épuré, salon panoramique privatif et finitions haut de gamme.',
      fullDescription: 'Pensée comme le prolongement contemporain de l’esprit Adénikè, l’Aile Contemporaine marie lignes pures, matières brutes locales et technologie discrète. Disponible dès fin Octobre, cet appartement réunit 3 chambres indépendantes avec leurs salles d’eau privatives et un grand salon au design épuré.',
      highlightInclusion: '3 Salles d’eau privatives • Salon contemporain exclusif • Réservation anticipée ouverte',
      specs: {
        bed: '3 Lits King-Size design contemporain',
        surface: '~135 m²',
        bathroom: '3 Salles de bains contemporaines en béton ciré & faïence claire',
        livingAccess: 'Salon privatif contemporain haut de gamme avec terrasse privée',
        amenities: [
          'Architecture contemporaine épurée',
          'Grand salon panoramique privatisable',
          'Climatisation connectée inverter',
          'Smart TV écran géant 4K UHD',
          'Fibre optique très haut débit dédiée',
          'Terrasse privative aménagée',
        ],
      },
      featuredImage: 'assets/images/suite-artisanale.jpg',
      gallery: [
        'assets/images/suite-artisanale.jpg',
        'assets/images/espace-lounge-teck.jpg',
        'assets/images/diner-terrasse.jpg',
      ],
    },
    {
      id: 'chambre-dune-lin',
      name: 'Chambre Dune & Lin (Aile Contemporaine)',
      category: 'appartement-2',
      badge: 'Disponible fin Octobre',
      badgeTone: 'octobre',
      apartmentLabel: 'Appartement 2 — L’Aile Contemporaine',
      capacityMax: 2,
      capacityLabel: '2 personnes',
      price: 45000,
      priceDisplay: '45 000 FCFA',
      priceUnit: '/ nuit',
      shortDescription: 'Teintes douces sable et lin naturel, claustras en bois clair, salle d’eau privative en béton ciré.',
      fullDescription: 'Une ode au minimalisme chaleureux de la côte béninoise. Textures de lin brut, bois sablé et salle d’eau privative contemporaine dans la nouvelle aile du domaine.',
      highlightInclusion: 'Douche/WC privatif inclus • Accès salon de l’Aile Contemporaine',
      specs: {
        bed: 'Lit King-Size contemporain en bois clair',
        surface: '~24 m²',
        bathroom: 'Salle d’eau privative contemporaine',
        livingAccess: 'Accès au salon de l’Aile Contemporaine',
        amenities: [
          'Climatisation silencieuse haute efficacité',
          'Salle d’eau privative attenante',
          'Wi-Fi fibre haut débit',
          'Dressing contemporain intégré',
        ],
      },
      featuredImage: 'assets/images/chambre-confort-adenike.jpg',
      gallery: [
        'assets/images/chambre-confort-adenike.jpg',
        'assets/images/espace-lounge-teck.jpg',
      ],
    },

    // ESPACES ÉVÉNEMENTS & PRIVATISATION
    {
      id: 'cour-honneur-pergolas',
      name: 'La Cour d’Honneur & Pergolas',
      category: 'privatisation',
      badge: 'Espace Privatisable',
      badgeTone: 'gold',
      apartmentLabel: 'Espace Plein Air de Prestige',
      capacityMax: 50,
      capacityLabel: 'Jusqu’à 50 convives assis ou en cocktail',
      price: 150000,
      priceDisplay: '150 000 FCFA',
      priceUnit: '/ événement',
      shortDescription: 'Cadre extérieur majestueux sous pergolas, tables d’apparat en teck noble, sol en sable blanc de Ouidah et éclairage nocturne féerique.',
      fullDescription: 'La Cour d’Honneur de la Maison Adénikè constitue le théâtre idéal pour vos déjeuners de gala, célébrations familiales, séminaires ou cocktails d’entreprise. L’ombre bienveillante des pergolas, les longues tables artisanales en teck et la brise marine créent un écrin de distinction inoubliable.',
      highlightInclusion: 'Tables & chaises d’apparat en teck fournies • Éclairage d’ambiance féerique • Service traiteur sur mesure',
      specs: {
        bed: 'Disposition banquet ou cocktail',
        surface: '~220 m² de plein air arboré et ombragé',
        bathroom: 'Sanitaires invités dédiés et vestiaire de courtoisie',
        livingAccess: 'Accès aux terrasses et bar extérieur',
        amenities: [
          'Pergolas ombragées et tables d’apparat en teck',
          'Sol en sable fin et verdure tropicale soignée',
          'Éclairage d’ambiance guinguette & projecteurs dorés',
          'Espace traiteur & cuisine d’appui dédiée',
          'Système son acoustique haute définition disponible',
        ],
      },
      featuredImage: 'assets/images/diner-terrasse.jpg',
      gallery: [
        'assets/images/diner-terrasse.jpg',
        'assets/images/evenements-reception.jpg',
        'assets/images/facade-bleue-enseigne.jpg',
      ],
    },
    {
      id: 'privatisation-complete-domaine',
      name: 'Privatisation Complète du Domaine',
      category: 'privatisation',
      badge: 'Exclusivité Absolue',
      badgeTone: 'gold',
      apartmentLabel: 'Exclusivité Totale de la Propriété',
      capacityMax: 12,
      capacityLabel: '12 hôtes résidents + 50 convives extérieurs',
      price: 350000,
      priceDisplay: 'Dès 350 000 FCFA',
      priceUnit: '/ jour (Sur Devis)',
      shortDescription: 'L’ensemble de la Maison Adénikè à votre disposition exclusive : les 2 appartements réunis (6 suites), la cour d’honneur et un service d’intendance dédié.',
      fullDescription: 'Pour les délégations officielles, mariages d’intimité ou retraites exécutives d’exception, privatisez l’intégralité du domaine Maison Adénikè. Vos invités disposent de 6 chambres de grand confort, de deux grands salons d’apparat, de la cour extérieure sous pergolas et d’une brigade de maîtres d’hôtel à leur service exclusif.',
      highlightInclusion: '6 Chambres privatives • 2 Grands salons • Cour d’honneur entière • Maître d’hôtel & Conciergerie 24/7',
      specs: {
        bed: '6 Lits doubles d’exception',
        surface: 'Domaine complet (~600 m² bâtis et extérieurs)',
        bathroom: '6 Salles d’eau privatives + sanitaires invités extérieurs',
        livingAccess: 'Usage 100% exclusif de l’intégralité des espaces intérieurs et extérieurs',
        amenities: [
          'Intimité totale : portail clos et accès privatif réservé',
          'Maître d’hôtel et chef de cuisine dédiés',
          'Sécurité privée discrète 24h/24',
          'Navettes VIP aéroport Cotonou & Ouidah sur demande',
          'Personnalisation complète du programme culinaire et culturel',
        ],
      },
      featuredImage: 'assets/images/facade-bleue-enseigne.jpg',
      gallery: [
        'assets/images/facade-bleue-enseigne.jpg',
        'assets/images/rooms/grand-salon-led-terracotta.jpg',
        'assets/images/rooms/salon-indigo-traditionnel.jpg',
        'assets/images/diner-terrasse.jpg',
        'assets/images/rooms/chambre-indigo.jpg',
      ],
    },
  ];

  // --- 2. ADD-ONS DISPONIBLES ---
  const ADDONS = [
    {
      id: 'petit_dejeuner_royal',
      name: 'Petit-déjeuner royal béninois',
      description: 'Jus d’ananas pain de sucre frais, beignets kklaklo chauds, fruits tropicaux, thé & café.',
      price: 3500,
      priceType: 'per_day_per_person',
      priceLabel: '+3 500 FCFA / pers / jour',
    },
    {
      id: 'navette_vip_cotonou',
      name: 'Navette VIP Cotonou ⇄ Ouidah',
      description: 'Transfert climatisé par la Route des Pêches (aller ou retour privatif avec chauffeur).',
      price: 25000,
      priceType: 'flat',
      priceLabel: '+25 000 FCFA / trajet',
    },
    {
      id: 'diner_bomiwo_royal',
      name: 'Dîner d’apparat Bômiwo Royal',
      description: 'La spécialité signature mijotée au feu de bois avec pintade et poulet fermier.',
      price: 8500,
      priceType: 'per_person',
      priceLabel: '+8 500 FCFA / pers',
    },
    {
      id: 'visite_guidee_ouidah',
      name: 'Visite guidée mémorielle de Ouidah',
      description: 'Circuit privatif demi-journée : Temple des Pythons, Forêt Sacrée de Kpassè, Route des Esclaves.',
      price: 15000,
      priceType: 'flat',
      priceLabel: '+15 000 FCFA / groupe',
    },
  ];

  // --- 3. ANECDOTES DISCOVERY TOAST ---
  const DISCOVERY_FACTS = [
    {
      category: 'Artisanat & Matières',
      tag: 'Le Saviez-vous ?',
      text: 'Le grand salon de l’Appartement 1 est habillé de textiles traditionnels teints à la main selon la technique ancestrale de l’indigo béninois.',
    },
    {
      category: 'Gastronomie de Terroir',
      tag: 'Table d’Hôtes',
      text: 'Savourez notre légendaire Bômiwo royal fermier préparé au feu de bois dans les canaris de terre cuite lors de votre séjour.',
    },
    {
      category: 'Réceptions d’Exception',
      tag: 'Événements',
      text: 'Notre cour d’honneur sous pergola et sable fin est entièrement privatisable pour vos déjeuners d’affaires, mariages et banquets.',
    },
    {
      category: 'Nouveauté 2026',
      tag: 'Avant-Première',
      text: 'L’Aile Contemporaine (Appartement 2) ouvrira ses portes fin Octobre avec 3 nouvelles suites au design épuré.',
    },
    {
      category: 'Philosophie Adénikè',
      tag: 'Art de Vivre',
      text: '« Ibi yìí L’ọkàn ń Sinmi » — En langue yoruba, notre devise consacre ce lieu comme le sanctuaire où le cœur et l’esprit trouvent le repos.',
    },
  ];

  // --- 4. ÉTAT DU DRAWER & CALCULATEUR ---
  let currentSelectedItem = LODGING_ITEMS[0];
  let currentNights = 1;
  let currentGuests = 2;
  let selectedAddonIds = new Set();
  let currentActiveGalleryIndex = 0;

  // --- INITIALISATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initLodgingMenuCardModal();
    initMenuCardRowClicks();
    initCatalogFilter();
    initHoverPreview();
    initDrawer();
    initDiscoveryToast();
  });

  // --- CARTE DÉPLIANTE PLEIN ÉCRAN (MODAL DES CHAMBRES) ---
  function initLodgingMenuCardModal() {
    const modal = document.getElementById('lodgingMenuModal');
    const closeBtn = document.getElementById('lodgingMenuCardCloseBtn');
    const openButtons = document.querySelectorAll('[data-open-lodging-menu]');
    if (!modal) return;

    const openCard = () => {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeCard = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      const drawer = document.getElementById('lodgingDrawerOverlay');
      if (!drawer || !drawer.classList.contains('is-open')) {
        document.body.style.overflow = '';
      }
    };

    openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCard();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCard();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCard();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeCard();
      }
    });

    window.closeLodgingMenuModal = closeCard;
  }

  // --- CLIC SUR LES LIGNES DE LA CARTE ROYAL ET LES CARTES DE LA GALERIE ---
  function initMenuCardRowClicks() {
    const clickableItems = document.querySelectorAll('.menu-card-row[data-item-id], .aww-gallery-card[data-item-id]');
    clickableItems.forEach(elem => {
      elem.style.cursor = 'pointer';
      elem.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        const itemId = elem.getAttribute('data-item-id');
        const item = LODGING_ITEMS.find(it => it.id === itemId);
        if (item) {
          if (typeof window.closeLodgingMenuModal === 'function') {
            window.closeLodgingMenuModal();
          }
          openLodgingDrawer(item);
        }
      });
    });
  }

  // --- FILTRE DU CATALOGUE (SI APPLICABLE) ---
  function initCatalogFilter() {
    const filterBtns = document.querySelectorAll('.lodging-filter-btn');
    const menuRows = document.querySelectorAll('.lodging-menu-row');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        menuRows.forEach(row => {
          const category = row.dataset.category;
          if (filter === 'all' || category === filter) {
            row.style.display = 'block';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // --- APERÇU AU SURVOL (HOVER PREVIEW) ---
  function initHoverPreview() {
    const menuRows = document.querySelectorAll('.lodging-menu-row');
    const previewPanel = document.getElementById('lodgingPreviewPanel');
    if (!previewPanel) return;

    const previewImg = previewPanel.querySelector('.lodging-preview-img');
    const previewTitle = previewPanel.querySelector('.lodging-preview-title');
    const previewBadge = previewPanel.querySelector('.lodging-preview-badge');
    const previewInclusion = previewPanel.querySelector('.lodging-preview-inclusion');
    const previewLiving = previewPanel.querySelector('.lodging-preview-living');
    const previewPrice = previewPanel.querySelector('.lodging-preview-price-val');
    const previewUnit = previewPanel.querySelector('.lodging-preview-price-unit');
    const previewCta = previewPanel.querySelector('.lodging-preview-cta');

    menuRows.forEach(row => {
      const itemId = row.dataset.itemId;
      const item = LODGING_ITEMS.find(it => it.id === itemId);
      if (!item) return;

      row.addEventListener('mouseenter', () => {
        menuRows.forEach(r => r.classList.remove('is-active'));
        row.classList.add('is-active');

        // Met à jour le panneau
        if (previewImg) previewImg.src = item.featuredImage;
        if (previewTitle) previewTitle.textContent = item.name;
        if (previewBadge) previewBadge.textContent = item.apartmentLabel;
        if (previewInclusion) previewInclusion.textContent = '✦ ' + item.highlightInclusion;
        if (previewLiving) previewLiving.textContent = item.specs.livingAccess;
        if (previewPrice) previewPrice.textContent = item.priceDisplay;
        if (previewUnit) previewUnit.textContent = item.priceUnit;
        if (previewCta) {
          previewCta.onclick = (e) => {
            e.stopPropagation();
            openLodgingDrawer(item);
          };
        }
      });

      row.addEventListener('click', () => {
        openLodgingDrawer(item);
      });
    });
  }

  // --- TIROIR LATÉRAL & CALCULATEUR ---
  function initDrawer() {
    const drawerOverlay = document.getElementById('lodgingDrawerOverlay');
    const drawerCloseBtn = document.getElementById('lodgingDrawerCloseBtn');
    if (!drawerOverlay) return;

    // Fermeture clic fond & bouton
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeLodgingDrawer();
    });

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeLodgingDrawer);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerOverlay.classList.contains('is-open')) {
        closeLodgingDrawer();
      }
    });

    // Steppers nuits
    const nightMinus = document.getElementById('nightMinusBtn');
    const nightPlus = document.getElementById('nightPlusBtn');
    const nightDisplay = document.getElementById('nightDisplayVal');

    if (nightMinus && nightPlus) {
      nightMinus.addEventListener('click', () => {
        if (currentNights > 1) {
          currentNights--;
          nightDisplay.textContent = currentNights + (currentNights > 1 ? ' nuits' : ' nuit');
          updateDynamicPriceAndWhatsApp();
        }
      });
      nightPlus.addEventListener('click', () => {
        currentNights++;
        nightDisplay.textContent = currentNights + ' nuits';
        updateDynamicPriceAndWhatsApp();
      });
    }

    // Steppers voyageurs
    const guestMinus = document.getElementById('guestMinusBtn');
    const guestPlus = document.getElementById('guestPlusBtn');
    const guestDisplay = document.getElementById('guestDisplayVal');

    if (guestMinus && guestPlus) {
      guestMinus.addEventListener('click', () => {
        if (currentGuests > 1) {
          currentGuests--;
          guestDisplay.textContent = currentGuests + ' pers.';
          updateDynamicPriceAndWhatsApp();
        }
      });
      guestPlus.addEventListener('click', () => {
        const max = currentSelectedItem ? currentSelectedItem.capacityMax : 6;
        if (currentGuests < max) {
          currentGuests++;
          guestDisplay.textContent = currentGuests + ' pers.';
          updateDynamicPriceAndWhatsApp();
        }
      });
    }

    // Addons checkboxes
    const addonContainers = document.querySelectorAll('.lodging-addon-item');
    addonContainers.forEach(container => {
      const checkbox = container.querySelector('input[type="checkbox"]');
      const addonId = container.dataset.addonId;

      container.addEventListener('click', (e) => {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        if (checkbox.checked) {
          selectedAddonIds.add(addonId);
          container.classList.add('is-selected');
        } else {
          selectedAddonIds.delete(addonId);
          container.classList.remove('is-selected');
        }
        updateDynamicPriceAndWhatsApp();
      });
    });
  }

  function openLodgingDrawer(item) {
    currentSelectedItem = item;
    currentNights = 1;
    currentGuests = Math.min(2, item.capacityMax);
    selectedAddonIds.clear();
    currentActiveGalleryIndex = 0;

    const drawerOverlay = document.getElementById('lodgingDrawerOverlay');
    if (!drawerOverlay) return;

    // Met à jour les éléments du Drawer
    const titleElem = document.getElementById('drawerItemTitle');
    const labelElem = document.getElementById('drawerItemLabel');
    const badgeElem = document.getElementById('drawerItemBadge');
    const capacityElem = document.getElementById('drawerItemCapacity');
    const priceDisplayElem = document.getElementById('drawerItemPriceDisplay');
    const descElem = document.getElementById('drawerItemDesc');
    const inclusionElem = document.getElementById('drawerItemInclusion');
    const bathroomElem = document.getElementById('drawerItemBathroom');
    const livingElem = document.getElementById('drawerItemLiving');
    const mainImgElem = document.getElementById('drawerMainImg');
    const thumbsContainer = document.getElementById('drawerThumbsContainer');
    const amenitiesContainer = document.getElementById('drawerAmenitiesList');
    const nightDisplay = document.getElementById('nightDisplayVal');
    const guestDisplay = document.getElementById('guestDisplayVal');

    if (titleElem) titleElem.textContent = item.name;
    if (labelElem) labelElem.textContent = item.apartmentLabel;
    if (badgeElem) badgeElem.textContent = item.badge;
    if (capacityElem) capacityElem.textContent = item.capacityLabel;
    if (priceDisplayElem) priceDisplayElem.textContent = item.priceDisplay + ' ' + item.priceUnit;
    if (descElem) descElem.textContent = item.fullDescription;
    if (inclusionElem) inclusionElem.textContent = '« ' + item.highlightInclusion + ' »';
    if (bathroomElem) bathroomElem.textContent = item.specs.bathroom;
    if (livingElem) livingElem.textContent = item.specs.livingAccess;

    if (nightDisplay) nightDisplay.textContent = '1 nuit';
    if (guestDisplay) guestDisplay.textContent = currentGuests + ' pers.';

    // Galerie photos
    const gallery = item.gallery && item.gallery.length > 0 ? item.gallery : [item.featuredImage];
    if (mainImgElem) mainImgElem.src = gallery[0];

    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      if (gallery.length > 1) {
        gallery.forEach((imgUrl, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `lodging-drawer-thumb-btn ${idx === 0 ? 'active' : ''}`;
          btn.innerHTML = `<img src="${imgUrl}" alt="${item.name} ${idx + 1}">`;
          btn.addEventListener('click', () => {
            currentActiveGalleryIndex = idx;
            if (mainImgElem) mainImgElem.src = imgUrl;
            thumbsContainer.querySelectorAll('.lodging-drawer-thumb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          });
          thumbsContainer.appendChild(btn);
        });
        thumbsContainer.style.display = 'flex';
      } else {
        thumbsContainer.style.display = 'none';
      }
    }

    // Commodités
    if (amenitiesContainer) {
      amenitiesContainer.innerHTML = '';
      item.specs.amenities.forEach(am => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.gap = '0.5rem';
        div.style.fontSize = '0.75rem';
        div.style.color = 'rgba(250, 247, 242, 0.85)';
        div.innerHTML = `<span style="width: 5px; height: 5px; border-radius: 50%; background: #C5A059;"></span><span>${am}</span>`;
        amenitiesContainer.appendChild(div);
      });
    }

    // Reset checkboxes
    document.querySelectorAll('.lodging-addon-item').forEach(el => {
      el.classList.remove('is-selected');
      const chk = el.querySelector('input[type="checkbox"]');
      if (chk) chk.checked = false;
    });

    updateDynamicPriceAndWhatsApp();

    drawerOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLodgingDrawer() {
    const drawerOverlay = document.getElementById('lodgingDrawerOverlay');
    if (drawerOverlay) {
      drawerOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function updateDynamicPriceAndWhatsApp() {
    if (!currentSelectedItem) return;

    let baseTotal = currentSelectedItem.price * currentNights;
    let addonsTotal = 0;
    const selectedAddonNames = [];

    selectedAddonIds.forEach(id => {
      const addon = ADDONS.find(a => a.id === id);
      if (!addon) return;
      selectedAddonNames.push(addon.name);

      if (addon.priceType === 'per_day_per_person') {
        addonsTotal += addon.price * currentNights * currentGuests;
      } else if (addon.priceType === 'per_person') {
        addonsTotal += addon.price * currentGuests;
      } else {
        addonsTotal += addon.price;
      }
    });

    const grandTotal = baseTotal + addonsTotal;

    // Affichage prix
    const totalElem = document.getElementById('drawerTotalAmount');
    const nightsSummaryElem = document.getElementById('drawerNightsSummary');
    if (totalElem) {
      totalElem.textContent = grandTotal.toLocaleString('fr-FR') + ' FCFA';
    }
    if (nightsSummaryElem) {
      nightsSummaryElem.textContent = `Estimation totale pour ${currentNights} nuit(s) (${currentGuests} pers.) :`;
    }

    // Génération du lien WhatsApp
    const waBtn = document.getElementById('drawerWhatsAppBtn');
    if (waBtn) {
      const lines = [
        `Bonjour Maison Adénikè, je souhaite réserver un séjour / espace :`,
        ``,
        `✦ Hébergement / Espace : ${currentSelectedItem.name}`,
        `✦ Durée : ${currentNights} nuit(s) pour ${currentGuests} personne(s)`,
        `✦ Inclusions : ${currentSelectedItem.highlightInclusion}`,
      ];

      if (selectedAddonNames.length > 0) {
        lines.push(`✦ Options à la carte sélectionnées :`);
        selectedAddonNames.forEach(name => lines.push(`   • ${name}`));
      } else {
        lines.push(`✦ Options à la carte : Aucune option choisie`);
      }

      lines.push(``);
      lines.push(`✦ Montant total estimé : ${grandTotal.toLocaleString('fr-FR')} FCFA`);
      lines.push(``);
      lines.push(`Pourriez-vous me confirmer les disponibilités pour ces dates ? Merci.`);

      const message = encodeURIComponent(lines.join('\n'));
      waBtn.href = `https://wa.me/2290155456363?text=${message}`;
    }
  }

  // --- 5. TOAST DE DÉCOUVERTE FLOTTANT ALÉATOIRE ---
  function initDiscoveryToast() {
    const toast = document.getElementById('lodgingDiscoveryToast');
    if (!toast) return;

    const closeBtn = document.getElementById('discoveryToastClose');
    const tagElem = document.getElementById('discoveryToastTag');
    const categoryElem = document.getElementById('discoveryToastCategory');
    const textElem = document.getElementById('discoveryToastText');

    let isDismissed = false;
    let currentFactIndex = 0;
    let hideTimer = null;
    let nextTimer = null;

    const showFact = () => {
      if (isDismissed) return;

      const fact = DISCOVERY_FACTS[currentFactIndex];
      currentFactIndex = (currentFactIndex + 1) % DISCOVERY_FACTS.length;

      if (tagElem) tagElem.textContent = fact.tag;
      if (categoryElem) categoryElem.textContent = fact.category;
      if (textElem) textElem.textContent = fact.text;

      // Relance la barre d'animation
      const bar = toast.querySelector('.lodging-discovery-progress');
      if (bar) {
        bar.style.animation = 'none';
        bar.offsetHeight; /* trigger reflow */
        bar.style.animation = 'progressFill 6s linear forwards';
      }

      toast.classList.add('is-active');

      // Masquer après 6s
      hideTimer = setTimeout(() => {
        toast.classList.remove('is-active');

        // Réapparition aléatoire entre 15s et 25s
        const nextInterval = Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000;
        nextTimer = setTimeout(showFact, nextInterval);
      }, 6000);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        isDismissed = true;
        toast.classList.remove('is-active');
        clearTimeout(hideTimer);
        clearTimeout(nextTimer);
      });
    }

    // Premier affichage après 3.5 secondes
    nextTimer = setTimeout(showFact, 3500);
  }

  // Expose globalement au besoin
  window.openLodgingDrawerById = function (id) {
    const item = LODGING_ITEMS.find(it => it.id === id);
    if (item) openLodgingDrawer(item);
  };
})();
