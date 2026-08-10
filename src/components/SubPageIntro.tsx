import ScrollReveal from "@/components/ScrollReveal";
import { clinic } from "@/lib/clinic";

const { intro } = clinic;

/** 모든 세부페이지 상단에 공통으로 들어가는 병원 소개 + 선택 이유 3가지 */
export default function SubPageIntro() {
  return (
    <section className="bg-white px-4 py-14 lg:px-5 lg:py-[84px]">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              {intro.eyebrow}
            </span>
            <h2 className="mt-5 text-[22px] font-black leading-snug tracking-[-0.04em] text-[#1A3A6C] sm:text-[30px] lg:text-[34px]">
              {intro.lead}
              <br />
              <span className="text-[#111]">{intro.headline}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-[#666] sm:text-[15px] sm:leading-8">
              {intro.desc}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-11 mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#E2E8F0]" />
            <h3 className="text-center text-[15px] font-black tracking-[-0.03em] text-[#111] sm:text-[17px]">
              {intro.reasonsTitle}
            </h3>
            <span className="h-px w-8 bg-[#E2E8F0]" />
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {intro.reasons.map((reason, i) => (
            <ScrollReveal key={reason.num} delay={200 + i * 110}>
              <article className="relative h-full overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4A90D9] hover:bg-white hover:shadow-[0_16px_34px_rgba(26,58,108,0.09)]">
                <span className="text-[13px] font-black tracking-[0.08em] text-[#4A90D9]">{reason.num}</span>
                <h4 className="mt-2.5 text-[16px] font-black leading-snug tracking-[-0.03em] text-[#111] sm:text-[17px]">
                  {reason.title}
                </h4>
                <p className="mt-3 text-[13.5px] leading-6 text-[#666] sm:text-[14px] sm:leading-7">
                  {reason.desc}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
