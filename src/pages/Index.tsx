import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PageSEO from "@/components/PageSEO";
import HomeBelowFold from "@/components/HomeBelowFold";

const Index = () => (
  <>
    <PageSEO
      title="Azienda Agricola a Bando di Argenta (FE)"
      description="Società Agricola Farina 2.0 produce e vende angurie, meloni e zucche a Bando di Argenta (FE), all’ingrosso e al dettaglio, e fornisce legna da ardere."
      path="/"
    />
    <Navbar />
    <HeroSection />
    <HomeBelowFold />
  </>
);

export default Index;
