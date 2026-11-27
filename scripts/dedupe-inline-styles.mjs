import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = '.output/public';
const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8');
const styles = new Map();
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const file = join(output, new URL(url).pathname, 'index.html');
    const original = await readFile(file, 'utf8');
    let html = original;
    for (const [link, name] of original.matchAll(/<link rel="stylesheet" href="[^"]*\/_nuxt\/([\w.-]+\.css)" crossorigin>/g)) {
        if (!styles.has(name)) styles.set(name, (await readFile(join(output, '_nuxt', name), 'utf8')).trim());
        const css = styles.get(name);
        const inline = `<style>${css}</style>`;
        // Keep the last cascade position. Relative URLs need their external stylesheet base.
        if (!html.includes(inline) || /url\(|@import/i.test(css)) continue;
        html = html.replace(inline, '').replace(link, () => inline);
    }
    if (html !== original) await writeFile(file, html);
}
