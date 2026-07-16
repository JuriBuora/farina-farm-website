import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QR_DESTINATION } from "../../scripts/qr-redirect.mjs";

const readPublicFile = (filePath: string) => readFile(path.resolve(process.cwd(), "public", filePath), "utf8");

describe("printed QR redirect", () => {
  it("uses one fixed HTTPS campaign destination and no visitor-controlled redirect input", async () => {
    const script = await readPublicFile("qr/redirect.js");

    expect(QR_DESTINATION).toBe("https://www.aziendaagricolafarina.com/?utm_source=qr&utm_medium=offline&utm_campaign=azienda_farina_general");
    expect(script).toContain(`window.location.replace("${QR_DESTINATION}")`);
    expect(script).not.toMatch(/URLSearchParams|location\.search|[?&](url|redirect|destination|next)=/i);
  });

  it.each(["qr.html", "qr/index.html"])("provides the static fallback at /%s", async (filePath) => {
    const page = await readPublicFile(filePath);

    expect(page).toContain('src="/qr/redirect.js"');
    expect(page).toContain(QR_DESTINATION.replace(/&/g, "&amp;"));
  });
});
