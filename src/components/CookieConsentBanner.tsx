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
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 px-4 py-4 shadow-2xl backdrop-blur-md">
      <div className="container mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <div className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:flex">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-serif text-lg font-semibold text-foreground">Cookie analitici</p>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Usiamo Google Analytics solo con il tuo consenso per capire quali pagine vengono visitate e migliorare
              il sito. Puoi rifiutare e continuare a navigare normalmente. Dettagli nella{" "}
              <Link to="/cookie-policy/" className="text-primary hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={declineAnalytics} className="sm:min-w-28">
            <X className="mr-2 h-4 w-4" />
            Rifiuta
          </Button>
          <Button type="button" onClick={acceptAnalytics} className="bg-primary text-primary-foreground hover:bg-primary/90 sm:min-w-28">
            Accetta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
