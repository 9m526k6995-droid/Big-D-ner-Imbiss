// Erzeugt public/og.jpg (1200×630) für Facebook, WhatsApp & Co.
// Aufruf: node scripts/make-og.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";

const W = 1200, H = 630;
const foto = await sharp("fotos/doener-box-ayran.jpg").resize(660, H, { fit: "cover", position: "centre" }).toBuffer();
const logo = await sharp(readFileSync("public/logo.svg"), { density: 300 }).resize(460).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="200">
  <style>.t{font-family:Arial,Helvetica,sans-serif;fill:#fff}</style>
  <text x="0" y="40" class="t" font-size="34" font-weight="700">Döner · Pizza · Pide</text>
  <text x="0" y="90" class="t" font-size="26" fill-opacity=".8">Spitalhofstraße 95, Passau</text>
  <text x="0" y="128" class="t" font-size="26" fill-opacity=".8">gegenüber PaWo-Center</text>
  <rect x="0" y="152" width="80" height="6" fill="#d71920"/>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: "#17110d" } })
  .composite([
    { input: foto, left: W - 660, top: 0 },
    { input: logo, left: 50, top: 120 },
    { input: text, left: 60, top: 340 },
  ])
  .jpeg({ quality: 86 })
  .toFile("public/og.jpg");
console.log("public/og.jpg geschrieben.");
