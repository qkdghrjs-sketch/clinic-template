import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { clinic } from "@/lib/clinic";
import type { ServicePage } from "@/lib/servicePages";

export default function ServiceDetailPage({ page }: { page: ServicePage }) {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#071828_0%,#1A3A6C_55%,#243f80_100%)] px-4 py-[72px] sm:py-20 lg:px-5 lg:py-[100px]">
        <div className="absolute right-[-100px] top-[-100px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(74,144,217,0.14)_0%,transparent_70%)] lg:h-[480px] lg:w-[480px]" />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-9 lg:flex-row lg:items-end lg:gap-[60px]">
          <div className="flex-1 lg:pb-5">
            <ScrollReveal>
              <div className="mb-5 flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#9BBFE8] lg:tracking-[0.18em]">
                <span className="h-0.5 w-6 rounded-full bg-[#4A90D9]" />
                {page.eyebrow}
              </div>
              <h2 className="mb-4 text-[32px] font-black leading-[1.18] tracking-[-0.055em] text-white sm:text-[40px] lg:mb-5 lg:text-[50px]">
                {page.title}<br /><em className="not-italic text-[#9BBFE8]">{page.english}</em>
              </h2>
              <p className="mb-7 max-w-xl text-[14px] leading-7 text-white/72 sm:text-[15px] sm:leading-8 lg:mb-8 lg:text-base">{page.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {page.badges.map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white lg:gap-2 lg:px-4 lg:py-2 lg:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4A90D9]" /> {badge}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={180} className="w-full lg:w-[380px] lg:shrink-0">
            <div className="h-[260px] overflow-hidden rounded-[28px_28px_0_28px] sm:h-[320px] lg:h-[400px] lg:rounded-[32px_32px_0_32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.image} alt={page.title} className="h-full w-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-[72px] lg:px-5 lg:py-[100px]">
        <ScrollReveal>
          <div className="mx-auto flex max-w-[1200px] flex-col overflow-hidden rounded-[22px] bg-[#F4F7FB] shadow-[0_12px_36px_rgba(0,0,0,0.04)] lg:flex-row lg:rounded-[24px]">
            <div className="min-h-[240px] bg-[#dde5ef] sm:min-h-[300px] lg:min-h-[340px] lg:flex-[0.8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.image} alt={page.introTitle} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-7 lg:flex-[1.2] lg:p-[56px_50px]">
              <h2 className="mb-1.5 text-[24px] font-black tracking-[-0.04em] text-[#1A3A6C] sm:text-[28px] lg:text-[30px]">{page.introTitle}</h2>
              <span className="mb-6 block text-[13px] font-semibold tracking-[0.04em] text-[#4A90D9] lg:mb-7">{page.introEnglish}</span>
              {page.introParagraphs.map((paragraph) => (
                <p key={paragraph} className="mb-3 text-[14px] leading-7 text-[#555] last:mb-0 lg:text-[15px] lg:leading-8">{paragraph}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white px-4 py-[72px] lg:px-5 lg:py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeader eyebrow="SYMPTOMS" title={page.symptomTitle} />
          {page.symptomGroups.map((group, groupIndex) => (
            <div key={group.label} className="mb-[52px] last:mb-0">
              <ScrollReveal delay={groupIndex * 120}>
                <div className="mb-6 flex items-center gap-2.5">
                  <span className={`h-5 w-[3px] rounded-full ${group.danger ? "bg-[#E05050]" : "bg-[#4A90D9]"}`} />
                  <h3 className={`text-[17px] font-black tracking-[-0.03em] ${group.danger ? "text-[#C03030]" : "text-[#1A3A6C]"}`}>{group.label}</h3>
                </div>
              </ScrollReveal>
              <div className="flex flex-wrap gap-[18px]">
                {group.items.map((item, i) => (
                  <ScrollReveal key={item.title} delay={i * 80} className="min-w-[calc(50%-9px)] flex-1 lg:min-w-[200px]">
                    <div className="h-full rounded-[18px] border border-[#E2E8F0] bg-[#F4F7FB] px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4A90D9] hover:shadow-[0_14px_28px_rgba(26,58,108,0.08)] lg:px-5 lg:py-[30px]">
                      <div className="mx-auto mb-3.5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(26,58,108,0.06)] lg:h-[60px] lg:w-[60px]"><Icon /></div>
                      <h4 className="mb-1.5 text-[15px] font-black leading-snug text-[#111] lg:text-[16px]">{item.title}</h4>
                      <p className="text-[12.5px] leading-5 text-[#777] lg:text-[13px] lg:leading-6">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F4F7FB] px-4 py-[72px] lg:px-5 lg:py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeader eyebrow="TREATMENT" title={page.treatmentTitle} desc={page.treatmentDesc} />
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
            {page.treatments.map((treatment, i) => (
              <ScrollReveal key={treatment.title} delay={i * 120} className="flex-1">
                <article className="relative h-full overflow-hidden rounded-[22px] border border-[#E2E8F0] bg-white px-6 py-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(26,58,108,0.1)] lg:px-7 lg:py-9">
                  <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#1A3A6C] to-[#4A90D9]" />
                  <div className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#F4F7FB]"><Icon /></div>
                  <h3 className="mb-5 border-b border-dashed border-[#E2E8F0] pb-5 text-[18px] font-black tracking-[-0.03em] text-[#1A3A6C] lg:text-[19px]">{treatment.title}</h3>
                  <ul className="space-y-3">
                    {treatment.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A90D9]" />
                        <span className="text-[14px] leading-7 text-[#555]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F7FB] px-4 pb-[72px] lg:px-5 lg:pb-[100px]">
        <ScrollReveal>
          <div className="mx-auto max-w-[1200px] rounded-[20px] border border-[#E2E8F0] bg-white px-5 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.03)] lg:px-10 lg:py-11">
            <div className="mb-7 flex items-center justify-center gap-3">
              <CheckIcon />
              <h3 className="text-center text-[18px] font-black tracking-[-0.03em] text-[#1A3A6C] lg:text-[20px]">{page.summaryTitle}</h3>
            </div>
            <div className="space-y-4 rounded-[14px] bg-[#F4F7FB] p-5 lg:p-7">
              {page.summaries.map((summary) => (
                <div key={summary} className="flex items-start gap-3">
                  <CheckIcon small />
                  <p className="text-[14px] leading-7 text-[#555] lg:text-[15px]">{summary}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-[#1A3A6C] px-4 py-16 text-center lg:px-5 lg:py-20">
        <div className="mx-auto max-w-[680px]">
          <ScrollReveal>
            <h2 className="mb-3 text-[24px] font-black leading-tight tracking-[-0.04em] text-white lg:text-[32px]">{page.title} 관리,<br />{clinic.shortName}과 함께 시작하세요</h2>
            <p className="mb-8 text-[14px] leading-7 text-white/72 lg:text-[15px]">정확한 진료와 차분한 설명으로, 가까운 곳에서 오래 함께하는 우리 동네 주치의가 되겠습니다.</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/about/location" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-black text-[#1A3A6C] transition-all hover:-translate-y-0.5 hover:bg-[#E8F0FA]">오시는 길 안내 →</Link>
              <Link href="/doctors" className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10">의료진 보기 →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <ScrollReveal>
      <div className="mb-14 text-center">
        <span className="mb-3 block text-[11px] font-black uppercase tracking-[0.18em] text-[#4A90D9]">{eyebrow}</span>
        <h2 className="mb-3 text-[26px] font-black leading-tight tracking-[-0.04em] text-[#1A3A6C] sm:text-[32px] lg:text-[38px]">{title}</h2>
        {desc && <p className="text-[15px] leading-7 text-[#666]">{desc}</p>}
      </div>
    </ScrollReveal>
  );
}

function Icon() {
  return (
    <svg className="h-6 w-6 stroke-[#2B5BA8] lg:h-7 lg:w-7" viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function CheckIcon({ small = false }: { small?: boolean }) {
  return (
    <svg className={`${small ? "mt-1 h-[18px] w-[18px]" : "h-6 w-6"} shrink-0 stroke-[#4A90D9]`} viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m22 4-10 10.01-3-3" />
    </svg>
  );
}
