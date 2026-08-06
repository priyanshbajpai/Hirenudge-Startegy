const repositoryBase = "https://github.com/priyanshbajpai/Hirenudge-Startegy/blob/main/";

const publicSources: Record<string, string> = {
  "SRC-HN-01": "https://hirenudge.com/",
  "SRC-HN-02": "https://hirenudge.com/pricing",
  "SRC-HN-03": "https://hirenudge.com/privacy-policy",
  "SRC-HN-04": "https://hirenudge.com/terms-and-conditions",
  "SRC-HN-05": "https://chromewebstore.google.com/",
  "SRC-HN-06": "https://www.linkedin.com/company/hirenudge/",
  "SRC-TEAL-01": "https://www.tealhq.com/",
  "SRC-JR-01": "https://jobright.ai/",
  "SRC-SIMP-01": "https://simplify.jobs/",
  "SRC-HUNTR-01": "https://huntr.co/",
  "SRC-CF-01": "https://www.careerflow.ai/",
  "SRC-GGL-01": "https://developers.google.com/gmail/api/auth/scopes",
  "SRC-GGL-02": "https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification",
  "SRC-GGL-03": "https://support.google.com/cloud/answer/9110914",
  "SRC-GH-01": "https://developers.greenhouse.io/job-board.html",
  "SRC-ASH-01": "https://developers.ashbyhq.com/docs/public-job-posting-api",
  "SRC-APIFY-01": "https://docs.apify.com/platform/actors/running",
  "SRC-FTC-01": "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
  "SRC-GDPR-01": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
  "SRC-DPDP-01": "https://www.meity.gov.in/data-protection-framework",
  "SRC-WCAG-01": "https://www.w3.org/TR/WCAG22/",
};

export function resolveEvidenceSource(source: string) {
  if (/^https?:\/\//.test(source)) return source;
  if (source.startsWith("docs/")) return `${repositoryBase}${source.split("/").map(encodeURIComponent).join("/")}`;
  return publicSources[source] ?? `${repositoryBase}docs/research/00_SOURCE_REGISTER.md`;
}

export const sourceRegisterUrl = `${repositoryBase}docs/research/00_SOURCE_REGISTER.md`;
