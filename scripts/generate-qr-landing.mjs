import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { QR_DESTINATION } from "./qr-redirect.mjs";

const outputDir = path.resolve("public/qr");
const escapedDestination = QR_DESTINATION.replace(/&/g, "&amp;");

const redirectScript = `// Generated from scripts/qr-redirect.mjs. Do not accept visitor-supplied destinations.\nwindow.location.replace(${JSON.stringify(QR_DESTINATION)});\n`;
const redirectPage = `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Reindirizzamento | Azienda Agricola Farina</title>
    <script src="/qr/redirect.js"></script>
  </head>
  <body>
    <p>Reindirizzamento alla <a href="${escapedDestination}">pagina iniziale</a>…</p>
  </body>
</html>
`;

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDir, "redirect.js"), redirectScript, "utf8"),
  writeFile(path.join(outputDir, "index.html"), redirectPage, "utf8"),
  // GitHub Pages may resolve an extensionless HTML file before its directory index.
  // Keep this companion file so both /qr and /qr/ have a static entry point.
  writeFile(path.resolve("public/qr.html"), redirectPage, "utf8"),
]);

console.log("[qr] Generated static QR landing pages.");
