import { content } from "@/data/content";
import Reveal from "./Reveal";

export default function Quote() {
  const { text, author } = content.quote;

  return (
    <section className="border-y border-white/10 bg-paper py-16 text-ink sm:py-24 lg:py-32">
      <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        <p className="font-display text-[clamp(1.35rem,5vw,3.75rem)] leading-snug tracking-tight sm:leading-tight">
          {text}
        </p>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-neutral-500">
          {author}
        </p>
      </Reveal>
    </section>
  );
}
