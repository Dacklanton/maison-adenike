/**
 * MAISON ADÉNIKÈ — NOUVELLE NOMENCLATURE DE L'OFFRE HÉBERGEMENT & ESPACES
 * Ouidah, Bénin.
 * 
 * Basé sur les photographies réelles des lieux :
 * - Appartement 1 : Le Domaine Historique (Disponible immédiatement)
 * - Appartement 2 : L'Aile Contemporaine (Disponible fin Octobre)
 * - Espaces & Privatisation : Cour d'honneur, pergolas et privatisation globale
 */

export interface LodgingSpecs {
  bedType?: string;
  surface?: string;
  bathroom: string;
  livingRoomAccess: string;
  amenities: string[];
}

export interface LodgingItem {
  id: string;
  slug: string;
  name: string;
  apartmentLabel: string;
  category: 'appartement-1' | 'appartement-2' | 'privatisation';
  categoryTitle: string;
  type: 'appartement-entier' | 'chambre' | 'espace' | 'domaine-entier';
  status: 'available' | 'coming-soon' | 'on-quote';
  badge: string;
  badgeTone: 'gold' | 'terracotta' | 'emerald' | 'azure';
  capacity: {
    max: number;
    label: string;
  };
  price: number; // FCFA
  priceDisplay: string;
  priceUnit: string;
  shortDescription: string;
  fullDescription: string;
  highlightInclusion: string;
  specs: LodgingSpecs;
  featuredImage: string;
  gallery: string[];
}

export interface LodgingAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'per_day_per_person' | 'per_person' | 'flat';
  priceLabel: string;
  defaultChecked?: boolean;
  popular?: boolean;
}

export interface DiscoveryFact {
  id: string;
  category: string;
  text: string;
  tag: string;
}

/* ==========================================================================
   1. CATALOGUE OFFICIEL DES HÉBERGEMENTS & ESPACES
   ========================================================================== */

export const LODGING_CATALOG: LodgingItem[] = [
  // --- APPARTEMENT 1 : LE DOMAINE HISTORIQUE ---
  {
    id: 'apt-1-entier',
    slug: 'appartement-1-domaine-historique',
    name: 'Appartement 1 — Le Domaine Historique',
    apartmentLabel: 'Appartement Entier Privatif',
    category: 'appartement-1',
    categoryTitle: 'Appartement 1 • Domaine Historique',
    type: 'appartement-entier',
    status: 'available',
    badge: 'Disponible Immédiatement',
    badgeTone: 'emerald',
    capacity: {
      max: 6,
      label: 'Jusqu’à 6 personnes (3 suites privatives)',
    },
    price: 110000,
    priceDisplay: '110 000 FCFA',
    priceUnit: '/ nuit',
    shortDescription: 'L’appartement entier privatisé : 3 chambres indépendantes avec salles d’eau attenantes, grand salon lumineux contemporain et table de banquet.',
    fullDescription: 'Offrez-vous l’exclusivité du Domaine Historique de la Maison Adénikè. Ce vaste appartement réunit les 3 chambres de maître (Indigo, Ocre & Terre, Azur) et vous confère la jouissance exclusive du grand salon d’apparat doté de gorges lumineuses LED, d’un meuble multimédia intégré, d’un espace lounge en teck habillé de tissus traditionnels teints et d’une grande table à manger.',
    highlightInclusion: '3 Douches/WC privatifs • Accès exclusif au grand salon lumineux & à la salle à manger',
    specs: {
      bedType: '3 Lits King & Queen Size en teck massif',
      surface: '~130 m²',
      bathroom: '3 Salles d’eau privatives attenantes avec eau chaude, douches & lavabos design',
      livingRoomAccess: 'Usage 100% privatif et exclusif du grand salon avec faux-plafond lumineux, TV & coin repas',
      amenities: [
        '3 Chambres climatisées avec literie haut de gamme',
        'Grand salon d’apparat privatif avec faux-plafond rétro-éclairé',
        'Grande table à manger en teck pour repas et séances de travail',
        'Wi-Fi haut débit fibre optique dans tout l’appartement',
        'Téléviseur grand écran mural avec bouquet chaînes & streaming',
        'Linge de maison soigné en coton et parures traditionnelles',
        'Service conciergerie et ménage quotidien inclus',
      ],
    },
    featuredImage: '/assets/images/rooms/grand-salon-led-terracotta.jpg',
    gallery: [
      '/assets/images/rooms/grand-salon-led-terracotta.jpg',
      '/assets/images/rooms/salon-indigo-traditionnel.jpg',
      '/assets/images/rooms/chambre-indigo.jpg',
      '/assets/images/rooms/chambre-ocre-terre.jpg',
      '/assets/images/rooms/chambre-azur.jpg',
    ],
  },
  {
    id: 'chambre-indigo',
    slug: 'chambre-indigo-apt-1',
    name: 'Chambre Indigo',
    apartmentLabel: 'Appartement 1 — Le Domaine Historique',
    category: 'appartement-1',
    categoryTitle: 'Appartement 1 • Domaine Historique',
    type: 'chambre',
    status: 'available',
    badge: 'Disponible',
    badgeTone: 'gold',
    capacity: {
      max: 2,
      label: '2 personnes',
    },
    price: 38000,
    priceDisplay: '38 000 FCFA',
    priceUnit: '/ nuit',
    shortDescription: 'Lit de maître en teck noble, parure aux motifs traditionnels bleu & blanc, salle d’eau privative attenante et coin écritoire.',
    fullDescription: 'Havre d’apaisement inspiré de la tradition textile béninoise, la Chambre Indigo accueille ses hôtes dans un cadre d’une pureté sereine. Elle se distingue par son lit en teck artisanal habillé d’une parure aux symboles bleu et blanc, sa salle d’eau privative immédiatement attenante et son accès privilégié au grand salon commun.',
    highlightInclusion: 'Douche/WC privatif inclus • Accès libre au grand salon de vie et à la terrasse',
    specs: {
      bedType: 'Lit double Queen-Size en teck massif',
      surface: '~22 m²',
      bathroom: 'Salle d’eau privative attenante avec douche italienne, lavabo et WC',
      livingRoomAccess: 'Accès libre et partagé au grand salon de vie, coin TV et table à manger',
      amenities: [
        'Climatisation silencieuse individuelle',
        'Salle d’eau privative attenante',
        'Wi-Fi haut débit fibre',
        'Bureau et tabouret de courtoisie en teck',
        'Literie artisanale d’exception',
        'Accès direct au grand salon lumineux',
      ],
    },
    featuredImage: '/assets/images/rooms/chambre-indigo.jpg',
    gallery: [
      '/assets/images/rooms/chambre-indigo.jpg',
      '/assets/images/rooms/grand-salon-led-terracotta.jpg',
      '/assets/images/rooms/salon-indigo-traditionnel.jpg',
    ],
  },
  {
    id: 'chambre-ocre-terre',
    slug: 'chambre-ocre-terre-apt-1',
    name: 'Chambre Ocre & Terre',
    apartmentLabel: 'Appartement 1 — Le Domaine Historique',
    category: 'appartement-1',
    categoryTitle: 'Appartement 1 • Domaine Historique',
    type: 'chambre',
    status: 'available',
    badge: 'Disponible',
    badgeTone: 'terracotta',
    capacity: {
      max: 2,
      label: '2 personnes',
    },
    price: 42000,
    priceDisplay: '42 000 FCFA',
    priceUnit: '/ nuit',
    shortDescription: 'Volets persiennes traditionnels en bois noble, parure dahoméenne bordeaux et ocre chaud, salle d’eau privative attenante.',
    fullDescription: 'Imprégnée de la chaleur des terres dahoméennes, la Chambre Ocre & Terre séduit par ses fenêtres à persiennes en bois noble laissant filtrer une douce lumière tamisée. Sa parure graphique aux teintes bordeaux et ocre et sa salle d’eau privative en font une alcôve chaleureuse et raffinée.',
    highlightInclusion: 'Douche/WC privatif inclus • Accès libre au grand salon de vie et à la terrasse',
    specs: {
      bedType: 'Lit double Queen-Size en teck avec chevets intégrés',
      surface: '~24 m²',
      bathroom: 'Salle d’eau privative attenante carrelée avec douche, lavabo et WC',
      livingRoomAccess: 'Accès libre et partagé au grand salon de vie, coin TV et table à manger',
      amenities: [
        'Volets persiennes en bois et occultation naturelle',
        'Climatisation silencieuse individuelle',
        'Salle d’eau privative attenante',
        'Wi-Fi fibre optique illimité',
        'Draps de bain et peignoirs doux',
        'Accès direct au grand salon lumineux',
      ],
    },
    featuredImage: '/assets/images/rooms/chambre-ocre-terre.jpg',
    gallery: [
      '/assets/images/rooms/chambre-ocre-terre.jpg',
      '/assets/images/rooms/grand-salon-led-terracotta.jpg',
      '/assets/images/rooms/salon-indigo-traditionnel.jpg',
    ],
  },
  {
    id: 'chambre-azur',
    slug: 'chambre-azur-apt-1',
    name: 'Chambre Azur',
    apartmentLabel: 'Appartement 1 — Le Domaine Historique',
    category: 'appartement-1',
    categoryTitle: 'Appartement 1 • Domaine Historique',
    type: 'chambre',
    status: 'available',
    badge: 'Disponible',
    badgeTone: 'azure',
    capacity: {
      max: 2,
      label: '2 personnes',
    },
    price: 38000,
    priceDisplay: '38 000 FCFA',
    priceUnit: '/ nuit',
    shortDescription: 'Baignée de lumière naturelle, voilages azur lumineux, penderie sculptée en teck, miroir d’apparat de plain-pied et salle d’eau privative.',
    fullDescription: 'Ode à la clarté et à la fraîcheur océane toute proche, la Chambre Azur s’habille de voilages bleu lagon et d’une penderie majestueuse en teck sculpté. Un grand miroir d’apparat agrandit l’espace tandis que la salle de bain attenante assure une parfaite intimité.',
    highlightInclusion: 'Douche/WC privatif inclus • Accès libre au grand salon de vie et à la terrasse',
    specs: {
      bedType: 'Lit double Queen-Size teck avec parure coton blanche et coussins tropicaux',
      surface: '~23 m²',
      bathroom: 'Salle d’eau privative attenante avec lavabo miroir et douche séparée',
      livingRoomAccess: 'Accès libre et partagé au grand salon de vie, coin TV et table à manger',
      amenities: [
        'Grande penderie sculptée en teck massif',
        'Miroir d’apparat de plain-pied',
        'Voilages bleu azur et ambiance lumineuse',
        'Climatisation silencieuse individuelle',
        'Salle d’eau privative attenante',
        'Wi-Fi haut débit fibre',
      ],
    },
    featuredImage: '/assets/images/rooms/chambre-azur.jpg',
    gallery: [
      '/assets/images/rooms/chambre-azur.jpg',
      '/assets/images/rooms/grand-salon-led-terracotta.jpg',
      '/assets/images/rooms/salon-indigo-traditionnel.jpg',
    ],
  },

  // --- APPARTEMENT 2 : L'AILE CONTEMPORAINE (DISPONIBLE FIN OCTOBRE) ---
  {
    id: 'apt-2-entier',
    slug: 'appartement-2-aile-contemporaine',
    name: 'Appartement 2 — L’Aile Contemporaine',
    apartmentLabel: 'Appartement Entier Privatif',
    category: 'appartement-2',
    categoryTitle: 'Appartement 2 • L’Aile Contemporaine',
    type: 'appartement-entier',
    status: 'coming-soon',
    badge: 'Disponible fin Octobre',
    badgeTone: 'gold',
    capacity: {
      max: 6,
      label: 'Jusqu’à 6 personnes (3 chambres contemporaines)',
    },
    price: 120000,
    priceDisplay: '120 000 FCFA',
    priceUnit: '/ nuit (indicatif)',
    shortDescription: 'Nouvelle aile architecturale : 3 suites au design contemporain épuré, salon panoramique privatif et finitions haut de gamme.',
    fullDescription: 'Pensée comme le prolongement contemporain de l’esprit Adénikè, l’Aile Contemporaine marie lignes pures, matières brutes locales et technologie discrète. Disponible dès fin Octobre, cet appartement réunit 3 chambres indépendantes avec leurs salles d’eau privatives et un grand salon au design épuré.',
    highlightInclusion: '3 Salles d’eau privatives • Salon contemporain exclusif • Réservation anticipée ouverte',
    specs: {
      bedType: '3 Lits King-Size design contemporain',
      surface: '~135 m²',
      bathroom: '3 Salles de bains contemporaines en béton ciré & faïence claire',
      livingRoomAccess: 'Salon privatif contemporain haut de gamme avec terrasse privée',
      amenities: [
        'Architecture contemporaine épurée',
        'Grand salon panoramique privatisable',
        'Climatisation connectée inverter',
        'Smart TV écran géant 4K UHD',
        'Fibre optique très haut débit dédiée',
        'Terrasse privative aménagée',
      ],
    },
    featuredImage: '/assets/images/suite-artisanale.jpg',
    gallery: [
      '/assets/images/suite-artisanale.jpg',
      '/assets/images/espace-lounge-teck.jpg',
      '/assets/images/diner-terrasse.jpg',
    ],
  },
  {
    id: 'chambre-dune-lin',
    slug: 'chambre-dune-lin-apt-2',
    name: 'Chambre Dune & Lin (Aile Contemporaine)',
    apartmentLabel: 'Appartement 2 — L’Aile Contemporaine',
    category: 'appartement-2',
    categoryTitle: 'Appartement 2 • L’Aile Contemporaine',
    type: 'chambre',
    status: 'coming-soon',
    badge: 'Disponible fin Octobre',
    badgeTone: 'gold',
    capacity: {
      max: 2,
      label: '2 personnes',
    },
    price: 45000,
    priceDisplay: '45 000 FCFA',
    priceUnit: '/ nuit',
    shortDescription: 'Teintes douces sable et lin naturel, claustras en bois clair, salle d’eau privative en béton ciré.',
    fullDescription: 'Une ode au minimalisme chaleureux de la côte béninoise. Textures de lin brut, bois sablé et salle d’eau privative contemporaine dans la nouvelle aile du domaine.',
    highlightInclusion: 'Douche/WC privatif inclus • Accès salon de l’Aile Contemporaine',
    specs: {
      bedType: 'Lit King-Size contemporain en bois clair',
      surface: '~24 m²',
      bathroom: 'Salle d’eau privative contemporaine',
      livingRoomAccess: 'Accès au salon de l’Aile Contemporaine',
      amenities: [
        'Climatisation silencieuse haute efficacité',
        'Salle d’eau privative attenante',
        'Wi-Fi fibre haut débit',
        'Dressing contemporain intégré',
      ],
    },
    featuredImage: '/assets/images/chambre-confort-adenike.jpg',
    gallery: [
      '/assets/images/chambre-confort-adenike.jpg',
      '/assets/images/espace-lounge-teck.jpg',
    ],
  },

  // --- ESPACES ÉVÉNEMENTS & PRIVATISATION TOTALE ---
  {
    id: 'cour-honneur-pergolas',
    slug: 'cour-honneur-pergolas-espace',
    name: 'La Cour d’Honneur & Pergolas',
    apartmentLabel: 'Espace Plein Air de Prestige',
    category: 'privatisation',
    categoryTitle: 'Espaces Événements & Privatisation',
    type: 'espace',
    status: 'available',
    badge: 'Espace Privatisable',
    badgeTone: 'gold',
    capacity: {
      max: 50,
      label: 'Jusqu’à 50 convives assis ou en cocktail',
    },
    price: 150000,
    priceDisplay: '150 000 FCFA',
    priceUnit: '/ événement',
    shortDescription: 'Cadre extérieur majestueux sous pergolas, tables d’apparat en teck noble, sol en sable blanc de Ouidah et éclairage nocturne féerique.',
    fullDescription: 'La Cour d’Honneur de la Maison Adénikè constitue le théâtre idéal pour vos déjeuners de gala, célébrations familiales, séminaires ou cocktails d’entreprise. L’ombre bienveillante des pergolas, les longues tables artisanales en teck et la brise marine créent un écrin de distinction inoubliable.',
    highlightInclusion: 'Tables & chaises d’apparat en teck fournies • Éclairage d’ambiance féerique • Service traiteur sur mesure',
    specs: {
      surface: '~220 m² de plein air arboré et ombragé',
      bathroom: 'Sanitaires invités dédiés et vestiaire de courtoisie',
      livingRoomAccess: 'Accès aux terrasses et bar extérieur',
      amenities: [
        'Pergolas ombragées et tables d’apparat en teck',
        'Sol en sable fin et verdure tropicale soignée',
        'Éclairage d’ambiance guinguette & projecteurs dorés',
        'Espace traiteur & cuisine d’appui dédiée',
        'Système son acoustique haute définition disponible',
      ],
    },
    featuredImage: '/assets/images/diner-terrasse.jpg',
    gallery: [
      '/assets/images/diner-terrasse.jpg',
      '/assets/images/evenements-reception.jpg',
      '/assets/images/facade-bleue-enseigne.jpg',
    ],
  },
  {
    id: 'privatisation-complete-domaine',
    slug: 'privatisation-complete-domaine-adenike',
    name: 'Privatisation Complète du Domaine',
    apartmentLabel: 'Exclusivité Totale de la Propriété',
    category: 'privatisation',
    categoryTitle: 'Espaces Événements & Privatisation',
    type: 'domaine-entier',
    status: 'on-quote',
    badge: 'Exclusivité Absolue',
    badgeTone: 'gold',
    capacity: {
      max: 12,
      label: '12 hôtes résidents + 50 convives extérieurs',
    },
    price: 350000,
    priceDisplay: 'Dès 350 000 FCFA',
    priceUnit: '/ jour (Sur Devis)',
    shortDescription: 'L’ensemble de la Maison Adénikè à votre disposition exclusive : les 2 appartements réunis (6 suites), la cour d’honneur et un service d’intendance dédié.',
    fullDescription: 'Pour les délégations officielles, mariages d’intimité ou retraites exécutives d’exception, privatisez l’intégralité du domaine Maison Adénikè. Vos invités disposent de 6 chambres de grand confort, de deux grands salons d’apparat, de la cour extérieure sous pergolas et d’une brigade de maîtres d’hôtel à leur service exclusif.',
    highlightInclusion: '6 Chambres privatives • 2 Grands salons • Cour d’honneur entière • Maître d’hôtel & Conciergerie 24/7',
    specs: {
      surface: 'Domaine complet (~600 m² bâtis et extérieurs)',
      bathroom: '6 Salles d’eau privatives + sanitaires invités extérieurs',
      livingRoomAccess: 'Usage 100% exclusif de l’intégralité des espaces intérieurs et extérieurs',
      amenities: [
        'Intimité totale : portail clos et accès privatif réservé',
        'Maître d’hôtel et chef de cuisine dédiés',
        'Sécurité privée discrète 24h/24',
        'Navettes VIP aéroport Cotonou & Ouidah sur demande',
        'Personnalisation complète du programme culinaire et culturel',
      ],
    },
    featuredImage: '/assets/images/facade-bleue-enseigne.jpg',
    gallery: [
      '/assets/images/facade-bleue-enseigne.jpg',
      '/assets/images/rooms/grand-salon-led-terracotta.jpg',
      '/assets/images/rooms/salon-indigo-traditionnel.jpg',
      '/assets/images/diner-terrasse.jpg',
      '/assets/images/rooms/chambre-indigo.jpg',
    ],
  },
];

/* ==========================================================================
   2. OPTIONS & SERVICES À LA CARTE (ADD-ONS)
   ========================================================================== */

export const LODGING_ADDONS: LodgingAddon[] = [
  {
    id: 'petit_dejeuner_royal',
    name: 'Petit-déjeuner royal béninois',
    description: 'Jus d’ananas frais pain de sucre, beignets kklaklo chauds, fruits tropicaux découpés, thé & café de sélection.',
    price: 3500,
    priceType: 'per_day_per_person',
    priceLabel: '+3 500 FCFA / pers / jour',
    popular: true,
  },
  {
    id: 'navette_vip_cotonou',
    name: 'Navette VIP Cotonou ⇄ Ouidah',
    description: 'Transfert climatisé tout confort par la somptueuse Route des Pêches (aller ou retour privatif avec chauffeur).',
    price: 25000,
    priceType: 'flat',
    priceLabel: '+25 000 FCFA / trajet',
    popular: true,
  },
  {
    id: 'diner_bomiwo_royal',
    name: 'Dîner d’apparat Bômiwo Royal',
    description: 'La spécialité signature de la maison : pâte rouge mijotée au jus de poulet fermier, pintade dorée et canaris traditionnels.',
    price: 8500,
    priceType: 'per_person',
    priceLabel: '+8 500 FCFA / pers',
    popular: true,
  },
  {
    id: 'visite_guidee_ouidah',
    name: 'Visite guidée mémorielle de Ouidah',
    description: 'Circuit privatif d’une demi-journée : Temple des Pythons, Forêt Sacrée de Kpassè, Route et Porte du Non-Retour.',
    price: 15000,
    priceType: 'flat',
    priceLabel: '+15 000 FCFA / groupe',
  },
];

/* ==========================================================================
   3. ANECDOTES & FAITS REMARQUABLES (POUR TOAST DE DÉCOUVERTE FLOTTANT)
   ========================================================================== */

export const DISCOVERY_FACTS: DiscoveryFact[] = [
  {
    id: 'fact-indigo',
    category: 'Artisanat & Matières',
    tag: 'Le Saviez-vous ?',
    text: 'Le grand salon de l’Appartement 1 est habillé de textiles traditionnels teints à la main selon la technique ancestrale de l’indigo béninois.',
  },
  {
    id: 'fact-table',
    category: 'Gastronomie de Terroir',
    tag: 'Table d’Hôtes',
    text: 'Savourez notre légendaire Bômiwo royal fermier préparé au feu de bois dans les canaris de terre cuite lors de votre escale.',
  },
  {
    id: 'fact-evenements',
    category: 'Réceptions d’Exception',
    tag: 'Événements',
    text: 'Notre Cour d’Honneur sous pergola et sable fin est entièrement privatisable pour vos déjeuners d’affaires, mariages et banquets.',
  },
  {
    id: 'fact-aile-2',
    category: 'Nouveauté 2026',
    tag: 'Avant-Première',
    text: 'L’Aile Contemporaine (Appartement 2) ouvrira ses portes fin Octobre avec 3 nouvelles suites au design épuré.',
  },
  {
    id: 'fact-devise',
    category: 'Philosophie Adénikè',
    tag: 'Art de Vivre',
    text: '« Ibi yìí L’ọkàn ń Sinmi » — En terre yoruba, notre devise consacre ce lieu comme le sanctuaire où le cœur et l’esprit trouvent le repos.',
  },
];

/* ==========================================================================
   4. CONTACTS OFFICIELS & GÉNÉRATEUR WHATSAPP
   ========================================================================== */

export const CONCIERGE_WHATSAPP_NUMBER = '2290155456363'; // +229 01 55 45 63 63
export const SECONDARY_WHATSAPP_NUMBER = '2290153838363'; // +229 01 53 83 83 63

export interface BookingSimulationParams {
  item: LodgingItem;
  nights: number;
  guests: number;
  selectedAddonIds: string[];
}

export function calculateEstimatedTotal(params: BookingSimulationParams): number {
  const { item, nights, guests, selectedAddonIds } = params;
  let base = item.price * Math.max(1, nights);

  const addonsTotal = selectedAddonIds.reduce((sum, addonId) => {
    const addon = LODGING_ADDONS.find(a => a.id === addonId);
    if (!addon) return sum;
    if (addon.priceType === 'per_day_per_person') {
      return sum + addon.price * Math.max(1, nights) * Math.max(1, guests);
    }
    if (addon.priceType === 'per_person') {
      return sum + addon.price * Math.max(1, guests);
    }
    // flat
    return sum + addon.price;
  }, 0);

  return base + addonsTotal;
}

export function generateWhatsAppBookingUrl(params: BookingSimulationParams): string {
  const total = calculateEstimatedTotal(params);
  const selectedAddons = params.selectedAddonIds
    .map(id => LODGING_ADDONS.find(a => a.id === id)?.name)
    .filter(Boolean);

  const lines = [
    `Bonjour Maison Adénikè, je souhaite réserver un séjour / espace :`,
    ``,
    `✦ Hébergement / Espace : ${params.item.name}`,
    `✦ Durée souhaitée : ${params.nights} nuit(s) pour ${params.guests} personne(s)`,
    `✦ Inclusions : ${params.item.highlightInclusion}`,
  ];

  if (selectedAddons.length > 0) {
    lines.push(`✦ Options sélectionnées :`);
    selectedAddons.forEach(addon => lines.push(`   • ${addon}`));
  } else {
    lines.push(`✦ Options sélectionnées : Aucune pour l'instant`);
  }

  lines.push(``);
  lines.push(`✦ Total estimé : ${total.toLocaleString('fr-FR')} FCFA`);
  lines.push(``);
  lines.push(`Pourriez-vous me confirmer les disponibilités pour ces dates ? Merci.`);

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${message}`;
}
