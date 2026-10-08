import type { ImageMetadata } from 'astro';

const alle = import.meta.glob<{ default: ImageMetadata }>('/fotos/*.{jpg,jpeg,png,webp}', { eager: true });

/** Liefert das Foto zu einem Dateinamen (z. B. "doener-spiess.jpg") oder undefined, wenn es (noch) fehlt. */
export function foto(datei?: string | null): ImageMetadata | undefined {
  if (!datei) return undefined;
  return alle[`/fotos/${datei}`]?.default;
}
