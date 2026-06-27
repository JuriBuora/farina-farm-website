import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStoredAnalyticsConsent,
  hasAnalyticsMeasurementId,
  loadGoogleAnalytics,
  storeAnalyticsConsent,
  subscribeToAnalyticsConsent,
  trackPageView,
} from "@/lib/analytics";

const CookieConsentBanner = () => {
  const location = useLocation();
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(() => {
    if (typeof window === "undefined") return null;
    return getStoredAnalyticsConsent();
  });

  useEffect(() => {
    return subscribeToAnalyticsConsent(setConsent);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    loadGoogleAnalytics();
    trackPageView(`${location.pathname}${location.search}`, document.title);
  }, [consent, location.pathname, location.search]);

  if (!hasAnalyticsMeasurementId() || consent !== null) {
    return null;
  }

  const acceptAnalytics = () => {
    storeAnalyticsConsent("accepted");
    setConsent("accepted");
  };

  const declineAnalytics = () => {
    storeAnalyticsConsent("declined");
    setConsent("declined");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-md sm:px-4 sm:py-4 sm:pb-4">
      <div className="container mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <div className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:flex">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-serif text-base font-semibold text-foreground sm:text-lg">Cookie analitici</p>
            <p className="mt-1 max-w-3xl text-sm leading-snug text-muted-foreground sm:leading-relaxed">
              Usiamo Google Analytics solo con il tuo consenso per capire quali pagine vengono visitate e migliorare
              il sito. Puoi rifiutare e continuare a navigare normalmente. Dettagli nella{" "}
              <Link to="/cookie-policy/" className="text-primary hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-row">
          <Button type="button" variant="outline" onClick={declineAnalytics} className="h-9 sm:h-10 sm:min-w-28">
            <X className="mr-2 h-4 w-4" />
            Rifiuta
          </Button>
          <Button type="button" onClick={acceptAnalytics} className="h-9 bg-primary text-primary-foreground hover:bg-primary/90 sm:h-10 sm:min-w-28">
            Accetta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
