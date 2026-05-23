import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CheckCircle2, Info, Send, ShieldCheck, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import PageSEO from "@/components/PageSEO";
import ScrollReveal from "@/components/ScrollReveal";
import SiteImage from "@/components/SiteImage";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSubmitEndpoint = "https://formsubmit.co/ajax/soc.agr.farina@gmail.com";
const pagePath = "/ordina-legna-da-ardere";
const pageUrl = "https://www.aziendaagricolafarina.com/ordina-legna-da-ardere";

const quantityOptions = [
  "Circa 10 quintali",
  "Circa 20 quintali",
  "Circa 30 quintali",
  "Oltre 30 quintali",
  "Da concordare",
];

const cutOptions = [
  "Stufa 25/28 cm",
  "Stufone 30/33 cm",
  "Camino 40/45 cm",
  "Pizza corta",
  "Pizza lunga",
  "Da concordare",
];

const provinceOptions = ["FE", "RA", "BO", "RO"];

const orderRequestSchema = z.object({
  name: z.string().trim().min(2, "Inserisci nome e cognome.").max(100, "Nome troppo lungo."),
  phone: z
    .string()
    .trim()
    .min(6, "Inserisci un numero di telefono valido.")
    .max(25, "Numero di telefono troppo lungo.")
    .regex(/^[+\d()\-./\s]+$/, "Il telefono contiene caratteri non validi."),
  email: z.string().trim().email("Inserisci un indirizzo email valido.").max(255, "Email troppo lunga."),
  deliveryAddress: z
    .string()
    .trim()
    .min(5, "Inserisci l'indirizzo di consegna.")
    .max(160, "Indirizzo troppo lungo."),
  comune: z.string().trim().min(2, "Inserisci il comune.").max(80, "Comune troppo lungo."),
  cap: z.string().trim().regex(/^\d{5}$/, "Inserisci un CAP di 5 cifre."),
  province: z.string().trim().regex(/^[A-Z]{2}$/, "Inserisci una sigla provincia valida."),
  requestedQuantity: z.string().min(1, "Seleziona la quantità richiesta."),
  requestedCut: z.string().min(1, "Seleziona il taglio richiesto."),
  preferredDeliveryDate: z.string().min(1, "Indica una data preferita."),
  deliveryNotes: z.string().trim().max(800, "Le note non possono superare 800 caratteri.").optional(),
  privacyAccepted: z.boolean().refine((accepted) => accepted, {
    message: "Accetta la privacy policy per inviare la richiesta.",
  }),
});

type OrderRequestValues = z.infer<typeof orderRequestSchema>;

const defaultValues: OrderRequestValues = {
  name: "",
  phone: "",
  email: "",
  deliveryAddress: "",
  comune: "",
  cap: "",
  province: "FE",
  requestedQuantity: "",
  requestedCut: "",
  preferredDeliveryDate: "",
  deliveryNotes: "",
  privacyAccepted: false,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Legna da ardere a Ferrara, provincia e basso ravennate",
  provider: {
    "@type": "LocalBusiness",
    name: "Società Agricola Farina 2.0",
    telephone: "+39 0532 814411",
    email: "soc.agr.farina@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Rangona, 54/A",
      addressLocality: "Bando di Argenta",
      addressRegion: "FE",
      postalCode: "44015",
      addressCountry: "IT",
    },
  },
  areaServed: ["Ferrara", "Argenta", "Portomaggiore", "Comacchio", "Ostellato", "Basso ravennate"],
  serviceType: "Consegna legna da ardere a domicilio",
  offers: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Legna da ardere stagionata",
      description: "Tagli disponibili: stufa 25/28 cm, stufone 30/33 cm, camino 40/45 cm, pizza corta e pizza lunga.",
    },
  },
};

function getErrorMessage(error?: { message?: string }) {
  return error?.message ? <p className="mt-1 text-sm text-destructive">{error.message}</p> : null;
}

const OrdinaLegna = () => {
  const { toast } = useToast();
  const minDate = React.useMemo(() => new Date().toISOString().split("T")[0], []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<OrderRequestValues>({
    resolver: zodResolver(orderRequestSchema),
    defaultValues,
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (values: OrderRequestValues) => {
    const formData = new FormData();

    formData.set("nome", values.name);
    formData.set("telefono", values.phone);
    formData.set("email", values.email);
    formData.set("indirizzo_consegna", values.deliveryAddress);
    formData.set("comune", values.comune);
    formData.set("cap", values.cap);
    formData.set("provincia", values.province);
    formData.set("quantita_richiesta", values.requestedQuantity);
    formData.set("taglio_richiesto", values.requestedCut);
    formData.set("data_preferita_consegna", values.preferredDeliveryDate);
    formData.set("note_consegna", values.deliveryNotes ?? "");
    formData.set("privacy_accettata", "Sì");
    formData.set("_subject", `Richiesta legna da ardere - ${values.name}`);
    formData.set("_template", "table");
    formData.set("_url", pageUrl);

    const response = await fetch(formSubmitEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const result = (await response.json().catch(() => null)) as {
      message?: string;
      success?: boolean | string;
    } | null;

    if (!response.ok || result?.success === false || result?.success === "false") {
      throw new Error(result?.message || "Invio non riuscito");
    }

    toast({
      title: "Richiesta inviata",
      description: "Ti contatteremo per confermare disponibilità, prezzo finale, consegna e pagamento.",
    });
    reset(defaultValues);
  };

  const handleFormSubmit = handleSubmit(async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      const message = error instanceof Error && error.message.toLowerCase().includes("activation")
        ? "Il servizio di invio deve essere attivato dall'email aziendale prima di ricevere richieste."
        : "Riprova tra poco oppure contattaci telefonicamente o via WhatsApp.";

      toast({
        title: "Invio non riuscito",
        description: message,
        variant: "destructive",
      });
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Legna da ardere a Ferrara, provincia e basso ravennate"
        description="Richiedi legna da ardere stagionata a Ferrara, provincia e basso ravennate nei tagli stufa 25/28 cm, stufone 30/33 cm, camino 40/45 cm, pizza corta e pizza lunga."
        path={pagePath}
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="pt-24 pb-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center max-w-6xl mx-auto">
            <ScrollReveal>
              <div>
                <p className="text-primary-foreground/65 font-sans text-sm tracking-[0.2em] uppercase mb-3">
                  Consegna a domicilio
                </p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-5">
                  Legna da ardere a Ferrara, provincia e basso ravennate
                </h1>
                <p className="text-primary-foreground/82 text-lg leading-relaxed max-w-2xl">
                  Richiedi legna stagionata per stufe, camini e forni a legna, disponibile nei tagli stufa 25/28 cm,
                  stufone 30/33 cm, camino 40/45 cm, pizza corta e pizza lunga. Serviamo Ferrara,
                  Argenta, Portomaggiore, Comacchio, Ostellato, il basso ravennate e comuni limitrofi in base alla disponibilità.
                </p>
                <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
                  {["Nessun pagamento online", "Prezzo confermato prima", "Consegna da concordare"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-primary-foreground/85">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <SiteImage
                imageName="legna-catasta.jpg"
                alt="Catasta di legna da ardere pronta per la consegna"
                loading="eager"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full aspect-[4/3] object-cover rounded-xl shadow-xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-10 max-w-6xl mx-auto items-start">
            <ScrollReveal>
              <aside className="space-y-5">
                <div>
                  <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">
                    Come funziona
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Una richiesta, poi confermiamo tutto noi
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Compila il modulo con indirizzo, quantità indicativa e giorno preferito. La richiesta non è un
                    ordine definitivo: l'azienda ti ricontatterà per confermare disponibilità, prezzo finale,
                    costo di consegna e istruzioni di pagamento.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    { icon: Truck, text: "Consegna valutata in base a comune, CAP e periodo." },
                    { icon: CalendarDays, text: "La data indicata è una preferenza, non una prenotazione automatica." },
                    { icon: ShieldCheck, text: "Non raccogliamo dati carta e non elaboriamo pagamenti online." },
                  ].map((item) => (
                    <div key={item.text} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                      <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Richiedi consegna legna</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Nessun pagamento ora. Ti contatteremo prima che la richiesta diventi ordine confermato.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Nome e cognome *
                      </label>
                      <Input id="name" autoComplete="name" {...register("name")} />
                      {getErrorMessage(errors.name)}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                        Telefono *
                      </label>
                      <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" {...register("phone")} />
                      {getErrorMessage(errors.phone)}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                      Email *
                    </label>
                    <Input id="email" type="email" inputMode="email" autoComplete="email" {...register("email")} />
                    {getErrorMessage(errors.email)}
                  </div>

                  <div>
                    <label htmlFor="deliveryAddress" className="block text-sm font-medium text-foreground mb-1.5">
                      Indirizzo di consegna *
                    </label>
                    <Input id="deliveryAddress" autoComplete="street-address" {...register("deliveryAddress")} />
                    {getErrorMessage(errors.deliveryAddress)}
                  </div>

                  <div className="grid sm:grid-cols-[1fr_120px_120px] gap-5">
                    <div>
                      <label htmlFor="comune" className="block text-sm font-medium text-foreground mb-1.5">
                        Comune *
                      </label>
                      <Input id="comune" autoComplete="address-level2" {...register("comune")} />
                      {getErrorMessage(errors.comune)}
                    </div>
                    <div>
                      <label htmlFor="cap" className="block text-sm font-medium text-foreground mb-1.5">
                        CAP *
                      </label>
                      <Input id="cap" inputMode="numeric" autoComplete="postal-code" maxLength={5} {...register("cap")} />
                      {getErrorMessage(errors.cap)}
                    </div>
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-foreground mb-1.5">
                        Provincia *
                      </label>
                      <select
                        id="province"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                        {...register("province")}
                      >
                        {provinceOptions.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                      {getErrorMessage(errors.province)}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label htmlFor="requestedQuantity" className="block text-sm font-medium text-foreground mb-1.5">
                        Quantità richiesta *
                      </label>
                      <select
                        id="requestedQuantity"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                        {...register("requestedQuantity")}
                      >
                        <option value="">Seleziona una quantità</option>
                        {quantityOptions.map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                      {getErrorMessage(errors.requestedQuantity)}
                    </div>
                    <div>
                      <label htmlFor="requestedCut" className="block text-sm font-medium text-foreground mb-1.5">
                        Taglio richiesto *
                      </label>
                      <select
                        id="requestedCut"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                        {...register("requestedCut")}
                      >
                        <option value="">Seleziona un taglio</option>
                        {cutOptions.map((cut) => (
                          <option key={cut} value={cut}>
                            {cut}
                          </option>
                        ))}
                      </select>
                      {getErrorMessage(errors.requestedCut)}
                    </div>
                    <div>
                      <label htmlFor="preferredDeliveryDate" className="block text-sm font-medium text-foreground mb-1.5">
                        Data preferita *
                      </label>
                      <Input
                        id="preferredDeliveryDate"
                        type="date"
                        min={minDate}
                        {...register("preferredDeliveryDate")}
                      />
                      {getErrorMessage(errors.preferredDeliveryDate)}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="deliveryNotes" className="block text-sm font-medium text-foreground mb-1.5">
                      Note per la consegna
                    </label>
                    <Textarea
                      id="deliveryNotes"
                      rows={4}
                      placeholder="Esempio: accesso cortile, strada stretta, fascia oraria preferita..."
                      {...register("deliveryNotes")}
                    />
                    {getErrorMessage(errors.deliveryNotes)}
                  </div>

                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        {...register("privacyAccepted")}
                      />
                      <span>
                        Accetto il trattamento dei dati per essere ricontattato sulla richiesta e dichiaro di aver letto la{" "}
                        <Link to="/privacy-policy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        . *
                      </span>
                    </label>
                    {getErrorMessage(errors.privacyAccepted)}
                  </div>

                  <div className="rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-sm leading-relaxed text-foreground">
                    <div className="flex gap-3">
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <p>
                        La richiesta non comporta pagamento e non raccoglie dati carta. Disponibilità, prezzo finale,
                        costo di consegna e istruzioni di pagamento saranno confermati dall'azienda prima dell'ordine.
                      </p>
                    </div>
                  </div>

                  {isSubmitSuccessful && (
                    <p className="text-sm text-primary">
                      Richiesta ricevuta dal modulo. Attendi la conferma dell'azienda prima di considerarla ordine.
                    </p>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default OrdinaLegna;
