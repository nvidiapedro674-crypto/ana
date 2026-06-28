import { content } from "@/data/content";
import Reveal from "./Reveal";

export default function Legacy() {
  const { sectionTitle, text, stats } = content.legacy;

  return (
    <section
      id="legado"
      className="border-y border-white/10 bg-neutral-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
              04
            </p>
            <h2 className="mb-6 font-display text-[clamp(2.25rem,8vw,3.75rem)] leading-none tracking-tightest sm:mb-8">
              {sectionTitle}
            </h2>
            <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">
              {text}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} className="text-center">
              <p className="font-display text-3xl tracking-tight text-paper sm:text-5xl">
                {stat.value}
              </p>
              <p className="mx-auto mt-2 max-w-[12rem] text-[10px] uppercase tracking-[0.12em] text-neutral-500 sm:mt-3 sm:text-xs sm:tracking-[0.15em]">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
