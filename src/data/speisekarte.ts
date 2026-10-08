/**
 * SPEISEKARTE – diese Datei wird später komplett durch die echte Karte ersetzt.
 * Aufbau (Typen unten) bitte beibehalten, dann funktioniert alles weiter.
 * preis: null = „Preis auf Anfrage“. Leere Kategorien werden automatisch ausgeblendet.
 */
export type Variante = { label: string; preis: number };
export type Gericht = {
  id: string;
  name: string;
  beschreibung?: string;
  preis: number | null; // null = „Preis auf Anfrage“
  varianten?: Variante[]; // z. B. Ø 32 cm / Ø 36 cm oder normal / groß
  vegetarisch?: boolean;
  vegan?: boolean;
  scharf?: boolean;
  beliebt?: boolean;
  zusatzstoffe?: string[];
  allergene?: string[];
  bild?: string;
};
export type Kategorie = {
  id: string;
  titel: string;
  untertitel?: string;
  hinweis?: string;
  spalten?: string[]; // Spaltenköpfe, z. B. ["Ø 32 cm", "Ø 36 cm"] oder ["0,33 l", "0,5 l", "1,25 l"]
  gerichte: Gericht[];
};

// ── Platzhalter: Namen folgen dem Angebot, Preise folgen mit der echten Karte ──
export const speisekarte: Kategorie[] = [
  {
    id: "doener",
    titel: "Döner",
    untertitel: "Vom Spieß aus Hühner- und Putenfleisch, im frisch gebackenen Brot",
    gerichte: [
      { id: "doener", name: "Döner", preis: null, beliebt: true },
      { id: "xl-doener", name: "XL-Döner", preis: null, beliebt: true },
    ],
  },
  {
    id: "dueruem",
    titel: "Dürüm",
    gerichte: [
      { id: "dueruem-doener", name: "Dürüm Döner", preis: null, beliebt: true },
      { id: "dueruem-xl", name: "XL-Dürüm", preis: null },
    ],
  },
  {
    id: "box-teller",
    titel: "Box & Teller",
    gerichte: [
      { id: "doener-box", name: "Döner-Box", beschreibung: "Mit Pommes", preis: null, beliebt: true },
      { id: "doener-teller", name: "Dönerteller", preis: null },
    ],
  },
  {
    id: "pizza",
    titel: "Pizza",
    spalten: ["Ø 32 cm", "Ø 36 cm"],
    gerichte: [
      { id: "pizza-doener", name: "Pizza Döner", preis: null, beliebt: true },
      { id: "pizza-sucuk", name: "Pizza Sucuk", preis: null },
      { id: "pizza-thunfisch", name: "Pizza Thunfisch", preis: null },
    ],
  },
  {
    id: "pide",
    titel: "Pide & Orientalisches",
    gerichte: [
      { id: "pide", name: "Pide", preis: null, beliebt: true },
      { id: "pide-spezial", name: "Pide (weitere Sorten folgen)", preis: null },
    ],
  },
  {
    id: "lahmacun",
    titel: "Lahmacun",
    gerichte: [{ id: "lahmacun", name: "Lahmacun", preis: null, beliebt: true }],
  },
  {
    id: "falafel",
    titel: "Falafel & Vegetarisch",
    gerichte: [
      { id: "falafel-dueruem", name: "Falafel-Dürüm", preis: null, vegetarisch: true, beliebt: true },
      { id: "falafel-teller", name: "Falafel-Teller", preis: null, vegetarisch: true },
    ],
  },
  {
    id: "extras",
    titel: "Extras",
    gerichte: [{ id: "pommes", name: "Pommes", preis: null, vegetarisch: true }],
  },
  {
    id: "suesses",
    titel: "Süßes",
    gerichte: [{ id: "baklava", name: "Baklava", preis: null, vegetarisch: true }],
  },
  {
    id: "getraenke",
    titel: "Getränke",
    gerichte: [{ id: "ayran", name: "Ayran", preis: null }],
  },
];

export const zusatzstoffeLegende: Record<string, string> = {};
export const allergeneLegende: Record<string, string> = {};

/** Hinweis über der Karte. Leer lassen, wenn nicht gebraucht. */
export const speisekarteHinweis =
  "Die Preise folgen in Kürze. Bis dahin sagen wir sie dir gern am Telefon.";
/** z. B. „Stand: Oktober 2026“ */
export const speisekarteStand = "";
