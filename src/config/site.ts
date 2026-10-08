/**
 * ZENTRALE KONFIGURATION – Big Döner Imbiss
 * ------------------------------------------------------------
 * Alles, was sich später ändern kann (Telefon, Öffnungszeiten,
 * Bewertung, Links, Website-Adresse), steht NUR in dieser Datei.
 * Speisekarte & Preise: src/data/speisekarte.ts
 */

export type DayHours = {
  /** Name des Wochentags (Anzeige) */
  day: string;
  /** Öffnungszeit "HH:MM" – oder null, wenn geschlossen */
  open: string | null;
  /** Schließzeit "HH:MM" – oder null, wenn geschlossen */
  close: string | null;
};

export const site = {
  name: 'Big Döner Imbiss',

  /**
   * Adresse der Website – NUR HIER ändern (z. B. bei eigener Domain).
   * Wird für Canonical-Links, Open Graph, Sitemap, robots.txt und JSON-LD verwendet.
   */
  siteUrl: 'https://big-d-ner-imbiss.kw698p7brp.workers.dev',

  /** Standard-SEO-Texte (Startseite) */
  seo: {
    title: 'Big Döner Imbiss | Döner, Pizza & Pide in Passau – gegenüber PaWo-Center',
    description:
      'Döner, Dürüm, Pizza, Pide, Lahmacun und Falafel in der Spitalhofstraße 95 in Passau, gegenüber dem PaWo-Center. Täglich frisch gebackenes Brot, halal, kostenlose Parkplätze.',
  },

  address: {
    street: 'Spitalhofstraße 95',
    zip: '94032',
    city: 'Passau',
    country: 'Deutschland',
    countryCode: 'DE',
    /** Orientierungshilfe */
    landmark: 'gegenüber PaWo-Center',
  },

  phone: {
    /** So wird die Nummer angezeigt */
    display: '0177 8780402',
    /** So wird sie gewählt (ohne Leerzeichen) */
    tel: '+491778780402',
  },

  email: 'hau-sch@web.de',

  /** Social Media – nur Links mit URL werden angezeigt. Leer lassen ("") = ausgeblendet. */
  socials: {
    facebook: 'https://www.facebook.com/share/19ZkEPMmxi/',
    instagram: '',
    tiktok: '',
  },

  /** Google-Bewertung – hier ändern, wird überall übernommen. */
  google: {
    rating: 4.8,
    reviewCount: 567,
    routeUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Big%20D%C3%B6ner%20Imbiss%2C%20Spitalhofstra%C3%9Fe%2095%2C%2094032%20Passau',
    reviewsUrl:
      'https://www.google.com/maps/search/?api=1&query=Big%20D%C3%B6ner%20Imbiss%20Spitalhofstra%C3%9Fe%2095%20Passau',
    /**
     * Bewertung zusätzlich in die Schema.org-Daten schreiben?
     * Google wertet selbst eingetragene Bewertungen i. d. R. nicht als Rich Result – daher aus.
     */
    includeRatingInSchema: false,
  },

  /** Kurzinfos für Schema.org */
  schema: {
    priceRange: '€',
    servesCuisine: ['Döner', 'Türkische Küche', 'Pizza', 'Pide', 'Lahmacun', 'Falafel'],
  },

  /** Logo (SVG in /public) */
  logo: { src: '/logo.svg', srcLight: '/logo-weiss.svg', width: 420, height: 176 },

  /** Merkmale – erscheinen auf Startseite und Kontaktseite */
  features: ['Täglich frisches Brot', 'Halal', 'Kostenlose Parkplätze', 'Telefonische Vorbestellung'],

  /** Was Gäste in ihren Bewertungen besonders loben */
  praise: ['Täglich frisch gebackenes Brot', 'Besonders freundliches Personal'],

  /** Hinweis zur Vorbestellung (Startseite + Speisekarte) */
  preorder: {
    title: 'Gutes Essen braucht seine Zeit!',
    text: 'Um Wartezeiten zu vermeiden, bitten wir bei Pizza oder Pide um telefonische Vorbestellung.',
  },

  /**
   * ÖFFNUNGSZEITEN (Montag zuerst)
   * Geschlossen = open: null, close: null
   * Zeitzone für den Live-Status: Europe/Berlin
   */
  hours: [
    { day: 'Montag', open: '10:00', close: '20:30' },
    { day: 'Dienstag', open: '10:00', close: '20:30' },
    { day: 'Mittwoch', open: '10:00', close: '20:30' },
    { day: 'Donnerstag', open: '10:00', close: '20:30' },
    { day: 'Freitag', open: '10:00', close: '20:30' },
    { day: 'Samstag', open: '11:00', close: '20:00' },
    { day: 'Sonntag', open: null, close: null },
  ] satisfies DayHours[] as DayHours[],

  /** Betreiberdaten für Impressum/Datenschutz */
  legal: {
    owner: 'Salih Wilo',
    legalForm: 'Einzelunternehmen',
  },
};

export type Site = typeof site;
