import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const accountId = process.env.INSTAGRAM_ACCOUNT_ID?.trim();
const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
const apiVersion = process.env.INSTAGRAM_API_VERSION?.trim() || "v24.0";
const limit = Number.parseInt(process.env.INSTAGRAM_FEED_LIMIT || "6", 10);

const feedPath = path.resolve("public/instagram-feed.json");
const mediaDir = path.resolve("public/instagram");
const profileUrl = "https://instagram.com/soc.agr.farina_2.0";

const emptyFeed = {
  generatedAt: null,
  profileUrl,
  posts: [],
};

const ensureFallbackFeed = async () => {
  await mkdir(path.dirname(feedPath), { recursive: true });
  if (!existsSync(feedPath)) {
    await writeFile(feedPath, `${JSON.stringify(emptyFeed, null, 2)}\n`);
  }
};

const extensionFromContentType = (contentType) => {
  if (contentType.includes("image/png")) return "png";
  if (contentType.includes("image/webp")) return "webp";
  return "jpg";
};

const trimCaption = (caption = "") => {
  const normalized = caption.replace(/\s+/g, " ").trim();
  return normalized.length > 180 ? `${normalized.slice(0, 177).trim()}...` : normalized;
};

if (!accountId || !accessToken) {
  await ensureFallbackFeed();
  console.log("[instagram] Missing INSTAGRAM_ACCOUNT_ID or INSTAGRAM_ACCESS_TOKEN; keeping fallback feed.");
  process.exit(0);
}

const fields = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
].join(",");

const mediaUrl = new URL(`https://graph.facebook.com/${apiVersion}/${accountId}/media`);
mediaUrl.searchParams.set("fields", fields);
mediaUrl.searchParams.set("limit", String(Number.isFinite(limit) ? limit : 6));
mediaUrl.searchParams.set("access_token", accessToken);

const mediaResponse = await fetch(mediaUrl);
if (!mediaResponse.ok) {
  const errorBody = await mediaResponse.text();
  throw new Error(`[instagram] Meta API request failed: ${mediaResponse.status} ${errorBody}`);
}

const mediaPayload = await mediaResponse.json();
const mediaItems = Array.isArray(mediaPayload.data) ? mediaPayload.data : [];

await rm(mediaDir, { recursive: true, force: true });
await mkdir(mediaDir, { recursive: true });

const posts = [];

for (const item of mediaItems) {
  const imageUrl = item.thumbnail_url || item.media_url;
  if (!item.id || !imageUrl || !item.permalink) continue;

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    console.warn(`[instagram] Skipping ${item.id}: image request failed with ${imageResponse.status}`);
    continue;
  }

  const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
  const extension = extensionFromContentType(contentType);
  const safeId = String(item.id).replace(/[^a-zA-Z0-9_-]/g, "");
  const filename = `${safeId}.${extension}`;
  const outputPath = path.join(mediaDir, filename);

  await writeFile(outputPath, Buffer.from(await imageResponse.arrayBuffer()));

  posts.push({
    id: item.id,
    caption: trimCaption(item.caption),
    mediaType: item.media_type || "IMAGE",
    permalink: item.permalink,
    timestamp: item.timestamp || null,
    imageSrc: `/instagram/${filename}`,
  });
}

await writeFile(
  feedPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      profileUrl,
      posts,
    },
    null,
    2,
  )}\n`,
);

console.log(`[instagram] Synced ${posts.length} post(s) to ${feedPath}.`);
