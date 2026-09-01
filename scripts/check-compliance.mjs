/* ============================================================
   의료광고 심의 검수기
   실행: pnpm check

   왜 필요한가 — 이 템플릿을 산 병원이 예시 문구를 그대로 쓰다가
   의료광고법에 걸리는 일을 막습니다. 배포 전에 한 번 돌리세요.

   규칙 출처 (지어낸 게 아닙니다)
   - '의료광고심의필 승인탈락 예시' 25장에서 추출한 실제 반려 사유
   - 기존 병원 홈페이지 원고 코퍼스(PPTX 78개 · 373,124자)에서 실측된 표현
       "최우수 내과 전문의"            → 최상급 표현
       "젊고 믿을 수 있는 우수한 의료진" → 객관적 근거 없는 수식
       "대학병원급 검사장비"            → 다른 의료기관과의 비교광고 (30건 발견)

   위반이 하나라도 있으면 exit 1 로 끝나므로 배포 전에 걸러집니다.
   ============================================================ */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** 검사 대상: 화면에 나가는 문구가 들어있는 곳 */
const TARGET_DIRS = ["src/lib", "src/components", "src/app"];
const TARGET_EXT = /\.(ts|tsx)$/;

const RULES = [
  {
    id: "최상급 표현",
    level: "위반",
    why: "의료법 제56조 — 객관적으로 증명할 수 없는 최상급 표현은 금지됩니다.",
    re: /최고(?!\s*\/\s*최저|혈압|치)|최상의|최우수|가장\s*우수|최고급|넘버\s*원|No\.?\s*1\b|1등\b/g,
  },
  {
    id: "유일·독점",
    level: "위반",
    why: "'유일', '독보적' 등 배타성을 주장하는 표현은 금지됩니다.",
    re: /유일한|유일하게|독보적|국내\s*유일|하나뿐인|오직\s*저희|저희만/g,
  },
  {
    id: "치료효과 보장",
    level: "위반",
    why: "치료 효과를 보장·단언하는 표현은 금지됩니다. (통계 인용은 출처를 밝히면 가능)",
    re: /보장(?!보험|성)|완치됩니다|완치를\s*보장|반드시\s*(낫|호전|좋아)|100\s*%\s*(완치|성공|안전)|부작용\s*(이)?\s*없(습니다|음|어요|는)|무통증|전혀\s*아프지\s*않/g,
  },
  {
    id: "비교광고",
    level: "위반",
    why: "다른 의료기관과 비교하는 표현은 금지됩니다. '대학병원급'이 가장 흔한 사례입니다.",
    re: /대학병원\s*급|대학병원\s*수준|타\s*병원(보다|과\s*달리)|다른\s*병원(보다|과\s*달리)|업계\s*최|국내\s*최(고|초)/g,
  },
  {
    id: "환자 체험담",
    level: "위반",
    why: "치료 경험담·후기를 광고에 쓰는 것은 금지됩니다.",
    re: /환자\s*후기|치료\s*후기|시술\s*후기|체험담|만족도\s*\d+\s*%|후기\s*이벤트/g,
  },
  {
    id: "환자 유인",
    level: "위반",
    why: "할인·이벤트로 환자를 유인하는 표현은 의료법 제27조 위반이 될 수 있습니다.",
    re: /무료\s*시술|시술\s*할인|진료비\s*할인|사은품|경품|선착순|특가|이벤트\s*가/g,
  },
  {
    id: "주관적 수식",
    level: "확인필요",
    // '명의'는 앞뒤 한글이 붙으면 제외합니다 ('불명의', '명의로' 오탐 방지).
    // 한글은 \b 단어경계가 동작하지 않아 lookaround 를 씁니다.
    why: "객관적 근거가 없는 수식어입니다. 사실로 바꿀 수 있는지 확인하세요.",
    re: /젊고\s*믿을\s*수\s*있는|믿을\s*수\s*있는\s*(의료진|병원|의원)|(?<![가-힣])명의(?![가-힣])|권위자|획기적|특별한\s*노하우|압도적/g,
  },
  {
    id: "미기재 자리표시",
    level: "확인필요",
    why: "○○ 자리가 남아 있습니다. 병원에서 받은 실제 정보로 바꾸세요. 지어내면 안 됩니다.",
    re: /○○|00:00\s*-\s*00:00/g,
  },
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (TARGET_EXT.test(e)) out.push(p);
  }
  return out;
}

const files = TARGET_DIRS.flatMap((d) => walk(join(root, d)));

let violations = 0;
let warnings = 0;
const byRule = new Map();

for (const file of files) {
  const rel = relative(root, file).replace(/\\/g, "/");
  // 검수기 자신과 규칙 정의는 검사 대상에서 제외합니다.
  if (rel.includes("scripts/")) continue;

  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    // 주석 줄은 안내문이라 건너뜁니다.
    const t = line.trim();
    if (t.startsWith("*") || t.startsWith("//") || t.startsWith("/*")) return;

    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      const matches = [...line.matchAll(rule.re)];
      for (let n = 0; n < matches.length; n++) {
        if (!byRule.has(rule.id)) byRule.set(rule.id, []);
        byRule.get(rule.id).push({
          rule,
          where: `${rel}:${i + 1}`,
          snippet: line.trim().slice(0, 90),
        });
        if (rule.level === "위반") violations++;
        else warnings++;
      }
    }
  });
}

console.log("\n의료광고 심의 검수");
console.log("=".repeat(56));
console.log(`검사 파일 ${files.length}개`);

if (byRule.size === 0) {
  console.log("\n걸린 항목 없음.\n");
  process.exit(0);
}

for (const [id, items] of byRule) {
  const rule = items[0].rule;
  console.log(`\n[${rule.level}] ${id} — ${items.length}건`);
  console.log(`  ${rule.why}`);
  for (const it of items.slice(0, 5)) {
    console.log(`    · ${it.where}`);
    console.log(`      ${it.snippet}`);
  }
  if (items.length > 5) console.log(`    · 외 ${items.length - 5}건`);
}

console.log("\n" + "=".repeat(56));
console.log(`위반 ${violations}건 · 확인필요 ${warnings}건`);

if (violations > 0) {
  console.log("\n위반 항목을 고치기 전에는 배포하지 마세요.\n");
  process.exit(1);
}
console.log("\n위반은 없습니다. 확인필요 항목만 검토하세요.\n");
process.exit(0);
