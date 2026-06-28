import { content } from "@/data/content";
import Reveal from "./Reveal";

export default function Credits() {
  const { label, names } = content.credits;

  return (
    <section
      id="creditos"
      className="relative overflow-hidden border-t border-white/10 bg-ink py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,245,244,0.06)_0%,_transparent_70%)]"
        aria-hidden
      />

      <Reveal className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-6 py-10 text-center shadow-[0_0_60px_rgba(245,245,244,0.04)] sm:rounded-3xl sm:px-12 sm:py-14">
          <p className="text-[10px] uppercase tracking-[0.45em] text-neutral-500 sm:text-xs">
            {label}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <p className="font-display text-[clamp(2.5rem,12vw,5.5rem)] leading-[0.9] tracking-tightest text-paper">
              {names[0]}
            </p>
            <span
              className="font-display text-2xl tracking-tight text-neutral-500 sm:text-3xl"
              aria-hidden
            >
              &
            </span>
            <p className="font-display text-[clamp(2rem,10vw,4.5rem)] leading-[0.9] tracking-tightest text-paper">
              {names[1]}
            </p>
          </div>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3 sm:mt-10">
            <span className="h-px w-10 bg-neutral-600 sm:w-16" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500">
              tributo digital
            </span>
            <span className="h-px w-10 bg-neutral-600 sm:w-16" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
