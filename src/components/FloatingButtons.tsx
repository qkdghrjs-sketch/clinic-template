"use client";

import { useCallback, useState } from "react";
import { clinic, phoneDisplay } from "@/lib/clinic";
import { handleReservation } from "@/utils/reservation";

type TooltipId = "phone" | "map" | null;

export default function FloatingButtons() {
  const [activeTooltip, setActiveTooltip] = useState<TooltipId>(null);

  const openMap = useCallback(() => {
    if (window.innerWidth < 640) window.open(clinic.kakaoMapUrl, "_blank", "noopener,noreferrer");
    else setActiveTooltip((prev) => prev === "map" ? null : "map");
  }, []);

  return (
    <div className="fixed bottom-[120px] right-3 sm:bottom-[140px] sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
      <div className="relative">
        {activeTooltip === "phone" && <Tooltip text={phoneDisplay} onConfirm={handleReservation} onClose={() => setActiveTooltip(null)} />}
        <button onClick={() => window.innerWidth < 640 ? handleReservation() : setActiveTooltip((prev) => prev === "phone" ? null : "phone")} className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300" aria-label="전화예약">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        </button>
      </div>
      <div className="relative">
        {activeTooltip === "map" && <Tooltip text="카카오맵으로 위치를 확인합니다" href={clinic.kakaoMapUrl} onClose={() => setActiveTooltip(null)} />}
        <button onClick={openMap} className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300" style={{ backgroundColor: "#FEE500" }} aria-label="카카오맵">
          <svg className="w-7 h-7" fill="none" stroke="#191919" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>
    </div>
  );
}

function Tooltip({ text, href, onConfirm, onClose }: { text: string; href?: string; onConfirm?: () => void; onClose: () => void }) {
  return (
    <div className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 animate-fade-in hidden sm:block">
      <div className="relative bg-white rounded-xl shadow-xl px-4 py-3 whitespace-nowrap flex items-center gap-3">
        <span className="text-navy-900 text-sm font-medium">{text}</span>
        <div className="flex items-center gap-1.5">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-sky-600 transition-colors" onClick={onClose}>확인</a>
          ) : (
            <button className="bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-sky-600 transition-colors" onClick={() => { onConfirm?.(); onClose(); }}>확인</button>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1" aria-label="닫기">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 shadow-sm" />
      </div>
    </div>
  );
}
