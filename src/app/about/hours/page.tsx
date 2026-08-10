import SubPageHeader from "@/components/SubPageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { clinic, phoneDisplay } from "@/lib/clinic";

export default function HoursPage() {
  return (
    <>
      <SubPageHeader category="병원소개" title="진료시간" />
      <section className="bg-white px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#F4F7FB]">
              <div className="border-b border-[#E2E8F0] bg-white px-7 py-6 sm:px-9">
                <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#4A90D9]">Clinic Hours</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#1A3A6C]">진료시간 안내</h3>
                <p className="mt-3 text-sm leading-6 text-[#666]">내원 전 대표전화로 진료시간을 한 번 더 확인하시면 더욱 편리합니다.</p>
              </div>
              <div className="px-7 py-6 sm:px-9 sm:py-8">
                <ul className="border-y border-b-[#eeeeee] border-t-[#111] border-t-2 bg-white px-4 py-3 sm:px-6">
                  {clinic.hours.map((row) => (
                    <li key={row.label} className="flex items-center border-b border-[#f2f2f2] py-3 last:border-b-0">
                      <span className="w-[96px] shrink-0 text-[14px] font-black text-[#111] sm:w-[130px] sm:text-[15px]">{row.label}</span>
                      <span className="flex-1 text-[15px] font-bold leading-6 text-[#1A3A6C] sm:text-[17px]">{row.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl bg-white px-5 py-4 text-sm leading-7 text-[#666]">
                  <p>ㆍ{clinic.hoursNotice}</p>
                  <p>ㆍ대표전화: <a href={`tel:${clinic.phone}`} className="font-black text-[#1A3A6C]">{phoneDisplay}</a></p>
                  <p>ㆍ진료 시간은 병원 사정에 따라 변경될 수 있습니다.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
