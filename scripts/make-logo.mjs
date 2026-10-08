// Erzeugt public/logo.svg, logo-weiss.svg und favicon.svg.
// Aufruf: node scripts/make-logo.mjs   (nur nötig, wenn das Logo geändert wird)
// Die Schrift (Anton) wird in Pfade umgewandelt, damit das Logo überall gleich aussieht.
import opentype from "opentype.js";
import { readFileSync, writeFileSync } from "node:fs";

const buf = readFileSync("node_modules/@fontsource/anton/files/anton-latin-400-normal.woff");
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const DARK = "#1b1613";
const RED = "#d71920";
const W = 420, H = 176;

function layout(text, size, x, baseline, fill) {
  const p = font.getPath(text, x, baseline, size, { letterSpacing: 0.02 });
  return { d: p.toPathData(2), width: font.getAdvanceWidth(text, size, { letterSpacing: 0.02 }) };
}

// Spieß: Stange oben/unten, kegelförmiger Fleischkörper mit Schichtlinien
function spit(cx, top, h, accent, line) {
  const w = h * 0.5;
  const x0 = cx - w / 2;
  const body = `M${x0 + w * 0.12} ${top + h * 0.16} Q${cx} ${top + h * 0.04} ${x0 + w * 0.88} ${top + h * 0.16}
    L${x0 + w} ${top + h * 0.42} L${x0 + w * 0.84} ${top + h * 0.86}
    Q${cx} ${top + h * 0.96} ${x0 + w * 0.16} ${top + h * 0.86} L${x0} ${top + h * 0.42} Z`;
  const lines = [0.34, 0.5, 0.66].map((t) =>
    `<path d="M${x0 + w * 0.06} ${top + h * t} Q${cx} ${top + h * (t + 0.05)} ${x0 + w * 0.94} ${top + h * t}" fill="none" stroke="${line}" stroke-width="2" stroke-linecap="round" opacity=".55"/>`).join("");
  return `<rect x="${cx - 2}" y="${top - h * 0.1}" width="4" height="${h * 1.2}" rx="2" fill="${accent}"/>
  <path d="${body}" fill="${accent}"/>${lines}`;
}

function build({ oval, stroke, text, accent, line, label }) {
  const size = 64, base = 88 + 28;
  const big = layout("BIG", size, 0, base);
  const doener = layout("DÖNER", size, 0, base);
  const gap = 18, spitW = 34;
  const total = big.width + gap + spitW + gap + doener.width;
  const x = (W - total) / 2;
  const b = layout("BIG", size, x, base);
  const spitX = x + big.width + gap + spitW / 2;
  const d = layout("DÖNER", size, x + big.width + gap * 2 + spitW, base);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">
  <ellipse cx="${W / 2}" cy="${H / 2}" rx="${W / 2 - 6}" ry="${H / 2 - 6}" fill="${oval}" stroke="${stroke}" stroke-width="7"/>
  <path d="${b.d}" fill="${text}"/>
  ${spit(spitX, 60, 58, accent, line)}
  <path d="${d.d}" fill="${text}"/>
</svg>
`;
}

writeFileSync("public/logo.svg", build({ oval: "#fff", stroke: DARK, text: DARK, accent: RED, line: "#fff", label: "Big Döner Imbiss" }));
writeFileSync("public/logo-weiss.svg", build({ oval: "none", stroke: "#fff", text: "#fff", accent: RED, line: "#fff", label: "Big Döner Imbiss" }));
writeFileSync("public/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#fff"/>${spit(32, 12, 40, RED, "#fff")}</svg>\n`);
console.log("Logo geschrieben.");
