/**
 * TEAM – Bild = Dateiname aus /fotos, `null` = Platzhalter.
 * name und role sind optional: leer lassen = es wird nur das Bild gezeigt.
 */
export type TeamMember = { image: string | null; alt: string; name?: string; role?: string; position?: string };

export const team: TeamMember[] = [
  { image: 'team-inhaber.jpg', alt: 'Salih Wilo, Inhaber, zeigt den Daumen nach oben', name: 'Salih Wilo', role: 'Inhaber', position: '50% 30%' },
  { image: 'team-01.jpg', alt: 'Salih Wilo und seine Frau neben dem Dönerspieß', name: 'Salih Wilo & Frau', role: 'Gemeinsam im Laden', position: '45% 50%' },
  { image: 'team-mitarbeiterin.jpg', alt: 'Mitarbeiterin an der Salatbar-Theke', role: 'Theke & Salatbar', position: '50% 30%' },
  { image: 'team-pizza.jpg', alt: 'Pizza wird in der Küche frisch belegt', role: 'Pizza & Pide', position: '50% 30%' },
  { image: null, alt: 'Platzhalter für ein weiteres Teammitglied', name: 'Name folgt' },
];
