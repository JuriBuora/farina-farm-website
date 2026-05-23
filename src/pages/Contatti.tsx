import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import PageSEO from "@/components/PageSEO";
import {
  MIN_MESSAGE_LENGTH,
  normalizeContactForm,
  validateContactForm,
} from "@/lib/contactValidation";

const formSubmitEndpoint = "https://formsubmit.co/ajax/soc.agr.farina@gmail.com";
const formSourceUrl = "https://www.aziendaagricolafarina.com/contatti";
const minSubmitDelayMs = 3000;
const submitCooldownMs = 15000;
const formSubmitBlacklist = [
  "<a href=",
  "[url=",
  "bit.ly/",
  "tinyurl.com/",
  "t.me/",
  "viagra",
  "casino",
  "cbd gummies",
  "crypto giveaway",
  "guest post",
  "backlinks",
  "seo service",
  "payday loan",
].join(", ");

function getFormSubmitErrorMessage(message?: string) {
  const normalizedMessage = message?.toLowerCase() ?? "";

  if (normalizedMessage.includes("activation")) {
    return "Il servizio di invio non è ancora attivo: apri l'email di attivazione inviata da FormSubmit a soc.agr.farina@gmail.com, poi riprova.";
  }

  if (normalizedMessage.includes("web server")) {
    return "Il modulo funziona solo dal sito pubblicato. Se stai testando una copia locale, avvia il server di sviluppo.";
  }

  return "Riprova tra poco oppure contattaci telefonicamente.";
}

const Contatti = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefono: "", messaggio: "" });
  const formLoadedAtRef = useRef(Date.now());
  const lastSubmitAtRef = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedForm = normalizeContactForm(form);
    const validationError = validateContactForm(normalizedForm);

    if (validationError) {
      toast({ title: validationError, variant: "destructive" });
      return;
    }

    const now = Date.now();
    const fillDurationMs = now - formLoadedAtRef.current;

    if (fillDurationMs < minSubmitDelayMs) {
      toast({
        title: "Invio troppo rapido",
        description: "Attendi qualche secondo e riprova.",
        variant: "destructive",
      });
      return;
    }

    if (lastSubmitAtRef.current && now - lastSubmitAtRef.current < submitCooldownMs) {
      toast({
        title: "Attendi prima di inviare di nuovo",
        description: "Il modulo limita gli invii ravvicinati per ridurre spam e duplicati.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);

      formData.set("nome", normalizedForm.nome);
      formData.set("email", normalizedForm.email);
      formData.set("telefono", normalizedForm.telefono);
      formData.set("messaggio", normalizedForm.messaggio);
      formData.set("_subject", `Nuovo messaggio da aziendaagricolafarina.com - ${normalizedForm.nome}`);
      formData.set("_template", "table");
      formData.set("_url", formSourceUrl);
      formData.set("tempo_compilazione_secondi", String(Math.max(1, Math.round(fillDurationMs / 1000))));

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
        title: "Messaggio inviato",
        description: "Grazie, ti risponderemo il prima possibile.",
      });
      lastSubmitAtRef.current = Date.now();
      formLoadedAtRef.current = Date.now();
      setLoading(false);
      setForm({ nome: "", email: "", telefono: "", messaggio: "" });
      formElement.reset();
    } catch (error) {
      setLoading(false);
      const description = error instanceof Error
        ? getFormSubmitErrorMessage(error.message)
        : "Riprova tra poco oppure contattaci telefonicamente.";

      toast({
        title: "Invio non riuscito",
        description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Contatti — Azienda Agricola Farina (Ferrara)"
        description="Telefono, WhatsApp, email e indirizzo della Società Agricola Farina 2.0 a Bando di Argenta (FE). Contatti per prodotti, forniture e legna."
        path="/contatti"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Contattaci</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Siamo a tua disposizione per qualsiasi informazione sui nostri prodotti, preventivi per legna da ardere o collaborazioni commerciali.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Informazioni di Contatto</h2>
                  <div className="space-y-5">
                    {[
                      { icon: MapPin, label: "Indirizzo", value: "Via Rangona, 54/A — 44015 Bando di Argenta (FE)", href: "https://maps.google.com/?q=Via+Rangona+54+44015+Bando+di+Argenta+FE+Italy" },
                      { icon: Phone, label: "Telefono", value: "+39 0532 814411", href: "tel:+390532814411" },
                      { icon: Phone, label: "Cellulare", value: "+39 338 1571439", href: "tel:+393381571439" },
                      { icon: Mail, label: "Email", value: "soc.agr.farina@gmail.com", href: "mailto:soc.agr.farina@gmail.com" },
                    ].map((item) => (
                      <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="text-foreground font-medium group-hover:text-primary transition-colors">{item.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-secondary" /> Orari di Apertura
                  </h3>
                  <div className="bg-card rounded-xl p-5 border border-border space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Lunedì - Venerdì</span><span className="font-medium text-foreground">08:30 – 12:00 / 13:30 – 18:00</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Sabato</span><span className="font-medium text-foreground">08:00 – 12:00</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Domenica</span><span className="font-medium text-foreground">Chiuso</span></div>
                  </div>
                </div>

                {/* Map embed */}
                <div className="rounded-xl overflow-hidden border border-border h-64">
                  <iframe
                    title="Mappa Azienda Agricola Farina"
                    src="https://www.google.com/maps?q=Via+Rangona+54,+44015+Bando+di+Argenta,+FE,+Italy&z=14&output=embed"
                    className="w-full h-full"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={200}>
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">Inviaci un Messaggio</h2>
                <p className="text-muted-foreground text-sm mb-6">Compila il modulo e ti risponderemo il prima possibile.</p>

                <form
                  action="https://formsubmit.co/soc.agr.farina@gmail.com"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_url" value={formSourceUrl} />
                  <input type="hidden" name="_subject" value="Nuovo messaggio da aziendaagricolafarina.com" />
                  <input type="hidden" name="_blacklist" value={formSubmitBlacklist} />
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-1.5">Nome e Cognome *</label>
                    <Input id="nome" name="nome" value={form.nome} onChange={handleChange} placeholder="Mario Rossi" maxLength={100} minLength={2} autoComplete="name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="mario@esempio.it" maxLength={255} autoComplete="email" inputMode="email" required />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1.5">Telefono</label>
                    <Input id="telefono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="+39 333 1234567" maxLength={25} autoComplete="tel" inputMode="tel" />
                  </div>
                  <div>
                    <label htmlFor="messaggio" className="block text-sm font-medium text-foreground mb-1.5">Messaggio *</label>
                    <Textarea id="messaggio" name="messaggio" value={form.messaggio} onChange={handleChange} placeholder="Scrivi qui il tuo messaggio..." rows={5} minLength={MIN_MESSAGE_LENGTH} maxLength={1000} required />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="w-4 h-4 mr-2" />
                    {loading ? "Invio in corso..." : "Invia Messaggio"}
                  </Button>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Il modulo applica controlli antispam automatici, limiti sugli invii ravvicinati e filtri sui contenuti sospetti.
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Inviando il modulo autorizzi l&apos;inoltro della richiesta tramite un servizio esterno di recapito email
                    e dichiari di aver letto la <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
                  </p>
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

export default Contatti;
