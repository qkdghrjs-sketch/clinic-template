"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { clinic, phoneDisplay } from "@/lib/clinic";

type ModalType = "privacy" | "terms" | "rights" | null;

const modalText: Record<Exclude<ModalType, null>, { title: string; content: string[] }> = {
  privacy: {
    title: "개인정보처리방침",
    content: [
      `${clinic.name}은 개인정보 보호법과 의료법 등 관련 법령을 준수하며 이용자의 개인정보를 안전하게 관리합니다.`,
      "온라인 문의, 예약, 진료 관련 안내에 필요한 최소한의 개인정보만 처리하며 목적 달성 후 관련 법령에 따라 보관 또는 파기합니다.",
      "개인정보 보호책임자와 세부 처리방침은 실제 병원 운영 기준에 맞춰 업데이트하세요."
    ]
  },
  terms: {
    title: "이용약관",
    content: [
      "본 홈페이지는 병원 소개, 의료진 소개, 진료과목, 위치 및 진료시간 안내를 제공합니다.",
      "홈페이지의 건강정보는 일반적인 정보 제공을 목적으로 하며 개별 환자의 진단이나 치료를 대신하지 않습니다.",
      "홈페이지 콘텐츠의 무단 복제와 배포는 제한됩니다."
    ]
  },
  rights: {
    title: "환자의 권리와 의무",
    content: [
      "환자는 차별받지 않고 적절한 진료를 받을 권리, 충분한 설명을 듣고 치료방법을 결정할 권리, 진료상 비밀을 보호받을 권리가 있습니다.",
      "환자는 자신의 건강 상태를 정확히 알리고 의료진의 진료 방침에 협조해야 합니다.",
      "환자는 병원의 진료 질서와 안전수칙을 준수해야 합니다."
    ]
  }
};

export default function Footer() {
  const [modal, setModal] = useState<ModalType>(null);
  const telHref = clinic.phone ? `tel:${clinic.phone}` : undefined;

  return (
    <>
      <footer className="bg-[#F8F9FA] px-4 py-14 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="mb-7 flex min-h-16 items-end justify-between gap-5">
                <div>
                  <h3 className="text-[26px] font-black leading-none tracking-[-0.04em] text-[#111] sm:text-[30px]">빠른 안내</h3>
                  <p className="mt-4 text-[14px] leading-6 text-[#666] sm:text-[15px]">{clinic.slogan}. 필요한 페이지로 바로 이동하세요.</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <QuickCard href="/doctors" title="의료진 소개" desc="내과 전문의를 소개합니다." />
                <QuickCard href="/about/location" title="오시는 길" desc={clinic.address} />
                <QuickCard href="/checkup/cancer" title="건강검진센터" desc="국가검진과 종합검진 안내" />
                <QuickCard href="/endoscopy/stomach" title="내시경센터" desc="위·대장내시경 안내" />
              </div>
            </div>

            <div>
              <div className="mb-7 flex min-h-16 items-end justify-between gap-5">
                <div>
                  <h3 className="text-[26px] font-black leading-none tracking-[-0.04em] text-[#111] sm:text-[30px]">대표전화</h3>
                  <p className="mt-4 text-[14px] leading-6 text-[#666] sm:text-[15px]">전화번호를 누르면 대표전화로 연결됩니다.</p>
                </div>
              </div>
              {telHref ? (
                <a href={telHref} className="mb-7 flex items-center gap-3 text-[32px] font-black tracking-[-0.04em] text-[#111] sm:text-[40px]">
                  <PhoneSvg /> {clinic.phone}
                </a>
              ) : (
                <div className="mb-7 flex items-center gap-3 text-[30px] font-black tracking-[-0.04em] text-[#111] sm:text-[38px]">
                  <PhoneSvg /> {phoneDisplay}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <a href={clinic.naverMapUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-16 items-center justify-between rounded-xl bg-gradient-to-br from-[#03C75A] to-[#029B46] px-5 py-4 text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="text-[14px] font-black">네이버 지도 바로가기 &gt;</span>
                  <strong className="text-[28px] leading-none">N</strong>
                </a>
                <a href={clinic.kakaoMapUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-16 items-center justify-between rounded-xl bg-gradient-to-br from-[#1A3A6C] to-[#285A9D] px-5 py-4 text-white transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="text-[14px] font-black">카카오 지도 바로가기 &gt;</span>
                  <strong className="text-[28px] leading-none">K</strong>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E0E0E0] pt-9">
            <div className="mb-6 flex items-center justify-between">
              {clinic.logoSecondary ? (
                <Image src={clinic.logoSecondary} alt={clinic.name} width={300} height={90} className="h-10 w-auto object-contain" />
              ) : (
                <span className="text-[20px] font-black tracking-[-0.04em] text-[#111]">{clinic.shortName}</span>
              )}
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className="mb-2 text-[13.5px] leading-6 text-[#666]">{clinic.address} {clinic.name}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[13px] leading-6 text-[#888]">
                  <span><strong className="text-[#111]">대표자명:</strong> {clinic.representative}</span>
                  <span className="hidden text-[#ccc] sm:inline">|</span>
                  <span><strong className="text-[#111]">사업자번호:</strong> {clinic.businessNumber}</span>
                  <span className="hidden text-[#ccc] sm:inline">|</span>
                  <span><strong className="text-[#111]">TEL:</strong> {phoneDisplay}</span>
                  <span className="hidden text-[#ccc] sm:inline">|</span>
                  <span>ⓒ 2026 {clinic.name} All Rights Reserved.</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-[12px] font-semibold text-[#888] sm:text-[13px]">
                <button type="button" className="font-black text-[#111] hover:underline" onClick={() => setModal("privacy")}>개인정보처리방침</button>
                <button type="button" className="hover:text-[#111] hover:underline" onClick={() => setModal("terms")}>이용약관</button>
                <button type="button" className="hover:text-[#111] hover:underline" onClick={() => setModal("rights")}>환자의 권리와 의무</button>
                <Link href="/medical-info" className="hover:text-[#111] hover:underline">비급여안내</Link>
                <Link href="/about/location" className="hover:text-[#111] hover:underline">오시는 길</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {modal && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 p-4" onClick={() => setModal(null)}>
          <div className="max-h-[84vh] w-full max-w-[760px] overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#eee] px-5 py-4">
              <h4 className="text-[19px] font-black text-[#111]">{modalText[modal].title}</h4>
              <button type="button" onClick={() => setModal(null)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F7] text-[#111]">✕</button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-6 text-[14px] leading-8 text-[#555]">
              {modalText[modal].content.map((paragraph) => <p key={paragraph} className="mb-4 last:mb-0">{paragraph}</p>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function QuickCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between gap-5 border-y-2 border-t-[#111] border-b-[#E0E0E0] bg-white px-5 py-6 text-[#111] transition-all hover:translate-x-1 hover:shadow-sm">
      <span className="min-w-0">
        <span className="block text-[16px] font-black leading-6">{title}</span>
        <span className="mt-1 block truncate text-[13px] text-[#666]">{desc}</span>
      </span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F9FA] font-black transition-all group-hover:bg-[#111] group-hover:text-white">→</span>
    </Link>
  );
}

function PhoneSvg() {
  return (
    <svg className="h-7 w-7 shrink-0 fill-[#111]" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
