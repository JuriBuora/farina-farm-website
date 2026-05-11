import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeferredClientChrome from "@/components/DeferredClientChrome";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileCTABar from "@/components/MobileCTABar";
import Index from "./pages/Index.tsx";

// Route-level code splitting keeps the initial JS bundle smaller and speeds up first load.
const Prodotti = lazy(() => import("./pages/Prodotti.tsx"));
const Contatti = lazy(() => import("./pages/Contatti.tsx"));
const Galleria = lazy(() => import("./pages/Galleria.tsx"));
const ChiSiamo = lazy(() => import("./pages/ChiSiamo.tsx"));
const Legna = lazy(() => import("./pages/Legna.tsx"));
const OrdinaLegna = lazy(() => import("./pages/OrdinaLegna.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const App = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
          Caricamento...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/prodotti" element={<Prodotti />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/galleria" element={<Galleria />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/legna" element={<Legna />} />
        <Route path="/ordina-legna-da-ardere" element={<OrdinaLegna />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <WhatsAppButton />
    <MobileCTABar />
    <DeferredClientChrome />
  </BrowserRouter>
);

export default App;
