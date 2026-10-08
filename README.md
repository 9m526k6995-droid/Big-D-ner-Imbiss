# Big Döner Imbiss – Website

Statische Website für **Big Döner Imbiss**, Spitalhofstraße 95, 94032 Passau (gegenüber PaWo-Center).
Gebaut mit Astro, Tailwind CSS und TypeScript. Keine Cookies, kein Tracking, keine externen Skripte oder Schriften.

## Seite starten

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:4321
npm run build    # fertige Seite nach dist/
npm run preview  # gebaute Seite lokal ansehen
```

## Veröffentlichen mit Cloudflare

1. Im Cloudflare-Dashboard: **Workers & Pages → Create → Import a repository** und dieses Repo wählen.
2. **Build command:** `npm run build`
3. **Deploy command:** `npx wrangler deploy`
4. Speichern und deployen. Die Einstellungen stehen in `wrangler.jsonc`.

Danach die echte Adresse der Website in `src/config/site.ts` bei `url` eintragen (und in `public/robots.txt`).

## Wo ändere ich was?

| Was | Wo |
|---|---|
| Telefon, E-Mail, Adresse, Facebook, Google-Bewertung | `src/config/site.ts` |
| Öffnungszeiten | `src/config/site.ts` → `oeffnungszeiten` (Montag bis Sonntag, `zeiten: null` = geschlossen) |
| Inhabername fürs Impressum (Salih Wilo) | `src/config/site.ts` → `inhaber` (nur dort, einmal) |
| Speisekarte | `src/data/speisekarte.ts` |
| Galerie | `src/data/galerie.ts` |
| Team | `src/data/team.ts` |
| Kacheln „Unsere Klassiker“ | `src/components/Klassiker.astro` |
| Farben & Schriften | `src/styles/global.css` (`@theme`) |

Solange beim Inhaber noch `[INHABER: VOR- UND NACHNAME]` steht, warnt der Build:
`ACHTUNG: Inhabername im Impressum fehlt`.

Der Öffnungsstatus („Jetzt geöffnet / Geschlossen / Öffnet um …“) wird automatisch aus den Öffnungszeiten berechnet, immer in deutscher Zeit (Europe/Berlin).

## Speisekarte ersetzen

`src/data/speisekarte.ts` komplett durch die echte Karte ersetzen. Das Format (Typen oben in der Datei) bitte beibehalten:

- `preis: 7.5` wird als „7,50 €“ angezeigt, `preis: null` als „Preis auf Anfrage“.
- Größen: bei der Kategorie `spalten: ["Ø 32 cm", "Ø 36 cm"]` setzen und beim Gericht
  `varianten: [{ label: "Ø 32 cm", preis: 9 }, { label: "Ø 36 cm", preis: 11 }]` (Labels müssen gleich sein).
- `beliebt: true` → erscheint auch auf der Startseite. Außerdem `vegetarisch`, `vegan`, `scharf`.
- Kennziffern: `zusatzstoffe: ["1", "3"]`, `allergene: ["A"]` – Erklärung in `zusatzstoffeLegende` / `allergeneLegende`.
- Leere Kategorien werden automatisch ausgeblendet.
- `speisekarteHinweis` (Text über der Karte) und `speisekarteStand` (z. B. „Stand: November 2026“).

## Platzhalter durch ein Foto ersetzen

1. Foto als `.jpg` nach `fotos/` legen, z. B. `innen-01.jpg`.
2. In `src/data/galerie.ts` (oder `team.ts`) beim Platzhalter `datei: null` durch `datei: "innen-01.jpg"` ersetzen
   und Alt-Text anpassen. Fertig – Größen, WebP/AVIF und Lazy Loading erledigt Astro.

Fehlt ein eingetragenes Foto, zeigt die Seite automatisch einen Platzhalter statt eines kaputten Bildes.

## Logo & Vorschaubild

- `public/logo.svg`, `public/logo-weiss.svg`, `public/favicon.svg` werden von `node scripts/make-logo.mjs` erzeugt.
- `public/og.jpg` (Vorschaubild für WhatsApp/Facebook) erzeugt `node scripts/make-og.mjs`.
- Fotos nachschärfen: `node scripts/schaerfen.mjs <quelle> <ziel>` (Lanczos-Vergrößerung + Schärfen).
