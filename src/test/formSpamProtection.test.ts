import { describe, expect, it } from "vitest";
import {
  FORM_SUBMIT_BLACKLIST,
  getFormSubmitErrorMessage,
  getHoneypotValue,
  hasBlacklistedContent,
} from "@/lib/formSpamProtection";

describe("form spam protection", () => {
  it("exports a blacklist for FormSubmit", () => {
    expect(FORM_SUBMIT_BLACKLIST).toContain("bit.ly/");
    expect(FORM_SUBMIT_BLACKLIST).toContain("seo service");
  });

  it("detects blacklisted content locally", () => {
    expect(hasBlacklistedContent(["Vorrei comprare legna", "https://bit.ly/spam"])).toBe(true);
    expect(hasBlacklistedContent(["Richiedo consegna legna a Ferrara"])).toBe(false);
  });

  it("reads the hidden honeypot value from a form", () => {
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.name = "_honey";
    input.value = "bot-filled";
    form.append(input);

    expect(getHoneypotValue(form)).toBe("bot-filled");
  });

  it("maps FormSubmit activation and local server errors", () => {
    expect(getFormSubmitErrorMessage("Activation required")).toContain("email di attivazione");
    expect(getFormSubmitErrorMessage("web server unavailable")).toContain("sito pubblicato");
    expect(getFormSubmitErrorMessage("other")).toContain("Riprova");
  });
});
