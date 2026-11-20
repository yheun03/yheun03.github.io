import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const directory = '.output/public';
const origin = 'https://yheun03.github.io';
const checkAnalytics = process.argv.includes('--analytics');
const sitemap = await readFile(join(directory, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(urls).size, urls.length, 'Sitemap contains duplicate URLs');
const assets = new Set();
for (const url of urls) {
    const pathname = new URL(url).pathname;
    const html = await readFile(join(directory, pathname, 'index.html'), 'utf8');
    if (checkAnalytics) {
        const gtm = /'dataLayer','(GTM-[A-Z0-9]+)'/.exec(html)?.[1];
        assert.ok(gtm, `${pathname}: missing GTM loader`);
        assert.ok(html.includes(`https://www.googletagmanager.com/ns.html?id=${gtm}`), `${pathname}: missing GTM noscript`);
        assert.ok(html.includes('https://wcs.pstatic.net/wcslog.js'), `${pathname}: missing Naver Analytics loader`);
        assert.ok(/wcs_add\.wa = '[a-f0-9]+'/i.test(html), `${pathname}: missing Naver Analytics ID`);
        assert.ok(/<meta name="google-site-verification" content="[^"]+"/.test(html), `${pathname}: missing Google verification`);
    }
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${pathname}: one h1 is required`);
    assert.ok(html.includes(`rel="canonical" href="${url}"`), `${pathname}: canonical mismatch`);
    assert.ok(!/<meta name="robots" content="noindex/.test(html), `${pathname}: public page is noindex`);
    assert.ok(/<meta name="description" content="[^"]+"/.test(html), `${pathname}: missing description`);
    const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1, `${pathname}: one structured-data graph is required`);
    const { '@graph': graph } = JSON.parse(scripts[0][1]);
    assert.ok(
        graph.some((node) => node['@type'] === 'Person' && node['@id'] === `${origin}/#person`),
        `${pathname}: inconsistent identity`,
    );
    assert.ok(!graph.some((node) => node['@type'] === 'FAQPage'), `${pathname}: unexpected FAQ schema`);
    for (const [, tag] of html.matchAll(/<img\b([^>]+)>/g)) {
        assert.ok(/(?:^|\s)alt(?:=|\s|$)/.test(tag), `${pathname}: image missing alt`);
        assert.ok(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag), `${pathname}: image missing dimensions`);
        const src = /\bsrc="([^"]+)"/.exec(tag)?.[1];
        if (src?.startsWith('/')) assets.add(src);
        for (const item of (/\bsrcset="([^"]+)"/.exec(tag)?.[1] ?? '').split(',')) {
            const path = item.trim().split(/\s+/)[0];
            if (path.startsWith('/')) assets.add(path);
        }
    }
}
for (const path of assets) assert.ok((await stat(join(directory, decodeURI(path)))).isFile(), `Missing image: ${path}`);
for (const locale of ['ko', 'en']) {
    const source = JSON.parse(await readFile(`data/works/${locale}.json`, 'utf8'));
    for (const [variant, items] of Object.entries(source)) {
        const list = JSON.parse(await readFile(join(directory, 'content', locale, `works-${variant}.json`), 'utf8'));
        assert.equal(list.length, items.length, `${locale}/${variant}: summary count mismatch`);
        for (const work of items) {
            const record = JSON.parse(await readFile(join(directory, 'content', locale, 'works', variant, `${work.id}.json`), 'utf8'));
            assert.deepEqual(record, work, `${locale}/${work.id}: static record differs from source`);
        }
    }
}
console.log(`Verified ${urls.length} canonical pages, ${assets.size} image resources, and both locales' project records.`);
