import { readFile } from "node:fs/promises";
import path from "node:path";
import { sitePages } from "./site-pages.mjs";

const SITE_URL = (process.env.VITE_SITE_URL || "https://www.aziendaagricolafarina.com").replace(/\/+$/, "");
const REQUIRED_FAVICON_HREFS = [
  "/favicon.ico",
  "/favicon.png",
  "/favicon-48x48.png",
  "/apple-touch-icon.png",
  "/site.webmanifest",
];
const REQUIRED_FAVICON_ASSETS = [
  "public/favicon.ico",
  "public/favicon.png",
  "public/favicon-48x48.png",
  "public/favicon-96x96.png",
  "public/apple-touch-icon.png",
  "public/site.webmanifest",
];

function expectedUrl(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

function extractAttribute(tag, attribute) {
  const match = tag.match(new RegExp(`\\b${attribute}=["']([^"']+)["']`, "i"));
  return match?.[1] ?? null;
}

function findTag(html, predicate) {
  return html.match(/<(?:link|meta)\b[^>]*>/gi)?.find(predicate) ?? null;
}

function findTags(html, predicate) {
  return html.match(/<(?:link|meta)\b[^>]*>/gi)?.filter(predicate) ?? [];
}

function assert(condition, message) {
  if (!condition) throw new Error(`[seo] ${message}`);
}

async function checkHtml(filePath, page) {
  const html = await readFile(filePath, "utf8");
  const canonicalTag = findTag(
    html,
    (tag) => extractAttribute(tag, "rel")?.toLowerCase() === "canonical",
  );
  const robotsTag = findTag(
    html,
    (tag) => extractAttribute(tag, "name")?.toLowerCase() === "robots",
  );
  const canonical = canonicalTag ? extractAttribute(canonicalTag, "href") : null;
  const robots = robotsTag ? extractAttribute(robotsTag, "content")?.toLowerCase() : null;
  const expectedCanonical = expectedUrl(page.routePath);
  const linkHrefs = new Set(
    findTags(html, (tag) => tag.toLowerCase().startsWith("<link"))
      .map((tag) => extractAttribute(tag, "href"))
      .filter(Boolean),
  );

  assert(canonical === expectedCanonical, `${filePath} canonical is ${canonical || "missing"}; expected ${expectedCanonical}`);

  for (const href of REQUIRED_FAVICON_HREFS) {
    assert(linkHrefs.has(href), `${filePath} is missing favicon link ${href}`);
  }

  if (page.includeInSitemap === false) {
    assert(robots?.includes("noindex"), `${filePath} must be noindex because it is excluded from the sitemap`);
  } else {
    assert(!robots?.includes("noindex"), `${filePath} is in the sitemap but marked noindex`);
  }
}

const sitemapPath = path.resolve("public/sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapUrls = sitePages
  .filter((page) => page.includeInSitemap !== false)
  .map((page) => expectedUrl(page.routePath));

assert(
  JSON.stringify(sitemapUrls) === JSON.stringify(expectedSitemapUrls),
  `${sitemapPath} does not exactly match the canonical, indexable page list`,
);

for (const page of sitePages) {
  await checkHtml(path.resolve(page.htmlFile), page);
  await checkHtml(path.resolve("dist", page.htmlFile), page);
}

for (const asset of REQUIRED_FAVICON_ASSETS) {
  await readFile(path.resolve(asset));
}

console.log(`[seo] Verified ${expectedSitemapUrls.length} sitemap URLs and ${sitePages.length} canonical page contracts.`);
