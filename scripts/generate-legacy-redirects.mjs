import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const siteUrl = 'https://yheun03.github.io';
const outputDir = '.output/public';
const legacyBasePath = '/portfolio';
const sitemap = await readFile(join(outputDir, 'sitemap.xml'), 'utf8');
const canonicalUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

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
        <meta name="robots" content="noindex, follow" />
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
