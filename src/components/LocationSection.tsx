"use client";

import ScrollReveal from "@/components/ScrollReveal";
import KakaoMap from "@/components/KakaoMap";
import { clinic, phoneDisplay } from "@/lib/clinic";

export default function LocationSection({ forceShow = false }: { forceShow?: boolean }) {
  void forceShow;
  return (
    <section id="location" className="scroll-mt-24 bg-white px-4 py-16 sm:px-5 sm:py-20 lg:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <ScrollReveal className="w-full lg:w-[520px] lg:shrink-0">
          <div>
            <span className="mb-2 block text-[20px] font-black tracking-[-0.03em] text-[#111]">{clinic.concept.eyebrow}</span>
            <h2 className="mb-2 text-[30px] font-black leading-tight tracking-[-0.05em] text-[#111] sm:text-[40px]">{clinic.shortName} 오시는 길</h2>
            <p className="mb-9 text-[15px] leading-7 text-[#666]">가까운 거리에서 자주 뵐 수 있도록, 쉽게 찾고 편하게 오실 수 있게 안내드립니다.</p>
          </div>

          <TimeCategory title="외래 진료시간" color="#1A3A6C" />
          <ul className="border-y border-b-[#eeeeee] border-t-[#111] border-t-2 py-3">
            {clinic.hours.map((row) => (
              <li key={row.label} className="flex items-center py-2.5">
                <span className="w-[92px] shrink-0 text-[13px] font-black text-[#111] sm:w-[130px] sm:text-[15px]">{row.label}</span>
                <span className="flex-1 text-[13px] font-semibold leading-6 text-[#111] sm:text-[15px]">{row.value}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-4 space-y-1.5 text-[13px] font-light leading-7 text-[#999]">
            <li>ㆍ{clinic.hoursNotice}</li>
            <li>ㆍ전화 문의: {phoneDisplay}</li>
            <li>ㆍ진료 시간은 병원 사정에 따라 변경될 수 있습니다.</li>
            <li>ㆍ{clinic.parkingNotice}</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={180} className="w-full lg:max-w-[680px] lg:flex-1">
          <h3 className="mb-2 text-[18px] font-black leading-tight tracking-[-0.03em] text-[#111] sm:text-[22px]">{clinic.address}</h3>
          <p className="mb-6 text-[15px] text-[#666]">{clinic.name}</p>

          <div className="relative mb-5 h-[280px] overflow-hidden rounded-xl bg-[#f0f0f0] sm:h-[360px] lg:h-[400px] lg:rounded-2xl">
            <KakaoMap />
          </div>

          <div className="flex border-t border-[#eeeeee] pt-4">
            <MapLink href={clinic.naverMapUrl} icon="N" color="#03C75A" label="네이버 지도" />
            <MapLink href={clinic.kakaoMapUrl} icon="K" color="#FEE500" label="카카오 지도" dark />
            <MapLink href={clinic.tmapUrl} icon="T" color="#0054FF" label="TMAP" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TimeCategory({ title, color, className = "" }: { title: string; color: string; className?: string }) {
  return (
    <div className={`mb-3 flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.08em] ${className}`} style={{ color }}>
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {title}
    </div>
  );
}

function MapLink({ href, icon, label, color, dark = false }: { href: string; icon: string; label: string; color: string; dark?: boolean }) {
  return (
    <div className="flex flex-1 items-center justify-center border-r border-[#e5e5e5] last:border-r-0">
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[13px] font-black text-[#111] transition-colors hover:text-[#1A3A6C] sm:text-[14px]">
        <span className={`flex h-5 w-5 items-center justify-center rounded text-[11px] font-black transition-transform group-hover:-translate-y-1 ${dark ? "text-black" : "text-white"}`} style={{ backgroundColor: color }}>{icon}</span>
        {label}
      </a>
    </div>
  );
}
