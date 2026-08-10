import SubPageHeader from "@/components/SubPageHeader";
import { clinic } from "@/lib/clinic";

export default function LocationPage() {
  return (
    <>
      <SubPageHeader category="병원소개" title="오시는 길" />
      <section className="bg-white px-5 py-14 text-center sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E2E8F0] bg-[#F4F7FB] p-7 sm:p-10">
          <p className="text-[15px] font-bold text-[#4A90D9]">LOCATION</p>
          <h2 className="mt-3 text-[28px] font-black tracking-[-0.04em] text-[#1A3A6C] sm:text-[36px]">{clinic.address}</h2>
          <p className="mt-4 text-[15px] leading-7 text-[#666]">아래 오시는 길 섹션에서 카카오맵과 네이버·카카오·티맵 링크를 확인하실 수 있습니다.</p>
        </div>
      </section>
    </>
  );
}
