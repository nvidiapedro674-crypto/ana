import { content } from "@/data/content";
import Reveal from "./Reveal";

export default function Songs() {
  const { sectionTitle, list } = content.songs;

  return (
    <section id="musicas" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
          03
        </p>
        <h2 className="mb-8 font-display text-[clamp(2.25rem,8vw,3.75rem)] leading-none tracking-tightest sm:mb-12">
          {sectionTitle}
        </h2>
      </Reveal>

      <ul className="divide-y divide-white/10 border-y border-white/10">
        {list.map((song, i) => (
          <Reveal as="li" key={song.title} delay={i * 60}>
            <div className="group grid grid-cols-[2.5rem_1fr] items-start gap-3 py-5 transition-colors duration-300 hover:bg-white/[0.03] sm:grid-cols-[3rem_14rem_1fr] sm:items-center sm:gap-8 sm:px-2 sm:py-6">
              <span className="font-display text-lg text-neutral-600 group-hover:text-paper sm:text-2xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl tracking-tight sm:text-3xl">
                {song.title}
              </h3>
              <p className="col-span-2 text-xs leading-relaxed text-neutral-400 sm:col-span-1 sm:text-sm">
                {song.note}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
