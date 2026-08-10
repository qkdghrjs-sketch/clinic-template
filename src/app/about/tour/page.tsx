import SubPageHeader from "@/components/SubPageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import TourGallery from "@/components/TourGallery";
import { clinic, phoneDisplay, tourImages } from "@/lib/clinic";

export const metadata = {
  title: "둘러보기",
  description: `${clinic.name} 내부 전경 - 입구, 대기 공간, 진료실, 내시경실, 초음파실, X-RAY실, 주사실을 사진으로 안내합니다.`
};

export default function TourPage() {
  return (
    <>
      <SubPageHeader category="병원소개" title="둘러보기" />

      <section className="bg-white px-4 py-14 lg:px-5 lg:py-[84px]">
        <div className="mx-auto max-w-[1200px]">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#4A90D9]">CLINIC TOUR</p>
              <h2 className="mt-3 text-[22px] font-black leading-snug tracking-[-0.04em] text-[#111] sm:text-[30px] lg:text-[34px]">
                {clinic.shortName} 공간 둘러보기
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-7 text-[#666] sm:text-[15px] sm:leading-8">
                접수부터 진료, 검사까지 이어지는 동선을 한 층에 모았습니다.
                <br className="hidden sm:block" />
                사진을 누르면 크게 보실 수 있습니다.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="mt-10 sm:mt-12">
              <TourGallery items={tourImages} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-10 rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] px-6 py-7 text-center sm:mt-12 sm:px-10 sm:py-9">
              <p className="text-[15px] font-black tracking-[-0.03em] text-[#111] sm:text-[17px]">{clinic.slogan}</p>
              <p className="mt-3 text-[13.5px] leading-7 text-[#666] sm:text-[14px]">
                {clinic.address} · 3층
                <br className="sm:hidden" />
                <span className="hidden sm:inline"> · </span>
                진료 문의 <a href={`tel:${clinic.phone}`} className="font-black text-[#1A3A6C]">{phoneDisplay}</a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
