import { Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Societ%C3%A0+Agricola+Farina+2.0+s.s./@44.6531603,11.867807,17z/data=!4m8!3m7!1s0x477e14e57c623c59:0xa2bf230d792dc501!8m2!3d44.6531566!4d11.8726779!9m1!1b1!16s%2Fg%2F1vspqbn6";

const testimonials = [
  {
    name: "Simonetta Menegatti",
    text: "Un'azienda attiva da decenni che lavora i propri prodotti con professionalità e competenza. Cortesia, cordialità e soprattutto prodotti di ottima qualità! Consiglio vivamente!",
    role: "Local Guide",
  },
  {
    name: "Sandro Del Vecchio",
    text: "Gentilissimi e prodotti buonissimi.",
    role: "Local Guide",
  },
  {
    name: "Roberta Malagolini",
    text: "Azienda fantastica. Mi hanno regalato cocomeri piccoli perché un po' vecchiotti… erano fantastici!",
    role: "Local Guide",
  },
  {
    name: "Carmela Girotta",
    text: "Gentilezza e cortesia... prezzi ottimi e legno di buona qualità!",
    role: "Local Guide",
  },
  {
    name: "Elisabetta Milicia",
    text: "Ottime cocomeri.",
    role: "",
  },
  {
    name: "Antonella Montanari",
    text: "Favolosi!",
    role: "",
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28" style={{ background: "var(--section-gradient)" }}>
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-16">
          <p className="text-secondary font-sans text-sm tracking-[0.2em] uppercase mb-3">Testimonianze</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
            Dicono di noi
          </h2>
          <p className="text-muted-foreground text-lg">
            Valutazione <strong className="text-foreground">4,8</strong> su Google con oltre 40 recensioni
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 100}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background rounded-xl p-6 border border-border/50 hover:shadow-lg transition-shadow h-full flex flex-col group block"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground italic font-serif text-base leading-relaxed mb-4 flex-1">
                "{t.text}"
              </p>
              <div>
                <p className="text-foreground text-sm font-sans font-semibold">{t.name}</p>
                {t.role && (
                  <p className="text-muted-foreground text-xs font-sans mt-0.5">{t.role}</p>
                )}
                <p className="text-muted-foreground text-xs font-sans mt-1 group-hover:text-primary transition-colors">
                  Google Reviews ↗
                </p>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
