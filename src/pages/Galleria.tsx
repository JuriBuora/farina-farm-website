import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import PageSEO from "@/components/PageSEO";
import InstagramFeedPanel from "@/components/InstagramFeedPanel";
import FacebookPagePanel from "@/components/FacebookPagePanel";
import SiteImage from "@/components/SiteImage";

const categories = ["Tutte", "Angurie", "Meloni", "Zucche", "Legna", "Azienda"] as const;
type Category = (typeof categories)[number];

interface GalleryImage {
  imageName: string;
  alt: string;
  category: Category;
}

const images: GalleryImage[] = [
  // Angurie
  
  { imageName: "anguria-bilancia.jpg", alt: "Anguria gigante sulla bilancia Berkel", category: "Angurie" },
  { imageName: "angurie-cassone.jpg", alt: "Angurie con marchio Farina nelle cassette", category: "Angurie" },
  { imageName: "anguria-gigante.jpg", alt: "Anguria gigante - orgoglio aziendale", category: "Angurie" },
  { imageName: "angurie-cassette.jpg", alt: "Angurie nelle cassette blu", category: "Angurie" },
  { imageName: "angurie-magazzino.jpg", alt: "Angurie in magazzino pronte per la spedizione", category: "Angurie" },
  { imageName: "angurie-cassone-rosso.jpg", alt: "Angurie nel cassone rosso Farina", category: "Angurie" },
  { imageName: "angurie-striate.jpg", alt: "Angurie striate con etichetta Farina", category: "Angurie" },
  { imageName: "angurie-nastro.jpg", alt: "Nastro trasportatore per la selezione angurie", category: "Angurie" },
  { imageName: "meloni-angurie.jpg", alt: "Meloni e angurie pronti per la vendita", category: "Angurie" },
  // Meloni
  { imageName: "meloni-originale.jpg", alt: "Meloni lisci appena raccolti", category: "Meloni" },
  { imageName: "meloni-retati.jpg", alt: "Meloni retati pronti per la vendita", category: "Meloni" },
  { imageName: "meloni-lisci-cassetta.jpg", alt: "Meloni lisci nella cassetta verde", category: "Meloni" },
  { imageName: "meloni-retati-cassetta.jpg", alt: "Meloni retati in cassetta", category: "Meloni" },
  // Zucche
  { imageName: "zucche-originale.jpg", alt: "Zucche di diverse varietà", category: "Zucche" },
  { imageName: "zucche-originale2.jpg", alt: "Zucche pronte per la distribuzione", category: "Zucche" },
  
  { imageName: "zucche-cassetta-verde.jpg", alt: "Zucche nella cassetta verde Farina", category: "Zucche" },
  { imageName: "zucche-mantovane.jpg", alt: "Zucche mantovane con marchio Farina", category: "Zucche" },
  { imageName: "zucche-mantovane-scatola.jpg", alt: "Zucche mantovane confezionate in scatola", category: "Zucche" },
  { imageName: "zucche-butternut.jpg", alt: "Zucche butternut", category: "Zucche" },
  { imageName: "zucche-tonde.jpg", alt: "Zucche tonde selezionate", category: "Zucche" },
  { imageName: "zucche-violina.jpg", alt: "Zucche violina", category: "Zucche" },
  { imageName: "zucche-cassone.jpg", alt: "Zucche in cassone di legno", category: "Zucche" },
  { imageName: "zucche-halloween.jpg", alt: "Zucche Halloween in rete", category: "Zucche" },
  { imageName: "zucche-halloween-pallet.jpg", alt: "Zucche Halloween su pallet pronte per la spedizione", category: "Zucche" },
  { imageName: "zucche-halloween-espositore.jpg", alt: "Espositore zucche Halloween", category: "Zucche" },
  // Legna
  { imageName: "legna-originale.jpg", alt: "Legna da ardere tagliata e pronta", category: "Legna" },
  
  { imageName: "legna-cumuli.jpg", alt: "Cumuli di legna nel piazzale aziendale", category: "Legna" },
  { imageName: "legna-tronchi.jpg", alt: "Tronchi e legna da lavorare", category: "Legna" },
  // Azienda
  { imageName: "azienda-aerea.jpg", alt: "Vista aerea dell'azienda agricola Farina", category: "Azienda" },
  { imageName: "camion-farina.jpg", alt: "Camion aziendale Farina R.", category: "Azienda" },
  { imageName: "magazzino-esterno.jpg", alt: "Magazzino e piazzale aziendale", category: "Azienda" },
  { imageName: "logo-farina.jpg", alt: "Logo ufficiale Az. Agricola Farina R.", category: "Azienda" },
  { imageName: "premio-qualita.jpg", alt: "Premio qualità ricevuto dall'azienda", category: "Azienda" },
  { imageName: "premio-fiera.jpg", alt: "Riconoscimento in fiera", category: "Azienda" },
];

const Galleria = () => {
  const [filter, setFilter] = useState<Category>("Tutte");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "Tutte" ? images : images.filter((img) => img.category === filter);
  const currentFilteredIndex = lightbox === null
    ? -1
    : filtered.findIndex((img) => images.indexOf(img) === lightbox);

  const moveLightbox = (direction: 1 | -1) => {
    if (lightbox === null || currentFilteredIndex < 0) return;

    const nextFilteredIndex = (currentFilteredIndex + direction + filtered.length) % filtered.length;
    setLightbox(images.indexOf(filtered[nextFilteredIndex]));
  };

  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    moveLightbox(1);
  };

  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    moveLightbox(-1);
  };

  useEffect(() => {
    if (lightbox === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      } else if (event.key === "ArrowRight") {
        if (currentFilteredIndex < 0) return;
        const nextFilteredIndex = (currentFilteredIndex + 1) % filtered.length;
        setLightbox(images.indexOf(filtered[nextFilteredIndex]));
      } else if (event.key === "ArrowLeft") {
        if (currentFilteredIndex < 0) return;
        const prevFilteredIndex = (currentFilteredIndex - 1 + filtered.length) % filtered.length;
        setLightbox(images.indexOf(filtered[prevFilteredIndex]));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentFilteredIndex, filtered, lightbox]);

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Galleria — Le Nostre Coltivazioni nel Ferrarese"
        description="Galleria fotografica originale della Società Agricola Farina 2.0: campi, raccolto e prodotti tra Argenta e Portomaggiore (FE)."
        path="/galleria"
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Galleria</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
              Scopri i nostri prodotti e la nostra azienda attraverso le immagini
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid + Instagram */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((img, i) => (
                  <ScrollReveal key={img.imageName + filter} delay={i * 60}>
                    <button
                      onClick={() => setLightbox(images.indexOf(img))}
                      aria-label={`Apri foto: ${img.alt}`}
                      className="group relative w-full overflow-hidden rounded-xl aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <SiteImage
                        imageName={img.imageName}
                        alt={img.alt}
                        loading="lazy"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-left">
                          <span className="text-xs font-medium text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {img.category}
                          </span>
                          <p className="text-white text-sm font-medium mt-1">{img.alt}</p>
                        </div>
                      </div>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <aside className="mt-10 lg:mt-0">
              <div className="space-y-6 lg:sticky lg:top-24">
                <FacebookPagePanel />
                <InstagramFeedPanel />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            aria-label="Chiudi"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
            aria-label="Precedente"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
            aria-label="Successiva"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <SiteImage
            imageName={images[lightbox].imageName}
            alt={images[lightbox].alt}
            sizes="90vw"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-white/80 text-sm text-center">
            {images[lightbox].alt} — {currentFilteredIndex + 1}/{filtered.length}
          </p>
        </div>
      )}

      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};

export default Galleria;
