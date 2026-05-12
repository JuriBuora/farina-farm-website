import { Link } from "react-router-dom";
import heroFallback from "@/assets/hero-azienda-aerea.jpg";
import heroAvif480 from "@/assets/generated/hero-azienda-aerea-480.avif";
import heroAvif800 from "@/assets/generated/hero-azienda-aerea-800.avif";
import heroAvif1200 from "@/assets/generated/hero-azienda-aerea-1200.avif";
import heroAvif1600 from "@/assets/generated/hero-azienda-aerea-1600.avif";
import heroWebp480 from "@/assets/generated/hero-azienda-aerea-480.webp";
import heroWebp800 from "@/assets/generated/hero-azienda-aerea-800.webp";
import heroWebp1200 from "@/assets/generated/hero-azienda-aerea-1200.webp";
import heroWebp1600 from "@/assets/generated/hero-azienda-aerea-1600.webp";

const heroAvifSrcSet = `${heroAvif480} 480w, ${heroAvif800} 800w, ${heroAvif1200} 1200w, ${heroAvif1600} 1600w`;
const heroWebpSrcSet = `${heroWebp480} 480w, ${heroWebp800} 800w, ${heroWebp1200} 1200w, ${heroWebp1600} 1600w`;
const heroButtonClass =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-8 text-base font-medium font-sans ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const HeroSection = () => (
  <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
    <picture>
      <source srcSet={heroAvifSrcSet} type="image/avif" sizes="100vw" />
      <source srcSet={heroWebpSrcSet} type="image/webp" sizes="100vw" />
      <img
        src={heroFallback}
        alt="Vista aerea dell'Azienda Agricola Farina 2.0"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        loading="eager"
        {...{ fetchpriority: "high" }}
        decoding="async"
        sizes="100vw"
      />
    </picture>
    <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
      <p className="text-primary-foreground/80 font-sans text-sm tracking-[0.3em] uppercase mb-4">
        Bando di Argenta · vicino Portomaggiore · Ferrara
      </p>
      <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
        Azienda Agricola Farina
      </h1>
      <p className="text-primary-foreground/90 text-lg md:text-xl font-light mb-8">
        Angurie, meloni e zucche all’ingrosso e al dettaglio · legna da ardere con consegna nel ferrarese — dal 1975
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link className={`${heroButtonClass} bg-secondary text-secondary-foreground hover:bg-secondary/90`} to="/prodotti">
          Scopri i Prodotti
        </Link>
        <a className={`${heroButtonClass} bg-primary-foreground text-primary hover:bg-primary-foreground/90`} href="tel:+390532814411">
          <PhoneIcon className="w-4 h-4 mr-2" /> Chiama Ora
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
