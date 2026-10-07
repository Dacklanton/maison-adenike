# Guide de Passation & Administration — Système de Paiement Maison Adénikè

Ce document est le guide de référence technique et administratif remis à la direction de la **Maison Adénikè** pour la gestion autonome de son système d'encaissement en ligne.

---

## 1. Vue d’Ensemble du Système d'Encaissement

Le site officiel **[maisonadenike.com](https://maisonadenike.com)** intègre la passerelle de paiement certifiée **FedaPay**, conforme aux normes financières de la BCEAO et à la sécurité bancaire internationale PCI-DSS.

### Canaux de paiement activés :
- 🟡 **MTN Mobile Money (MoMo Bénin & UEMOA) :** Déclenchement de prompt USSD direct sur le téléphone du client pour confirmation avec son code secret.
- 🔵 **Moov Money (Flooz Bénin & UEMOA) :** Paiement instantané sécurisé.
- 💳 **Cartes Bancaires Internationales :** Cartes **Visa** et **Mastercard** (clients locaux, diaspora et touristes internationaux) avec conversion automatique en FCFA.
- 🛎️ **Conciergerie / WhatsApp :** Option de réservation directe avec l'équipe d'accueil.

---

## 2. Emplacement du Paiement sur le Site

Le système est déployé et opérationnel sur l'ensemble du site :
1. **Lodges & Suites (`/chambres`) :** Calculateur dynamique de séjour + bouton de paiement direct de l'acompte (30%).
2. **Table & Restaurant (`/restaurant`) :** Modal de réservation avec verrouillage de table par acompte.
3. **Vodoun Days 2027 (`/vodoun-days`) :** Acompte de garantie pour les forfaits et séjours du festival.
4. **Événements & Réceptions (`/evenements`) :** Formules traiteur et privatisations de la cour d'honneur.

---

## 3. Comment Passer du Mode Test au Mode Réel (En Production)

Actuellement, le système fonctionne en **Mode Sandbox (Mode Test)** avec vos clés de test pour vous permettre de simuler des paiements sans débit réel.

### Procédure de mise en service réelle en 2 étapes :

#### Étape A : Activation du compte FedaPay Live par le client
1. Connectez-vous sur votre tableau de bord **[fedapay.com](https://fedapay.com)** avec l'adresse email officielle (`contact@maisonadenike.com`).
2. Dans le menu de gauche, basculez l'interrupteur du mode **Sandbox** vers **Live**.
3. Complétez la vérification d'entreprise (KYC) en téléversant les documents de l'établissement :
   - Fiche IFU ou Registre du Commerce (RCCM).
   - Pièce d'identité (CNI ou Passeport) du gérant.
   - Relevé d'Identité Bancaire (RIB) du compte où virer les recettes (ou numéro MoMo Marchand).
4. Une fois le compte validé par FedaPay (généralement 24 à 48 heures), rendez-vous dans :
   **Paramètres > Développeurs > Clés d'API**.
5. Copiez votre **Clé Publique Live** (qui commence par `pk_live_...`).

#### Étape B : Mise à jour du fichier de configuration du site
Ouvrez le fichier unique suivant sur le serveur ou dans le code :  
📁 `assets/js/payment-config.js`

Modifiez simplement les deux premières lignes :
```javascript
window.FEDAPAY_CONFIG = {
  // 1. Passez 'sandbox' à 'live'
  environment: 'live',

  // 2. Collez la clé publique Live de l'hôtel
  publicKey: 'pk_live_VOTRE_CLE_OFFICIELLE_ICI',
  
  businessName: 'Maison Adénikè',
  currency: 'XOF',
  merchantPhone: '2290155456363',
  merchantEmail: 'contact@maisonadenike.com',
  defaultDepositPct: 30
};
```
*C'est tout ! Le site bascule immédiatement en encaissement bancaire réel.*

---

## 4. Gestion de la Boîte Email Professionnelle

- **Adresse officielle :** `contact@maisonadenike.com`
- **Accès Webmail :** **[https://mail.hostinger.com](https://mail.hostinger.com)**
- Tous les avis de crédit et notifications de paiement FedaPay y sont adressés automatiquement.

---

## 5. Retrait des Fonds & Réconciliation Comptable

- **Tableau de bord FedaPay :** Vous pouvez suivre en temps réel chaque transaction, exporter les rapports comptables en PDF/Excel et programmer les virements automatiques vers votre compte bancaire (virement quotidien, hebdomadaire ou à la demande).
- **Assistance FedaPay Bénin :** Support joignable directement depuis le chat du dashboard ou par téléphone.
