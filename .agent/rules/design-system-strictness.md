# RÈGLES DU DESIGN SYSTEM OFFICIEL — MAISON ADÉNIKÈ
## ALIGNEMENT STRICT SUR LE SITE EN PRODUCTION (STYLES.CSS)

Ce document régit formellement toutes les décisions graphiques, CSS, typographiques et architecturales pour la Maison Adénikè. Il garantit la conformité absolue avec le site en ligne et les éléments existants.

---

### 1. LOGO OFFICIEL (AUTHENTIQUE & INTANGIBLE)
- **Fichier Source :** `assets/images/logo-adenike.png` (et `assets/images/logo-adenike.jpg`)
- **Présentation Officielle :** Médaillon circulaire avec orfèvrerie or, entouré d'une bordure fine dorée (`border: 2px solid var(--color-champagne);` ou `border: 1.5px solid #CBA158; box-shadow: 0 0 15px rgba(203, 161, 88, 0.25)`).
- **Interdiction Formelle :** Ne jamais remplacer ce logo historique par un monogramme ou un dessin arbitraire.

---

### 2. PALETTE CHROMATIQUE OFFICIELLE EN PRODUCTION (`styles.css`)

```css
:root {
  /* 1. Fonds & Surfaces (60%) */
  --bg-linen:              #FAF8F5; /* Lin d'Écueil (Linen White) */
  --bg-cream:              #F3EDE2; /* Crème de Canari (Warm Cream) */
  --bg-white:              #FFFFFF; /* Blanc Pur */

  /* 2. Textes & Titres (30%) */
  --text-espresso:         #2B1810; /* Deep Espresso (Contraste AAA > 13:1) */
  --text-espresso-muted:   #5C4438; /* Espresso Doux */
  --text-espresso-subtle:  #7D6559; /* Espresso Subtil */

  /* 3. Accents, Terroir & Joaillerie (10%) */
  --color-ochre:           #A83B24; /* Ocre Rouge Béninois (Terracotta Officielle) */
  --color-champagne:       #CBA158; /* Or Champagne / Orfèvrerie Royale */
  --color-champagne-bright:#E0BC75; /* Or Brillant Solaire */
  --color-champagne-light: #FFE6A7; /* Or Pâle pour texte sur fond sombre */
  --color-raffia:          #D8BA8E; /* Paille de Raphia */
  --color-tropical:        #2E453A; /* Vert Tropical Canopée */
  --obsidian-noir:         #14100E; /* Noir Obsidienne */
}
```

---

### 3. TYPOGRAPHIE VALIDÉE EN PRODUCTION
- **Titres & Display :** `Cormorant Garamond` (Serif noble) & `Cinzel` (Romain Impérial).
- **Interface & Textes :** `Plus Jakarta Sans` (Sans-serif géométrique net).
- **Signature & Conciergerie :** `Pinyon Script` / `Alex Brush`.
