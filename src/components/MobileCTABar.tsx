const MobileCTABar = () => (
  <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 text-xs font-semibold shadow-[0_-8px_24px_rgba(0,0,0,0.12)] backdrop-blur md:hidden pb-[env(safe-area-inset-bottom)]">
    <a
      href="tel:+390532814411"
      className="flex min-h-14 flex-col items-center justify-center gap-1 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Chiama Azienda Agricola Farina"
    >
      <span aria-hidden="true">☎</span>
      <span>Chiama</span>
    </a>
    <a
      href="https://wa.me/+393667701214"
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-14 flex-col items-center justify-center gap-1 border-x border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Scrivi su WhatsApp ad Azienda Agricola Farina"
    >
      <span aria-hidden="true">●</span>
      <span>WhatsApp</span>
    </a>
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=Via%20Rangona%2054%2FA%2C%2044011%20Bando%20di%20Argenta%20FE"
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-14 flex-col items-center justify-center gap-1 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Apri indicazioni stradali verso Azienda Agricola Farina"
    >
      <span aria-hidden="true">⌖</span>
      <span>Indicazioni</span>
    </a>
  </div>
);

export default MobileCTABar;
