import type { MetadataRoute } from "next";
import { IS_TEMPLATE, site } from "@/lib/seo";

/**
 * 검색·AI 크롤러 정책.
 *
 * 템플릿 모드(IS_TEMPLATE = true)면 전부 차단합니다.
 * 판매용 데모가 "○○내과의원"으로 검색에 뜨면 안 되기 때문입니다.
 *
 * 실제 병원 사이트에서는 src/lib/seo.ts 의 IS_TEMPLATE 을 false 로 바꾸세요.
 * 그러면 네이버(Yeti)와 AI 크롤러(GPTBot·ClaudeBot·PerplexityBot)가 모두 허용됩니다.
 * AI 크롤러를 막으면 AI 검색 추천에 아예 안 잡히니 주의하세요.
 */
export default function robots(): MetadataRoute.Robots {
  if (IS_TEMPLATE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Yeti", allow: "/" }, // 네이버
      { userAgent: "Daumoa", allow: "/" }, // 다음
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
