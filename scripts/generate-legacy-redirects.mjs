import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const siteUrl = 'https://yheun03.github.io';
const outputDir = '.output/public';
const legacyBasePath = '/portfolio';
const sitemap = await readFile(join(outputDir, 'sitemap.xml'), 'utf8');
const canonicalUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

// Nuxt의 정적 404는 SPA 셸이므로 JavaScript 실행 전에도 검색 제외를 명시한다.
const errorFile = join(outputDir, '404.html');
let errorHtml = await readFile(errorFile, 'utf8');
if (!/<title>/.test(errorHtml)) {
    errorHtml = errorHtml.replace('</head>', '<title>페이지를 찾을 수 없습니다 | 은영환 포트폴리오</title></head>');
}
if (!/<meta\b[^>]*name="robots"/.test(errorHtml)) {
    errorHtml = errorHtml.replace('</head>', '<meta name="robots" content="noindex, follow"></head>');
}
if (!errorHtml.includes('id="error-fallback"')) {
    errorHtml = errorHtml.replace(
        '</body>',
        '<noscript id="error-fallback"><main><h1>페이지를 찾을 수 없습니다</h1><p>주소를 확인하거나 <a href="/">포트폴리오 홈으로 이동해 주세요.</a></p></main></noscript></body>',
    );
}
await writeFile(errorFile, errorHtml);

function escapeHtml(value) {
    return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function createRedirectHtml(targetUrl) {
    const escapedUrl = escapeHtml(targetUrl);

    return `<!doctype html>
<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="은영환 포트폴리오의 새 주소로 이동합니다." />
        <meta http-equiv="refresh" content="0; url=${escapedUrl}" />
        <link rel="canonical" href="${escapedUrl}" />
        <title>포트폴리오 주소가 변경되었습니다</title>
    </head>
    <body>
        <main>
            <h1>포트폴리오 주소가 변경되었습니다</h1>
            <p><a href="${escapedUrl}">새 주소로 이동하기</a></p>
        </main>
    </body>
</html>
`;
}

for (const canonicalUrl of canonicalUrls) {
    const url = new URL(canonicalUrl);
    if (url.origin !== siteUrl) continue;

    const legacyPath = `${legacyBasePath}${url.pathname}`;
    const redirectFile = join(outputDir, legacyPath, 'index.html');

    await mkdir(dirname(redirectFile), { recursive: true });
    await writeFile(redirectFile, createRedirectHtml(canonicalUrl));
}

console.log(`Generated ${canonicalUrls.length} legacy portfolio redirects.`);

// Keep the original 2026 project URL working after its slug changes.
for (const prefix of ['', legacyBasePath]) {
    const redirectFile = join(outputDir, prefix, 'personal/jonsoft-framework-portfolio/index.html');
    await mkdir(dirname(redirectFile), { recursive: true });
    await writeFile(redirectFile, createRedirectHtml(`${siteUrl}/personal/portfolio-2026/`));
}

// Preserve both published infrastructure URLs after merging the project.
for (const prefix of ['', legacyBasePath]) {
    const redirectFile = join(outputDir, prefix, 'projects/infra/index.html');
    await mkdir(dirname(redirectFile), { recursive: true });
    await writeFile(redirectFile, createRedirectHtml(`${siteUrl}/projects/framework/`));
}
