import { content } from "@/data/content";
import Reveal from "./Reveal";
import SmartImg from "./SmartImg";

export default function Gallery() {
  const { sectionTitle, photos } = content.gallery;

  return (
    <section id="galeria" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
          05
        </p>
        <h2 className="mb-8 font-display text-[clamp(2.25rem,8vw,3.75rem)] leading-none tracking-tightest sm:mb-12">
          {sectionTitle}
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((url, i) => (
          <Reveal
            key={i}
            delay={(i % 3) * 80}
            className={i % 5 === 0 ? "col-span-2 sm:col-span-1" : ""}
          >
            <div className="group relative aspect-square w-full overflow-hidden">
              <SmartImg
                src={url}
                alt={`Foto ${i + 1} de XXXTentacion`}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
