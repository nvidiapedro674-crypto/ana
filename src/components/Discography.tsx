import { content } from "@/data/content";
import Reveal from "./Reveal";
import SmartImg from "./SmartImg";

export default function Discography() {
  const { sectionTitle, albums } = content.discography;

  return (
    <section
      id="discografia"
      className="border-t border-white/10 bg-neutral-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
            02
          </p>
          <h2 className="mb-8 font-display text-[clamp(2.25rem,8vw,3.75rem)] leading-none tracking-tightest sm:mb-12">
            {sectionTitle}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {albums.map((album, i) => (
            <Reveal key={album.title} delay={i * 90}>
              <article className="group">
                <div className="relative aspect-square w-full overflow-hidden">
                  <SmartImg
                    src={album.coverUrl}
                    alt={`Capa do álbum ${album.title}`}
                    label={album.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-4">
                  <h3 className="font-display text-lg tracking-tight sm:text-2xl">
                    {album.title}
                  </h3>
                  <span className="text-xs text-neutral-500">{album.year}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                  {album.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
