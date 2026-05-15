import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import InstagramProfileCard from "@/components/InstagramProfileCard";

interface InstagramPost {
  id: string;
  caption?: string;
  mediaType: string;
  permalink: string;
  timestamp?: string | null;
  imageSrc: string;
}

interface InstagramFeed {
  generatedAt: string | null;
  profileUrl: string;
  posts: InstagramPost[];
}

const fallbackProfileUrl = "https://instagram.com/soc.agr.farina_2.0";

const formatDate = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export default function InstagramFeedPanel() {
  const [feed, setFeed] = useState<InstagramFeed | null>(null);

  useEffect(() => {
    const hourBucket = Math.floor(Date.now() / 3_600_000);

    fetch(`/instagram-feed.json?v=${hourBucket}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: InstagramFeed | null) => setFeed(payload))
      .catch(() => setFeed(null));
  }, []);

  const posts = feed?.posts?.slice(0, 3) ?? [];

  if (posts.length === 0) {
    return <InstagramProfileCard profileUrl={fallbackProfileUrl} profileName="Società Agricola Farina 2.0" />;
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground">Ultimi post su Instagram</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Dalla pagina ufficiale @soc.agr.farina_2.0.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {posts.map((post) => {
          const date = formatDate(post.timestamp);
          const label = post.mediaType === "VIDEO" || post.mediaType === "REELS" ? "Video" : "Post";

          return (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-md border border-border bg-background transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={post.imageSrc}
                  alt={post.caption || "Post Instagram della Società Agricola Farina 2.0"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
                  {label}
                </span>
              </div>
              <div className="p-3">
                {date && <p className="text-xs font-medium uppercase tracking-wide text-primary">{date}</p>}
                {post.caption && (
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.caption}
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>

      <Button type="button" variant="outline" className="mt-4 w-full" asChild>
        <a href={feed?.profileUrl || fallbackProfileUrl} target="_blank" rel="noopener noreferrer">
          Apri Instagram
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
