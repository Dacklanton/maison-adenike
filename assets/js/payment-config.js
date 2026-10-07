/**
 * ==========================================================================
 * CONFIGURATION DU SYSTÈME DE PAIEMENT — MAISON ADÉNIKÈ (Ouidah, Bénin)
 * ==========================================================================
 * Prestataire certifié : FedaPay (MTN MoMo, Moov Flooz, Cartes Visa / Mastercard)
 * 
 * 📌 GUIDE POUR LA PASSATION AU CLIENT :
 * Lorsque le client est prêt à encaisser de l'argent réel sur son compte bancaire :
 * 1. Changez 'environment' de 'sandbox' à 'live'
 * 2. Remplacez 'publicKey' par la clé publique Live du client ('pk_live_...')
 * 
 * ⚠️ SÉCURITÉ : La clé secrète ('sk_...') ne doit JAMAIS figurer dans ce fichier public.
 */

window.FEDAPAY_CONFIG = {
  // Environnement : 'sandbox' (mode test) ou 'live' (production réelle)
  environment: 'sandbox',

  // Clé API Publique FedaPay (Sandbox active)
  publicKey: 'pk_sandbox_sHLftuPU9LWNxtHEtVv7ER0M',

  // Identité de l'établissement
  businessName: 'Maison Adénikè',
  businessTagline: 'Haute Hospitalité & Écrin d’Exception • Ouidah, Bénin',
  currency: 'XOF', // Francs CFA BCEAO

  // Contacts officiels de l'établissement
  merchantPhone: '2290155456363', // WhatsApp de réception
  merchantEmail: 'contact@maisonadenike.com',

  // Options tarifaires
  defaultDepositPct: 30, // 30% d'acompte par défaut

  // Messages et notifications
  receiptNote: 'Acompte garanti enregistré auprès de la Maison Adénikè. Le solde sera réglé sur place à votre arrivée.'
};
