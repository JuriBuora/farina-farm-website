import { Suspense, lazy, useEffect, useState } from "react";
import type { FAQItem } from "@/components/FAQSection";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProductsSection = lazy(() => import("@/components/ProductsSection"));
const FirewoodSection = lazy(() => import("@/components/FirewoodSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const MapSection = lazy(() => import("@/components/MapSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));
const homeFaq: FAQItem[] = [
  {
    q: "Dove si trova l'Azienda Agricola Farina?",
    a: "Ci trovi a Bando di Argenta (FE), in Via Rangona 54/A, a pochi minuti da Argenta, Portomaggiore e dalla città di Ferrara.",
  },
  {
    q: "Vendete angurie, meloni e zucche al dettaglio?",
    a: "Sì, oltre alla vendita all’ingrosso per rivenditori, GDO e mercati ortofrutticoli, effettuiamo anche vendita al dettaglio direttamente in azienda, in base alla disponibilità stagionale.",
  },
  {
    q: "È possibile acquistare direttamente in azienda?",
    a: "Sì, durante la stagione è possibile acquistare angurie, meloni e zucche direttamente presso la nostra azienda a Bando di Argenta, in base alla disponibilità del raccolto.",
  },
  {
    q: "Dove acquistare zucche vicino ad Argenta, Portomaggiore e Ferrara?",
    a: "Le nostre zucche sono disponibili sia per forniture all’ingrosso sia per vendita diretta in azienda, a Bando di Argenta, vicino a Portomaggiore e Ferrara.",
  },
  {
    q: "In che zona consegnate la legna da ardere?",
    a: "Consegniamo legna da ardere a domicilio entro 50 km da Bando di Argenta, coprendo Argenta, Portomaggiore, Ostellato, Comacchio, Ferrara città e i comuni limitrofi della provincia. Ordine minimo indicativo 200-250 €.",
  },
  {
    q: "Quali essenze di legna da ardere proponete?",
    a: "Forniamo legna stagionata di faggio, cerro e carpino, asciutta e pronta all'uso per stufe, camini e forni a legna.",
  },
];

const interactionEvents = ["scroll", "pointerdown", "keydown", "touchstart"] as const;
const BELOW_FOLD_DELAY_MS = 1200;

const scheduleBelowFold = (callback: () => void) => {
  let done = false;
  let firstFrame = 0;
  let secondFrame = 0;
  let idleHandle: number | null = null;
  let timeoutHandle: number | null = null;

  const reveal = () => {
    if (done) return;
    done = true;
    callback();
  };

  interactionEvents.forEach((eventName) => {
    window.addEventListener(eventName, reveal, { once: true, passive: true });
  });

  firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(() => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(reveal, { timeout: BELOW_FOLD_DELAY_MS });
      } else {
        timeoutHandle = window.setTimeout(reveal, BELOW_FOLD_DELAY_MS);
      }
    });
  });

  return () => {
    done = true;
    interactionEvents.forEach((eventName) => {
      window.removeEventListener(eventName, reveal);
    });
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
    if (idleHandle !== null && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleHandle);
    }
    if (timeoutHandle !== null) {
      window.clearTimeout(timeoutHandle);
    }
  };
};

const HomeBelowFold = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return scheduleBelowFold(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AboutSection />
      <ProductsSection />
      <FirewoodSection />
      <FAQSection items={homeFaq} withJsonLd />
      <TestimonialsSection />
      <MapSection />
      <FooterSection />
    </Suspense>
  );
};

export default HomeBelowFold;
