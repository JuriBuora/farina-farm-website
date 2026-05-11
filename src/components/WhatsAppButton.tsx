const WhatsAppButton = () => (
  <a
    href="https://wa.me/+393667701214"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contattaci su WhatsApp"
    className="fixed bottom-6 right-6 z-50 hidden md:flex w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-[hsl(0,0%,100%)] shadow-lg hover:shadow-xl flex items-center justify-center transition-transform duration-200 hover:scale-110"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.9-.9L3 21l1.7-5.3a8.5 8.5 0 1 1 16.3-4.2Z" />
      <path d="M8.5 9.5c.2 3.1 2.9 5.5 6 6" />
    </svg>
  </a>
);

export default WhatsAppButton;
