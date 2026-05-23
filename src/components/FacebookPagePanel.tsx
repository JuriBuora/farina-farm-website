import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const facebookPageUrl = "https://www.facebook.com/Azienda-Agricola-Farina-Roberto-1437905316493921/";
const facebookPluginPageUrl = "https://www.facebook.com/1437905316493921";
const facebookPluginUrl =
  "https://www.facebook.com/plugins/page.php" +
  `?href=${encodeURIComponent(facebookPluginPageUrl)}` +
  "&tabs=timeline" +
  "&width=340" +
  "&height=460" +
  "&small_header=false" +
  "&adapt_container_width=true" +
  "&hide_cover=false" +
  "&show_facepile=true";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.92 1.84-4.92 5.2v2.92H4.9v3.69h3.23V24h3.96v-7.14h3.1l.49-3.69h-3.59v-2.55c0-1.07.29-2.12 1.91-2.12Z" />
  </svg>
);

export default function FacebookPagePanel() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <FacebookIcon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-serif text-xl font-semibold text-foreground">Seguici su Facebook</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Aggiornamenti, foto dai campi e novità dell'azienda.
          </p>
        </div>
      </div>

      <div className="relative mt-5 h-[460px] overflow-hidden rounded-md border border-border bg-muted">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <FacebookIcon className="h-10 w-10 text-primary" />
          <p className="mt-4 text-sm font-semibold text-foreground">Soc.agricola Farina 2.0</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Produzione e vendita di angurie, meloni, zucche e legna da ardere.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Se l'anteprima non viene caricata, puoi aprire la pagina Facebook dal pulsante qui sotto.
          </p>
        </div>
        <iframe
          title="Pagina Facebook Azienda Agricola Farina"
          src={facebookPluginUrl}
          width="340"
          height="460"
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="relative z-10 block h-[460px] w-full border-0"
        />
      </div>

      <Button type="button" variant="outline" className="mt-4 w-full" asChild>
        <a href={facebookPageUrl} target="_blank" rel="noopener noreferrer">
          Apri Facebook
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
