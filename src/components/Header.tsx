"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clinic, navItems, phoneDisplay } from "@/lib/clinic";
import { handleReservation } from "@/utils/reservation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => {
      if (window.innerWidth >= 1200) setMobileOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`group/header fixed left-0 top-0 z-[99990] w-full border-b border-[#EEEEEE] bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_15px_rgba(26,58,108,0.08)]" : ""
        }`}
      >
        <div className="absolute left-0 top-[80px] hidden h-0 w-full border-y border-transparent bg-white shadow-none transition-all duration-300 group-hover/header:h-[340px] group-hover/header:border-y-[#e5e7eb] group-hover/header:shadow-[0_10px_20px_rgba(0,0,0,0.06)] xl:block" />

        <div className="relative z-20 mx-auto flex h-[60px] max-w-[1680px] items-center justify-end px-4 xl:h-20 xl:justify-between xl:px-6 2xl:px-8">
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 flex h-full w-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center min-[380px]:w-[170px] sm:w-[190px] xl:static xl:w-auto xl:translate-x-0 xl:translate-y-0"
            aria-label={`${clinic.name} 메인으로 이동`}
          >
            {clinic.logoPrimary ? (
              <Image
                src={clinic.logoPrimary}
                alt={clinic.name}
                width={520}
                height={160}
                className="h-auto max-h-[30px] w-full max-w-full object-contain xl:h-[56px] xl:max-h-none xl:w-auto"
                priority
              />
            ) : (
              <span className="text-[17px] font-black tracking-[-0.04em] text-[#1A3A6C] xl:text-[22px]">{clinic.shortName}</span>
            )}
          </Link>

          <nav className="hidden h-full min-w-0 flex-1 px-4 xl:block" aria-label={`${clinic.name} 주요 메뉴`}>
            <ul className="flex h-full justify-center">
              {navItems.map((item) => (
                <li key={item.label} className="group/menu relative flex h-full min-w-[94px] max-w-[142px] flex-1 items-stretch justify-center text-center 2xl:min-w-[118px]">
                  <Link
                    href={item.href}
                    className="relative z-20 flex h-full w-full items-center justify-center px-1.5 text-[14px] font-semibold leading-tight tracking-[-0.04em] text-[#333333] transition-colors duration-200 group-hover/menu:bg-[#1A3A6C] group-hover/menu:text-white 2xl:text-[16px]"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="invisible absolute left-0 top-full z-30 w-full px-1 pb-8 pt-6 opacity-0 transition-opacity duration-300 group-hover/header:visible group-hover/header:opacity-100 group-hover/menu:bg-[#1A3A6C]">
                      {item.children.map((sub) => (
                        <li key={sub.label} className="mb-3 last:mb-0">
                          <Link
                            href={sub.disabled ? "#" : sub.href}
                            onClick={(e) => sub.disabled && e.preventDefault()}
                            className={`block rounded-md px-1 py-1 text-[13px] font-light leading-snug tracking-[-0.05em] transition-all 2xl:text-[14px] ${
                              sub.disabled
                                ? "cursor-not-allowed text-[#b8c1cc]"
                                : "text-[#666666] group-hover/menu:text-white/65 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Link
              href="/about/hours"
              className="inline-flex items-center rounded-full bg-[#E8F4FD] px-4 py-2.5 text-[13px] font-bold text-[#1A3A6C] transition-all hover:-translate-y-0.5 hover:bg-[#d9ecfb]"
            >
              진료시간
            </Link>
            <button
              onClick={handleReservation}
              className="inline-flex items-center gap-2 rounded-full bg-[#1A3A6C] px-4 py-2.5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#2B5BA8]"
            >
              <PhoneIcon />
              {phoneDisplay}
            </button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full text-[#1A3A6C] xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
            aria-controls="clinic-mobile-nav"
            aria-expanded={mobileOpen}
          >
            <span className="block h-0.5 w-[22px] rounded-full bg-current" />
            <span className="block h-0.5 w-[22px] rounded-full bg-current" />
            <span className="block h-0.5 w-[22px] rounded-full bg-current" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[99995] bg-black/45 transition-opacity xl:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        id="clinic-mobile-nav"
        className={`fixed right-0 top-0 z-[99999] flex h-[100svh] w-full flex-col bg-[#1A3A6C] text-white shadow-2xl transition-transform duration-300 xl:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          {clinic.logoSecondary ? (
            <Image src={clinic.logoSecondary} alt={clinic.name} width={260} height={90} className="h-[24px] max-w-[190px] w-auto object-contain brightness-0 invert" />
          ) : (
            <span className="text-[17px] font-black tracking-[-0.04em] text-white">{clinic.shortName}</span>
          )}
          <button type="button" onClick={() => setMobileOpen(false)} className="flex h-10 w-10 items-center justify-end text-2xl" aria-label="메뉴 닫기">✕</button>
        </div>

        <button onClick={handleReservation} className="flex shrink-0 items-center justify-center gap-2 border-b border-white/10 bg-white/5 px-5 py-4 text-[15px] font-bold text-white">
          <PhoneIcon />
          {phoneDisplay}
        </button>

        <div className="flex-1 overflow-y-auto pb-10">
          <ul>
            {navItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={item.label} className="border-b border-white/8">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-5 py-5 text-left text-[16px] font-bold tracking-[-0.04em] min-[390px]:text-[17px] ${isOpen ? "text-[#7dd3fc]" : "text-white"}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {item.label}
                    <span className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[520px]" : "max-h-0"}`}>
                    <div className="px-5 pb-4">
                      {item.children?.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.disabled ? "#" : sub.href}
                          onClick={(e) => {
                            if (sub.disabled) e.preventDefault();
                            else setMobileOpen(false);
                          }}
                          className={`block rounded-lg px-3 py-2.5 text-[14px] leading-snug ${sub.disabled ? "text-white/30" : "text-white/62 hover:bg-white/8 hover:text-white"}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9C1.6 3.92 2.33 3.1 3.3 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11l-.74.74a16 16 0 0 0 6 6l.74-.74a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
