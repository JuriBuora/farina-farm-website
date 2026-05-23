import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { sitePages } from "./site-pages.mjs";

const DEFAULT_SITE_URL = "https://www.aziendaagricolafarina.com";
const OUTPUT_PATH = path.resolve("public/sitemap.xml");

function stripTrailingSlashes(url) {
  return url.replace(/\/+$/, "");
}

function getSiteUrl() {
  return stripTrailingSlashes(process.env.VITE_SITE_URL || DEFAULT_SITE_URL);
}

function renderSitemapXml() {
  const siteUrl = getSiteUrl();
  const urls = sitePages.map((page) => {
    const loc = page.routePath === "/" ? `${siteUrl}/` : `${siteUrl}${page.routePath}`;
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}

async function writeIfChanged(filePath, nextContents) {
  let currentContents = null;
  try {
    currentContents = await readFile(filePath, "utf8");
  } catch {
    currentContents = null;
  }

  if (currentContents === nextContents) return false;

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, nextContents, "utf8");
  return true;
}

const didWrite = await writeIfChanged(OUTPUT_PATH, renderSitemapXml());
console.log(didWrite ? `[sitemap] Updated ${OUTPUT_PATH}` : `[sitemap] No changes for ${OUTPUT_PATH}`);
