import { content } from "@/data/content";
import SmartImg from "./SmartImg";

export default function Hero() {
  const { name, realName, years, tagline, backgroundUrl } = content.hero;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Foto de fundo */}
      <SmartImg
        src={backgroundUrl}
        alt={`Foto de ${name}`}
        label="XXX"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlays para legibilidade e clima monocromático */}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-5">
        <p className="mb-4 animate-fade-up text-[10px] uppercase tracking-[0.3em] text-neutral-300 sm:mb-5 sm:text-xs sm:tracking-[0.4em]">
          {realName}
        </p>
        <h1 className="animate-fade-up break-words font-display text-[clamp(2.75rem,16vw,12rem)] leading-[0.85] tracking-tightest text-paper">
          {name}
        </h1>
        <div className="mt-6 flex animate-fade-up items-center justify-center gap-4">
          <span className="h-px w-10 bg-neutral-500" />
          <p className="text-base font-light tracking-[0.3em] text-neutral-200 sm:text-lg">
            {years}
          </p>
          <span className="h-px w-10 bg-neutral-500" />
        </div>
        <p className="mx-auto mt-6 max-w-md animate-fade-up text-sm text-neutral-400 sm:text-base">
          {tagline}
        </p>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#historia"
        aria-label="Rolar para a história"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <svg
          className="h-6 w-6 animate-bounce-slow text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </a>
    </section>
  );
}
