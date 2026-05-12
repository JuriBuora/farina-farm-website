import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PageSEO from "@/components/PageSEO";
import HomeBelowFold from "@/components/HomeBelowFold";

const Index = () => (
  <>
    <PageSEO
      title="Azienda Agricola a Bando di Argenta (FE)"
      description="Società Agricola Farina 2.0 a Bando di Argenta (FE): angurie, meloni e zucche all’ingrosso e al dettaglio, e legna da ardere nel ferrarese."
      path="/"
    />
    <Navbar />
    <HeroSection />
    <HomeBelowFold />
  </>
);

export default Index;
