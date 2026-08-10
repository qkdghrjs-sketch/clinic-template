"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/lib/clinic";
import { getCategoryChildren } from "@/lib/servicePages";
import SubPageIntro from "@/components/SubPageIntro";

/** 세부페이지 공통 헤더. 페이지 제목 아래에 병원 소개 인트로가 함께 붙습니다. */
export default function SubPageHeader({ category, title }: { category: string; title: string }) {
  const [open, setOpen] = useState<"depth1" | "depth2" | null>(null);
  const sameCategory = getCategoryChildren(category);

  return (
    <>
    <section className="bg-[#F4F7FB] px-4 pb-[60px] pt-[58px] sm:pb-[70px] sm:pt-[70px] lg:px-5 lg:pb-[110px] lg:pt-[100px]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start">
        <nav className="mb-6 flex flex-wrap items-center gap-y-2 text-[14px] text-[#555] sm:mb-8 sm:text-[15px] lg:mb-[45px] lg:text-[16px]" aria-label="breadcrumb">
          <Link href="/" className="flex items-center transition-transform hover:scale-110" aria-label="홈으로 이동">
            <svg className="h-5 w-5 fill-[#f9c000]" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
          </Link>
          <span className="mx-1.5 text-[#cbd5e1] sm:mx-2 lg:mx-3">ㆍ</span>
          <Dropdown
            id="depth1"
            label={category}
            open={open === "depth1"}
            setOpen={() => setOpen(open === "depth1" ? null : "depth1")}
            links={navItems.map((item) => ({ label: item.label, href: item.href, active: item.label === category }))}
          />
          <span className="mx-1.5 text-[#cbd5e1] sm:mx-2 lg:mx-3">ㆍ</span>
          <Dropdown
            id="depth2"
            label={title}
            open={open === "depth2"}
            setOpen={() => setOpen(open === "depth2" ? null : "depth2")}
            links={(sameCategory.length ? sameCategory : [{ title, slug: "#", category }]).map((page) => ({ label: page.title, href: page.slug.startsWith("#") ? "#" : `/${page.slug}`, active: page.title === title }))}
          />
        </nav>
        <h1 className="text-[28px] font-black leading-tight tracking-[-0.055em] text-[#1A3A6C] sm:text-[40px] lg:text-[58px]">{title}</h1>
      </div>
    </section>
    <SubPageIntro />
    </>
  );
}

function Dropdown({
  id,
  label,
  links,
  open,
  setOpen
}: {
  id: string;
  label: string;
  links: { label: string; href: string; active?: boolean }[];
  open: boolean;
  setOpen: () => void;
}) {
  return (
    <div className="relative" id={`clinic-${id}`}>
      <button type="button" onClick={setOpen} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#444] transition-colors hover:text-[#1A3A6C] sm:text-[15px] lg:text-[16px]">
        {label}
        <span className={`text-[10px] opacity-60 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      <div className={`absolute left-0 top-[calc(100%+10px)] z-40 min-w-[170px] rounded-xl border border-[#eef2f6] bg-white py-2 shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-300 lg:top-[calc(100%+14px)] lg:min-w-[190px] ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} className={`block px-4 py-2.5 text-[13px] transition-colors hover:bg-slate-50 hover:text-[#1A3A6C] lg:px-5 lg:py-3 lg:text-[14px] ${link.active ? "bg-slate-100 font-black text-[#1A3A6C]" : "text-[#555]"}`}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
