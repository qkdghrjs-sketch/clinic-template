import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollToTop from "@/components/ScrollToTop";
import { clinic } from "@/lib/clinic";
import {
  IS_TEMPLATE,
  site,
  NAVER_SITE_VERIFICATION,
  GOOGLE_SITE_VERIFICATION,
  TARGET_REGIONS
} from "@/lib/seo";
import {
  medicalClinicSchema,
  physicianSchemas,
  faqSchema,
  jsonLd
} from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: `${clinic.name} | 우리 동네 주치의`,
    template: `%s | ${clinic.name}`
  },
  description: `${clinic.name} - ${clinic.address}. ${clinic.slogan}. 내과 전문의가 진료하는 내과·건강검진·위대장내시경·만성질환 진료.`,
  // 검색 키워드 — 지역명은 src/lib/seo.ts 의 TARGET_REGIONS 에서 자동으로 붙습니다
  keywords: [
    clinic.name, "동네 주치의", "내과", "위내시경", "대장내시경",
    "건강검진", "고혈압", "당뇨", "고지혈증",
    ...TARGET_REGIONS.flatMap((r) => [`${r} 내과`, `${r} 건강검진`, `${r} 위내시경`])
  ],
  alternates: { canonical: "/" },
  /**
   * 검색엔진 수집 여부.
   *
   * 값을 여기서 직접 고치지 마세요. src/lib/seo.ts 의 IS_TEMPLATE 한 줄이
   * 이 설정과 robots.txt, sitemap 을 한꺼번에 제어합니다.
   *
   * IS_TEMPLATE = true  → 판매용 템플릿 데모. 검색에 안 잡힘 (기본값)
   * IS_TEMPLATE = false → 실제 병원 사이트. 네이버·구글·AI 검색에 노출
   */
  robots: IS_TEMPLATE
    ? { index: false, follow: false }
    : { index: true, follow: true },
  verification: {
    ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
    ...(NAVER_SITE_VERIFICATION
      ? { other: { "naver-site-verification": NAVER_SITE_VERIFICATION } }
      : {})
  },
  openGraph: {
    title: `${clinic.name} | 우리 동네 주치의`,
    description: `${clinic.address}에 위치한 내과·검진·내시경 중심 의원입니다. ${clinic.slogan}.`,
    type: "website",
    locale: "ko_KR",
    siteName: clinic.name,
    ...(clinic.logoPrimary
      ? { images: [{ url: clinic.logoPrimary, width: 1200, height: 630, alt: clinic.name }] }
      : {})
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/* GEO — AI 검색이 병원 정보를 정확히 읽어가도록 하는 구조화 데이터.
            값은 clinic.ts 에서 자동으로 채워집니다. src/lib/schema.ts 참고. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(medicalClinicSchema())}
        />
        {physicianSchemas().map((p, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd(p)}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(faqSchema())}
        />
      </head>
      <body>
        <ScrollToTop />
        <Header />
        <main className="min-h-screen pt-[60px] sm:pt-[68px] xl:pt-20">{children}</main>
        <LocationSection />
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
