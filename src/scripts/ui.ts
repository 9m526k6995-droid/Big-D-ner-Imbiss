// Kleine UI-Helfer: Einblenden beim Scrollen, mobiles Menü, Galerie-Filter, Lightbox.

// 1) Einblenden beim Scrollen
const reveals = document.querySelectorAll<HTMLElement>(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((eintraege) => {
    eintraege.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
} else reveals.forEach((el) => el.classList.add("is-in"));

// 2) Mobiles Overlay-Menü
const menuBtn = document.querySelector<HTMLButtonElement>("[data-menu-button]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
function menuSetzen(offen: boolean) {
  if (!menu || !menuBtn) return;
  menu.hidden = !offen;
  menuBtn.setAttribute("aria-expanded", String(offen));
  menuBtn.setAttribute("aria-label", offen ? "Menü schließen" : "Menü öffnen");
  document.documentElement.classList.toggle("overflow-hidden", offen);
  if (offen) menu.querySelector<HTMLElement>("a")?.focus();
}
menuBtn?.addEventListener("click", () => menuSetzen(menu?.hidden === true));
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menuSetzen(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu && !menu.hidden) { menuSetzen(false); menuBtn?.focus(); } });

// 3) Galerie-Filter
const filterBtns = document.querySelectorAll<HTMLButtonElement>("[data-filter]");
const kacheln = document.querySelectorAll<HTMLElement>("[data-galerie-item]");
filterBtns.forEach((btn) => btn.addEventListener("click", () => {
  const f = btn.dataset.filter!;
  filterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
  kacheln.forEach((k) => { k.hidden = !(f === "alle" || (k.dataset.kategorien ?? "").split(" ").includes(f)); });
}));

// 4) Lightbox (nativer <dialog>, Pfeiltasten + Escape)
const dialog = document.querySelector<HTMLDialogElement>("[data-lightbox]");
if (dialog) {
  const img = dialog.querySelector<HTMLImageElement>("img")!;
  const caption = dialog.querySelector<HTMLElement>("[data-lightbox-caption]")!;
  let liste: HTMLElement[] = [];
  let index = 0;
  const zeigen = (i: number) => {
    index = (i + liste.length) % liste.length;
    const el = liste[index];
    img.src = el.dataset.full!;
    img.alt = el.dataset.alt ?? "";
    caption.textContent = el.dataset.alt ?? "";
  };
  document.querySelectorAll<HTMLElement>("[data-open-lightbox]").forEach((btn) => btn.addEventListener("click", () => {
    liste = [...document.querySelectorAll<HTMLElement>("[data-galerie-item]:not([hidden]) [data-open-lightbox]")];
    zeigen(liste.indexOf(btn));
    dialog.showModal();
  }));
  dialog.querySelector("[data-lb-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-lb-prev]")?.addEventListener("click", () => zeigen(index - 1));
  dialog.querySelector("[data-lb-next]")?.addEventListener("click", () => zeigen(index + 1));
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") zeigen(index - 1);
    if (e.key === "ArrowRight") zeigen(index + 1);
  });
}

// 5) Speisekarte: aktive Kategorie in der klebenden Leiste markieren
const katLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-kat-link]")];
if (katLinks.length && "IntersectionObserver" in window) {
  const sektionen = katLinks.map((a) => document.getElementById(a.getAttribute("href")!.slice(1))!).filter(Boolean);
  const setzen = (id: string) => katLinks.forEach((a) => {
    const aktiv = a.getAttribute("href") === `#${id}`;
    a.toggleAttribute("data-aktiv", aktiv);
    if (aktiv) { a.setAttribute("aria-current", "true"); const bar = a.parentElement!; bar.scrollTo({ left: a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2, behavior: "smooth" }); } else a.removeAttribute("aria-current");
  });
  const io = new IntersectionObserver((es) => {
    const sichtbar = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (sichtbar) setzen(sichtbar.target.id);
  }, { rootMargin: "-140px 0px -65% 0px" });
  sektionen.forEach((s) => io.observe(s));
}
