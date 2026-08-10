"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { TourImage } from "@/lib/clinic";

export default function TourGallery({ items, priorityCount = 3 }: { items: TourImage[]; priorityCount?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const move = useCallback(
    (step: number) => setOpenIndex((prev) => (prev === null ? prev : (prev + step + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, move]);

  const current = openIndex === null ? null : items[openIndex];

  return (
    <>
      <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#4A90D9] hover:shadow-[0_16px_34px_rgba(26,58,108,0.12)]"
              aria-label={`${item.title} 사진 크게 보기`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F7FB]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  priority={i < priorityCount}
                  sizes="(max-width: 419px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black tracking-[-0.02em] text-[#1A3A6C] backdrop-blur-sm sm:text-[12px]">
                  {item.title}
                </span>
              </div>
              <p className="px-4 py-3.5 text-[13px] leading-6 text-[#666] sm:px-5 sm:text-[13.5px]">{item.desc}</p>
            </button>
          </li>
        ))}
      </ul>

      {current && openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-3 sm:p-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} 사진`}
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            aria-label="닫기"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full max-w-[1200px]" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black sm:rounded-2xl">
              <Image
                src={current.src}
                alt={current.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-white">
              <div className="min-w-0">
                <p className="text-[15px] font-black tracking-[-0.03em] sm:text-[18px]">{current.title}</p>
                <p className="mt-1 text-[12.5px] leading-6 text-white/65 sm:text-[14px]">{current.desc}</p>
              </div>
              <span className="shrink-0 text-[12px] font-bold text-white/50 sm:text-[13px]">
                {openIndex + 1} / {items.length}
              </span>
            </div>
          </div>

          <NavButton side="left" onClick={() => move(-1)} />
          <NavButton side="right" onClick={() => move(1)} />
        </div>
      )}
    </>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const isLeft = side === "left";
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`absolute top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:h-14 sm:w-14 ${isLeft ? "left-2 sm:left-6" : "right-2 sm:right-6"}`}
      aria-label={isLeft ? "이전 사진" : "다음 사진"}
    >
      <svg className="h-5 w-5 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
