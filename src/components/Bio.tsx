import { content } from "@/data/content";
import Reveal from "./Reveal";
import SmartImg from "./SmartImg";

export default function Bio() {
  const { sectionTitle, photoUrl, paragraphs } = content.bio;

  return (
    <section id="historia" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Foto */}
        <Reveal className="order-1 lg:order-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <SmartImg
              src={photoUrl}
              alt="XXXTentacion"
              label="JAHSEH"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
              01
            </p>
            <h2 className="mb-6 font-display text-[clamp(2.25rem,8vw,3.75rem)] leading-none tracking-tightest sm:mb-8">
              {sectionTitle}
            </h2>
          </Reveal>
          <div className="space-y-5 text-[15px] leading-relaxed text-neutral-300 sm:text-base">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
