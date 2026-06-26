export const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/soc.agr.farina@gmail.com";
export const MIN_SUBMIT_DELAY_MS = 3000;
export const SUBMIT_COOLDOWN_MS = 15000;

const blacklistedTerms = [
  "<a href=",
  "[url=",
  "bit.ly/",
  "tinyurl.com/",
  "t.me/",
  "viagra",
  "casino",
  "cbd gummies",
  "crypto giveaway",
  "guest post",
  "backlinks",
  "seo service",
  "payday loan",
];

export const FORM_SUBMIT_BLACKLIST = blacklistedTerms.join(", ");

export function getFormSubmitErrorMessage(message?: string) {
  const normalizedMessage = message?.toLowerCase() ?? "";

  if (normalizedMessage.includes("activation")) {
    return "Il servizio di invio non è ancora attivo: apri l'email di attivazione inviata da FormSubmit a soc.agr.farina@gmail.com, poi riprova.";
  }

  if (normalizedMessage.includes("web server")) {
    return "Il modulo funziona solo dal sito pubblicato. Se stai testando una copia locale, avvia il server di sviluppo.";
  }

  return "Riprova tra poco oppure contattaci telefonicamente.";
}

export function getHoneypotValue(formElement?: HTMLFormElement | null) {
  if (!formElement) {
    return "";
  }

  const formData = new FormData(formElement);
  return String(formData.get("_honey") ?? "").trim();
}

export function hasBlacklistedContent(values: Array<string | undefined>) {
  const searchableText = values
    .filter(Boolean)
    .join("\n")
    .toLowerCase();

  return blacklistedTerms.some((term) => searchableText.includes(term));
}
