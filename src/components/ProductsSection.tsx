import { Link } from "react-router-dom";
import SiteImage from "@/components/SiteImage";
import ScrollReveal from "./ScrollReveal";

const products = [
  {
    title: "Angurie",
    desc: "Angurie selezionate per dolcezza, croccantezza e tenuta, con varietà adatte sia alla vendita diretta sia alle forniture all’ingrosso.",
    imageName: "angurie-originale.jpg",
    alt: "Coltivazione angurie - Azienda Agricola Farina",
    link: "/prodotti/#angurie",
  },
  {
    title: "Zucche",
    desc: "Zucche da cucina e da decorazione, con polpe compatte e saporite ideali per forno, vellutate, risotti e ricette tradizionali.",
    imageName: "zucche-originale.jpg",
    alt: "Zucche dell'Azienda Agricola Farina",
    link: "/prodotti/#zucche",
  },
  {
    title: "Meloni",
    desc: "Meloni lisci e retati, raccolti al giusto grado di maturazione per offrire profumo, dolcezza e buona conservabilità.",
    imageName: "meloni-originale.jpg",
    alt: "Meloni freschi dell'Azienda Agricola Farina",
    link: "/prodotti/#meloni",
  },
];

const ProductsSection = () => (
  <section id="prodotti" className="py-20 md:py-28" style={{ background: "var(--section-gradient)" }}>
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">I Nostri Prodotti</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Freschi dal campo
          </h2>
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            Vendita all’ingrosso e al dettaglio direttamente in azienda
          </span>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 150}>
            <Link to={p.link} className="block h-full">
              <div className="group rounded-xl overflow-hidden bg-background border border-border/50 hover:shadow-xl transition-all duration-300 h-full">
                <div className="aspect-square overflow-hidden">
                  <SiteImage
                    imageName={p.imageName}
                    alt={p.alt}
                    loading="lazy"
                    width={800}
                    height={800}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
