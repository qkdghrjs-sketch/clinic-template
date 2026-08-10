"use client";

import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import EndoscopyShowcase from "@/components/EndoscopyShowcase";
import WhySection from "@/components/WhySection";
import TourSection from "@/components/TourSection";
import { clinic, doctors, imageSet, serviceCards } from "@/lib/clinic";

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <section className="bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white text-base md:text-lg leading-relaxed">
            {/* [병원별 수정 필요] 지역명이 들어가는 한 줄 문구 */}
            가까운 곳에서 만나는 <strong className="font-bold text-white">우리 동네 주치의</strong>, {clinic.shortName}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {serviceCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div className="group relative rounded-2xl overflow-hidden h-48 min-[420px]:h-52 sm:h-72 cursor-default shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${card.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
                  <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-5">
                    <span className="inline-block bg-sky-500 text-white text-xs sm:text-base font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">{card.title}</span>
                    <div>
                      <p className="text-white text-sm sm:text-lg leading-snug sm:leading-relaxed font-medium mb-2 sm:mb-3 whitespace-pre-line">{card.desc}</p>
                      <Link href={card.href} className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-white border border-white/50 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-white hover:text-sky-600 transition-all duration-300">
                        더보기 <span className="text-xs">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <EndoscopyShowcase />


      <section className="relative w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${imageSet.equipment}')` }} />
        <div className="absolute inset-0 bg-navy-900/75" />
        <div className="relative z-10 w-full py-12 md:py-24 px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-16">
              <span className="inline-block bg-sky-500 text-white text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-wider mb-3 sm:mb-4">PREMIUM MEDICAL DEVICE</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">프리미엄 장비를 통한 효과적인 진료</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 max-w-6xl mx-auto">
            <EquipmentColumn title="복부·갑상선 초음파" items={["증상과 검사 결과를 연결한 정밀 평가", "만성질환 관리와 연계", "불필요한 검사는 줄이고 필요한 검사는 정확하게"]} />
            {/* [병원별 수정 필요] 보유 장비/강점에 맞게 문구를 바꿔주세요 */}
            <EquipmentColumn title="위·대장내시경 시스템" items={["내시경 전문 진료", "검사 전후 설명과 추적 관리", "감염관리 프로세스 표준화"]} right />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-6 min-[420px]:gap-3 sm:gap-8 text-center">
            {[
              ["내과전문의 진료", "전문성과 안정감"],
              ["소화기내시경", "정확하고 편안한 검사"],
              ["우리 동네 주치의", "가까운 곳에서 꾸준히"]
            ].map(([title, desc], i) => (
              <ScrollReveal key={title} delay={i * 150}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center">
                    <svg className="w-10 h-10 sm:w-14 sm:h-14 text-navy-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div className="w-10 h-px bg-navy-200 mb-3 sm:mb-4" />
                  <h3 className="text-sm sm:text-2xl font-bold text-navy-900 mb-1">{title}</h3>
                  <p className="text-gray-400 text-xs sm:text-lg">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50"><WhySection /></section>

      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest">Doctors</span>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-navy-900 mt-3">의료진</h2>
            </div>
          </ScrollReveal>
          <div className={`grid gap-4 ${doctors.length > 1 ? "md:grid-cols-2" : "max-w-xl mx-auto"}`}>
            {doctors.map((doctor, i) => (
              <ScrollReveal key={doctor.name} delay={i * 120}>
                <Link href="/doctors" className="block rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <p className="text-sky-600 font-bold text-sm mb-2">{doctor.role}</p>
                  <h3 className="text-2xl font-black text-navy-900">{doctor.name} 원장</h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{doctor.headline}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {doctor.badges.slice(0, 3).map((badge) => <span key={badge} className="rounded-full bg-navy-50 text-navy-700 px-3 py-1 text-xs font-bold">{badge}</span>)}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <ScrollReveal>
            <span className="inline-block rounded-full bg-sky-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-sky-300">
              {clinic.concept.eyebrow}
            </span>
            <h2 className="mt-5 text-xl font-black leading-snug text-white sm:text-3xl">
              {clinic.concept.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
              {clinic.concept.desc}
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {clinic.concept.points.map((point, i) => (
              <ScrollReveal key={point} delay={i * 120}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 px-5 py-6 text-sm font-semibold leading-relaxed text-white/85 sm:text-[15px]">
                  {point}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={360}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/about/location" className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-black text-navy-900 transition-all hover:-translate-y-0.5 hover:bg-sky-50 sm:text-base">
                오시는 길 보기 →
              </Link>
              <Link href="/about/hours" className="inline-flex items-center justify-center rounded-lg border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:text-base">
                진료시간 확인 →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TourSection />
    </>
  );
}

function EquipmentColumn({ title, items, right = false }: { title: string; items: string[]; right?: boolean }) {
  return (
    <ScrollReveal delay={right ? 150 : 0}>
      <div className={`text-center ${right ? "md:text-left md:pl-12" : "md:text-right md:pr-12 md:border-r border-white/20"}`}>
        <h3 className="text-lg sm:text-3xl font-bold text-white mb-3 sm:mb-5">{title}</h3>
        <ul className="space-y-2 sm:space-y-3">
          {items.map((item) => (
            <li key={item} className={`flex items-start gap-2 text-white/80 text-sm sm:text-xl ${right ? "" : "md:justify-end"}`}>
              <span className="text-sky-400 font-bold shrink-0 mt-px">·</span>{item}
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}
