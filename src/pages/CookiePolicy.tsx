import React from "react";
import { CheckCircle2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import {
  getStoredAnalyticsConsent,
  hasAnalyticsMeasurementId,
  loadGoogleAnalytics,
  storeAnalyticsConsent,
  trackPageView,
} from "@/lib/analytics";

const LAST_UPDATED = "15 maggio 2026";

const AnalyticsConsentControls = () => {
  const [consent, setConsent] = React.useState<"accepted" | "declined" | null>(() => {
    if (typeof window === "undefined") return null;
    return getStoredAnalyticsConsent();
  });

  if (!hasAnalyticsMeasurementId()) {
    return null;
  }

  const acceptAnalytics = () => {
    storeAnalyticsConsent("accepted");
    setConsent("accepted");
    loadGoogleAnalytics();
    trackPageView(window.location.pathname, document.title);
  };

  const declineAnalytics = () => {
    storeAnalyticsConsent("declined");
    setConsent("declined");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-serif text-2xl font-semibold">Gestisci consenso analytics</h2>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        Stato attuale:{" "}
        <strong className="text-foreground">
          {consent === "accepted" ? "accettato" : consent === "declined" ? "rifiutato" : "non ancora scelto"}
        </strong>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button type="button" onClick={acceptAnalytics} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Accetta analytics
        </Button>
        <Button type="button" variant="outline" onClick={declineAnalytics}>
          <X className="mr-2 h-4 w-4" />
          Rifiuta analytics
        </Button>
      </div>
    </div>
  );
};

const CookiePolicy = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Cookie Policy"
        description="Informativa sull'uso dei cookie sul sito aziendaagricolafarina.com della Società Agricola Farina 2.0."
        path="/cookie-policy/"
        robots="noindex, follow"
      />
      <Navbar />

      <section className="pt-24 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Informativa sull'uso dei cookie sul sito aziendaagricolafarina.com.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Ultimo aggiornamento: {LAST_UPDATED}
            </p>

            <h2 className="font-serif text-2xl font-semibold">Cosa sono i cookie</h2>
            <p className="text-muted-foreground leading-relaxed">
              I cookie sono piccoli file di testo che i siti web possono salvare sul dispositivo dell'utente
              per memorizzare informazioni o preferenze.
            </p>

            <h2 className="font-serif text-2xl font-semibold">Cookie utilizzati su questo sito</h2>
            <p className="text-muted-foreground leading-relaxed">
              Il sito <strong className="text-foreground">aziendaagricolafarina.com</strong> utilizza cookie tecnici necessari
              al funzionamento delle pagine e, solo con il consenso dell'utente, cookie o tecnologie analoghe per
              statistiche aggregate tramite Google Analytics. Il sito non utilizza cookie pubblicitari o strumenti
              di profilazione commerciale.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I <strong className="text-foreground">cookie tecnici</strong> sono strettamente
              necessari al funzionamento del sito e, ai sensi della normativa vigente
              (Provvedimento del Garante Privacy del 10 giugno 2021), non è richiesto il consenso preventivo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I cookie analitici vengono caricati solo dopo aver premuto “Accetta” nel banner. Se l'utente sceglie
              “Rifiuta”, Google Analytics non viene caricato e la navigazione continua normalmente.
            </p>

            <AnalyticsConsentControls />

            <h2 className="font-serif text-2xl font-semibold">Cookie di terze parti</h2>
            <p className="text-muted-foreground leading-relaxed">
              Previo consenso dell'utente, il sito può usare <strong className="text-foreground">Google Analytics</strong>
              per misurare visite, pagine viste, provenienza approssimativa, dispositivo e browser. Per maggiori
              informazioni si rimanda alla
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              > {" "}privacy policy di Google</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Quando l'utente invia un modulo, i dati transitano tramite <strong className="text-foreground">FormSubmit</strong>,
              servizio esterno usato per il recapito tecnico delle richieste email. Il servizio può utilizzare cookie
              o strumenti tecnici strettamente necessari alla gestione sicura dell'invio e alla protezione antispam.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              La pagina Contatti incorpora una mappa di <strong className="text-foreground">Google Maps</strong>.
              La visualizzazione della mappa può comportare il rilascio di cookie da parte di Google. Per
              maggiori informazioni si rimanda alla
              <a
                href="https://policies.google.com/technologies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              > {" "}cookie policy di Google</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              La pagina <strong className="text-foreground">Galleria</strong> può mostrare una selezione degli ultimi
              post pubblici del profilo Instagram aziendale. Le immagini vengono copiate sul sito durante la pubblicazione
              e servite da aziendaagricolafarina.com, senza caricare automaticamente cookie di Instagram nel browser dell'utente.
              Eventuali cookie di Meta possono essere impostati solo dopo l'apertura dei link esterni verso Instagram.
              Per maggiori informazioni si rimanda alla
              <a
                href="https://privacycenter.instagram.com/policies/cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              > {" "}cookie policy di Instagram</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              La stessa pagina può incorporare il riquadro ufficiale della pagina Facebook aziendale. Il contenuto è
              fornito da <strong className="text-foreground">Meta Platforms Ireland</strong> e la sua visualizzazione
              può comportare l'uso di cookie o tecnologie simili da parte di Facebook secondo le proprie condizioni.
              Per maggiori informazioni si rimanda alla
              <a
                href="https://www.facebook.com/privacy/policies/cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              > {" "}cookie policy di Facebook</a>.
            </p>

            <h2 className="font-serif text-2xl font-semibold">Come gestire i cookie</h2>
            <p className="text-muted-foreground leading-relaxed">
              L'utente può disabilitare i cookie direttamente dalle impostazioni del proprio browser. Le modalità
              variano in base al browser utilizzato (Chrome, Firefox, Safari, Edge, ecc.).
            </p>

            <h2 className="font-serif text-2xl font-semibold">Contatti</h2>
            <p className="text-muted-foreground leading-relaxed">
              Per qualsiasi richiesta relativa ai cookie o al trattamento dei dati è possibile scrivere a
              <a href="mailto:soc.agr.farina@gmail.com" className="text-primary hover:underline"> soc.agr.farina@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default CookiePolicy;
