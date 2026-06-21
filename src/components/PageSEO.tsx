import { Helmet } from "react-helmet-async";
import { SITE_NAME, toAbsoluteUrl, toCanonicalPageUrl } from "@/lib/site";

interface PageSEOProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  robots?: string;
  jsonLd?: Record<string, unknown>;
}

const PageSEO = ({ title, description, path, type = "website", robots = "index, follow", jsonLd }: PageSEOProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = toCanonicalPageUrl(path);
  const ogImage = toAbsoluteUrl("/og-image.jpg");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="author" content={SITE_NAME} />
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default PageSEO;
