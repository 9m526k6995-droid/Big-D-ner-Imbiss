/**
 * Galerie. Reihenfolge = Anzeige-Reihenfolge.
 * Platzhalter zum Foto machen: bei `datei` einfach den Dateinamen eintragen
 * (Foto vorher nach fotos/ legen) und `platzhalter` löschen.
 */
export type GalerieKategorie = "essen" | "innen" | "aussen" | "team";

export type GalerieEintrag = {
  datei: string | null; // null = Platzhalter
  kategorien: GalerieKategorie[];
  alt: string;
  platzhalter?: string; // Text im Platzhalter
};

export const galerieFilter: { id: "alle" | GalerieKategorie; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "essen", label: "Essen" },
  { id: "innen", label: "Innenbereich" },
  { id: "aussen", label: "Außenbereich" },
  { id: "team", label: "Team" },
];

export const galerie: GalerieEintrag[] = [
  { datei: "doener-box-ayran.jpg", kategorien: ["essen"], alt: "Döner-Box mit Pommes, Dönerfleisch und Joghurtsoße, dahinter ein Becher Ayran" },
  { datei: "doener-spiess.jpg", kategorien: ["essen"], alt: "Frischer Dönerspieß aus Hähnchen- und Putenfleisch im Grill" },
  { datei: "pizza-thunfisch.jpg", kategorien: ["essen"], alt: "Pizza mit Thunfisch, Mais und Zwiebeln auf einem Holzbrett" },
  { datei: "falafel-dueruem-01.jpg", kategorien: ["essen"], alt: "Offener Falafel-Dürüm mit Falafel, Gurke, Tomate und Petersilie" },
  { datei: "pide-01.jpg", kategorien: ["essen"], alt: "Pide mit Joghurtsoße und Basilikum im Karton" },
  { datei: "brot-02.jpg", kategorien: ["essen"], alt: "Drei frisch gebackene Brote mit Sesam nebeneinander" },
  { datei: "pizza-sucuk.jpg", kategorien: ["essen"], alt: "Pizza mit Sucuk und weißer Soße, garniert mit Basilikum" },
  { datei: "lahmacun-01.jpg", kategorien: ["essen"], alt: "Lahmacun mit Petersilie auf einem Holzbrett vor Salat und Zwiebeln" },
  { datei: "team-01.jpg", kategorien: ["team"], alt: "Der Inhaber und seine Frau lächeln neben dem Dönerspieß in die Kamera" },
  { datei: "aussen-01.jpg", kategorien: ["aussen"], alt: "Der Pavillon mit rotem Dach von der Spitalhofstraße aus gesehen" },
  { datei: "pizza-spinat.jpg", kategorien: ["essen"], alt: "Gebackene Pizza mit Spinat, Zwiebeln und Ricotta" },
  { datei: null, kategorien: ["innen"], alt: "Platzhalter für ein Foto vom Innenbereich", platzhalter: "Foto folgt – Innenbereich" },
  { datei: "falafel-dueruem-02.jpg", kategorien: ["essen"], alt: "Falafel-Dürüm wird frisch belegt" },
  { datei: "team-mitarbeiterin.jpg", kategorien: ["team", "innen"], alt: "Mitarbeiterin im roten Weihnachtspulli an der Salatbar-Theke" },
  { datei: "brot-01.jpg", kategorien: ["essen"], alt: "Frisch gebackene Brote mit Sesam, Tomaten und Pommes-Verpackungen" },
  { datei: "pizza-pommes.jpg", kategorien: ["essen"], alt: "Pizza mit Pommes im Pizzakarton" },
  { datei: "team-inhaber.jpg", kategorien: ["team"], alt: "Der Inhaber zeigt den Daumen nach oben, links der Dönerspieß" },
  { datei: "aussen-02.jpg", kategorien: ["aussen"], alt: "Seite des Pavillons mit Verkaufsfenster und Werbetafel" },
  { datei: null, kategorien: ["innen"], alt: "Platzhalter für ein Foto vom Innenbereich", platzhalter: "Foto folgt – Innenbereich" },
  { datei: "pizza-spinat-roh.jpg", kategorien: ["essen"], alt: "Belegte, noch ungebackene Spinat-Pizza auf der Arbeitsplatte" },
  { datei: "team-pizza.jpg", kategorien: ["team", "innen"], alt: "Der Inhaber belegt lächelnd eine Pizza in der Küche" },
  { datei: "brot-03.jpg", kategorien: ["essen"], alt: "Ein Brot mit Sesam in Papier, im Hintergrund die Salatbar" },
  { datei: null, kategorien: ["aussen"], alt: "Platzhalter für ein Foto vom Außenbereich", platzhalter: "Foto folgt – Außenbereich" },
];
