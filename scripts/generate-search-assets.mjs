import { readFile, writeFile } from 'node:fs/promises';

const origin = 'https://yheun03.github.io';
const updated = '2026-11-18';
const { content, meta, aboutMe, journey, gallery } = JSON.parse(await readFile('i18n/ko.json', 'utf8'));
const works = JSON.parse(await readFile('data/works/ko.json', 'utf8'));
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const previous = await readFile('public/sitemap.xml', 'utf8').catch(() => '');
const dates = new Map([...previous.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((match) => [match[1], match[2]]));
const pages = [
    { path: '/', title: meta.title, description: meta.description },
    { path: '/about/', title: aboutMe.metaTitle, description: aboutMe.metaDescription },
    { path: '/journey/', title: journey.title, description: journey.summary },
    { path: '/projects/', title: gallery.careerTitle, description: gallery.careerLead.replace('{total}', String(works.career.length)) },
    { path: '/personal/', title: gallery.personalTitle, description: gallery.personalLead.replace('{total}', String(works.personal.length)) },
    ...Object.entries(works).flatMap(([variant, items]) =>
        items.map((work) => ({
            path: `/${variant === 'career' ? 'projects' : 'personal'}/${work.id}/`,
            title: work.title,
            description: work.introduction,
        })),
    ),
];
const urls = pages.map(({ path }) => {
    const url = `${origin}${path}`;
    const modified = ['/', '/about/', '/journey/'].includes(path) ? updated : dates.get(url);
    return `  <url><loc>${escapeXml(url)}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ''}</url>`;
});
await writeFile(
    'public/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
);
await writeFile('public/sitemap.txt', pages.map(({ path }) => `${origin}${path}`).join('\n') + '\n');
await writeFile(
    'public/rss.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${escapeXml(meta.title)}</title><link>${origin}/</link><description>${escapeXml(meta.description)}</description><language>ko</language>
<atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
${pages
    .filter(({ path }) => ['/', '/about/', '/journey/'].includes(path) || /\/(?:framework|orchem-mes|hanjinkal|flight-shade|planearby)\//.test(path))
    .map(
        ({ path, title, description }) =>
            `<item><title>${escapeXml(title)}</title><link>${origin}${path}</link><guid isPermaLink="true">${origin}${path}</guid><description>${escapeXml(description)}</description></item>`,
    )
    .join('\n')}
</channel></rss>\n`,
);
await writeFile(
    'public/llms.txt',
    `# 은영환 · Younghwan Eun

> ${content.seo.description}

## 공식 프로필

- 이름: 은영환 (Younghwan Eun / Eun Younghwan)
- 역할: ${content.profile.role}
- 주요 기술: HTML, SCSS, JavaScript, Vue 3, Nuxt 3
- 연락처: ${content.profile.contacts.email}
- GitHub: ${content.profile.contacts.github}
- 이력서: ${content.profile.contacts.resume}
- 기본 언어: 한국어. 사이트에서 영어 표시도 지원합니다.
- 이 문서 갱신일: ${updated}

Younghwan Eun is a web publisher who builds corporate websites and business interfaces with HTML, SCSS, JavaScript, Vue 3, and Nuxt 3.

## 공식 페이지와 프로젝트

${pages.map(({ path, title, description }) => `- [${title}](${origin}${path}): ${description}`).join('\n')}

## 기계 판독 리소스

- [사이트맵](${origin}/sitemap.xml)
- [RSS](${origin}/rss.xml)
- 각 공개 페이지의 JSON-LD에는 동일한 Person 식별자(${origin}/#person), 작성자, 페이지 유형과 프로젝트 정보가 포함됩니다.
- 역할, 기여도와 성과는 연결된 프로젝트 상세의 공개 본문을 기준으로 확인할 수 있습니다.
`,
);
console.log(`Generated search assets for ${pages.length} canonical pages.`);
