const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();
const CONSENT_STORAGE_KEY = "farina-analytics-consent";
const CONSENT_CHANGE_EVENT = "farina-analytics-consent-change";

type AnalyticsConsent = "accepted" | "declined";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let isGoogleAnalyticsLoaded = false;

export function getStoredAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function storeAnalyticsConsent(consent: AnalyticsConsent) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // If storage is unavailable, respect the current in-memory choice only.
  }
  window.dispatchEvent(new CustomEvent<AnalyticsConsent>(CONSENT_CHANGE_EVENT, { detail: consent }));
}

export function subscribeToAnalyticsConsent(callback: (consent: AnalyticsConsent) => void) {
  const listener = (event: Event) => {
    callback((event as CustomEvent<AnalyticsConsent>).detail);
  };

  window.addEventListener(CONSENT_CHANGE_EVENT, listener);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, listener);
}

export function hasAnalyticsMeasurementId() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || isGoogleAnalyticsLoaded || typeof document === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  isGoogleAnalyticsLoaded = true;
}

export function trackPageView(path: string, title: string) {
  if (!GA_MEASUREMENT_ID || getStoredAnalyticsConsent() !== "accepted") {
    return;
  }

  loadGoogleAnalytics();
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}
