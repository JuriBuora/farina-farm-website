import { useState } from "react";
import { Link } from "react-router-dom";
import SiteImage from "@/components/SiteImage";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Prodotti", href: "/prodotti" },
  { label: "Galleria", href: "/galleria" },
  { label: "Legna", href: "/legna" },
  { label: "Contatti", href: "/contatti" },
];

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16" />
    <path d="M4 6h16" />
    <path d="M4 18h16" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Vai alla home">
          <SiteImage
            imageName="logo-farina.png"
            alt="Logo Azienda Agricola Farina"
            width={64}
            height={48}
            sizes="64px"
            decoding="async"
            fetchPriority="high"
            className="h-12 w-16 rounded-full object-cover"
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="tel:+390532814411" className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors">
          <PhoneIcon className="w-4 h-4" />
          0532 814411
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 animate-fade-in">
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link to={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="tel:+390532814411" className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
            <PhoneIcon className="w-4 h-4" /> 0532 814411
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
