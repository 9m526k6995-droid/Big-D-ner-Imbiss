// Vergrößert die Fotos (Lanczos) und schärft sie nach.
// Aufruf: node scripts/schaerfen.mjs <quellordner> <zielordner>
// Hinweis: Echte Details kommen nur mit Originalfotos – das hier macht Screenshots so scharf wie möglich.
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const [quelle, ziel] = process.argv.slice(2);
for (const datei of readdirSync(quelle).filter((f) => f.endsWith(".jpg"))) {
  const bild = sharp(join(quelle, datei));
  const { width } = await bild.metadata();
  await bild
    .resize({ width: Math.round(width * 1.75), kernel: "lanczos3" })
    .median(1) // leichtes Entrauschen gegen Kompressionsartefakte
    .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.2, x1: 2, y2: 12, y3: 20 })
    .modulate({ saturation: 1.06 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(ziel, datei));
  console.log("geschärft:", datei);
}
