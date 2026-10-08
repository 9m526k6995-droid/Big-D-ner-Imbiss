# Big Döner Imbiss – Website

Statische Website für **Big Döner Imbiss**, Spitalhofstraße 95, 94032 Passau (gegenüber PaWo-Center).
Gebaut mit Astro, Tailwind CSS und TypeScript. Keine Cookies, kein Tracking, keine externen Skripte oder Schriften
(Fraunces + Inter liegen lokal).

## Seite starten

```bash
npm install
npm run dev      # Entwicklungsserver auf http://localhost:4321
npm run build    # fertige Seite nach dist/
npm run preview  # gebaute Seite lokal ansehen
```

## Veröffentlichen mit Cloudflare

Cloudflare baut bei jedem Push auf `main` automatisch neu.
Build command: `npm run build` · Deploy command: `npx wrangler deploy` (Einstellungen in `wrangler.jsonc`; der Name dort muss genau dem Worker-Namen in Cloudflare entsprechen: `big-d-ner-imbiss`).

## Wo ändere ich was?

| Was | Wo |
|---|---|
| Name, Adresse, Telefon, E-Mail, Facebook, Google-Bewertung, Links | `src/config/site.ts` |
| **Website-Adresse** (Canonical, Open Graph, Sitemap, robots.txt, JSON-LD) | `src/config/site.ts` → `siteUrl` (nur dort) |
| Öffnungszeiten (Live-Status „Jetzt geöffnet/geschlossen“, Europe/Berlin) | `src/config/site.ts` → `hours` |
| Inhaber fürs Impressum | `src/config/site.ts` → `legal.owner` |
| Hinweis „Gutes Essen braucht seine Zeit!“ | `src/config/site.ts` → `preorder` |
| Speisekarte, Preise, Allergene, Zutaten | `src/data/speisekarte.ts` |
| Angebots-Kacheln Startseite | `src/data/offer.ts` |
| Galerie | `src/data/gallery.ts` |
| Team | `src/data/team.ts` |
| Farben & Schriften | `src/styles/global.css` (`@theme`) |

## Fotos

Alle Fotos liegen in `fotos/` und werden per Dateiname eingebunden (Astro erzeugt AVIF/WebP automatisch).
Platzhalter („Foto folgt …“) haben `src: null` bzw. `image: null` – Foto nach `fotos/` legen und Dateinamen eintragen.
Fehlt ein eingetragenes Foto, erscheint ein Platzhalter bzw. (in der Speisekarte) kein Bild – nie ein kaputtes Bild.

Noch nicht vorhanden, aber in der Speisekarte vorgesehen: `fotos/pizza-doener.jpg` (Pizza Kebab), `fotos/falafel-teller.jpg` (Falafelteller).

## Allergene – bitte anhand der Produktverpackungen prüfen

Die Kennzeichnung dieser Produkte stammt nicht von der Verpackung und muss noch geprüft werden
(im Code mit `TODO` in `src/data/speisekarte.ts` markiert):

- Rindersalami
- Rindersucuk
- Putenschinken
- Oliven
- Pepperoni
- Dose scharfe Paprika
- Artischocken
- Falafel-Bällchen
- Lahmacun-Belag
- Baklava
- Fanta
- Sprite
- Eistee
- Uludağ Gazoz
- Apfelschorle
- Capri-Sonne
- Energy Drinks

## Logo & Vorschaubild

- `public/logo.svg`, `public/logo-weiss.svg`, `public/favicon.svg` werden von `node scripts/make-logo.mjs` erzeugt.
- `public/og.jpg` (Vorschaubild für WhatsApp/Facebook) erzeugt `node scripts/make-og.mjs`.
