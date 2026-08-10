import { pickImage } from "@/lib/clinic";

/**
 * 세부 진료 페이지의 모든 문구가 여기에 들어 있습니다.
 *
 * 새 병원을 세팅할 때는 아래 `// [병원별 수정 필요]` 주석이 달린 줄을 찾아
 * 그 병원에 맞는 내용으로 바꾸거나, 해당 진료를 하지 않으면 항목 전체를 지우세요.
 * (항목을 지우면 clinic.ts의 navItems에서 해당 메뉴 링크도 함께 지워야 합니다.)
 *
 * 주석이 없는 나머지 문구는 일반적인 내과 설명이라 그대로 써도 무방합니다.
 */

export type ServicePage = {
  slug: string;
  category: string;
  title: string;
  english: string;
  eyebrow: string;
  subtitle: string;
  badges: string[];
  image: string;
  introTitle: string;
  introEnglish: string;
  introParagraphs: string[];
  symptomTitle: string;
  symptomGroups: {
    label: string;
    danger?: boolean;
    items: { title: string; desc: string }[];
  }[];
  treatmentTitle: string;
  treatmentDesc: string;
  treatments: { title: string; items: string[] }[];
  summaryTitle: string;
  summaries: string[];
};

const chronicTreatments = [
  {
    title: "정기 검사와 수치 추적",
    items: ["현재 수치를 확인하고 변화 추이를 함께 봅니다.", "위험 인자와 가족력을 함께 평가합니다.", "필요 시 합병증 선별 검사를 연결합니다."]
  },
  {
    title: "생활습관 교정",
    items: ["식사·운동·수면·음주 습관을 현실적으로 조정합니다.", "환자분의 직업과 일상에 맞는 관리 목표를 세웁니다.", "무리한 계획보다 오래 지속 가능한 방식을 우선합니다."]
  },
  {
    title: "개인별 약물 치료",
    items: ["연령과 동반 질환을 고려해 약제를 선택합니다.", "복약 후 수치와 불편감을 확인하며 조정합니다.", "임의 중단 없이 꾸준히 관리하도록 안내합니다."]
  }
];

export const servicePages: Record<string, ServicePage> = {
  "checkup/cancer": {
    slug: "checkup/cancer",
    category: "건강검진센터",
    title: "5대암 국가검진",
    english: "National Cancer Screening",
    eyebrow: "CHECKUP CENTER · 국가검진",
    subtitle: "국가검진 항목을 정확히 안내하고 이상 소견은 진료와 연결합니다.",
    badges: ["위암", "대장암", "간암", "유방암", "자궁경부암"],
    image: pickImage(0),
    introTitle: "국가검진이란?",
    introEnglish: "Cancer Screening",
    introParagraphs: [
      "국가암검진은 주요 암을 조기에 발견하기 위해 연령과 성별에 따라 권장되는 검진입니다.",
      "검진은 단순히 결과지만 받는 과정이 아니라, 이상 소견을 정확히 해석하고 필요한 진료로 이어지는 것이 중요합니다.",
      // [병원별 수정 필요]
      "○○내과의원은 검진 전 준비부터 검사 후 결과 설명과 추적 계획까지 한 흐름으로 안내합니다."
    ],
    symptomTitle: "검진이 특히 필요한 경우",
    symptomGroups: [
      { label: "검진 대상", items: [{ title: "검진 안내문 수령", desc: "국가검진 대상자 확인" }, { title: "가족력", desc: "암 가족력이 있는 경우" }, { title: "증상 동반", desc: "복통·체중감소·혈변 등" }] },
      { label: "결과 확인", danger: true, items: [{ title: "이상 소견", desc: "추가 검사 필요 여부 판단" }, { title: "추적 관리", desc: "재검 시기 안내" }, { title: "진료 연계", desc: "증상과 결과를 함께 평가" }] }
    ],
    treatmentTitle: "검진 진행 방식",
    treatmentDesc: "대상자 확인부터 결과 상담까지 편안하게 안내합니다.",
    treatments: [
      { title: "검진 전 확인", items: ["대상자 여부와 검진 항목을 확인합니다.", "검사 전 금식과 복용약을 안내합니다.", "대장내시경이 필요한 경우 장정결을 설명합니다."] },
      { title: "검사 시행", items: ["문진과 기본 검사를 진행합니다.", "위·대장내시경 등 필요한 검사를 연결합니다.", "검사 중 불편감을 줄이는 동선을 준비합니다."] },
      { title: "결과 상담", items: ["결과를 이해하기 쉽게 설명합니다.", "이상 소견은 추가 검사와 치료 계획을 세웁니다.", "추적 검진 시기를 안내합니다."] }
    ],
    summaryTitle: "국가검진 핵심 요약",
    summaries: ["대상자 여부와 검진 항목을 먼저 확인합니다.", "검진 결과는 증상과 가족력을 함께 고려해 해석합니다.", "이상 소견이 있으면 추가 검사와 추적 계획이 중요합니다."]
  },
  "checkup/comprehensive": {
    slug: "checkup/comprehensive",
    category: "건강검진센터",
    title: "종합검진",
    english: "Comprehensive Checkup",
    eyebrow: "CHECKUP CENTER · 종합검진",
    subtitle: "나이, 가족력, 생활습관에 맞춘 검진 구성을 지향합니다.",
    badges: ["맞춤 설계", "혈액검사", "초음파", "내시경", "결과 상담"],
    image: pickImage(1),
    introTitle: "종합검진이란?",
    introEnglish: "Personalized Checkup",
    introParagraphs: ["종합검진은 현재 건강 상태와 앞으로의 질환 위험을 함께 확인하는 과정입니다.", "많은 검사를 무조건 시행하기보다 연령, 가족력, 증상, 생활습관에 맞춰 필요한 항목을 우선합니다.", "검진 후에는 수치의 의미를 설명하고 생활습관 관리와 진료 계획으로 이어지게 합니다."],
    symptomTitle: "검진 설계 포인트",
    symptomGroups: [{ label: "확인 항목", items: [{ title: "생활습관", desc: "음주·흡연·운동 평가" }, { title: "가족력", desc: "심혈관·암 위험 확인" }, { title: "현재 증상", desc: "소화기·호흡기 증상 확인" }] }, { label: "추적 필요", danger: true, items: [{ title: "혈압·혈당", desc: "만성질환 위험 확인" }, { title: "간기능·지질", desc: "대사질환 평가" }, { title: "초음파·내시경", desc: "필요 시 정밀 검사" }] }],
    treatmentTitle: "종합검진 진행 방식",
    treatmentDesc: "필요한 검사를 우선해 합리적인 검진 흐름을 만듭니다.",
    treatments: chronicTreatments,
    summaryTitle: "종합검진 핵심 요약",
    summaries: ["검진은 항목 수보다 나에게 필요한 구성인지가 중요합니다.", "결과 설명과 추적 계획이 함께 있어야 검진의 의미가 커집니다.", "이상 소견은 진료와 연결해 지속 관리합니다."]
  },
  "checkup/women-cancer": {
    slug: "checkup/women-cancer",
    category: "건강검진센터",
    title: "여성암검진",
    english: "Women Cancer Screening",
    eyebrow: "CHECKUP CENTER · 여성검진",
    subtitle: "여성에게 필요한 검진 항목을 편안하게 안내합니다.",
    badges: ["검진 상담", "결과 확인", "추적 검사", "생활 관리"],
    image: pickImage(2),
    introTitle: "여성암검진이란?",
    introEnglish: "Women Screening",
    introParagraphs: ["여성암검진은 연령과 위험도에 따라 필요한 항목을 확인하는 예방 중심 검진입니다.", "검진 전 불편감과 걱정을 줄이기 위해 준비사항과 진행 과정을 충분히 안내합니다.", "검사 결과는 향후 추적 일정과 함께 설명하는 것이 중요합니다."],
    symptomTitle: "검진 전 확인할 내용",
    symptomGroups: [{ label: "검진 대상", items: [{ title: "연령", desc: "권장 검진 시기 확인" }, { title: "가족력", desc: "암 가족력 확인" }, { title: "증상", desc: "통증·출혈 등 확인" }] }, { label: "주의 항목", danger: true, items: [{ title: "이상 소견", desc: "추가 검사 여부 판단" }, { title: "결과 상담", desc: "검진 결과 설명" }, { title: "정기 추적", desc: "재검 일정 안내" }] }],
    treatmentTitle: "여성암검진 안내 방식",
    treatmentDesc: "검진 전후로 필요한 정보를 차분하게 설명합니다.",
    treatments: chronicTreatments,
    summaryTitle: "여성암검진 핵심 요약",
    summaries: ["연령과 가족력에 따라 필요한 검진이 달라집니다.", "검진 후 결과 해석과 재검 일정 안내가 중요합니다.", "불편한 증상이 있다면 검진과 진료를 함께 고려합니다."]
  },
  "checkup/employment": {
    slug: "checkup/employment",
    category: "건강검진센터",
    title: "채용검진",
    english: "Employment Checkup",
    eyebrow: "CHECKUP CENTER · 채용검진",
    // [병원별 수정 필요]
    subtitle: "채용 및 제출용 검진은 개원 후 세부 항목을 공지합니다.",
    badges: ["문진", "기본 검사", "결과 발급", "서류 안내"],
    image: pickImage(3),
    introTitle: "채용검진이란?",
    introEnglish: "Employment Checkup",
    // [병원별 수정 필요]
    introParagraphs: ["채용검진은 입사나 기관 제출을 위해 기본 건강 상태를 확인하는 검사입니다.", "제출 기관마다 요구 항목이 다를 수 있어 검진 전 필요한 서류와 항목 확인이 중요합니다.", "○○내과의원의 세부 시행 항목과 발급 일정은 개원 전 확정 후 안내 예정입니다."],
    symptomTitle: "준비사항",
    symptomGroups: [{ label: "검진 전", items: [{ title: "제출처 확인", desc: "필요 항목 확인" }, { title: "신분증", desc: "본인 확인 준비" }, { title: "금식 여부", desc: "검사 항목에 따라 안내" }] }, { label: "발급", danger: true, items: [{ title: "결과 확인", desc: "검사 결과 검토" }, { title: "서류 발급", desc: "제출용 서류 준비" }, { title: "재검 안내", desc: "이상 소견 시 안내" }] }],
    treatmentTitle: "채용검진 진행 방식",
    treatmentDesc: "필요 서류와 항목을 확인한 뒤 검진을 진행합니다.",
    treatments: chronicTreatments,
    summaryTitle: "채용검진 핵심 요약",
    // [병원별 수정 필요]
    summaries: ["제출처가 요구하는 검진 항목을 먼저 확인합니다.", "검사 결과에 따라 발급 시점이 달라질 수 있습니다.", "세부 시행 항목은 개원 전 최종 공지 예정입니다."]
  },
  "endoscopy/stomach": {
    slug: "endoscopy/stomach",
    category: "내시경센터",
    title: "위내시경",
    english: "Gastroscopy",
    eyebrow: "ENDOSCOPY CENTER · 위내시경",
    subtitle: "상부위장관 증상과 검진 목적에 맞춰 정확한 위내시경을 시행합니다.",
    badges: ["속쓰림", "소화불량", "위염", "헬리코박터", "위암 검진"],
    image: pickImage(4),
    introTitle: "위내시경이란?",
    introEnglish: "Gastroscopy",
    introParagraphs: ["위내시경은 식도, 위, 십이지장을 직접 관찰해 염증, 궤양, 종양 등을 확인하는 검사입니다.", "속쓰림, 소화불량, 상복부 통증 같은 증상이 반복될 때 원인을 찾는 데 도움이 됩니다.", "검사 후에는 결과를 충분히 설명하고 필요한 약물 치료와 추적 검사를 안내합니다."],
    symptomTitle: "위내시경이 필요한 경우",
    symptomGroups: [{ label: "의심 증상", items: [{ title: "속쓰림", desc: "반복되는 가슴쓰림" }, { title: "소화불량", desc: "더부룩함과 식후 불편감" }, { title: "상복부 통증", desc: "명치 부위 통증" }] }, { label: "주의 증상", danger: true, items: [{ title: "체중 감소", desc: "원인 없는 체중 저하" }, { title: "흑색변", desc: "위장관 출혈 가능성" }, { title: "삼킴 곤란", desc: "식도 질환 평가 필요" }] }],
    treatmentTitle: "위내시경 진행 방식",
    treatmentDesc: "검사 전 준비부터 결과 상담까지 안전하게 안내합니다.",
    treatments: [{ title: "검사 전 준비", items: ["금식 시간과 복용약을 확인합니다.", "기저질환과 진정내시경 가능 여부를 문진합니다.", "검사 과정과 주의사항을 설명합니다."] }, { title: "검사 시행", items: ["식도·위·십이지장을 순서대로 관찰합니다.", "필요 시 조직검사 또는 헬리코박터 검사를 시행합니다.", "검사 중 안전 모니터링을 시행합니다."] }, { title: "검사 후 관리", items: ["결과를 이해하기 쉽게 설명합니다.", "위염·역류질환 등 치료 계획을 세웁니다.", "추적 검사 시기를 안내합니다."] }],
    summaryTitle: "위내시경 핵심 요약",
    summaries: ["속쓰림·소화불량이 반복되면 정확한 평가가 필요합니다.", "검사 전 금식과 복용약 확인이 중요합니다.", "검사 결과에 따라 약물치료와 추적 계획을 세웁니다."]
  },
  "endoscopy/colon": {
    slug: "endoscopy/colon",
    category: "내시경센터",
    title: "대장내시경",
    english: "Colonoscopy",
    eyebrow: "ENDOSCOPY CENTER · 대장내시경",
    subtitle: "대장암 예방과 장 증상 평가를 위한 대장내시경을 안내합니다.",
    badges: ["대장암 검진", "혈변", "변비", "설사", "용종 확인"],
    image: pickImage(5),
    introTitle: "대장내시경이란?",
    introEnglish: "Colonoscopy",
    introParagraphs: ["대장내시경은 대장 전체를 직접 확인해 용종, 염증, 출혈, 종양 등을 평가하는 검사입니다.", "대장암의 많은 경우 용종에서 시작되므로 조기 발견과 적절한 절제가 중요합니다.", "검사 전 장정결이 검사 정확도에 큰 영향을 주므로 준비 과정을 꼼꼼히 안내합니다."],
    symptomTitle: "대장내시경이 필요한 경우",
    symptomGroups: [{ label: "의심 증상", items: [{ title: "혈변", desc: "변에 피가 섞임" }, { title: "배변 변화", desc: "변비·설사 반복" }, { title: "복통", desc: "반복되는 하복부 통증" }] }, { label: "위험 요인", danger: true, items: [{ title: "가족력", desc: "대장암 가족력" }, { title: "용종 과거력", desc: "추적 검사 필요" }, { title: "빈혈", desc: "장 출혈 가능성 평가" }] }],
    treatmentTitle: "대장내시경 진행 방식",
    treatmentDesc: "장정결부터 결과 상담까지 단계별로 안내합니다.",
    treatments: chronicTreatments,
    summaryTitle: "대장내시경 핵심 요약",
    summaries: ["장정결 상태가 검사 정확도에 중요합니다.", "용종 발견 시 상태에 따라 절제와 추적 계획을 세웁니다.", "대장암 가족력이나 혈변이 있다면 적극적인 평가가 필요합니다."]
  },
  "endoscopy/polypectomy": {
    slug: "endoscopy/polypectomy",
    category: "내시경센터",
    title: "용종절제술",
    english: "Polypectomy",
    eyebrow: "ENDOSCOPY CENTER · 용종절제술",
    subtitle: "검사 중 발견되는 용종은 상태에 따라 치료와 추적 계획을 세웁니다.",
    badges: ["당일 절제", "조직검사", "추적 내시경", "대장암 예방"],
    image: pickImage(6),
    introTitle: "용종절제술이란?",
    introEnglish: "Polypectomy",
    introParagraphs: ["용종절제술은 내시경 중 발견된 용종을 기구로 제거하는 시술입니다.", "모든 용종이 암은 아니지만 일부는 시간이 지나 암으로 진행할 수 있어 적절한 평가와 제거가 중요합니다.", "절제 후에는 출혈 예방을 위한 주의사항과 조직검사 결과에 따른 추적 계획을 안내합니다."],
    symptomTitle: "용종 관리가 필요한 경우",
    symptomGroups: [{ label: "발견 상황", items: [{ title: "검진 중 발견", desc: "무증상 용종" }, { title: "혈변 평가", desc: "출혈 원인 확인" }, { title: "가족력", desc: "대장암 위험도 평가" }] }, { label: "시술 후 주의", danger: true, items: [{ title: "출혈", desc: "시술 후 주의사항" }, { title: "복통", desc: "이상 증상 확인" }, { title: "추적 검사", desc: "재검 시기 결정" }] }],
    treatmentTitle: "용종절제 진행 방식",
    treatmentDesc: "용종의 크기와 위치를 고려해 안전하게 진행합니다.",
    treatments: chronicTreatments,
    summaryTitle: "용종절제 핵심 요약",
    summaries: ["용종은 크기와 모양에 따라 절제 여부가 달라집니다.", "절제 후 조직검사 결과 확인이 중요합니다.", "결과에 따라 추적 내시경 시기를 결정합니다."]
  },
  "endoscopy/sedation": {
    slug: "endoscopy/sedation",
    category: "내시경센터",
    title: "수면내시경",
    english: "Sedation Endoscopy",
    eyebrow: "ENDOSCOPY CENTER · 수면내시경",
    subtitle: "안전한 진정 관리와 회복 안내를 중요하게 생각합니다.",
    badges: ["진정 전 문진", "모니터링", "회복 관찰", "보호자 안내"],
    image: pickImage(7),
    introTitle: "수면내시경이란?",
    introEnglish: "Sedation Endoscopy",
    introParagraphs: ["수면내시경은 진정제를 사용해 검사 중 불편감을 줄이는 내시경 검사 방식입니다.", "안전한 시행을 위해 기저질환, 복용약, 과거 진정제 반응 등을 확인합니다.", "검사 후에는 충분한 회복 시간을 갖고 당일 운전이나 중요한 의사결정은 피하도록 안내합니다."],
    symptomTitle: "수면내시경 전 확인사항",
    symptomGroups: [{ label: "사전 확인", items: [{ title: "복용약", desc: "항응고제 등 확인" }, { title: "기저질환", desc: "심폐질환 여부" }, { title: "과거 반응", desc: "진정제 부작용 확인" }] }, { label: "검사 후 주의", danger: true, items: [{ title: "운전 금지", desc: "당일 운전 피하기" }, { title: "회복 관찰", desc: "충분한 안정 필요" }, { title: "보호자", desc: "필요 시 동반 권장" }] }],
    treatmentTitle: "수면내시경 진행 방식",
    treatmentDesc: "진정 전 확인과 검사 후 회복을 세심하게 안내합니다.",
    treatments: chronicTreatments,
    summaryTitle: "수면내시경 핵심 요약",
    summaries: ["검사 전 기저질환과 복용약 확인이 필요합니다.", "검사 중 안전 모니터링과 회복 관찰이 중요합니다.", "당일 운전과 무리한 활동은 피해야 합니다."]
  },
  "departments/gastroenterology": {
    slug: "departments/gastroenterology",
    category: "내과진료",
    title: "소화기센터",
    english: "Gastroenterology",
    eyebrow: "INTERNAL MEDICINE · 소화기센터",
    subtitle: "위장관 증상부터 간·담도·췌장 관련 상담까지 폭넓게 진료합니다.",
    badges: ["복통", "소화불량", "역류질환", "간기능", "장질환"],
    image: pickImage(8),
    introTitle: "소화기 진료란?",
    introEnglish: "Digestive Care",
    introParagraphs: ["소화기 진료는 식도, 위, 대장, 간, 담도, 췌장과 관련된 증상을 폭넓게 평가합니다.", "소화불량처럼 흔한 증상도 반복되거나 경고 증상이 동반되면 정확한 평가가 필요합니다.", "내시경, 초음파, 혈액검사 결과를 함께 보며 필요한 치료와 추적 계획을 세웁니다."],
    symptomTitle: "소화기 진료가 필요한 증상",
    symptomGroups: [{ label: "흔한 증상", items: [{ title: "소화불량", desc: "더부룩함·체함" }, { title: "복통", desc: "반복되는 복부 통증" }, { title: "속쓰림", desc: "역류 증상" }] }, { label: "주의 증상", danger: true, items: [{ title: "혈변·흑색변", desc: "출혈 가능성" }, { title: "체중 감소", desc: "정밀 평가 필요" }, { title: "황달", desc: "간담도 평가 필요" }] }],
    treatmentTitle: "소화기 진료 방식",
    treatmentDesc: "증상과 검사 결과를 연결해 원인을 찾아갑니다.",
    treatments: chronicTreatments,
    summaryTitle: "소화기 진료 핵심 요약",
    summaries: ["반복되는 소화기 증상은 정확한 평가가 필요합니다.", "내시경·초음파·혈액검사를 증상에 맞게 선택합니다.", "치료 후에도 재발과 악화를 줄이기 위한 관리가 중요합니다."]
  },
  "departments/cardiology": {
    slug: "departments/cardiology",
    category: "내과진료",
    title: "순환기센터",
    english: "Cardiology Care",
    eyebrow: "INTERNAL MEDICINE · 순환기센터",
    subtitle: "혈압, 흉부 불편감, 심혈관 위험요인을 함께 평가합니다.",
    badges: ["혈압", "가슴 두근거림", "흉부 불편감", "심혈관 위험", "생활습관"],
    image: pickImage(9),
    introTitle: "순환기 진료란?",
    introEnglish: "Cardiovascular Care",
    introParagraphs: ["순환기 진료는 혈압과 심혈관 위험요인을 평가하고 관리하는 진료입니다.", "고혈압, 당뇨, 고지혈증은 심혈관 질환 위험을 높이므로 함께 관리해야 합니다.", "증상과 위험도에 따라 필요한 검사를 안내하고 생활습관과 약물치료를 조정합니다."],
    symptomTitle: "순환기 평가가 필요한 경우",
    symptomGroups: [{ label: "증상", items: [{ title: "흉부 불편감", desc: "가슴 압박감" }, { title: "두근거림", desc: "맥박 불규칙 느낌" }, { title: "숨참", desc: "운동 시 호흡곤란" }] }, { label: "위험 인자", danger: true, items: [{ title: "고혈압", desc: "장기 관리 필요" }, { title: "당뇨", desc: "심혈관 위험 증가" }, { title: "고지혈증", desc: "동맥경화 위험" }] }],
    treatmentTitle: "순환기 진료 방식",
    treatmentDesc: "심혈관 위험요인을 종합적으로 관리합니다.",
    treatments: chronicTreatments,
    summaryTitle: "순환기 진료 핵심 요약",
    summaries: ["혈압·혈당·지질 수치는 함께 관리해야 합니다.", "흉부 불편감과 두근거림은 위험도 평가가 필요합니다.", "생활습관과 약물치료를 병행하면 합병증 예방에 도움이 됩니다."]
  },
  "departments/respiratory": {
    slug: "departments/respiratory",
    category: "내과진료",
    title: "호흡기·알레르기",
    english: "Respiratory & Allergy",
    eyebrow: "INTERNAL MEDICINE · 호흡기 알레르기",
    subtitle: "기침, 호흡기 증상, 알레르기 증상을 진료합니다.",
    badges: ["기침", "가래", "알레르기", "호흡기 감염", "비염"],
    image: pickImage(10),
    introTitle: "호흡기·알레르기 진료란?",
    introEnglish: "Respiratory Care",
    introParagraphs: ["호흡기 진료는 기침, 가래, 호흡곤란, 감염 증상 등을 평가합니다.", "알레르기 증상은 계절과 환경에 따라 반복될 수 있어 원인과 악화 요인을 함께 확인합니다.", "증상 기간, 발열 여부, 과거력에 따라 필요한 검사와 치료를 안내합니다."],
    symptomTitle: "진료가 필요한 증상",
    symptomGroups: [{ label: "호흡기 증상", items: [{ title: "기침", desc: "2주 이상 지속" }, { title: "가래", desc: "색 변화·양 증가" }, { title: "호흡곤란", desc: "숨찬 느낌" }] }, { label: "주의 증상", danger: true, items: [{ title: "고열", desc: "감염 가능성" }, { title: "흉통", desc: "정밀 평가 필요" }, { title: "반복 악화", desc: "만성질환 확인" }] }],
    treatmentTitle: "호흡기 진료 방식",
    treatmentDesc: "증상 기간과 악화 요인을 확인해 치료합니다.",
    treatments: chronicTreatments,
    summaryTitle: "호흡기 진료 핵심 요약",
    summaries: ["기침이 오래가거나 악화되면 평가가 필요합니다.", "알레르기는 환경 조절과 약물 치료를 함께 고려합니다.", "고열·흉통·호흡곤란은 신속한 평가가 필요합니다."]
  },
  "chronic/hypertension": {
    slug: "chronic/hypertension",
    category: "만성질환",
    title: "고혈압",
    english: "Hypertension",
    eyebrow: "CHRONIC DISEASE CLINIC · 고혈압",
    subtitle: "혈압 모니터링부터 합병증 예방까지 내과 전문의가 체계적으로 함께합니다.",
    badges: ["혈압 모니터링", "생활습관 교정", "심혈관 예방", "맞춤 약물 치료"],
    image: pickImage(11),
    introTitle: "고혈압이란?",
    introEnglish: "Hypertension",
    introParagraphs: ["고혈압은 혈관에 가해지는 압력이 정상보다 높은 상태가 지속되는 질환입니다.", "초기에는 증상이 거의 없지만 방치하면 심장, 뇌, 신장, 눈 혈관에 부담을 줄 수 있습니다.", "정기적인 혈압 측정, 생활습관 교정, 필요한 경우 약물치료를 꾸준히 이어가는 것이 중요합니다."],
    symptomTitle: "고혈압 의심 증상",
    symptomGroups: [{ label: "대부분 무증상이지만 확인할 증상", items: [{ title: "두통·어지럼증", desc: "아침 두통 또는 어지럼" }, { title: "뒷목 뻐근함", desc: "긴장 시 당김" }, { title: "가슴 두근거림", desc: "불규칙한 박동 느낌" }] }, { label: "방치 시 위험한 합병증", danger: true, items: [{ title: "심뇌혈관 질환", desc: "협심증·뇌졸중 위험" }, { title: "신장 기능 저하", desc: "만성 신장질환 위험" }, { title: "망막 혈관 손상", desc: "시력 관련 합병증" }] }],
    treatmentTitle: "고혈압 치료 방법",
    treatmentDesc: "약물 치료와 함께 저염식·운동을 병행하는 것이 핵심입니다.",
    treatments: chronicTreatments,
    summaryTitle: "고혈압 관리 핵심 요약",
    summaries: ["가정과 병원에서 규칙적으로 혈압을 측정합니다.", "저염식, 운동, 체중 관리를 꾸준히 실천합니다.", "전문의가 처방한 약은 임의로 중단하지 않습니다."]
  },
  "chronic/diabetes": {
    slug: "chronic/diabetes",
    category: "만성질환",
    title: "당뇨",
    english: "Diabetes Mellitus",
    eyebrow: "CHRONIC DISEASE CLINIC · 당뇨",
    subtitle: "혈당 조절부터 합병증 예방까지 장기적으로 관리합니다.",
    badges: ["공복혈당", "당화혈색소", "식사 관리", "합병증 예방"],
    image: pickImage(2),
    introTitle: "당뇨병이란?",
    introEnglish: "Diabetes",
    introParagraphs: ["당뇨병은 혈당이 정상보다 높게 유지되는 만성 대사질환입니다.", "혈당이 오래 높으면 눈, 신장, 신경, 심혈관계 합병증 위험이 증가합니다.", "식사, 운동, 약물 치료와 정기 검사를 통해 목표 혈당을 꾸준히 유지하는 것이 중요합니다."],
    symptomTitle: "당뇨 의심 증상",
    symptomGroups: [{ label: "대표 증상", items: [{ title: "갈증", desc: "물을 자주 마심" }, { title: "잦은 소변", desc: "소변량 증가" }, { title: "체중 감소", desc: "이유 없는 감소" }] }, { label: "합병증 신호", danger: true, items: [{ title: "손발 저림", desc: "신경 합병증 가능" }, { title: "시야 흐림", desc: "망막 변화 가능" }, { title: "상처 지연", desc: "회복이 늦어짐" }] }],
    treatmentTitle: "당뇨 관리 방법",
    treatmentDesc: "혈당 수치뿐 아니라 합병증 위험을 함께 관리합니다.",
    treatments: chronicTreatments,
    summaryTitle: "당뇨 관리 핵심 요약",
    summaries: ["당화혈색소를 정기적으로 확인합니다.", "식사와 운동 계획은 지속 가능해야 합니다.", "합병증 선별 검사를 정기적으로 시행합니다."]
  },
  "chronic/dyslipidemia": {
    slug: "chronic/dyslipidemia",
    category: "만성질환",
    title: "고지혈증",
    english: "Dyslipidemia",
    eyebrow: "CHRONIC DISEASE CLINIC · 고지혈증",
    subtitle: "콜레스테롤 수치와 심혈관 위험도를 함께 평가합니다.",
    badges: ["LDL 콜레스테롤", "중성지방", "심혈관 위험", "생활습관"],
    image: pickImage(3),
    introTitle: "고지혈증이란?",
    introEnglish: "Dyslipidemia",
    introParagraphs: ["고지혈증은 혈액 속 콜레스테롤이나 중성지방이 높아진 상태입니다.", "대부분 증상이 없지만 동맥경화와 심뇌혈관질환의 중요한 위험 요인입니다.", "수치만 보는 것이 아니라 나이, 혈압, 당뇨, 흡연, 가족력을 함께 고려해 치료 목표를 정합니다."],
    symptomTitle: "고지혈증 관리가 필요한 경우",
    symptomGroups: [{ label: "위험 요인", items: [{ title: "가족력", desc: "심혈관 질환 가족력" }, { title: "비만", desc: "복부비만 동반" }, { title: "당뇨·고혈압", desc: "위험도 증가" }] }, { label: "합병증 위험", danger: true, items: [{ title: "동맥경화", desc: "혈관벽 변화" }, { title: "협심증", desc: "관상동맥 위험" }, { title: "뇌졸중", desc: "뇌혈관 위험" }] }],
    treatmentTitle: "고지혈증 관리 방법",
    treatmentDesc: "식습관, 운동, 약물 치료를 위험도에 맞게 조정합니다.",
    treatments: chronicTreatments,
    summaryTitle: "고지혈증 관리 핵심 요약",
    summaries: ["LDL 목표치는 개인 위험도에 따라 달라집니다.", "식습관과 운동은 약물 치료와 함께 중요합니다.", "약을 복용 중이라도 정기적인 수치 확인이 필요합니다."]
  },
  "vaccination": {
    slug: "vaccination",
    category: "내과진료",
    title: "예방접종",
    english: "Vaccination",
    eyebrow: "PREVENTIVE CARE · 예방접종",
    // [병원별 수정 필요]
    subtitle: "성인 예방접종 항목은 개원 후 순차적으로 공지합니다.",
    badges: ["성인 예방접종", "예진", "접종 이력", "주의사항"],
    image: pickImage(4),
    introTitle: "성인 예방접종이란?",
    introEnglish: "Adult Vaccination",
    // [병원별 수정 필요]
    introParagraphs: ["예방접종은 감염질환을 예방하고 합병증 위험을 낮추기 위한 중요한 예방 진료입니다.", "연령, 기저질환, 과거 접종력에 따라 필요한 접종이 달라질 수 있습니다.", "○○내과의원의 접종 가능 항목은 개원 후 확정해 안내 예정입니다."],
    symptomTitle: "접종 전 확인사항",
    symptomGroups: [{ label: "예진", items: [{ title: "접종 이력", desc: "과거 접종 확인" }, { title: "알레르기", desc: "이상 반응 확인" }, { title: "기저질환", desc: "안전성 확인" }] }, { label: "접종 후", danger: true, items: [{ title: "발열", desc: "일시적 반응 가능" }, { title: "접종 부위 통증", desc: "국소 반응" }, { title: "이상 반응", desc: "필요 시 진료" }] }],
    treatmentTitle: "예방접종 진행 방식",
    treatmentDesc: "예진 후 안전하게 접종하고 주의사항을 안내합니다.",
    treatments: chronicTreatments,
    summaryTitle: "예방접종 핵심 요약",
    // [병원별 수정 필요]
    summaries: ["접종 전 과거 접종력과 알레르기를 확인합니다.", "기저질환에 따라 권장 접종이 달라질 수 있습니다.", "접종 가능 항목은 개원 후 공지 예정입니다."]
  },
  "special/obesity": {
    slug: "special/obesity",
    category: "특수클리닉",
    title: "비만클리닉",
    english: "Obesity Clinic",
    eyebrow: "SPECIAL CLINIC · 비만",
    subtitle: "체중만이 아니라 대사질환 위험을 함께 관리합니다.",
    badges: ["체성분", "식사 습관", "대사질환", "개인별 관리"],
    image: pickImage(5),
    introTitle: "비만 진료란?",
    introEnglish: "Obesity Care",
    introParagraphs: ["비만 진료는 체중 감량만이 아니라 혈압, 혈당, 지질 등 대사 위험을 함께 관리하는 과정입니다.", "무리한 감량보다 건강 상태에 맞는 현실적인 목표와 지속 가능한 방법을 우선합니다.", "필요 시 혈액검사와 생활습관 평가를 통해 개인별 관리 계획을 세웁니다."],
    symptomTitle: "비만 관리가 필요한 경우",
    symptomGroups: [{ label: "관리 대상", items: [{ title: "복부비만", desc: "허리둘레 증가" }, { title: "체중 증가", desc: "최근 증가 추세" }, { title: "운동 부족", desc: "활동량 저하" }] }, { label: "동반 위험", danger: true, items: [{ title: "고혈압", desc: "혈압 상승" }, { title: "당뇨", desc: "혈당 위험" }, { title: "지방간", desc: "간수치 이상" }] }],
    treatmentTitle: "비만 관리 방식",
    treatmentDesc: "대사질환 위험을 함께 보며 관리합니다.",
    treatments: chronicTreatments,
    summaryTitle: "비만 관리 핵심 요약",
    summaries: ["체중보다 대사질환 위험을 함께 보는 것이 중요합니다.", "무리한 감량보다 지속 가능한 계획이 필요합니다.", "동반 질환 여부에 따라 관리 방향이 달라집니다."]
  },
  // [병원별 수정 필요]
  "special/functional-medicine": {
    slug: "special/functional-medicine",
    category: "특수클리닉",
    title: "기능의학",
    english: "Functional Medicine",
    eyebrow: "SPECIAL CLINIC · 기능의학",
    subtitle: "검사 수치는 정상인데 계속 불편한 증상의 원인을 폭넓게 살펴봅니다.",
    badges: ["만성 피로", "영양 상태", "호르몬", "장 건강", "생활습관"],
    image: pickImage(10),
    introTitle: "기능의학이란?",
    introEnglish: "Functional Medicine",
    introParagraphs: [
      "기능의학은 질환이 생기기 전 단계의 몸의 기능 변화를 확인하고 원인을 찾아가는 진료 방식입니다.",
      "일반 검사에서는 이상이 없다고 나오지만 피로, 소화 불편, 수면 문제 등이 지속되는 경우에 도움이 될 수 있습니다.",
      // [병원별 수정 필요]
      "○○내과의원은 기존 내과 진료와 검사 결과를 기본으로 두고, 필요한 범위에서 영양·생활습관 관리를 함께 안내합니다."
    ],
    symptomTitle: "기능의학 상담이 도움이 되는 경우",
    symptomGroups: [
      { label: "지속되는 불편감", items: [{ title: "만성 피로", desc: "쉬어도 회복되지 않음" }, { title: "소화 불편", desc: "반복되는 더부룩함" }, { title: "수면 문제", desc: "잠들기 어렵거나 자주 깸" }] },
      { label: "먼저 확인이 필요한 상황", danger: true, items: [{ title: "체중 변화", desc: "원인 모를 증감" }, { title: "검사 이상", desc: "간·갑상선 수치 등" }, { title: "약물 복용", desc: "건강기능식품 포함 확인" }] }
    ],
    treatmentTitle: "기능의학 진료 방식",
    treatmentDesc: "표준 내과 진료로 원인 질환을 먼저 확인한 뒤 보조적으로 접근합니다.",
    treatments: [
      { title: "원인 질환 확인", items: ["증상에 맞는 기본 검사를 먼저 시행합니다.", "빈혈·갑상선·간기능 등 흔한 원인을 확인합니다.", "치료가 필요한 질환은 우선 진료로 연결합니다."] },
      { title: "영양·생활습관 평가", items: ["식사, 수면, 활동량, 스트레스를 함께 확인합니다.", "복용 중인 약과 건강기능식품을 정리합니다.", "무리한 계획보다 유지 가능한 방식을 우선합니다."] },
      { title: "관리와 경과 확인", items: ["필요한 범위에서 영양 보충과 수액을 상담합니다.", "일정 기간 후 증상과 수치 변화를 다시 확인합니다.", "효과가 없으면 계획을 다시 조정합니다."] }
    ],
    summaryTitle: "기능의학 핵심 요약",
    summaries: ["먼저 표준 진료로 원인 질환 여부를 확인합니다.", "식사·수면·활동량 등 생활 요인을 함께 살펴봅니다.", "검사와 관리 범위는 상담을 통해 필요한 만큼만 정합니다."]
  },
  "special/iv-therapy": {
    slug: "special/iv-therapy",
    category: "특수클리닉",
    title: "영양수액",
    english: "Nutrition IV Therapy",
    eyebrow: "SPECIAL CLINIC · 영양수액",
    // [병원별 수정 필요]
    subtitle: "수액 치료 항목은 개원 후 안전 기준에 맞춰 안내합니다.",
    badges: ["문진", "상태 확인", "안전 투여", "주의사항"],
    image: pickImage(6),
    introTitle: "영양수액이란?",
    introEnglish: "Nutrition IV Therapy",
    // [병원별 수정 필요]
    introParagraphs: ["수액 치료는 환자 상태와 필요성을 확인한 뒤 시행해야 하는 치료입니다.", "기저질환, 복용약, 알레르기 등을 확인해 안전성을 먼저 평가합니다.", "○○내과의원의 수액 항목과 세부 구성은 개원 후 확정해 안내 예정입니다."],
    symptomTitle: "수액 전 확인사항",
    symptomGroups: [{ label: "사전 확인", items: [{ title: "문진", desc: "현재 증상 확인" }, { title: "기저질환", desc: "심장·신장질환 확인" }, { title: "알레르기", desc: "약물 반응 확인" }] }, { label: "주의사항", danger: true, items: [{ title: "불필요한 투여", desc: "필요성 평가" }, { title: "부작용", desc: "이상 반응 관찰" }, { title: "치료 후 안내", desc: "귀가 전 설명" }] }],
    treatmentTitle: "수액 치료 진행 방식",
    treatmentDesc: "문진과 상태 확인 후 안전하게 진행합니다.",
    treatments: chronicTreatments,
    summaryTitle: "영양수액 핵심 요약",
    // [병원별 수정 필요]
    summaries: ["수액은 필요성과 안전성을 먼저 평가합니다.", "기저질환과 알레르기 확인이 중요합니다.", "세부 항목은 개원 후 최종 공지 예정입니다."]
  },
  "special/osteoporosis": {
    slug: "special/osteoporosis",
    category: "특수클리닉",
    title: "골다공증",
    english: "Osteoporosis",
    eyebrow: "SPECIAL CLINIC · 골다공증",
    subtitle: "골절 위험과 만성질환 상태를 함께 고려해 관리합니다.",
    badges: ["골밀도", "골절 위험", "영양", "운동", "약물치료"],
    image: pickImage(7),
    introTitle: "골다공증이란?",
    introEnglish: "Osteoporosis",
    introParagraphs: ["골다공증은 뼈의 강도가 약해져 작은 충격에도 골절 위험이 높아지는 질환입니다.", "초기에는 증상이 거의 없어 골절이 발생한 뒤 발견되는 경우가 많습니다.", "골밀도 평가와 영양, 운동, 약물 치료를 통해 골절 위험을 줄이는 것이 중요합니다."],
    symptomTitle: "골다공증 평가가 필요한 경우",
    symptomGroups: [{ label: "위험 요인", items: [{ title: "폐경 후", desc: "여성 골밀도 감소" }, { title: "저체중", desc: "골절 위험 증가" }, { title: "가족력", desc: "골다공증 가족력" }] }, { label: "주의 상황", danger: true, items: [{ title: "골절 과거력", desc: "저충격 골절" }, { title: "키 감소", desc: "척추 압박골절 가능" }, { title: "장기 약물", desc: "스테로이드 등" }] }],
    treatmentTitle: "골다공증 관리 방법",
    treatmentDesc: "골밀도와 골절 위험을 함께 평가합니다.",
    treatments: chronicTreatments,
    summaryTitle: "골다공증 관리 핵심 요약",
    summaries: ["골절 전 조기 평가가 중요합니다.", "칼슘·비타민D·근력 운동이 도움이 됩니다.", "약물 치료는 골절 위험도에 따라 결정합니다."]
  },
  "special/ultrasound": {
    slug: "special/ultrasound",
    category: "특수클리닉",
    title: "초음파검사",
    english: "Ultrasound",
    eyebrow: "SPECIAL CLINIC · 초음파",
    subtitle: "증상과 혈액검사 결과를 바탕으로 필요한 초음파 검사를 안내합니다.",
    badges: ["복부초음파", "갑상선초음파", "간담도", "결과 상담"],
    image: pickImage(8),
    introTitle: "초음파검사란?",
    introEnglish: "Ultrasound",
    introParagraphs: ["초음파검사는 방사선 노출 없이 장기 구조를 확인하는 검사입니다.", "복부 불편감, 간수치 이상, 갑상선 결절 의심 등 다양한 상황에서 활용됩니다.", "검사 결과는 증상과 혈액검사 결과를 함께 보며 설명합니다."],
    symptomTitle: "초음파가 필요한 경우",
    symptomGroups: [{ label: "검사 대상", items: [{ title: "복부 통증", desc: "간담도·췌장 평가" }, { title: "간수치 이상", desc: "지방간 등 확인" }, { title: "갑상선 이상", desc: "결절·염증 평가" }] }, { label: "추적 필요", danger: true, items: [{ title: "결절", desc: "크기 변화 추적" }, { title: "낭종", desc: "경과 관찰" }, { title: "이상 소견", desc: "추가 검사 판단" }] }],
    treatmentTitle: "초음파검사 진행 방식",
    treatmentDesc: "증상과 검사 목적에 맞춰 필요한 부위를 확인합니다.",
    treatments: chronicTreatments,
    summaryTitle: "초음파검사 핵심 요약",
    summaries: ["증상과 혈액검사 결과에 따라 검사 부위를 결정합니다.", "방사선 노출 없이 장기 구조를 확인할 수 있습니다.", "결과에 따라 추적 검사 또는 추가 검사를 안내합니다."]
  },
  "medical-info": {
    slug: "medical-info",
    category: "병원소개",
    title: "비급여 안내",
    english: "Medical Information",
    eyebrow: "CLINIC INFO · 비급여 안내",
    // [병원별 수정 필요]
    subtitle: "진료 항목과 비급여 안내는 개원 전 최종 확정 후 업데이트됩니다.",
    badges: ["진료안내", "비급여", "준비 중", "개원 전 업데이트"],
    image: pickImage(9),
    introTitle: "비급여 안내",
    introEnglish: "Non-covered Fee",
    // [병원별 수정 필요]
    introParagraphs: ["비급여 항목은 개원 전 최종 확정 후 홈페이지에 안내할 예정입니다.", "항목별 비용, 검사 조건, 발급 비용 등은 실제 운영 기준에 맞춰 업데이트됩니다.", "현재 페이지는 임시 구성으로, 추후 확정 자료로 교체하면 됩니다."],
    symptomTitle: "업데이트 예정 항목",
    symptomGroups: [{ label: "안내 항목", items: [{ title: "검사 비용", desc: "검사별 비급여" }, { title: "제증명", desc: "서류 발급 비용" }, { title: "수액·예방접종", desc: "항목별 비용" }] }],
    treatmentTitle: "비급여 안내 방식",
    treatmentDesc: "확정 자료가 생기면 표 형태로 업데이트할 수 있습니다.",
    treatments: chronicTreatments,
    summaryTitle: "비급여 안내 핵심 요약",
    // [병원별 수정 필요]
    summaries: ["현재는 준비 중 페이지입니다.", "확정 후 항목과 금액을 업데이트합니다.", "개원 전 최종 확인이 필요합니다."]
  }
};

export function getServicePage(slug: string): ServicePage {
  return servicePages[slug] ?? servicePages["medical-info"];
}

export function getCategoryChildren(category: string) {
  return Object.values(servicePages).filter((page) => page.category === category);
}
