"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import TourGallery from "@/components/TourGallery";
import { clinic, tourImages } from "@/lib/clinic";

/** 메인 페이지 미리보기: 입구·대기·동선·검사실을 고루 보여주는 6장 */
const previewTitles = ["병원 입구", "대기 공간", "진료 동선", "내시경실", "초음파 검사실 내부", "X-RAY실"];
const previewImages = previewTitles
  .map((title) => tourImages.find((image) => image.title === title))
  .filter((image) => image !== undefined);

export default function TourSection() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:py-20 lg:px-5">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              CLINIC TOUR
            </span>
            <h2 className="mt-5 text-[22px] font-black leading-snug tracking-[-0.04em] text-[#111] sm:text-[30px] lg:text-[34px]">
              {clinic.shortName} 둘러보기
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-[#666] sm:text-[15px] sm:leading-8">
              접수·대기·진료·검사 공간이 한 층에 이어져 있어 이동이 짧습니다.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="mt-10 sm:mt-12">
            <TourGallery items={previewImages} priorityCount={0} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={220}>
          <div className="mt-9 text-center sm:mt-11">
            <Link
              href="/about/tour"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1A3A6C] px-7 py-3.5 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-[#14305a] sm:text-base"
            >
              사진 전체 보기 <span className="text-xs">→</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
