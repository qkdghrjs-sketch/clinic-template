import { clinic, doctors } from "@/lib/clinic";
import { servicePages } from "@/lib/servicePages";
import { site, hasPhone, LOCAL_TOPICS } from "@/lib/seo";

/**
 * GEO — AI 검색이 이 병원을 읽어가게 만드는 구조화 데이터.
 *
 * ChatGPT·퍼플렉시티·클로드가 "○○동 내과 추천"에 답할 때
 * 화면의 글자가 아니라 이 JSON-LD 를 근거로 씁니다.
 * 진료시간·주소처럼 틀리면 안 되는 정보를 기계가 읽는 형태로 못 박습니다.
 *
 * ▶ 이 파일은 건드릴 일이 거의 없습니다. 값은 clinic.ts 에서 자동으로 가져옵니다.
 */

const DAY_MAP: Record<string, string[]> = {
  월: ["Monday"],
  화: ["Tuesday"],
  수: ["Wednesday"],
  목: ["Thursday"],
  금: ["Friday"],
  토: ["Saturday"],
  일: ["Sunday"],
};

const WEEK_ORDER = ["월", "화", "수", "목", "금", "토", "일"];

/** "월-금" → [Monday..Friday], "토요일" → [Saturday] */
function parseDays(label: string): string[] {
  const range = label.match(/([월화수목금토일])\s*[-~]\s*([월화수목금토일])/);
  if (range) {
    const from = WEEK_ORDER.indexOf(range[1]);
    const to = WEEK_ORDER.indexOf(range[2]);
    if (from >= 0 && to >= from) {
      return WEEK_ORDER.slice(from, to + 1).flatMap((d) => DAY_MAP[d] ?? []);
    }
  }
  const single = label.match(/([월화수목금토일])/);
  if (single) return DAY_MAP[single[1]] ?? [];
  return [];
}

/** "09:00 - 18:00" → { opens, closes }. 미입력(00:00 - 00:00)이면 제외합니다. */
function parseTime(value: string) {
  const m = value.match(/(\d{1,2}:\d{2})\s*[-~–]\s*(\d{1,2}:\d{2})/);
  if (!m) return null;
  if (m[1] === "00:00" && m[2] === "00:00") return null; // 아직 안 채운 값
  return { opens: m[1], closes: m[2] };
}

function openingHours() {
  return clinic.hours
    .filter((h) => !h.label.includes("점심"))
    .map((h) => {
      const days = parseDays(h.label);
      const time = parseTime(h.value);
      if (!days.length || !time) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: time.opens,
        closes: time.closes,
      };
    })
    .filter(Boolean);
}

export function medicalClinicSchema() {
  const hours = openingHours();
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${site}/#clinic`,
    name: clinic.name,
    alternateName: clinic.englishName || undefined,
    description: clinic.slogan,
    url: site,
    ...(hasPhone ? { telephone: clinic.phone } : {}),
    medicalSpecialty: "InternalMedicine",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: clinic.address,
    },
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
    availableService: Object.values(servicePages).map((p) => ({
      "@type": p.category === "건강검진" ? "MedicalTest" : "MedicalTherapy",
      name: p.title,
      description: p.subtitle,
      url: `${site}/${p.slug}`,
    })),
    ...(clinic.naverMapUrl ? { hasMap: clinic.naverMapUrl } : {}),
  };
}

export function physicianSchemas() {
  return doctors.map((d, i) => ({
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${site}/#physician-${i + 1}`,
    name: d.name,
    jobTitle: d.role,
    medicalSpecialty: "InternalMedicine",
    ...(d.educationCareer?.length ? { alumniOf: d.educationCareer[0] } : {}),
    ...(d.societies?.length ? { memberOf: d.societies } : {}),
    worksFor: { "@id": `${site}/#clinic` },
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      streetAddress: clinic.address,
    },
  }));
}

export function faqSchema() {
  const hoursText = clinic.hours.map((h) => `${h.label} ${h.value}`).join(", ");
  const qa: { q: string; a: string }[] = [
    { q: `${clinic.name} 진료시간은 어떻게 되나요?`, a: clinic.hoursNotice || hoursText },
    { q: `${clinic.name} 위치가 어디인가요?`, a: clinic.address },
    { q: `${clinic.name} 주차가 가능한가요?`, a: clinic.parkingNotice },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

/** 지역 페이지용 — 어떤 질환에 대한 안내인지 명시 */
export function localPageSchema(region: string, page: { title: string; subtitle: string; introParagraphs: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${region} ${page.title} - ${clinic.name}`,
    description: page.subtitle,
    about: {
      "@type": "MedicalCondition",
      name: page.title,
      description: page.introParagraphs[0] ?? page.subtitle,
    },
    mainEntityOfPage: { "@id": `${site}/#clinic` },
    audience: { "@type": "Patient" },
    lastReviewed: new Date().toISOString().slice(0, 10),
  };
}

/** 진료 상세페이지용 */
export function servicePageSchema(slug: string) {
  const p = servicePages[slug];
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${p.title} - ${clinic.name}`,
    description: p.subtitle,
    about: { "@type": "MedicalCondition", name: p.title },
    mainEntityOfPage: { "@id": `${site}/#clinic` },
    audience: { "@type": "Patient" },
  };
}

export const LOCAL_TOPIC_SLUGS = LOCAL_TOPICS;

/** JSON-LD 를 <script> 로 심을 때 XSS 방지용 이스케이프 */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
