import React from "react";
import { Flame, Truck, Package, Phone, Send, TreeDeciduous, Ruler, ThermometerSun } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import PageSEO from "@/components/PageSEO";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import SiteImage from "@/components/SiteImage";

const legnaFaq: FAQItem[] = [
  {
    q: "In quali zone consegnate la legna da ardere?",
    a: "Consegniamo legna da ardere a domicilio entro un raggio di 50 km dalla nostra sede di Bando di Argenta (FE). Copriamo Argenta, Portomaggiore, Ostellato, Comacchio, Ferrara città, Lugo e tutti i comuni limitrofi della provincia di Ferrara e del basso ravennate.",
  },
  {
    q: "Qual è l'ordine minimo per la consegna?",
    a: "L'ordine minimo indicativo è di 200-250 €, in base alla zona di consegna e al tipo di legna richiesto. Contattaci per un preventivo personalizzato.",
  },
  {
    q: "Che tipo di legna vendete?",
    a: "Forniamo legna stagionata di faggio, cerro e carpino, asciutta e pronta all'uso. Una selezione di essenze ad alto potere calorifico, adatte a stufe, camini e forni a legna.",
  },
  {
    q: "La legna è già tagliata e pronta da bruciare?",
    a: "Sì. La legna viene consegnata già tagliata e stagionata. I tagli disponibili sono stufa 25/28 cm, stufone 30/33 cm, camino 40/45 cm, oltre a pizza corta e pizza lunga per forni a legna.",
  },
  {
    q: "Vendete anche sacchi di legna da ritirare in azienda?",
    a: "Sì, in azienda sono disponibili sacchi di legna da circa 15 kg. I sacchi possono essere acquistati anche singolarmente, oppure nella quantità desiderata, ma sono disponibili solo con ritiro in sede: non effettuiamo consegna a domicilio per i sacchi.",
  },
  {
    q: "Quali tagli sono disponibili nei sacchi di legna?",
    a: "Nei sacchi di legna sono disponibili i tagli stufa, stufone e griglia. Il taglio camino, più grande, non è disponibile nei sacchi: per esigenze specifiche consigliamo di contattarci prima del ritiro.",
  },
  {
    q: "Quanto tempo serve per ricevere la consegna?",
    a: "I tempi variano in base al periodo dell'anno e alla disponibilità. Generalmente riusciamo a consegnare entro pochi giorni lavorativi dall'ordine. Contattaci per verificare la disponibilità.",
  },
  {
    q: "Come si paga la legna?",
    a: "Il pagamento avviene direttamente alla consegna. Per dettagli e modalità contattaci telefonicamente o via WhatsApp.",
  },
];
const features = [
  { icon: Flame, title: "Faggio, Cerro e Carpino", desc: "Tre essenze stagionate selezionate per una combustione efficiente, calore costante e ottima resa in stufe, camini e forni a legna." },
  { icon: Truck, title: "Consegna nel Ferrarese e Basso Ravennate", desc: "Consegna a domicilio entro 50 km da Bando di Argenta: Argenta, Portomaggiore, Ostellato, Comacchio, Ferrara, basso ravennate e dintorni." },
  { icon: Package, title: "Sempre Disponibile", desc: "Il nostro magazzino è sempre rifornito per soddisfare ogni richiesta, in ogni stagione." },
  { icon: TreeDeciduous, title: "Essenze Selezionate", desc: "Faggio per una fiamma regolare, cerro per una resa prolungata e carpino per un fuoco vivo e consistente nel riscaldamento domestico." },
  { icon: Ruler, title: "Tagli Stufa, Stufone e Camino", desc: "Disponibili taglio stufa 25/28 cm, stufone 30/33 cm e camino 40/45 cm, oltre a pizza corta e pizza lunga per forni a legna." },
  { icon: ThermometerSun, title: "Stagionatura Naturale", desc: "La nostra legna viene stagionata all'aria aperta, garantendo bassa umidità e resa elevata." },
];

const gallery = [
  { imageName: "legna-originale.jpg", alt: "Legna da ardere tagliata e pronta all'uso" },
  { imageName: "legna-cumuli.jpg", alt: "Cumuli di legna nel piazzale aziendale" },
  { imageName: "legna-tronchi.jpg", alt: "Tronchi e legna da lavorare" },
  { imageName: "azienda-aerea.jpg", alt: "Vista aerea dell'azienda agricola Farina" },
  { imageName: "magazzino-esterno.jpg", alt: "Magazzino e piazzale aziendale" },
];

const Legna = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Legna da Ardere a Ferrara — Consegna a Domicilio"
        description="Legna da ardere stagionata di faggio, cerro e carpino nei tagli stufa, stufone, camino, pizza corta e pizza lunga. Consegna entro 50 km da Bando."
        path="/legna/"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="text-primary-foreground/60 font-sans text-sm tracking-[0.2em] uppercase mb-3">Servizio tutto l'anno</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Legna da Ardere a Ferrara e Provincia</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-8">
              Legna selezionata di faggio, cerro e carpino, stagionata e pronta all'uso.
              Disponibile nei tagli stufa, stufone, camino, pizza corta e pizza lunga, con consegna a domicilio entro 50 km da Bando di Argenta (FE).
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="font-sans" asChild>
                <Link to="/ordina-legna-da-ardere/">
                  <Send className="w-4 h-4 mr-2" />
                  Richiedi Consegna
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="font-sans" asChild>
                <a href="https://wa.me/+393667701214" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Caratteristiche */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">Perché Sceglierci</p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-4">
                Qualità e Servizio Garantiti
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                La nostra esperienza nella gestione del territorio ci permette di offrire legna di prima qualità,
                con un servizio di consegna rapido e puntuale.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 100}>
                <div className="p-6 rounded-xl bg-card border border-border/50 hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Info Ordini */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="rounded-xl overflow-hidden">
                <SiteImage
                  imageName="legna-originale.jpg"
                  alt="Legna da ardere - Azienda Agricola Farina"
                  loading="lazy"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover rounded-xl aspect-[4/3]"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div>
                <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">Informazioni</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Come Ordinare
                </h2>
                <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
                  <p>
                    Ordinare la vostra legna da ardere è semplice: <strong className="text-foreground">chiamateci</strong> o
                    inviate un <strong className="text-foreground">messaggio WhatsApp</strong> e concorderemo
                    quantità, taglio e data di consegna.
                  </p>
                  <p>
                    Sono disponibili taglio <strong className="text-foreground">stufa 25/28 cm</strong>,
                    <strong className="text-foreground"> stufone 30/33 cm</strong>,
                    <strong className="text-foreground"> camino 40/45 cm</strong>, oltre a
                    <strong className="text-foreground"> pizza corta</strong> e
                    <strong className="text-foreground"> pizza lunga</strong> per forni a legna.
                  </p>
                  <div className="bg-card border border-border rounded-xl p-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ordine minimo</span>
                      <span className="font-semibold text-foreground">200 / 250 €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Raggio consegna</span>
                      <span className="font-semibold text-foreground">50 km</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Disponibilità</span>
                      <span className="font-semibold text-foreground">Tutto l'anno</span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">Tagli disponibili</span>
                      <span className="font-semibold text-foreground text-right">Stufa 25/28 cm · Stufone 30/33 cm · Camino 40/45 cm · Pizza corta/lunga</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans" asChild>
                    <Link to="/ordina-legna-da-ardere/">
                      <Send className="w-4 h-4 mr-2" />
                      Richiedi consegna
                    </Link>
                  </Button>
                  <Button variant="outline" className="font-sans" asChild>
                    <Link to="/contatti/">Contattaci</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Galleria */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">Le Nostre Immagini</p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground">
                Legna e Strutture
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {gallery.map((img, i) => (
              <ScrollReveal key={img.alt} delay={i * 100}>
                <div className="rounded-xl overflow-hidden aspect-[4/3]">
                  <SiteImage
                    imageName={img.imageName}
                    alt={img.alt}
                    loading="lazy"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-muted-foreground text-xs mt-2 text-center">{img.alt}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={legnaFaq} title="Domande frequenti sulla legna" eyebrow="FAQ Legna" withJsonLd />

      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default Legna;
