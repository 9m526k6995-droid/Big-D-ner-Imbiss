/**
 * ZENTRALE KUNDENDATEN – hier ändern, nirgendwo sonst.
 * Alles (Header, Footer, Impressum, Schema.org, Öffnungsstatus) liest aus dieser Datei.
 */

/** Wochentage Montag–Sonntag. `zeiten: null` = geschlossen. */
export type Tag = { name: string; kurz: string; zeiten: { von: string; bis: string } | null };

export const site = {
  name: "Big Döner Imbiss",
  stadt: "Passau",

  /** TODO: echte Adresse der Website eintragen (für Sitemap, Canonical, Open Graph). */
  url: "https://big-doener-website.workers.dev",

  /** Inhaber – hier EINMAL eintragen, gilt für das ganze Impressum. */
  inhaber: "Salih Wilo",
  rechtsform: "Einzelunternehmen",

  adresse: {
    strasse: "Spitalhofstraße 95",
    plz: "94032",
    ort: "Passau",
    orientierung: "gegenüber PaWo-Center",
  },

  /** Telefon: `anzeige` ist der sichtbare Text, `tel` der Link (tel:+49…). */
  telefon: { anzeige: "0177 8780402", tel: "+491778780402" },
  email: "hau-sch@web.de",
  facebook: "https://www.facebook.com/share/19ZkEPMmxi/",

  route:
    "https://www.google.com/maps/dir/?api=1&destination=Big%20D%C3%B6ner%20Imbiss%2C%20Spitalhofstra%C3%9Fe%2095%2C%2094032%20Passau",
  bewertungenUrl:
    "https://www.google.com/maps/search/?api=1&query=Big%20D%C3%B6ner%20Imbiss%20Spitalhofstra%C3%9Fe%2095%20Passau",

  bewertung: { sterne: 4.8, anzahl: 567 },

  /** Öffnungszeiten – Montag bis Sonntag in dieser Reihenfolge. */
  oeffnungszeiten: [
    { name: "Montag", kurz: "Mo", zeiten: { von: "10:00", bis: "20:30" } },
    { name: "Dienstag", kurz: "Di", zeiten: { von: "10:00", bis: "20:30" } },
    { name: "Mittwoch", kurz: "Mi", zeiten: { von: "10:00", bis: "20:30" } },
    { name: "Donnerstag", kurz: "Do", zeiten: { von: "10:00", bis: "20:30" } },
    { name: "Freitag", kurz: "Fr", zeiten: { von: "10:00", bis: "20:30" } },
    { name: "Samstag", kurz: "Sa", zeiten: { von: "11:00", bis: "20:00" } },
    { name: "Sonntag", kurz: "So", zeiten: null },
  ] satisfies Tag[],

  zeitzone: "Europe/Berlin",
  kostenlosParken: true,
  halal: true,
} as const;

export const telHref = `tel:${site.telefon.tel}`;
export const mailHref = `mailto:${site.email}`;
export const adresseKomplett = `${site.adresse.strasse}, ${site.adresse.plz} ${site.adresse.ort}`;
export const inhaberFehlt = site.inhaber.startsWith("[INHABER");

/** Kompakte Zeilen für die Anzeige, z. B. „Mo–Fr 10:00–20:30 Uhr“. Gleiche Zeiten werden zusammengefasst. */
export function zeitenGruppen() {
  const gruppen: { label: string; text: string }[] = [];
  const tage = site.oeffnungszeiten as readonly Tag[];
  let i = 0;
  while (i < tage.length) {
    let j = i;
    const key = (t: Tag) => (t.zeiten ? `${t.zeiten.von}–${t.zeiten.bis}` : "zu");
    while (j + 1 < tage.length && key(tage[j + 1]) === key(tage[i])) j++;
    const label = i === j ? tage[i].name : `${tage[i].name}–${tage[j].name}`;
    gruppen.push({ label, text: tage[i].zeiten ? `${tage[i].zeiten!.von}–${tage[i].zeiten!.bis} Uhr` : "geschlossen" });
    i = j + 1;
  }
  return gruppen;
}
