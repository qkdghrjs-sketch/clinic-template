import SubPageHeader from "@/components/SubPageHeader";

export default function MedicalInfoPage() {
  return (
    <>
      <SubPageHeader category="병원소개" title="비급여 안내" />
      <section className="bg-white px-5 py-20 sm:py-32">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-50 mb-6">
            <svg className="w-8 h-8 stroke-navy-400" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-600 mb-3">COMING SOON</p>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight mb-4">비급여 안내 준비 중</h2>
          <p className="text-gray-500 leading-7">
            비급여 항목과 세부 비용은 개원 후<br className="hidden sm:block" /> 확정 즉시 안내드릴 예정입니다.
          </p>
        </div>
      </section>
    </>
  );
}
