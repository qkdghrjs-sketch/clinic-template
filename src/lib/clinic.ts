export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; disabled?: boolean }[];
};

export type Doctor = {
  name: string;
  role: string;
  headline: string;
  quote: string;
  badges: string[];
  educationCareer: string[];
  societies: string[];
  conferences?: string[];
  papers?: string[];
  philosophy: string;
  photo?: string;
};

/**
 * [병원별 수정 필요] 이 파일 하나가 병원 정보의 유일한 원본입니다.
 * ○○ 로 표시된 값은 전부 실제 병원 정보로 바꿔주세요.
 * 빈 문자열("")로 둔 항목은 값이 없을 때 화면에서 자동으로 대체 문구가 나오도록 처리되어 있습니다.
 */
export const clinic = {
  name: "○○내과의원",
  shortName: "○○내과의원",
  englishName: "OO INTERNAL MEDICINE CLINIC",
  slogan: "우리 동네에서 만나는 내과 주치의",
  /** 병원 컨셉: 메인 하단 배너와 오시는 길 섹션에 사용됩니다 */
  concept: {
    eyebrow: "우리 동네 주치의",
    headline: "가까워서 자주, 오래 봐서 정확하게",
    desc: "한 번 보고 끝나는 진료가 아니라, 가까운 거리에서 꾸준히 지켜보며 변화를 아는 진료를 지향합니다.",
    points: [
      "언제든 편하게 들를 수 있는 가까운 거리",
      "지난 검사와 복용약을 기억하는 진료",
      "가족의 건강까지 함께 살피는 주치의"
    ]
  },
  /** 세부페이지 상단에 공통으로 노출되는 도입 문구와 선택 이유 */
  intro: {
    eyebrow: "WHY OUR CLINIC",
    lead: "우리 동네 주치의 ○○내과의원,",
    headline: "내과 전문의에게 받는 체계적인 진료",
    desc: "증상 상담부터 검사, 결과 설명, 이후 관리까지 같은 기준으로 이어갑니다.",
    reasonsTitle: "○○내과의원을 선택하는 3가지 이유",
    reasons: [
      {
        num: "01",
        title: "내과 전문의 직접 진료",
        desc: "내과 진료와 검사를 전문의가 처음부터 끝까지 직접 살핍니다."
      },
      {
        num: "02",
        title: "검진부터 추적관리까지 한 흐름",
        desc: "검사로 끝내지 않고 이상 소견의 원인 확인, 치료, 재검 계획까지 이어갑니다."
      },
      {
        num: "03",
        title: "가까운 거리에서 오래 함께",
        desc: "언제든 편하게 들러 꾸준히 관리받을 수 있습니다."
      }
    ]
  },
  address: "○○시 ○○로 00 ○○빌딩 0층",
  addressShort: "○○시 ○○로 00 ○○빌딩 0층",
  /** 비워두면 화면에 phoneDisplay의 대체 문구가 표시됩니다 */
  phone: "",
  phoneLabel: "",
  reservationUrl: "",
  blogUrl: "",
  kakaoChannelUrl: "",
  /** 지도 링크: 검색어 부분을 실제 병원 주소로 바꿔주세요 */
  naverMapUrl: "https://map.naver.com/p/search/○○내과의원",
  kakaoMapUrl: "https://map.kakao.com/link/search/○○내과의원",
  tmapUrl: "https://tmap.life/search?keyword=○○내과의원",
  /** 비워두면 로고 자리에 병원 이름 텍스트가 대신 표시됩니다 */
  logoPrimary: "",
  logoSecondary: "",
  businessNumber: "",
  representative: "○○○",
  hoursNotice: "진료시간 안내 문구를 입력하세요. (예: 월-금 09:00-18:00, 토요일 09:00-13:00 진료합니다. 점심시간은 13:00-14:00입니다.)",
  hours: [
    { label: "월-금", value: "00:00 - 00:00" },
    { label: "토요일", value: "00:00 - 00:00" },
    { label: "점심시간", value: "00:00 - 00:00" }
  ],
  parkingNotice: "주차 안내 문구를 입력하세요.",
  facilityNotice: "시설 안내 문구를 입력하세요."
} as const;

/** 대표전화가 아직 확정되지 않았을 때 화면에 표시할 대체 문구 */
export const phoneDisplay = clinic.phone || clinic.phoneLabel || "전화번호 준비 중";

/**
 * [병원별 수정 필요] 병원 사진 URL 목록.
 *
 * 지금 들어 있는 사진은 Unsplash 무료 이미지(상업적 이용 가능, 출처 표기 불필요)로,
 * 템플릿 미리보기용입니다. 실제 병원 사진으로 반드시 교체하세요.
 *
 * 교체 방법
 *  - 직접 찍은 사진: public/ 폴더에 넣고 "/사진이름.jpg" 형태로 적으면 됩니다.
 *  - 외부 주소: next.config.ts의 images.remotePatterns에 그 도메인을 추가해야 화면에 나옵니다.
 *
 * 이 배열은 메인 진료센터 카드, 첫 화면 배경, 장비 섹션 배경에 돌아가며 쓰입니다.
 */
export const suppliedImages = [
  // 0 진료 상담 (건강검진센터 카드 · 첫 화면 1번)
  "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1600&q=80",
  // 1 검사·시술 (내시경센터 카드)
  "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1600&q=80",
  // 2 혈압 측정 (만성질환클리닉 카드)
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1600&q=80",
  // 3 청진기·약 (특수클리닉 카드)
  "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1600&q=80",
  // 4 의료진 (첫 화면 2번)
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1600&q=80",
  // 5 검사실 장비
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
  // 6 밝은 검사실 (장비 섹션 배경)
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
  // 7 검사 장비
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
  // 8 진료실 (첫 화면 3번)
  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80",
  // 9 영상 판독
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1600&q=80",
  // 10 진료 상담
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1600&q=80",
  // 11 청진기
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80"
];

export const pickImage = (index: number) => suppliedImages[index % suppliedImages.length];

export type TourImage = {
  src: string;
  title: string;
  desc: string;
};

/**
 * 둘러보기(내부 전경) 사진. 접수 동선 순서대로 정렬합니다.
 * [병원별 수정 필요] src(사진)와 desc(설명)를 실제 병원에 맞게 바꿔주세요.
 * title은 메인 화면 미리보기에서 이름으로 찾아 쓰이므로 되도록 그대로 두세요.
 * (TourSection.tsx의 previewTitles: 병원 입구 / 대기 공간 / 진료 동선 / 내시경실 / 초음파 검사실 내부 / X-RAY실)
 */
export const tourImages: TourImage[] = [
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    title: "병원 입구",
    desc: "엘리베이터에서 내리면 바로 보이는 입구입니다."
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    title: "복도 사인월",
    desc: "정확한 진단, 편안한 진료 — 건강한 내일을 함께 만듭니다."
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80",
    title: "진료 안내",
    desc: "건강검진·위대장내시경·초음파검사·영양수액을 한 곳에서 안내드립니다."
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    title: "출입문",
    desc: "진료시간과 대표전화를 문 앞에서 바로 확인하실 수 있습니다."
  },
  {
    src: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1600&q=80",
    title: "대기 공간",
    desc: "차분한 조도와 넉넉한 좌석으로 편안하게 기다리실 수 있습니다."
  },
  {
    src: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=1600&q=80",
    title: "진료 동선",
    desc: "진료실·내시경실·초음파실·X-RAY실이 한 복도에 이어져 이동이 짧습니다."
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    title: "내시경실",
    desc: "위·대장내시경과 수면내시경을 진행하는 공간입니다."
  },
  {
    src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80",
    title: "초음파실",
    desc: "복부·갑상선 초음파 검사를 독립된 공간에서 진행합니다."
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    title: "초음파 검사실 내부",
    desc: "검사 장비와 베드를 갖춰 편안한 자세로 검사를 받으실 수 있습니다."
  },
  {
    src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
    title: "X-RAY실",
    desc: "흉부·복부 촬영으로 필요한 검사를 원내에서 바로 확인합니다."
  },
  {
    src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1600&q=80",
    title: "주사실",
    desc: "예방접종과 영양수액 치료가 이루어지는 공간입니다."
  }
];

/**
 * 상단 메뉴 구조. 여기에 적힌 href는 반드시 실제로 열리는 주소여야 합니다.
 * 페이지를 추가하려면 servicePages.ts에 항목을 추가하고 여기에 링크를 넣으세요.
 */
export const navItems: NavItem[] = [
  {
    label: "병원소개",
    href: "/doctors",
    children: [
      { label: "의료진 소개", href: "/doctors" },
      { label: "진료시간", href: "/about/hours" },
      { label: "오시는 길", href: "/about/location" },
      { label: "둘러보기", href: "/about/tour" },
      { label: "비급여 안내", href: "/medical-info" }
    ]
  },
  {
    label: "건강검진센터",
    href: "/checkup/cancer",
    children: [
      { label: "5대암 국가검진", href: "/checkup/cancer" },
      { label: "종합검진", href: "/checkup/comprehensive" },
      { label: "여성암검진", href: "/checkup/women-cancer" },
      { label: "채용검진", href: "/checkup/employment" }
    ]
  },
  {
    label: "내시경센터",
    href: "/endoscopy/stomach",
    children: [
      { label: "위내시경", href: "/endoscopy/stomach" },
      { label: "대장내시경", href: "/endoscopy/colon" },
      { label: "용종절제술", href: "/endoscopy/polypectomy" },
      { label: "수면내시경", href: "/endoscopy/sedation" }
    ]
  },
  {
    label: "내과진료",
    href: "/departments/gastroenterology",
    children: [
      { label: "소화기센터", href: "/departments/gastroenterology" },
      { label: "순환기센터", href: "/departments/cardiology" },
      { label: "호흡기·알레르기", href: "/departments/respiratory" },
      { label: "초음파검사", href: "/special/ultrasound" },
      { label: "예방접종", href: "/vaccination" }
    ]
  },
  {
    label: "만성질환",
    href: "/chronic/hypertension",
    children: [
      { label: "고혈압", href: "/chronic/hypertension" },
      { label: "당뇨", href: "/chronic/diabetes" },
      { label: "고지혈증", href: "/chronic/dyslipidemia" },
      { label: "골다공증", href: "/special/osteoporosis" }
    ]
  },
  {
    label: "특수클리닉",
    href: "/special/ultrasound",
    children: [
      { label: "초음파검사", href: "/special/ultrasound" },
      { label: "기능의학", href: "/special/functional-medicine" },
      { label: "영양수액", href: "/special/iv-therapy" },
      { label: "비만클리닉", href: "/special/obesity" },
      { label: "예방접종", href: "/vaccination" },
      { label: "골다공증", href: "/special/osteoporosis" }
    ]
  }
];

/**
 * [병원별 수정 필요] 의료진 정보.
 * 원장님이 여러 분이면 같은 형태로 배열에 추가하면 됩니다.
 * 약력·학회·자격은 반드시 병원에서 확인받은 내용만 입력하세요.
 */
export const doctors: Doctor[] = [
  {
    name: "○○○",
    role: "원장, 내과 전문의",
    headline: "내과 전문의",
    quote: "환자분의 증상과 검사 결과를 연결해 꼭 필요한 진료를 정확하게 안내하겠습니다.",
    badges: ["내과 전문의", "○○ 세부전문의", "○○학회 정회원"],
    educationCareer: [
      "○○대학교 의과대학 졸업",
      "○○대학교병원 인턴",
      "○○대학교병원 내과 전공의",
      "내과 전문의"
    ],
    societies: [
      "대한내과학회 정회원",
      "○○학회 정회원"
    ],
    philosophy: "정확한 진단과 차분한 설명으로, 가까운 곳에서 오래 함께하는 우리 동네 주치의가 되겠습니다.",
    photo: ""
  }
];

export const serviceCards = [
  { title: "건강검진센터", desc: "국가검진부터 맞춤 검진까지\n질병의 조기 발견과 예방", image: pickImage(0), href: "/checkup/cancer" },
  { title: "내시경센터", desc: "위·대장내시경\n정확하고 편안한 검사", image: pickImage(1), href: "/endoscopy/stomach" },
  { title: "만성질환클리닉", desc: "고혈압·당뇨·고지혈증\n개인별 장기 관리", image: pickImage(2), href: "/chronic/hypertension" },
  { title: "특수클리닉", desc: "초음파·기능의학·영양수액\n삶의 질을 높이는 진료", image: pickImage(3), href: "/special/ultrasound" }
];

export const imageSet = {
  hero: [pickImage(0), pickImage(4), pickImage(8)],
  endoscopy: pickImage(1),
  equipment: pickImage(6),
  gallery: suppliedImages
};
