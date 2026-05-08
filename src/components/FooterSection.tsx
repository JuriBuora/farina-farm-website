import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SiteImage from "@/components/SiteImage";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.92 1.84-4.92 5.2v2.92H4.9v3.69h3.23V24h3.96v-7.14h3.1l.49-3.69h-3.59v-2.55c0-1.07.29-2.12 1.91-2.12Z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FooterSection = () => (
  <footer id="contatti" className="bg-primary text-primary-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="bg-white rounded-lg p-2 w-fit mb-4">
            <SiteImage
              imageName="logo-farina.png"
              alt="Logo Azienda Agricola Farina"
              width={256}
              height={185}
              decoding="async"
              className="h-14 w-auto"
            />
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
            Coltiviamo angurie, meloni e zucche all'ingrosso e forniamo legna da ardere
            con consegna nel ferrarese, tra Argenta e Portomaggiore. Dal 1975.
          </p>
          <div className="flex gap-3">
            <a href="https://facebook.com/Azienda-Agricola-Farina-Roberto-100057542707078" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/soc.agr.farina_2.0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="https://wa.me/+393667701214" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h4 className="font-serif text-lg font-semibold mb-4">Contatti</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
              <a href="https://maps.google.com/?q=Via+Rangona+54/A+44015+Bando+di+Argenta+FE" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">Via Rangona, 54/A — 44015 Bando di Argenta (FE)</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 shrink-0 text-secondary" />
              <a href="tel:+390532814411" className="hover:text-primary-foreground transition-colors">+39 0532 814411</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 shrink-0 text-secondary" />
              <a href="tel:+393381571439" className="hover:text-primary-foreground transition-colors">+39 338 1571439</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 shrink-0 text-secondary" />
              <a href="mailto:soc.agr.farina@gmail.com" className="hover:text-primary-foreground transition-colors">soc.agr.farina@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-serif text-lg font-semibold mb-4">Orari di Apertura</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li className="flex justify-between"><span>Lunedì - Venerdì</span><span>08:30 – 12:00 / 13:30 – 18:00</span></li>
            <li className="flex justify-between"><span>Sabato</span><span>08:00 – 12:00</span></li>
            <li className="flex justify-between"><span>Domenica</span><span className="text-accent">Chiuso</span></li>
          </ul>
        </div>
      </div>

      {/* Legal block */}
      <div className="border-t border-primary-foreground/10 pt-6 space-y-3 text-xs text-primary-foreground/60">
        <p className="leading-relaxed">
          <strong className="text-primary-foreground/80">Società Agricola Farina 2.0</strong> · Via Rangona 54/A, 44015 Bando di Argenta (FE) ·
          P.IVA 02179460387 · Tel. +39 0532 814411 · Email: soc.agr.farina@gmail.com
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link>
            <Link to="/chi-siamo" className="hover:text-primary-foreground transition-colors">Chi Siamo</Link>
            <Link to="/contatti" className="hover:text-primary-foreground transition-colors">Contatti</Link>
          </div>
          <p>© {new Date().getFullYear()} Società Agricola Farina 2.0 — Tutti i diritti riservati</p>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
