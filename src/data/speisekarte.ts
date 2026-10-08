/**
 * SPEISEKARTE – einzige Quelle für alle Gerichte und Preise.
 * ------------------------------------------------------------
 * Preis ändern: Zahl bei `preise` anpassen (6 = „6,00 €“). `null` = „Preis auf Anfrage“.
 * Mehrere Größen: Die Gruppe hat `spalten` (z. B. ["Ø 32 cm", "Ø 36 cm"]),
 *   das Gericht hat `preise` in derselben Reihenfolge ([9, 11]). Größe fehlt = null.
 * Ohne `spalten` hat ein Gericht genau einen Preis: `preise: [5]`.
 * Kennzeichnung: `allergene` als Buchstaben (A, G …), `zusatzstoffe` als Zahlen ("4", "8").
 * `beliebt: true` → Badge „Beliebt“. `bild` = Dateiname aus /fotos (fehlt die Datei, wird kein Bild gezeigt).
 */

export type Allergen = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'L' | 'M' | 'N' | 'O' | 'P' | 'R';
export type Zusatzstoff = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';

export type Gericht = {
  name: string;
  /** Zutaten / Zusatzinfo unter dem Namen */
  beschreibung?: string;
  /** ein Preis je Spalte (oder genau einer ohne Spalten); null = Preis auf Anfrage */
  preise: (number | null)[];
  allergene?: Allergen[];
  zusatzstoffe?: Zusatzstoff[];
  vegetarisch?: boolean;
  beliebt?: boolean;
  bild?: string;
};

export type Gruppe = {
  titel?: string;
  spalten?: string[];
  gerichte: Gericht[];
};

export type Kategorie = {
  /** Anker in der URL, z. B. /speisekarte#pizza */
  id: string;
  titel: string;
  /** kurzer Hinweis unter der Überschrift */
  hinweis?: string;
  gruppen: Gruppe[];
};

export const speisekarteStand = 'Oktober 2026';

/** Kennzeichnung Dönerfleisch (Drehspieß) */
const DOENER = { allergene: ['A', 'F', 'G', 'L', 'M'] as Allergen[], zusatzstoffe: ['4', '8'] as Zusatzstoff[] };

export const speisekarte: Kategorie[] = [
  {
    id: 'doener',
    titel: 'Döner, Dürüm & Box',
    hinweis: 'Fleischspieß aus Hühner- und Putenfleisch, im täglich frisch gebackenen Brot. Preise folgen.',
    gruppen: [
      {
        gerichte: [
          { name: 'Döner im Fladenbrot', preise: [null], allergene: ['A', 'F', 'G', 'L', 'M', 'N'], zusatzstoffe: ['4', '8'] },
          { name: 'XL-Döner', preise: [null], allergene: ['A', 'F', 'G', 'L', 'M', 'N'], zusatzstoffe: ['4', '8'] },
          { name: 'Dürüm', preise: [null], ...DOENER },
          { name: 'XL-Dürüm', preise: [null], ...DOENER },
          { name: 'Döner-Box mit Pommes', preise: [null], ...DOENER },
          { name: 'Dönerteller', preise: [null], ...DOENER },
        ],
      },
    ],
  },
  {
    id: 'pizza',
    titel: 'Pizza',
    hinweis: 'Alle Pizzen mit Tomatensoße und Mozzarella.',
    gruppen: [
      {
        spalten: ['Ø 32 cm', 'Ø 36 cm'],
        gerichte: [
          { name: 'Margherita', preise: [6, 8], allergene: ['A', 'G'] },
          // TODO Allergene prüfen: Rindersalami (Produktverpackung)
          { name: 'Salami', beschreibung: 'Rindersalami', preise: [9, 11], allergene: ['A', 'G'] },
          // TODO Allergene prüfen: Putenschinken (Produktverpackung)
          { name: 'Prosciutto', beschreibung: 'Putenschinken', preise: [9, 11], allergene: ['A', 'G'] },
          { name: 'Prosciutto e Salami', beschreibung: 'Putenschinken, Rindersalami', preise: [10, 12], allergene: ['A', 'G'] },
          { name: 'Funghi', beschreibung: 'Champignons', preise: [9, 11], allergene: ['A', 'G'] },
          { name: 'Regina', beschreibung: 'Putenschinken, Champignons', preise: [9, 11], allergene: ['A', 'G'] },
          { name: 'Tonno', beschreibung: 'Thunfisch, Zwiebeln', preise: [9, 11], allergene: ['A', 'D', 'G'] },
          { name: 'Hawaii', beschreibung: 'Putenschinken, Ananas', preise: [9, 11], allergene: ['A', 'G'] },
          // TODO Allergene prüfen: Oliven, Pepperoni (Produktverpackung)
          { name: 'Vegetaria mit gebratenem Gemüse', beschreibung: 'Tomaten, Champignons, Zwiebeln, Pepperoni, Oliven', preise: [9, 11], allergene: ['A', 'G'], vegetarisch: true },
          { name: 'Kebab', beschreibung: 'Dönerfleisch, Zwiebeln', preise: [9, 11], ...DOENER, beliebt: true, bild: 'pizza-doener.jpg' },
          // TODO Allergene prüfen: Rindersucuk (Produktverpackung)
          { name: 'Sucuk', beschreibung: 'Rindersucuk, Zwiebeln', preise: [9, 11], allergene: ['A', 'G'], beliebt: true, bild: 'pizza-sucuk.jpg' },
        ],
      },
      {
        gerichte: [{ name: 'Pizzastück', preise: [3], allergene: ['A', 'G'] }],
      },
    ],
  },
  {
    id: 'pide',
    titel: 'Pide & Orientalisches',
    gruppen: [
      {
        spalten: ['normal', 'groß'],
        gerichte: [
          { name: 'Pide Sucuk', beschreibung: 'Mozzarella, Zwiebeln', preise: [9, 11], allergene: ['A', 'G'] },
          { name: 'Pide', beschreibung: 'Käse, Dönerfleisch, Zwiebel, Soße', preise: [9, 11], ...DOENER, beliebt: true, bild: 'pide-01.jpg' },
          { name: 'Pide nur mit Käse', beschreibung: 'Mozzarella, Oregano', preise: [6, 7], allergene: ['A', 'G'], vegetarisch: true },
          { name: 'Pide mit gebratenem Gemüse', preise: [9, 11], allergene: ['A', 'G'], vegetarisch: true },
          {
            name: 'Pide vegetarisch',
            beschreibung: 'Käse, Tomaten, Champignons, Soße, Zwiebeln, Oliven – mit oder ohne gebratenem Gemüse',
            preise: [9, 11],
            allergene: ['A', 'G'],
            vegetarisch: true,
          },
        ],
      },
      {
        gerichte: [
          { name: 'Seele Kebab', beschreibung: 'Mozzarella, Dönerfleisch, Zwiebeln, Joghurtsoße', preise: [9], ...DOENER },
          { name: 'Käsefladen', beschreibung: 'Mozzarella, Oregano – mit oder ohne Salat', preise: [5], allergene: ['A', 'G'], vegetarisch: true },
          { name: 'Käsefladen mit Dönerfleisch', beschreibung: 'Käse, Dönerfleisch, Oregano', preise: [8], ...DOENER },
        ],
      },
    ],
  },
  {
    id: 'lahmacun',
    titel: 'Lahmacun',
    gruppen: [
      {
        gerichte: [
          // TODO Allergene prüfen: Lahmacun-Belag (Produktverpackung)
          { name: 'Lahmacun nur mit Salat', preise: [5], allergene: ['A'] },
          {
            name: 'Lahmacun mit Dönerfleisch',
            beschreibung: 'Salat, Blaukraut, Zwiebel, Tomaten, Gurke, Soße',
            preise: [8],
            ...DOENER,
            beliebt: true,
            bild: 'lahmacun-01.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'falafel',
    titel: 'Falafel',
    gruppen: [
      {
        gerichte: [
          // TODO Allergene prüfen: Falafel-Bällchen (Produktverpackung)
          {
            name: 'Falafel im Fladenbrot oder Dürüm',
            beschreibung: 'Salat, Blaukraut, Zwiebel, Tomaten, Gurke, Soße',
            preise: [5],
            allergene: ['A', 'G', 'N'],
            vegetarisch: true,
            beliebt: true,
            bild: 'falafel-dueruem-01.jpg',
          },
          {
            name: 'Falafelteller mit Brot oder Pommes',
            beschreibung: 'Salat, Blaukraut, Zwiebel, Tomaten, Gurke, Soße',
            preise: [9],
            allergene: ['A', 'G'],
            vegetarisch: true,
            bild: 'falafel-teller.jpg',
          },
        ],
      },
    ],
  },
  {
    id: 'extras',
    titel: 'Extras',
    hinweis: 'Aufpreis pro Extra.',
    gruppen: [
      {
        gerichte: [
          { name: 'Mozzarellakäse', preise: [1], allergene: ['G'] },
          // TODO Allergene prüfen: Rindersalami, Putenschinken (Produktverpackung)
          { name: 'Rindersalami', preise: [1] },
          { name: 'Putenschinken', preise: [1] },
          { name: 'Dönerkäse', preise: [1], allergene: ['G'] },
          { name: 'Gebratenes Gemüse', preise: [1] },
          { name: 'Fladenbrot', preise: [1], allergene: ['A', 'N'] },
          // TODO Allergene prüfen: Oliven, Pepperoni, Artischocken (Produktverpackung)
          { name: 'Oliven', preise: [0.5] },
          { name: 'Pepperoni', preise: [0.5] },
          { name: 'Zwiebeln', preise: [0.5] },
          { name: 'Champignons', preise: [0.5] },
          { name: 'Artischocken', preise: [0.5] },
          { name: 'Mais', preise: [0.5] },
          // TODO Allergene prüfen: Dose scharfe Paprika (Produktverpackung)
          { name: 'Dose scharfe Paprika', preise: [2.5] },
        ],
      },
    ],
  },
  {
    id: 'suesses',
    titel: 'Süßes',
    gruppen: [
      {
        gerichte: [
          // TODO Allergene prüfen: Baklava (Produktverpackung)
          { name: 'Baklava', preise: [1], allergene: ['A', 'G', 'H'] },
        ],
      },
    ],
  },
  {
    id: 'getraenke',
    titel: 'Getränke',
    gruppen: [
      {
        titel: 'Softdrinks',
        spalten: ['0,33 l', '0,5 l', '1,25 l'],
        gerichte: [
          { name: 'Coca-Cola', preise: [2.5, 2.5, 3.5], zusatzstoffe: ['1', '11'] },
          // TODO Allergene/Zusatzstoffe prüfen: Sprite, Fanta, Uludağ Gazoz (Produktverpackung)
          { name: 'Sprite', preise: [2.5, 2.5, null] },
          { name: 'Fanta', preise: [2.5, 2.5, null] },
          { name: 'Uludağ Gazoz', preise: [2.5, 2.5, null] },
          { name: 'Spezi', preise: [2.5, 2.5, null], zusatzstoffe: ['1', '11'] },
          { name: 'Mezzo Mix', preise: [2.5, 2.5, null], zusatzstoffe: ['1', '11'] },
          { name: 'Ayran', preise: [1.5, null, null], allergene: ['G'] },
          // TODO Allergene/Zusatzstoffe prüfen: Apfelschorle, Eistee (Produktverpackung)
          { name: 'Apfelschorle', preise: [null, 2.5, null] },
          { name: 'Eistee', preise: [null, 2.5, null] },
          { name: 'Mineralwasser', preise: [null, 2, null] },
          { name: 'Stilles Wasser', preise: [null, 2, null] },
        ],
      },
      {
        titel: 'Außerdem',
        gerichte: [
          { name: 'Kaffee', beschreibung: '0,2 l', preise: [1.5], zusatzstoffe: ['11'] },
          // TODO Allergene/Zusatzstoffe prüfen: Capri-Sonne (Produktverpackung)
          { name: 'Capri-Sonne', beschreibung: '0,2 l', preise: [1] },
          { name: "Orangensaft Rio d'Oro", beschreibung: '0,2 l', preise: [1] },
          // TODO Allergene/Zusatzstoffe prüfen: Energy Drinks (Produktverpackung)
          { name: 'Energy Drinks', beschreibung: '0,25 l / 0,33 l / 0,5 l', preise: [null], zusatzstoffe: ['11'] },
        ],
      },
    ],
  },
];

/** 14 Hauptallergene nach LMIV */
export const allergeneLegende: Record<Allergen, { lang: string; kurz: string }> = {
  A: { lang: 'Glutenhaltiges Getreide', kurz: 'Gluten' },
  B: { lang: 'Krebstiere', kurz: 'Krebstiere' },
  C: { lang: 'Eier', kurz: 'Eier' },
  D: { lang: 'Fisch', kurz: 'Fisch' },
  E: { lang: 'Erdnüsse', kurz: 'Erdnüsse' },
  F: { lang: 'Soja', kurz: 'Soja' },
  G: { lang: 'Milch (inkl. Laktose)', kurz: 'Milch' },
  H: { lang: 'Schalenfrüchte', kurz: 'Schalenfrüchte' },
  L: { lang: 'Sellerie', kurz: 'Sellerie' },
  M: { lang: 'Senf', kurz: 'Senf' },
  N: { lang: 'Sesamsamen', kurz: 'Sesam' },
  O: { lang: 'Schwefeldioxid/Sulfite', kurz: 'Sulfite' },
  P: { lang: 'Lupinen', kurz: 'Lupinen' },
  R: { lang: 'Weichtiere', kurz: 'Weichtiere' },
};

export const zusatzstoffeLegende: Record<Zusatzstoff, string> = {
  '1': 'mit Farbstoff',
  '2': 'mit Konservierungsstoff',
  '3': 'mit Antioxidationsmittel',
  '4': 'mit Geschmacksverstärker',
  '5': 'geschwefelt',
  '6': 'geschwärzt',
  '7': 'gewachst',
  '8': 'mit Phosphat',
  '9': 'mit Süßungsmittel',
  '10': 'enthält eine Phenylalaninquelle',
  '11': 'koffeinhaltig',
  '12': 'chininhaltig',
  '13': 'mit Nitritpökelsalz',
};

export const speisekarteHinweis =
  'Allergene und Zusatzstoffe sind nach bestem Wissen gekennzeichnet. Spuren anderer Allergene können durch die gemeinsame Zubereitung nicht ausgeschlossen werden. Unser Käse besteht aus Kuhmilch, unsere Joghurtsoße enthält Salz, Knoblauch und Dill, unsere Fleischspieße bestehen aus Hühner- und Putenfleisch. Bei Unverträglichkeiten und Allergien sprechen Sie bitte unser Verkaufspersonal an. Preise inkl. MwSt. Änderungen vorbehalten.';

/** Aufklappbarer Bereich „Zubereitung & Zutaten“ */
export const zutaten: { titel: string; text: string }[] = [
  {
    titel: 'Drehspieß',
    text: 'Hähnchenfleisch 55 %, Putenfleisch 30 %, Trinkwasser 10 %. Gewürzzubereitung: Gewürze, Dextrose, Geschmacksverstärker E621, Senfsaat, natürliche Gewürzextrakte, Sellerie, Sojaeiweiß, Weizeneiweiß, Milcheiweiß, Stabilisatoren E450, E451, E452, Zitrusfasern, Säuerungsmittel E262, E331, E500, Glukosesirup, Transglutaminase, Speisesalz, modifizierte Stärke, Milchzucker.',
  },
  { titel: 'Joghurtsoße', text: 'Joghurt aus Kuhmilch, Knoblauch, Sonnenblumen- und Rapsöl, frischer Dill, Speisesalz.' },
  { titel: 'Gewürzmischung', text: 'Oregano, Thymian, Kreuzkümmel, Koriander, Sesam, Salz, schwarzer Pfeffer.' },
  { titel: 'Käse & Speiseöle', text: 'Käse aus Kuhmilch. Speiseöle: ausschließlich Sonnenblumen- und Rapsöl.' },
  {
    titel: 'Teig',
    text: 'Für Fladenbrot, Dürüm, Pide, Lahmacun, Pizza und Käsefladen: Weizenmehl Typ 405, Trockenhefe, Rübenzucker, Salz, Wasser, Sonnenblumen- und Rapsöl.',
  },
];

/** „6,00 €“ */
export const formatPreis = (p: number) => `${p.toFixed(2).replace('.', ',')} €`;

/** Ausgeschriebene Kennzeichnung, z. B. „Enthält: Gluten, Milch · mit Geschmacksverstärker, mit Phosphat“ */
export function kennzeichnungText(g: Gericht): string {
  const teile: string[] = [];
  if (g.allergene?.length) teile.push(`Enthält: ${g.allergene.map((a) => allergeneLegende[a].kurz).join(', ')}`);
  if (g.zusatzstoffe?.length) teile.push(g.zusatzstoffe.map((z) => zusatzstoffeLegende[z]).join(', '));
  return teile.join(' · ');
}
