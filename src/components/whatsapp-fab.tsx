import { site, waLink } from "@/lib/site";

export function WhatsappFab() {
  return (
    <a
      href={waLink(
        "Hi SIJ Fragrances! I'd like to order / know more about your perfumes. Could you help me choose?",
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#1fa855] py-3 pl-3 pr-4 text-white shadow-[0_10px_40px_rgba(31,168,85,0.35)] transition hover:bg-[#189c4c]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z" />
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
      </svg>
      <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] sm:block">
        Order on WhatsApp
      </span>
      <span className="sr-only">{site.phoneDisplay}</span>
    </a>
  );
}
