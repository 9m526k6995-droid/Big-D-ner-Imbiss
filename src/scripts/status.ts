// Öffnungsstatus („Jetzt geöffnet / Geschlossen / Öffnet um …“) und Hervorhebung des heutigen Tages.
// Rechnet immer in Europe/Berlin, egal wo der Besucher ist. Zeiten kommen aus src/config/site.ts.
import { site } from "../config/site";

const WOCHENTAGE = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function berlinJetzt() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.zeitzone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { tag: WOCHENTAGE.indexOf(get("weekday")), minuten: Number(get("hour")) * 60 + Number(get("minute")) };
}
const inMinuten = (z: string) => { const [h, m] = z.split(":").map(Number); return h * 60 + m; };

export function status() {
  const { tag, minuten } = berlinJetzt();
  const heute = site.oeffnungszeiten[tag];
  if (heute.zeiten) {
    const auf = inMinuten(heute.zeiten.von), zu = inMinuten(heute.zeiten.bis);
    if (minuten >= auf && minuten < zu) {
      const bald = zu - minuten <= 30;
      return { offen: true, text: bald ? `Jetzt geöffnet · schließt um ${heute.zeiten.bis} Uhr` : `Jetzt geöffnet · bis ${heute.zeiten.bis} Uhr`, tag };
    }
    if (minuten < auf) return { offen: false, text: `Geschlossen · öffnet um ${heute.zeiten.von} Uhr`, tag };
  }
  for (let i = 1; i <= 7; i++) {
    const t = site.oeffnungszeiten[(tag + i) % 7];
    if (t.zeiten) {
      const wann = i === 1 ? "morgen" : t.name;
      return { offen: false, text: `Geschlossen · öffnet ${wann} um ${t.zeiten.von} Uhr`, tag };
    }
  }
  return { offen: false, text: "Geschlossen", tag };
}

function aktualisieren() {
  const s = status();
  document.querySelectorAll<HTMLElement>("[data-status]").forEach((el) => {
    el.textContent = s.text;
    el.dataset.offen = String(s.offen);
  });
  document.querySelectorAll<HTMLElement>("[data-status-dot]").forEach((el) => {
    el.classList.toggle("bg-emerald-500", s.offen);
    el.classList.toggle("bg-red", !s.offen);
  });
  document.querySelectorAll<HTMLElement>("[data-tag]").forEach((el) => {
    const heute = Number(el.dataset.tag) === s.tag;
    el.toggleAttribute("data-heute", heute);
    el.setAttribute("aria-current", heute ? "date" : "false");
    if (!heute) el.removeAttribute("aria-current");
  });
}

aktualisieren();
setInterval(aktualisieren, 60_000);
