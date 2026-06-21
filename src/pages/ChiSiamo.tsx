import React from "react";
import { Leaf, Heart, Award, Sprout, Truck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import PageSEO from "@/components/PageSEO";

const values = [
  { icon: Heart, title: "Passione", desc: "Una dedizione tramandata da generazioni per la terra e i suoi frutti." },
  { icon: Leaf, title: "Sostenibilità", desc: "Tecniche di irrigazione mirate e selezione sementiera d'élite per un'agricoltura responsabile." },
  { icon: Award, title: "Qualità", desc: "Ogni prodotto è seguito dalla semina alla distribuzione, garantendo freschezza e tracciabilità totale." },
];

const methods = [
  { icon: RotateCcw, title: "Rotazione delle Colture", desc: "Gestiamo terreni tra Portomaggiore e Argenta, con rigorosa turnazione per preservare l'equilibrio naturale del suolo." },
  { icon: Sprout, title: "Innovazione Sostenibile", desc: "Irrigazione mirata e selezione sementiera d'élite per frutti dolci, resistenti e rispettosi dell'ambiente." },
  { icon: Truck, title: "Filiera Corta", desc: "Dalla semina alla distribuzione, ogni fase è seguita direttamente dalla nostra famiglia per garantire freschezza assoluta." },
];

const ChiSiamo = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <>
    <PageSEO
      title="Chi Siamo — Azienda Agricola Farina dal 1975"
      description="La storia della famiglia Farina: agricoltura nelle terre tra Argenta e Portomaggiore (Ferrara) da metà anni Settanta. Tradizione, innovazione e filiera corta."
      path="/chi-siamo/"
    />
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-[image:var(--section-gradient)]">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">Chi Siamo</p>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
                Radici autentiche, visione contemporanea.
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Da oltre quarant'anni, l'arte della coltivazione nelle fertili terre tra Argenta e Portomaggiore.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Storia */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-12">
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 text-center">
                  Una Storia di Famiglia e Passione
                </h2>
                <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
                  <p>
                    La <strong className="text-foreground">Società Agricola Farina 2.0</strong> non è solo un'impresa: è il racconto di una vita
                    dedicata alla terra. Nata a metà degli anni Settanta a Bando di Argenta, nel cuore del territorio
                    tra Argenta e Portomaggiore, la nostra attività ha preso slancio grazie alla visione di
                    <strong className="text-foreground"> Roberto Farina</strong>, imprenditore agricolo che ha saputo
                    trasformare la vocazione del territorio ferrarese in un'eccellenza produttiva.
                  </p>
                  <p>
                    A partire dagli anni 2000, con l'ingresso del figlio <strong className="text-foreground">Marcello Farina</strong>, l'azienda si è evoluta
                    nella <strong className="text-foreground">Società Agricola Farina 2.0</strong>. Questo passaggio generazionale ha portato un nuovo impulso tecnologico e una
                    gestione moderna, senza mai intaccare i valori di genuinità e professionalità che ci
                    contraddistinguono fin dalle origini.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Valori */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">I Nostri Valori</p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground">
                Ciò in cui crediamo
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 150}>
                <div className="text-center p-8 rounded-xl bg-card border border-border/50 hover:shadow-lg transition-shadow h-full flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metodo */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">Il Nostro Metodo</p>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-4">
                Rispetto per il Suolo, Qualità Garantita
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Coltiviamo ben oltre la semplice raccolta. La nostra forza risiede nella gestione agronomica avanzata
                e in una filiera interamente controllata.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {methods.map((m, i) => (
              <ScrollReveal key={m.title} delay={i * 150}>
                <div className="p-8 rounded-xl bg-card border border-border/50 hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
                    <m.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{m.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Perché Sceglierci */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Perché Sceglierci
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                Oggi la Società Agricola Farina 2.0 è un punto di riferimento per chi cerca prodotti
                ortofrutticoli autentici. Sceglierci significa sostenere un'agricoltura che guarda al futuro
                con gli occhi di chi, da generazioni, conosce ogni zolla dei propri campi.
              </p>
              <Link
                to="/contatti/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contattaci
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
    <FooterSection />
    <WhatsAppButton />
  </>
  );
};

export default ChiSiamo;
