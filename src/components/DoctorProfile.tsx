"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Doctor } from "@/lib/clinic";

export default function DoctorProfile({ doctor, index }: { doctor: Doctor; index: number }) {
  return (
    <section className={`bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28 ${index % 2 === 1 ? "lg:bg-[#fbfcfe]" : ""}`}>
      <div className={`mx-auto flex max-w-[1100px] flex-col gap-9 lg:gap-16 ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} lg:items-end`}>
        <ScrollReveal className="lg:w-[calc(50%-32px)]">
          <div className="flex justify-center lg:h-[720px] lg:items-end">
            {/* 사진 전체가 잘리지 않도록 원본 비율(9:16) 프레임 안에서 object-contain으로 맞춥니다. */}
            <div className="relative aspect-[9/16] w-full max-w-[250px] overflow-hidden rounded-[32px_32px_0_32px] border border-[#e8e8e8] bg-white sm:max-w-[300px] lg:aspect-auto lg:h-full lg:max-w-none lg:rounded-none lg:border-0">
              {doctor.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={doctor.photo} alt={`${doctor.name} 원장`} className="absolute inset-0 h-full w-full object-contain object-bottom" />
              )}
            </div>
          </div>
        </ScrollReveal>

        <div className="flex-1 lg:min-h-[720px] lg:py-12">
          <ScrollReveal>
            <span className="mb-3 block text-[11px] font-black uppercase tracking-[0.18em] text-[#4A90D9]">OUR DOCTOR</span>
            <h2 className="mb-5 text-[30px] font-black leading-tight tracking-[-0.04em] text-[#111] sm:text-[38px]">
              {doctor.name} 원장<br />
              <span className="text-[20px] font-extrabold text-[#1A3A6C] sm:text-[24px]">{doctor.role}</span>
            </h2>
            <blockquote className="mb-8 border-l-4 border-[#C4D4E8] pl-4 font-serif text-[16px] font-semibold leading-[1.75] text-[#1A3A6C] sm:text-[18px]">
              &ldquo;{doctor.quote}&rdquo;
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="mb-5 h-px bg-[#eeeeee]" />
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.06em] text-[#999]">내과 전문의</span>
            <h3 className="mb-4 text-[26px] font-black tracking-[-0.03em] text-[#111]">{doctor.name} 원장</h3>
            <div className="mb-7 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3">
              {doctor.badges.map((badge, i) => (
                <span key={badge} className={`flex min-h-11 items-center justify-center rounded-[14px] border px-3 py-2 text-center text-[13px] font-black leading-snug tracking-[-0.04em] shadow-[0_6px_16px_rgba(26,58,108,0.07)] ${i === doctor.badges.length - 1 ? "min-[420px]:col-span-2 sm:col-span-3 border-[#1A3A6C] bg-[#1A3A6C] text-white" : "border-[#1A3A6C]/20 bg-gradient-to-br from-[#F2F8FF] to-white text-[#1A3A6C]"}`}>
                  {badge}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-2">
            <ScrollReveal delay={180}>
              <AccordionSection title="주요 약력 및 자격" items={doctor.educationCareer} />
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <AccordionSection title="전문 학회 활동" items={doctor.societies} />
            </ScrollReveal>
            {doctor.conferences && (
              <ScrollReveal delay={260}>
                <AccordionSection title="학회 발표" items={doctor.conferences} />
              </ScrollReveal>
            )}
            {doctor.papers && (
              <ScrollReveal delay={300}>
                <AccordionSection title="논문내역 (제1저자)" items={doctor.papers} />
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionSection({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-[#e8e8e8]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#f8fafc]"
      >
        <h4 className="flex items-center gap-2.5 text-[15px] font-black tracking-[-0.03em] text-[#111]">
          <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-[#1A3A6C]" />
          {title}
        </h4>
        <svg
          className={`ml-3 h-4 w-4 shrink-0 text-[#999] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <ul className="min-h-0 overflow-hidden">
          {items.map((item) => (
            <li key={item} className="border-t border-[#f2f2f2] px-5 py-3 text-[13px] leading-relaxed text-[#555] first:border-t-[#e8e8e8]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
