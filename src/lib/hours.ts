import type { DayHours } from '../config/site';

/** Wochentagsindex Montag = 0 … Sonntag = 6 in der Zeitzone Europe/Berlin */
export function berlinNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dayIdx = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday'));
  const minutes = (parseInt(get('hour'), 10) % 24) * 60 + parseInt(get('minute'), 10);
  return { dayIdx, minutes };
}

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export type OpenState = { open: boolean; text: string };

/** Berechnet den aktuellen Status („Jetzt geöffnet/geschlossen“) aus der Öffnungszeiten-Config. */
export function openState(hours: DayHours[], date = new Date()): OpenState {
  const { dayIdx, minutes } = berlinNow(date);
  const today = hours[dayIdx];
  if (today?.open && today.close) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (minutes >= o && minutes < c) {
      return { open: true, text: `Jetzt geöffnet · bis ${today.close} Uhr` };
    }
    if (minutes < o) {
      return { open: false, text: `Jetzt geschlossen · heute ab ${today.open} Uhr` };
    }
  }
  // geschlossen: nächsten Öffnungstag suchen
  for (let i = 1; i <= 7; i++) {
    const d = hours[(dayIdx + i) % 7];
    if (d?.open && d.close) {
      const label = i === 1 ? 'morgen' : d.day;
      return { open: false, text: `Jetzt geschlossen · ${label} ab ${d.open} Uhr` };
    }
  }
  return { open: false, text: 'Jetzt geschlossen' };
}

/** Fasst gleiche Zeiten zusammen, z. B. "Mo–Fr 10:00–20:30 Uhr · Sa 11:00–20:00 Uhr · So geschlossen". */
export function summarizeHours(hours: DayHours[]): string {
  const short = (d: string) => d.slice(0, 2);
  const groups: { from: number; to: number; key: string }[] = [];
  hours.forEach((h, i) => {
    const key = h.open && h.close ? `${h.open}–${h.close} Uhr` : 'geschlossen';
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.to = i;
    else groups.push({ from: i, to: i, key });
  });
  return groups
    .map((g) => {
      const range = g.from === g.to ? short(hours[g.from].day) : `${short(hours[g.from].day)}–${short(hours[g.to].day)}`;
      return `${range} ${g.key}`;
    })
    .join(' · ');
}
