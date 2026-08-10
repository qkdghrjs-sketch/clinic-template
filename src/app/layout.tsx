import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSection from "@/components/LocationSection";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollToTop from "@/components/ScrollToTop";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: {
    default: `${clinic.name} | 우리 동네 주치의`,
    template: `%s | ${clinic.name}`
  },
  description: `${clinic.name} - ${clinic.address}. ${clinic.slogan}. 내과 전문의가 진료하는 내과·건강검진·위대장내시경·만성질환 진료.`,
  // [병원별 수정 필요] 검색 키워드 — 병원명과 지역명을 실제 값으로 바꿔주세요
  keywords: [
    clinic.name, "동네 주치의", "내과", "위내시경", "대장내시경",
    "건강검진", "고혈압", "당뇨", "고지혈증"
  ],
  /**
   * [병원별 수정 필요] 검색엔진 수집 차단.
   *
   * 이 템플릿은 병원 이름이 ○○내과의원인 견본이라, 네이버·구글 검색에
   * 잡히면 안 되므로 막아둡니다.
   *
   * 실제 병원 사이트를 만들 때는 이 robots 블록을 통째로 지우세요.
   * (지워야 검색에 정상적으로 노출됩니다)
   */
  robots: {
    index: false,
    follow: false
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
