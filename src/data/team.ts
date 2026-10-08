/**
 * Team. Name/Rolle ändern und bei `datei` den Dateinamen eintragen (Foto liegt in fotos/).
 * Platzhalter: `datei: null`.
 */
export type Mitglied = { name: string; rolle: string; datei: string | null; alt: string; position?: string };

export const team: Mitglied[] = [
  { name: "Salih Wilo", rolle: "Inhaber", datei: "team-inhaber.jpg", alt: "Der Inhaber zeigt den Daumen nach oben", position: "50% 30%" },
  { name: "Salih Wilo mit Frau", rolle: "Gemeinsam im Laden", datei: "team-01.jpg", alt: "Der Inhaber und seine Frau neben dem Dönerspieß" },
  { name: "Mitarbeiterin", rolle: "Theke & Salatbar", datei: "team-mitarbeiterin.jpg", alt: "Mitarbeiterin im roten Weihnachtspulli an der Theke", position: "50% 25%" },
  { name: "Name folgt", rolle: "Rolle folgt", datei: null, alt: "Platzhalter für ein weiteres Teammitglied" },
];
