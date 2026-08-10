# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Reusable template** for Korean internal-medicine (내과) clinic marketing websites. This repo is the *master template* — it holds no real clinic's data. Every clinic fact in `src/lib/clinic.ts` is a placeholder (`○○내과의원`, empty `phone`, `00:00 - 00:00` hours); `src/lib/servicePages.ts` marks clinic-specific copy with `// [병원별 수정 필요]` comments. A new clinic site = copy this folder, then fill in the copy. See `README.md` for the non-developer walkthrough.

Next.js 16 App Router + React 19 + Tailwind CSS v4, deployed on Vercel. All UI copy is Korean; commit messages follow `feat:` / `fix:` / `content:` / `refactor:` / `chore:` with Korean descriptions.

## Commands

```bash
corepack pnpm@11.10.0 install --node-linker=hoisted --package-import-method=copy
corepack pnpm@11.10.0 dev      # http://localhost:3000
corepack pnpm@11.10.0 build
corepack pnpm@11.10.0 lint     # eslint (flat config)
npx tsc --noEmit               # typecheck; there is no `typecheck` script
```

There is no test suite. Verification = `build` + `lint` + `tsc --noEmit`, plus loading pages in a dev server.

**Windows/pnpm:** `pnpm-workspace.yaml` pins `nodeLinker: hoisted` and `packageImportMethod: copy` to avoid `ERR_PNPM_EBUSY` symlink failures. Do not switch to isolated linking. On EBUSY, run `WINDOWS_RESET_AND_RUN.bat` (kills node, wipes `node_modules`/`.next`/lockfiles, reinstalls, starts dev).

## Single source of truth

**`src/lib/clinic.ts` is the single source of truth for every clinic fact.** If asked to update clinic info, edit `clinic.ts` — never hardcode a name, address, phone, or hours into a component. `README.md` (the template walkthrough) was rewritten for template use and is current; the old `SETUP_GUIDE.md` (연세다온내과 leftovers) has been deleted.

## Architecture

### Content lives in two data modules, not in components

- **`src/lib/clinic.ts`** — `clinic` (`as const`: name, address, phone, hours, concept, `intro` block used on every subpage), `navItems` (the entire nav/dropdown tree, which also defines what URLs must exist), `doctors`, `serviceCards`, `tourImages`, `suppliedImages` + `pickImage(i)`, and `phoneDisplay` (fallback text when phone is blank). Nearly every component imports from here.
- **`src/lib/servicePages.ts`** — a `Record<string, ServicePage>` keyed by slug path (`"endoscopy/stomach"`, `"chronic/diabetes"`, …). Each entry is a full page's worth of structured copy (hero, intro paragraphs, symptom groups, treatment blocks, summary). `chronicTreatments` is a shared block reused by many entries.

Adding a service/clinic page = add a `servicePages` entry + a `navItems` child link. No new file is needed.

### Route model: one catch-all plus a few hand-built pages

`src/app/[...slug]/page.tsx` renders **every** service page: it calls `generateStaticParams()` over `Object.keys(servicePages)` and passes the looked-up page to `<SubPageHeader>` + `<ServiceDetailPage>`. `getServicePage()` falls back to the `"medical-info"` entry for unknown slugs, so bad URLs render a "준비 중" page rather than a 404 — that fallback is intentional.

Hand-built routes (`/doctors`, `/about/hours`, `/about/location`, `/about/tour`, `/medical-info`) take precedence over the catch-all. Note `medical-info` exists both as a real route **and** as a `servicePages` entry (the fallback target) — they render different content.

### Shared chrome is mounted once in the layout

`src/app/layout.tsx` renders `Header`, `<main>` (with fixed-header top padding), then `LocationSection`, `Footer`, `FloatingButtons`, `ScrollToTop` for the whole app. Page components must not re-render these. Metadata uses a `%s | ${clinic.name}` template; only `/about/tour` currently exports its own `metadata`.

Every subpage starts with `<SubPageHeader category title />`, which renders the breadcrumb (its second dropdown is populated by `getCategoryChildren(category)`, so `category` strings must match `servicePages` values exactly) and then always appends `<SubPageIntro>` — the clinic intro + "선택하는 3가지 이유" block driven by `clinic.intro`.

### Components

Server components by default; 15 files are `"use client"` (carousel, dropdowns, galleries, scroll handlers). `ScrollReveal` is the animation primitive used throughout — an IntersectionObserver wrapper with a `delay` prop; stagger lists with `delay={base + i * step}`.

### Styling

Tailwind v4, CSS-first. There is **no `tailwind.config`** — the design tokens (`navy-*`, `sky-*`, `gold-*`) are declared in `@theme inline` at the top of `src/app/globals.css`, which also sets global `section` padding, responsive base font sizes, and the Pretendard/Montserrat webfont imports. Much of the newer markup uses arbitrary values (`text-[#1A3A6C]`, `rounded-[28px_28px_0_28px]`) rather than the named tokens; match whatever the surrounding file does.

### Images and the map

`next.config.ts` allowlists `cdn.imweb.me` (all real clinic photos), `images.unsplash.com`, and `plus.unsplash.com`. Both `next/image` and plain `<img>` (with an inline `eslint-disable-next-line @next/next/no-img-element`) appear in the codebase — `ServiceDetailPage` uses raw `<img>`.

`KakaoMap` is an iframe of `public/kakaomap.html`, which holds the raw Kakao embed snippet (timestamp + key). Changing the map location means replacing that file's embed code, not editing React.

### Next.js version note

This is Next.js 16 — `params` in page components is a `Promise` and must be awaited. The `node_modules/next/dist/docs/` guides referenced in the user-level AGENTS.md are **not** present in this install; consult official Next 16 docs instead of assuming Next 13/14 conventions.

## 템플릿 사용 규칙
- 이 폴더는 원본 템플릿. 여기서는 절대 특정 병원 정보를 입력하지 않는다
- 새 병원 제작 = 이 폴더를 복사한 뒤 그 복사본에서 작업
- 병원 정보는 clinic.ts에만 입력 (단일 진실 원칙)
- 새 병원 세팅 시: clinic.ts 채우기 → servicePages.ts의 [병원별 수정 필요] 주석 부분 검토
  → 이미지 교체 → build/lint/tsc 통과 확인

## 운영 규칙
- 병원 정보(주소, 전화, 진료시간 등) 수정 요청 시: `clinic.ts`의 기존 값을 먼저 보여주고 확인받은 뒤 수정할 것 (신규 개원 병원은 정보 변동이 잦음)
- 네이버플레이스 상세설명은 이 사이트 문구를 기반으로 작성됨 — 사이트 문구를 수정하면 플레이스에도 반영이 필요한지 알려줄 것
- 수정 후 모바일 화면 기준으로 확인한 결과를 보고할 것
- 의료광고법 주의: 최상급 표현(최고·유일), 치료효과 보장, 환자 체험담 강조 금지

## 병원별 운영 정보 [병원별 수정 필요]
> 이 항목은 템플릿에서는 비워둡니다. 복사본에서 해당 병원의 값으로 채워주세요.
- 타겟 환자층: (예: 특정 진료 프로그램 관심 환자층, 주요 상권·거주 지역 주민)
- 경쟁 병원 / 지역 특성:
- 홍보 채널(네이버플레이스·블로그 등) 담당 여부: