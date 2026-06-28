import { content } from "@/data/content";
import Reveal from "./Reveal";

export default function Footer() {
  const { line, years, disclaimer } = content.footer;
  const hasDisclaimer = disclaimer?.trim().length > 0;

  return (
    <footer className="bg-ink py-14 sm:py-20">
      <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        <p className="font-display text-[clamp(2.5rem,10vw,6rem)] leading-none tracking-tightest text-paper">
          {line}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6 sm:gap-4">
          <span className="h-px w-8 bg-neutral-700 sm:w-12" />
          <p className="text-xs tracking-[0.25em] text-neutral-400 sm:text-sm sm:tracking-[0.3em]">
            {years}
          </p>
          <span className="h-px w-8 bg-neutral-700 sm:w-12" />
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-neutral-500 sm:mt-10 sm:gap-x-6 sm:text-[11px] sm:tracking-[0.2em]">
          {content.nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-paper">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {hasDisclaimer ? (
          <p className="mx-auto mt-8 max-w-xl text-[11px] leading-relaxed text-neutral-600 sm:mt-12 sm:text-xs">
            {disclaimer}
          </p>
        ) : null}
      </Reveal>
    </footer>
  );
}
