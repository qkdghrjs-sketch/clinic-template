"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { clinic, pickImage } from "@/lib/clinic";

// [병원별 수정 필요] 메인 WHY 섹션 카드 4장
const reasons = [
  {
    num: "01",
    title: "내과 전문의 진료",
    image: pickImage(0),
    desc: "내과 전문의가 내과·검진·내시경·만성질환을 균형 있게 살핍니다.",
  },
  {
    num: "02",
    title: "검진·내시경 중심 시스템",
    image: pickImage(1),
    desc: "위·대장내시경의 준비, 검사, 회복, 결과 설명까지 표준화된 흐름으로 편안한 검사를 지향합니다.",
  },
  {
    num: "03",
    title: "검진과 진료의 연결",
    image: pickImage(2),
    desc: "검진에서 끝나지 않고 이상 소견의 원인 확인, 치료, 추적관리까지 한 동선에서 이어갑니다.",
  },
  {
    num: "04",
    title: "동네에서 이어가는 장기 관리",
    image: pickImage(3),
    desc: "고혈압, 당뇨병, 고지혈증, 골다공증처럼 오래 관리해야 하는 질환을 가까운 곳에서 꾸준히 함께 조정합니다.",
  },
];

export default function WhySection() {
  return (
    <section className="py-0">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-600">
                WHY
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-navy-900">
                그래서 {clinic.shortName}입니다.
              </h2>
            </div>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-gray-500 lg:text-right">
              검사와 진료가 따로 끝나지 않도록, 처음 상담부터 결과 설명과 추적관리까지
              한 흐름으로 이어갑니다. 가까운 거리에서 오래 지켜보는 우리 동네 주치의를 지향합니다.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 90}>
              <article className="group h-full overflow-hidden rounded-[28px] bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy-900/10">
                <div className="relative h-52 min-[560px]:h-56 lg:h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${reason.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/35 to-transparent" />
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-sm font-black text-navy-900 shadow-lg">
                    {reason.num}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg sm:text-xl font-black leading-snug text-white">
                      {reason.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600">
                    {reason.desc}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
