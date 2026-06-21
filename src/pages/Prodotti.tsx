import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import PageSEO from "@/components/PageSEO";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Phone, Leaf, Sun, Droplets, ThermometerSun, Scale, Truck } from "lucide-react";
import SiteImage from "@/components/SiteImage";

const products = [
  {
    id: "angurie",
    title: "Angurie",
    subtitle: "Dolcezza e freschezza dal campo",
    imageName: "angurie-originale.jpg",
    alt: "Coltivazione angurie - Azienda Agricola Farina",
    description:
      "Coltiviamo angurie selezionate per pezzatura, dolcezza e tenuta del frutto. La raccolta avviene al giusto grado di maturazione, per offrire polpa rossa, croccante e succosa sia nella vendita diretta sia nelle forniture all’ingrosso.",
    details: [
      { icon: Sun, label: "Stagione", value: "Giugno – Settembre" },
      { icon: Scale, label: "Peso medio", value: "8 – 15 kg" },
      { icon: Droplets, label: "Irrigazione", value: "Controllata e sostenibile" },
      { icon: Leaf, label: "Coltivazione", value: "Metodi tradizionali" },
    ],
    varieties: [
      { name: "Sentinel", desc: "Anguria allungata a buccia striata, con pezzatura importante intorno ai 15-16 kg. Polpa rosso intenso, croccante, molto zuccherina e con buona tenuta in campo." },
      { name: "Barello", desc: "Varietà tradizionale con semi, precoce e produttiva. Frutto oblungo a buccia Crimson, polpa rosso brillante, dolce e adatta alle produzioni di inizio estate." },
      { name: "Baraka", desc: "Anguria Crimson con semi, di forma tondo-ovale e pezzatura tradizionale fino a 15-16 kg. Polpa croccante, rosso intenso, con buona tolleranza alle scottature." },
      { name: "Topgun", desc: "Varietà tondo-ovale uniforme, con buccia ben striata e polpa compatta di colore rosso vivo. Apprezzata per elevato grado zuccherino e ottima conservabilità." },
    ],
    gallery: ["anguria-bilancia.jpg", "meloni-angurie.jpg", "angurie-cassone.jpg", "anguria-gigante.jpg"],
  },
  {
    id: "meloni",
    title: "Meloni",
    subtitle: "Profumo e sapore della tradizione emiliana",
    imageName: "meloni-originale2.jpg",
    alt: "Meloni freschi dell'Azienda Agricola Farina",
    description:
      "I meloni vengono coltivati seguendo il ritmo della stagione e raccolti quando profumo, colore e consistenza raggiungono il punto ideale. Proponiamo tipologie lisce e retate, scelte per dolcezza, aroma e buona conservabilità.",
    details: [
      { icon: Sun, label: "Stagione", value: "Giugno – Agosto" },
      { icon: Scale, label: "Peso medio", value: "1 – 3 kg" },
      { icon: ThermometerSun, label: "Clima", value: "Temperato-caldo ideale" },
      { icon: Leaf, label: "Terreno", value: "Fertile pianura padana" },
    ],
    varieties: [
      { name: "Saphir", desc: "Melone liscio tipo Bacir, rotondo leggermente ovale. Polpa molto dolce, aromatica e profumata, con conservabilità lunga e buona adattabilità in campo." },
      { name: "Graffio", desc: "Melone retato precoce, con fette ben marcate e colore giallo con sutura verde. Alto grado Brix, aroma gradevole e qualità che si conserva." },
    ],
    gallery: ["meloni-originale2.jpg", "meloni-originale.jpg", "meloni-lisci-cassetta.jpg", "meloni-retati-cassetta.jpg"],
  },
  {
    id: "zucche",
    title: "Zucche",
    subtitle: "Versatilità e gusto per ogni stagione",
    imageName: "zucche-originale2.jpg",
    alt: "Zucche coltivate dall'Azienda Agricola Farina",
    description:
      "Le zucche sono una delle produzioni autunnali più riconoscibili dell’azienda. Coltiviamo varietà da cucina e da decorazione, con polpe dolci, compatte e adatte a risotti, vellutate, forno, trasformazione e ricette della tradizione.",
    details: [
      { icon: Sun, label: "Stagione", value: "Settembre – Marzo" },
      { icon: Scale, label: "Peso medio", value: "2 – 20+ kg" },
      { icon: Truck, label: "Distribuzione", value: "Mercati ortofrutticoli" },
      { icon: Leaf, label: "Conservazione", value: "Lunga durata naturale" },
    ],
    varieties: [
      { name: "Delica", desc: "Zucca dalla polpa compatta, dolce e asciutta, molto apprezzata per risotti, tortelli e cotture al forno." },
      { name: "Butternut Ines", desc: "Butternut allungata da 3-5 kg, con collo lungo, cavità ridotta e polpa arancione. Buon contenuto zuccherino e ottima conservabilità." },
      { name: "Butternut rugosa", desc: "Varietà dalla buccia più rustica e dalla polpa dolce, adatta a ricette autunnali, vellutate e cucina tradizionale." },
      { name: "Halloween", desc: "Zucca arancione decorativa e scenografica, richiesta soprattutto nel periodo autunnale per esposizioni, vendita diretta e allestimenti." },
      { name: "Musquée de Provence", desc: "Zucca costoluta e appiattita, con buccia marrone mattone e polpa spessa arancione. Pezzatura importante e ottima conservabilità." },
      { name: "Lunga piena di Napoli", desc: "Zucca cilindrica di grande pezzatura, con buccia verde scuro striata e polpa arancione fine. Saporita, versatile e molto conservabile." },
    ],
    gallery: ["zucche-mantovane.jpg", "zucche-arancioni.jpg", "zucche-halloween.jpg", "zucche-mantovane-scatola.jpg"],
  },
];

const prodottiFaq: FAQItem[] = [
  {
    q: "Vendete sia all’ingrosso sia al dettaglio?",
    a: "Sì, effettuiamo sia vendita all’ingrosso per rivenditori, GDO e mercati ortofrutticoli, sia vendita al dettaglio direttamente in azienda, in base alla disponibilità stagionale.",
  },
  {
    q: "È possibile acquistare direttamente in azienda?",
    a: "Sì, puoi acquistare angurie, meloni e zucche direttamente presso la nostra azienda a Bando di Argenta. Ti consigliamo di contattarci prima del ritiro per verificare disponibilità e orari.",
  },
  {
    q: "Qual è la quantità minima d'ordine per angurie, meloni e zucche?",
    a: "Per le forniture all’ingrosso vendiamo generalmente alla rinfusa o in cassone. Per la vendita al dettaglio direttamente in azienda le quantità dipendono dalla disponibilità del prodotto fresco di stagione.",
  },
  {
    q: "In quali periodi dell'anno sono disponibili i vostri prodotti?",
    a: "Angurie (cocomeri) da giugno a settembre, meloni da giugno ad agosto, zucche da settembre fino a marzo. La disponibilità giornaliera dipende dalla raccolta in corso: consigliamo di contattarci in anticipo per forniture e acquisti diretti in azienda.",
  },
  {
    q: "Come avviene la consegna ai rivenditori?",
    a: "Disponiamo di mezzi propri per la consegna nel ferrarese e nelle province limitrofe. Per destinazioni più lontane organizziamo il trasporto su gomma in accordo con il cliente. La merce viene consegnata in cassoni, già pronta per la rivendita.",
  },
  {
    q: "Posso ritirare direttamente in azienda a Bando di Argenta?",
    a: "Sì, il ritiro e l’acquisto diretto in azienda in Via Rangona 54/A a Bando di Argenta (FE) sono possibili in base alla disponibilità stagionale. Concordiamo orario e modalità al telefono.",
  },
  {
    q: "Posso ordinare varietà o calibri specifici (es. anguria Sentinel, melone retato)?",
    a: "Sì, coltiviamo diverse varietà di angurie, tra cui Sentinel, Barello, Baraka e Topgun, melone liscio Saphir e melone retato Graffio, oltre a zucche Delica, Butternut Ines, Butternut rugosa, Halloween, Musquée de Provence e Lunga piena di Napoli. Comunicaci in fase d'ordine la varietà e la pezzatura desiderata: verifichiamo la disponibilità stagionale.",
  },
  {
    q: "Come si richiede un preventivo per una fornitura?",
    a: "Per preventivi e listini ingrosso contattaci al +39 0532 814411 o via email a soc.agr.farina@gmail.com indicando prodotto, quantità approssimativa, periodo e luogo di consegna. Per acquisti al dettaglio in azienda chiamaci per verificare la disponibilità.",
  },
];

const Prodotti = () => {
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  return (
  <>
    <PageSEO
      title="Angurie, Meloni e Zucche all’Ingrosso e al Dettaglio — Ferrara"
      description="Angurie, meloni e zucche coltivati nel ferrarese per vendita all’ingrosso e al dettaglio direttamente in azienda, tra Argenta, Portomaggiore e Ferrara."
      path="/prodotti/"
    />
    <Navbar />
    <main className="pt-16">
      {/* Hero */}
      <section className="py-16 md:py-24 text-center" style={{ background: "var(--section-gradient)" }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">I Nostri Prodotti</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Angurie, Meloni e Zucche dal Ferrarese
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
              Coltiviamo angurie (cocomeri), meloni e zucche nei terreni tra Argenta e Portomaggiore,
              per vendita all’ingrosso a rivenditori, GDO e mercati ortofrutticoli e per vendita al dettaglio direttamente in azienda.
            </p>
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
              Vendita all’ingrosso e al dettaglio in azienda
            </span>
          </ScrollReveal>
        </div>
      </section>

      {/* Product sections */}
      {products.map((p, idx) => (
        <section key={p.id} id={p.id} className="py-20 md:py-28" style={idx % 2 === 1 ? { background: "var(--section-gradient)" } : undefined}>
          <div className="container mx-auto px-4">
            <div className={`grid lg:grid-cols-2 gap-12 items-start ${idx % 2 === 1 ? "" : ""}`}>
              {/* Image */}
              <ScrollReveal className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <SiteImage
                    imageName={p.imageName}
                    alt={p.alt}
                    loading="lazy"
                    width={800}
                    height={800}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full object-cover aspect-[4/3]"
                  />
                </div>
                {/* Gallery */}
                {p.gallery.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {p.gallery.map((imageName, i) => (
                      <div key={i} className="rounded-lg overflow-hidden">
                        <SiteImage
                          imageName={imageName}
                          alt={`${p.title} - foto ${i + 2}`}
                          loading="lazy"
                          width={400}
                          height={300}
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal delay={200} className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-2">{p.subtitle}</p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">{p.title}</h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">{p.description}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {p.details.map((d) => (
                    <div key={d.label} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/50">
                      <d.icon className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{d.label}</p>
                        <p className="text-sm font-medium text-foreground">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Varieties */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Le nostre varietà</h3>
                <div className="space-y-3">
                  {p.varieties.map((v) => (
                    <div key={v.name} className="p-4 rounded-lg bg-card border border-border/50">
                      <h4 className="font-sans font-semibold text-foreground text-sm mb-1">{v.name}</h4>
                      <p className="text-muted-foreground text-sm">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ prodotti */}
      <FAQSection
        eyebrow="FAQ Prodotti"
        title="Domande frequenti su forniture e vendita diretta"
        withJsonLd
        items={prodottiFaq}
      />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-center">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Interessato ai nostri prodotti?
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
              Contattaci per forniture all’ingrosso o per verificare la disponibilità per l’acquisto diretto in azienda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans text-base px-8" asChild>
                <a href="tel:+390532814411"><Phone className="w-4 h-4 mr-2" /> Chiama Ora</a>
              </Button>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-sans text-base px-8" asChild>
                <Link to="/contatti/">Contattaci</Link>
              </Button>
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

export default Prodotti;
