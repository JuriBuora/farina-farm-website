export const SITE_NAME = "Società Agricola Farina 2.0";

// Keep this aligned with the primary production domain.
export const DEFAULT_SITE_URL = "https://www.aziendaagricolafarina.com";

function stripTrailingSlashes(url: string) {
  return url.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  const raw = (import.meta.env.VITE_SITE_URL as string | undefined) || DEFAULT_SITE_URL;
  return stripTrailingSlashes(raw);
}

export function toAbsoluteUrl(path: string): string {
  const base = getSiteUrl();
  try {
    return new URL(path, base).toString();
  } catch {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}`;
  }
}
