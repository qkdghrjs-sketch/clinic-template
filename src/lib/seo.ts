import { clinic } from "@/lib/clinic";
import { servicePages } from "@/lib/servicePages";

/**
 * [병원별 수정 필요] 검색 노출 설정.
 *
 * 이 파일 하나가 GEO(AI 검색)와 네이버 SEO 동작을 모두 결정합니다.
 */

/**
 * 템플릿 모드 스위치.
 *
 * true  = 이 사이트는 판매용 템플릿 데모입니다. 검색엔진이 수집하지 않습니다.
 *          (템플릿이 "○○내과의원"이라는 이름으로 검색에 뜨면 안 되므로 기본값입니다)
 * false = 실제 병원 사이트입니다. 검색엔진과 AI 크롤러가 모두 수집합니다.
 *
 * ▶ 실제 병원 사이트를 만들 때 이 값을 false 로 바꾸세요. 그 한 줄이면 됩니다.
 *   (robots.txt, 메타 robots, sitemap 이 한꺼번에 바뀝니다)
 */
export const IS_TEMPLATE = true;

/** [병원별 수정 필요] 배포 후 실제 주소로 바꾸세요. sitemap과 구조화 데이터가 이 값을 씁니다. */
export const SITE_URL = "https://example.vercel.app";

/** [병원별 수정 필요] 네이버 서치어드바이저 / 구글 서치콘솔 인증 코드 */
export const NAVER_SITE_VERIFICATION = "";
export const GOOGLE_SITE_VERIFICATION = "";

/**
 * [병원별 수정 필요] 네이버 "지역명 + 질환명" 검색을 노리는 지역 목록.
 *
 * 병원이 있는 동네와 인접 생활권을 적으세요.
 * 여기 적은 지역 수 × 아래 LOCAL_TOPICS 수 만큼 페이지가 자동 생성됩니다.
 * (예: 지역 3개 × 주제 8개 = 24페이지)
 *
 * 실제로 검증된 공식입니다. 없는 지역을 욕심내지 말고
 * 환자가 실제로 오는 동네만 적으세요.
 */
export const TARGET_REGIONS = ["○○동", "○○읍", "○○구"];

/**
 * 지역 페이지로 만들 주제. servicePages 의 슬러그를 그대로 씁니다.
 * 내용을 새로 쓰는 게 아니라 기존 상세페이지 내용을 지역 맥락으로 감싸서 보여줍니다.
 */
export const LOCAL_TOPICS = [
  "chronic/hypertension",
  "chronic/diabetes",
  "chronic/dyslipidemia",
  "endoscopy/stomach",
  "endoscopy/colon",
  "checkup/comprehensive",
  "special/osteoporosis",
  "special/ultrasound",
] as const;

export const site = SITE_URL.replace(/\/$/, "");

/** /local/[region]/[disease] 조합 */
export function localPairs() {
  const pairs: { region: string; disease: string }[] = [];
  for (const region of TARGET_REGIONS) {
    for (const slug of LOCAL_TOPICS) {
      const page = servicePages[slug];
      if (!page) continue;
      pairs.push({ region, disease: page.title });
    }
  }
  return pairs;
}

/** 지역 페이지의 질환명(한글 title)으로 원본 servicePage 를 찾습니다. */
export function findTopicByTitle(title: string) {
  const decoded = decodeURIComponent(title);
  for (const slug of LOCAL_TOPICS) {
    const page = servicePages[slug];
    if (page && page.title === decoded) return page;
  }
  return null;
}

/**
 * 전화번호가 비어 있을 수 있으므로 스키마에 넣기 전에 확인합니다.
 * clinic 객체가 `as const` 라서 clinic.phone 이 빈 문자열 리터럴 타입으로
 * 좁혀집니다. string 으로 넓혀서 비교해야 합니다.
 */
export const clinicPhone: string = clinic.phone;
export const hasPhone = clinicPhone.trim().length > 0;

/**
 * 화면·llms.txt 에 쓸 전화번호 문자열.
 * 저장소마다 clinic.ts 에 phoneDisplay 가 있기도 없기도 해서 여기서 만듭니다.
 */
export const phoneText = hasPhone ? clinicPhone : "전화번호 준비 중";
