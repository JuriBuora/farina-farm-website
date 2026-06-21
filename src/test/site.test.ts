import { describe, expect, it } from "vitest";
import { toCanonicalPageUrl } from "@/lib/site";

describe("toCanonicalPageUrl", () => {
  it("keeps the root page canonical URL stable", () => {
    expect(toCanonicalPageUrl("/")).toBe("https://www.aziendaagricolafarina.com/");
  });

  it("adds a trailing slash for directory-backed pages", () => {
    expect(toCanonicalPageUrl("/legna")).toBe("https://www.aziendaagricolafarina.com/legna/");
  });

  it("preserves hashes after the canonical trailing slash", () => {
    expect(toCanonicalPageUrl("/prodotti#angurie")).toBe("https://www.aziendaagricolafarina.com/prodotti/#angurie");
  });

  it("does not rewrite asset URLs", () => {
    expect(toCanonicalPageUrl("/og-image.jpg")).toBe("https://www.aziendaagricolafarina.com/og-image.jpg");
  });
});
