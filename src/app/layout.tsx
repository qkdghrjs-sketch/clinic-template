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
