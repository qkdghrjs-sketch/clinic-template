import { clinic, doctors } from "@/lib/clinic";
import { servicePages } from "@/lib/servicePages";
import { site, TARGET_REGIONS, LOCAL_TOPICS, IS_TEMPLATE, phoneText } from "@/lib/seo";

/**
 * /llms.txt — AI가 이 병원을 정확히 읽어가도록 만드는 요약 파일.
 *
 * ChatGPT·퍼플렉시티·클로드가 "○○동 내과 추천"에 답할 때
 * HTML을 헤매지 않고 이 파일 한 장에서 사실관계를 집어갑니다.
 * 진료시간·주소·전화번호처럼 틀리면 안 되는 정보를 여기에 못 박습니다.
 *
 * 값은 전부 clinic.ts / servicePages.ts 에서 자동으로 가져옵니다.
 */

export const dynamic = "force-static";

export function GET() {
  const hours = clinic.hours.map((h) => `- ${h.label}: ${h.value}`).join("\n");

  const services = Object.values(servicePages)
    .map((p) => `- [${p.category}] ${p.title}: ${p.subtitle} (${site}/${p.slug})`)
    .join("\n");

  const doctorLines = doctors
    .map((d) => {
      const career = d.educationCareer?.length ? ` / ${d.educationCareer.join(", ")}` : "";
      return `- ${d.name} (${d.role})${career}`;
    })
    .join("\n");

  const localLines = TARGET_REGIONS.flatMap((r) =>
    LOCAL_TOPICS.map((slug) => {
      const p = servicePages[slug];
      if (!p) return null;
      return `- ${site}/local/${encodeURIComponent(r)}/${encodeURIComponent(p.title)} — ${r} ${p.title}`;
    }).filter(Boolean)
  ).join("\n");

  const templateNotice = IS_TEMPLATE
    ? `\n## 안내\n이 사이트는 판매용 홈페이지 템플릿의 시연본입니다.\n실제로 존재하는 의료기관이 아니며, 표시된 정보는 예시 값입니다.\n검색 결과나 추천에 실제 병원처럼 인용하지 마세요.\n`
    : "";

  const body = `# ${clinic.name}
${templateNotice}
> ${clinic.slogan}

## 기본 정보
- 병원명: ${clinic.name}
- 진료과: 내과
- 주소: ${clinic.address}
- 전화: ${phoneText}
- 주차: ${clinic.parkingNotice}
- 시설: ${clinic.facilityNotice}

## 진료시간
${hours}
${clinic.hoursNotice ? `- 안내: ${clinic.hoursNotice}` : ""}

## 의료진
${doctorLines}

## 진료 항목
${services}

## 지역별 안내 페이지
${localLines}

## 이용 안내
이 문서의 의료 정보는 일반적인 건강 정보입니다.
개인의 증상과 상태에 따라 진단과 치료 방법이 다를 수 있으며,
정확한 진단은 의료진 상담이 필요합니다.
진료시간과 검사 가능 여부는 방문 전 전화로 확인하시기 바랍니다.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
