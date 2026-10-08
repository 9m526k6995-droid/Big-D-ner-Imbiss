/**
 * GALERIE – Reihenfolge = Anzeige-Reihenfolge.
 * Platzhalter zum Foto machen: Foto nach /fotos legen und bei `src` den Dateinamen eintragen.
 */
export type GalleryCategory = 'Essen' | 'Innenbereich' | 'Außenbereich' | 'Team';

export type GalleryImage = {
  /** Dateiname aus /fotos – null = Platzhalter „Foto folgt“ */
  src: string | null;
  alt: string;
  category: GalleryCategory;
  /** Form der Kachel */
  shape: 'landscape' | 'portrait' | 'square' | 'wide';
  position?: string;
};

export const gallery: GalleryImage[] = [
  { src: 'doener-box-ayran.jpg', alt: 'Döner-Box mit Pommes und Joghurtsoße, dahinter ein Becher Ayran', category: 'Essen', shape: 'wide' },
  { src: 'aussen-02.jpg', alt: 'Seite des Imbiss-Pavillons mit Verkaufsfenster und Werbetafel', category: 'Außenbereich', shape: 'portrait' },
  { src: 'pizza-sucuk.jpg', alt: 'Pizza mit Sucuk und Joghurtsoße, garniert mit Basilikum', category: 'Essen', shape: 'square' },
  { src: 'brot-02.jpg', alt: 'Drei frisch gebackene Fladenbrote mit Sesam', category: 'Essen', shape: 'square' },
  { src: null, alt: 'Foto folgt – Innenbereich', category: 'Innenbereich', shape: 'square' },
  { src: 'team-01.jpg', alt: 'Der Inhaber und seine Frau lächeln neben dem Dönerspieß', category: 'Team', shape: 'wide' },
  { src: 'lahmacun-01.jpg', alt: 'Lahmacun mit Petersilie vor Salat und Zwiebeln', category: 'Essen', shape: 'portrait' },
  { src: 'falafel-dueruem-01.jpg', alt: 'Offener Falafel-Dürüm mit Gurke, Tomate und Petersilie', category: 'Essen', shape: 'square' },
  { src: 'pide-01.jpg', alt: 'Pide mit Joghurtsoße und Basilikum im Karton', category: 'Essen', shape: 'square' },
  { src: 'aussen-01.jpg', alt: 'Der Imbiss mit rotem Dach von der Spitalhofstraße aus gesehen', category: 'Außenbereich', shape: 'wide' },
  { src: null, alt: 'Foto folgt – Innenbereich', category: 'Innenbereich', shape: 'square' },
  { src: 'doener-spiess.jpg', alt: 'Frischer Dönerspieß aus Hühner- und Putenfleisch', category: 'Essen', shape: 'portrait' },
  { src: 'pizza-thunfisch.jpg', alt: 'Pizza mit Thunfisch, Mais und Zwiebeln', category: 'Essen', shape: 'square' },
  { src: null, alt: 'Foto folgt – Außenbereich', category: 'Außenbereich', shape: 'square' },
];
