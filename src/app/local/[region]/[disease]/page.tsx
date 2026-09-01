import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubPageHeader from "@/components/SubPageHeader";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { clinic } from "@/lib/clinic";
import { localPairs, findTopicByTitle, IS_TEMPLATE, phoneText } from "@/lib/seo";
import { localPageSchema, jsonLd } from "@/lib/schema";

/**
 * 네이버 SEO — "지역명 + 질환명" 페이지.
 *
 * 예: /local/오창/고혈압, /local/탕정/역류성식도염
 * 실제로 검증된 검색 공식입니다.
 *
 * 왜 /local/ 이 앞에 붙는가:
 *   루트에 이미 [...slug] catch-all 이 있고, 기존 진료 페이지 21개 중 19개가
 *   /chronic/hypertension 처럼 2단 경로입니다.
 *   /[지역]/[질환] 을 그대로 만들면 Next.js 라우팅 우선순위상
 *   기존 진료 페이지를 전부 가로챕니다. 그래서 한 단계 네임스페이스를 둡니다.
 *
 * 내용은 새로 쓰지 않고 servicePages 의 기존 상세 내용을 지역 맥락으로 감쌉니다.
 * 지역·주제 목록은 src/lib/seo.ts 에서 관리합니다.
 */

type Props = { params: Promise<{ region: string; disease: string }> };

export function generateStaticParams() {
  return localPairs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, disease } = await params;
  const r = decodeURIComponent(region);
  const page = findTopicByTitle(disease);
  if (!page) return {};

  const title = `${r} ${page.title}`;
  const description = `${r} ${page.title} 진료. ${page.subtitle} ${clinic.name} · ${clinic.address}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/local/${encodeURIComponent(r)}/${encodeURIComponent(page.title)}`,
    },
    ...(IS_TEMPLATE ? { robots: { index: false, follow: false } } : {}),
    openGraph: { title, description, type: "article", locale: "ko_KR" },
  };
}

export default async function LocalPage({ params }: Props) {
  const { region, disease } = await params;
  const r = decodeURIComponent(region);
  const page = findTopicByTitle(disease);
  if (!page) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(localPageSchema(r, page))}
      />

      <SubPageHeader category={`${r} ${page.category}`} title={`${r} ${page.title}`} />

      {/* 지역 맥락 블록 — 원본 상세페이지와 내용이 겹치지 않도록 이 부분만 지역별로 다릅니다 */}
      <section className="mx-auto w-full max-w-5xl px-5 pt-10 sm:pt-14">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-widest text-slate-500">
            {r.toUpperCase?.() ? r : r} · {page.english}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {r}에서 {page.title} 진료를 찾고 계신가요
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            {clinic.name}는 {clinic.address}에 있습니다. {page.subtitle}
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-4">
              <dt className="text-sm font-semibold text-slate-500">진료시간</dt>
              <dd className="mt-1 text-slate-800">
                {clinic.hours.map((h) => `${h.label} ${h.value}`).join(" · ")}
              </dd>
            </div>
            <div className="rounded-xl bg-white p-4">
              <dt className="text-sm font-semibold text-slate-500">전화</dt>
              <dd className="mt-1 text-slate-800">{phoneText}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-slate-500">
            아래 내용은 {page.title}에 대한 일반적인 건강 정보입니다. 증상과 상태에
            따라 진단과 치료 방법이 다를 수 있으므로 정확한 진단은 진료를 통해
            확인하시기 바랍니다.
          </p>
        </div>
      </section>

      <ServiceDetailPage page={page} />
    </>
  );
}
