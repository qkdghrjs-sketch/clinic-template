"use client";

import { useEffect, useRef, useState } from "react";
import { clinic, imageSet } from "@/lib/clinic";

const features = [
  "내과전문의\n진료",
  "소화기내시경\n세부전문의",
  "대학병원 수련\n진료 경험",
  "위·대장내시경\n정밀 검사",
  "검사 후\n추적 관리",
  "감염관리\n표준화"
];

const particles = [
  { left: 8, top: 18, size: 4, delay: 0.1, duration: 8 },
  { left: 16, top: 72, size: 6, delay: 1.4, duration: 11 },
  { left: 22, top: 42, size: 5, delay: 2.2, duration: 9 },
  { left: 31, top: 16, size: 4, delay: 3.1, duration: 12 },
  { left: 39, top: 83, size: 7, delay: 0.6, duration: 10 },
  { left: 46, top: 35, size: 5, delay: 4.2, duration: 13 },
  { left: 52, top: 64, size: 3, delay: 2.8, duration: 8 },
  { left: 58, top: 22, size: 6, delay: 1.1, duration: 12 },
  { left: 64, top: 76, size: 4, delay: 5.0, duration: 9 },
  { left: 70, top: 48, size: 7, delay: 3.7, duration: 11 },
  { left: 76, top: 26, size: 5, delay: 0.9, duration: 8 },
  { left: 82, top: 69, size: 6, delay: 2.5, duration: 10 },
  { left: 88, top: 40, size: 4, delay: 4.8, duration: 13 },
  { left: 94, top: 18, size: 5, delay: 1.9, duration: 9 },
  { left: 12, top: 55, size: 3, delay: 5.5, duration: 12 },
  { left: 28, top: 90, size: 4, delay: 6.2, duration: 10 },
  { left: 44, top: 12, size: 5, delay: 2.0, duration: 11 },
  { left: 61, top: 88, size: 6, delay: 3.4, duration: 9 },
  { left: 79, top: 12, size: 4, delay: 4.4, duration: 12 },
  { left: 92, top: 82, size: 5, delay: 6.8, duration: 10 }
];

export default function EndoscopyShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat endoscopy-ken-burns" style={{ backgroundImage: `url('${imageSet.endoscopy}')` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 via-transparent to-navy-900/70" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div key={i} className="endoscopy-particle" style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <p className="text-sky-300/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-5 font-medium">{clinic.englishName}</p>
        <p className="text-gray-300 text-base md:text-lg mb-4">편안한 설명과 정확한 검사 흐름을 지향합니다</p>
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-8 md:mb-16">
          전문 <span className="endoscopy-neon-text" style={{ fontSize: "inherit" }}>내시경</span> 센터
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {features.map((label, i) => (
            <div
              key={label}
              className={`group relative rounded-xl sm:rounded-2xl py-4 sm:py-7 px-2.5 sm:px-3 cursor-default transition-all duration-500 ease-out bg-white/[0.07] backdrop-blur-md border border-white/[0.12] hover:-translate-y-2 hover:bg-white/[0.14] hover:border-sky-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: isVisible ? `${i * 0.15}s` : "0s" }}
            >
              <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-sky-500/15 border border-sky-400/25 flex items-center justify-center mx-auto mb-2 sm:mb-4 text-sky-400 group-hover:bg-sky-400 group-hover:text-white group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-500">
                <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white text-xs sm:text-xl font-medium leading-snug whitespace-pre-line">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
