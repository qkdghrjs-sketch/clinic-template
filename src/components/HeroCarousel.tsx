"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { clinic, imageSet, phoneDisplay } from "@/lib/clinic";
import { handleReservation } from "@/utils/reservation";

interface SlideData {
  image: string;
  badgeEn: string;
  badgeKo: string;
  titleParts: { text: string; highlight?: boolean }[];
  subtitle: string;
  tagLabel: string;
  tags: string[];
  buttonText: string;
  buttonHref: string;
}

// [병원별 수정 필요] 메인 첫 화면 슬라이드 3장의 문구·태그
const slides: SlideData[] = [
  {
    image: imageSet.hero[0],
    badgeEn: "OUR CLINIC",
    badgeKo: "우리 동네 주치의",
    titleParts: [
      { text: "우리 동네 " },
      { text: clinic.shortName, highlight: true }
    ],
    subtitle: `${clinic.address} · ${clinic.slogan}`,
    tagLabel: "Location",
    tags: ["가까운 거리", "찾기 쉬운 위치", "우리 동네 주치의"],
    buttonText: "오시는 길 보기 →",
    buttonHref: "/about/location"
  },
  {
    image: imageSet.hero[1],
    badgeEn: "DOCTORS",
    badgeKo: "의료진",
    titleParts: [
      { text: "내과 " },
      { text: "전문의", highlight: true },
      { text: "가 직접 진료" }
    ],
    subtitle: "내과 진료 경험을 바탕으로, 동네에서 오래 함께할 진료를 이어갑니다.",
    tagLabel: "Medical Team",
    tags: ["내과 전문의", "건강검진", "내시경", "만성질환 관리"],
    buttonText: "의료진 소개 보기 →",
    buttonHref: "/doctors"
  },
  {
    image: imageSet.hero[2],
    badgeEn: "MAIN SERVICES",
    badgeKo: "진료안내",
    titleParts: [
      { text: "검진부터 " },
      { text: "내시경·만성질환", highlight: true },
      { text: "까지" }
    ],
    subtitle: "위·대장내시경, 건강검진, 고혈압·당뇨·고지혈증 관리를 가까운 곳에서 한 흐름으로 연결합니다.",
    tagLabel: "진료과목",
    tags: ["건강검진", "위내시경", "대장내시경", "고혈압", "당뇨", "고지혈증"],
    buttonText: "내시경센터 보기 →",
    buttonHref: "/endoscopy/stomach"
  }
];

function TitleLine({ parts }: { parts: { text: string; highlight?: boolean }[] }) {
  return (
    <>
      {parts.map((p, i) => p.highlight ? (
        <span key={i} className="text-sky-400" style={{ fontSize: "inherit" }}>{p.text}</span>
      ) : (
        <span key={i} className="text-white" style={{ fontSize: "inherit" }}>{p.text}</span>
      ))}
    </>
  );
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [current, isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative hero-responsive-height overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.badgeEn}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, transform: i === current ? "scale(1)" : "scale(1.05)", zIndex: i === current ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${s.image}')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-navy-900/30" />
        </div>
      ))}

      <div className="absolute inset-0 z-[2] opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />

      <div className="relative z-[3] h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-[22rem] min-[420px]:max-w-2xl lg:max-w-5xl mx-auto">
            <div key={`badge-${current}`} className="animate-fade-in-up mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 sm:px-5 sm:py-2">
                <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-xs sm:text-sm md:text-lg text-white/80 font-medium tracking-wider uppercase">{slide.badgeEn}</span>
                <span className="w-px h-3.5 md:h-5 bg-white/30" />
                <span className="text-xs sm:text-sm md:text-lg text-sky-300 font-medium">{slide.badgeKo}</span>
              </div>
            </div>

            <div key={`title-${current}`} className="animate-fade-in-up">
              <h1 className="text-[clamp(1.7rem,7vw,2.5rem)] sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 md:mb-5">
                <TitleLine parts={slide.titleParts} />
              </h1>
            </div>

            <div key={`sub-${current}`} className="animate-fade-in-up animation-delay-200">
              <p className="text-[13px] min-[380px]:text-sm sm:text-lg md:text-2xl text-gray-300/90 mb-4 md:mb-6 leading-relaxed">{slide.subtitle}</p>
            </div>

            <div key={`tags-${current}`} className="animate-fade-in-up animation-delay-400">
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-2.5 mb-6 md:mb-8">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-sky-500/20 text-sky-300 text-xs sm:text-sm md:text-base font-semibold border border-sky-400/30">{slide.tagLabel}</span>
                {slide.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-white/8 backdrop-blur-sm text-white/70 text-xs sm:text-sm md:text-base border border-white/10 hover:bg-sky-500/20 hover:text-sky-300 hover:border-sky-400/30 transition-all duration-300 cursor-default">{tag}</span>
                ))}
              </div>
            </div>

            <div key={`btn-${current}`} className="animate-fade-in-up animation-delay-600">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
                <Link href={slide.buttonHref} className="group w-full min-[420px]:w-auto inline-flex justify-center border-2 border-white/40 text-white font-semibold px-5 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 rounded-lg hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base md:text-lg whitespace-nowrap">
                  {slide.buttonText}
                </Link>
                <button onClick={handleReservation} className="w-full min-[420px]:w-auto bg-sky-500 text-white font-semibold px-5 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 rounded-lg hover:bg-sky-400 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-sky-500/25 hover:shadow-sky-400/30 text-xs sm:text-base md:text-lg cursor-pointer whitespace-nowrap">
                  {phoneDisplay}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={prev} className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300" aria-label="이전 슬라이드">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={next} className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300" aria-label="다음 슬라이드">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-[4] flex items-center gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`relative transition-all duration-300 ${i === current ? "w-10" : "w-3 hover:scale-125"} h-3 rounded-full`} aria-label={`슬라이드 ${i + 1}`}>
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${i === current ? "bg-sky-400 shadow-lg shadow-sky-400/30" : "bg-white/40 hover:bg-white/60"}`} />
            {i === current && <div className="absolute inset-0 rounded-full bg-white/30 origin-left" style={{ animation: "progressBar 4s linear infinite" }} />}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-[3]" />
      <style jsx>{`@keyframes progressBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </section>
  );
}
