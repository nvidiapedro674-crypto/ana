"use client";

import { useState } from "react";

type SmartImgProps = {
  src?: string;
  alt: string;
  className?: string;
  /** Texto/letra mostrado dentro do placeholder quando não há imagem. */
  label?: string;
};

/**
 * <img> com fallback elegante: se a URL estiver vazia ou falhar ao carregar,
 * mostra um placeholder monocromático no lugar (nada quebra na tela).
 */
export default function SmartImg({ src, alt, className, label }: SmartImgProps) {
  const [failed, setFailed] = useState(false);
  const hasImage = !!src && !failed;

  if (hasImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={className}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 ${className ?? ""}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <span className="font-display text-4xl leading-none text-neutral-700 sm:text-5xl">
          {label ?? "XXX"}
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600">
          adicione uma foto
        </span>
      </div>
    </div>
  );
}
