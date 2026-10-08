const fmt = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
/** 7.5 → „7,50 €“ */
export const euro = (n: number) => fmt.format(n).replace(/\s/g, " ");
