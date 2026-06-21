import { Leaf, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const features = [
  { icon: Heart, title: "Passione", desc: "Una dedizione tramandata da generazioni per la terra e i suoi frutti." },
  { icon: Leaf, title: "Sostenibilità", desc: "Metodi di coltivazione tradizionali e rispettosi dell'ambiente." },
  { icon: Award, title: "Qualità", desc: "Prodotti selezionati con cura per garantire eccellenza." },
];

const AboutSection = () => (
  <section id="chi-siamo" className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">La Nostra Storia</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
            Radici autentiche, visione contemporanea.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Da oltre quarant'anni, la <strong className="text-foreground">Società Agricola Farina 2.0</strong> dedica
            passione e competenza alla coltivazione nelle fertili terre tra Argenta e Portomaggiore,
            nel cuore del territorio ferrarese. Una storia di famiglia che unisce tradizione e innovazione.
          </p>
          <Link
            to="/chi-siamo/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Scopri di più
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
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
);

export default AboutSection;
