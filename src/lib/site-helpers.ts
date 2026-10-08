import { site } from '../config/site';

export const telHref = `tel:${site.phone.tel}`;
export const mailHref = `mailto:${site.email}`;

export const routeUrl = site.google.routeUrl;
export const reviewsUrl = site.google.reviewsUrl;

export const ratingText = site.google.rating.toFixed(1).replace('.', ',');

export const addressInline = `${site.address.street}, ${site.address.zip} ${site.address.city}`;

export type SocialLink = { id: 'instagram' | 'facebook' | 'tiktok'; label: string; url: string };

/** Nur Social-Links mit URL – leere werden automatisch weggelassen. */
export const socialLinks: SocialLink[] = (
  [
    { id: 'facebook', label: 'Facebook', url: site.socials.facebook },
    { id: 'instagram', label: 'Instagram', url: site.socials.instagram },
    { id: 'tiktok', label: 'TikTok', url: site.socials.tiktok },
  ] as SocialLink[]
).filter((s) => s.url && s.url.trim() !== '');
