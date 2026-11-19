import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Static JSON is fetched per page; complete project records stay out of the shared JS bundle.
const outputDir = 'public/content';
await rm(outputDir, { recursive: true, force: true });
for (const locale of ['ko', 'en']) {
    const works = JSON.parse(await readFile(`data/works/${locale}.json`, 'utf8'));
    const directory = join(outputDir, locale);
    await mkdir(join(directory, 'works'), { recursive: true });
    for (const [variant, items] of Object.entries(works)) {
        await mkdir(join(directory, 'works', variant), { recursive: true });
        const summaries = items.map(({ id, category, title, period, type, role, tech, pin, languages, captures, thumbnail, mockup, captureNotice }) => ({
            id,
            category,
            title,
            period,
            type,
            role,
            tech,
            pin,
            languages,
            captures: captures.slice(0, 1),
            ...(thumbnail ? { thumbnail } : {}),
            ...(mockup ? { mockup } : {}),
            ...(captureNotice ? { captureNotice } : {}),
        }));
        await writeFile(join(directory, `works-${variant}.json`), JSON.stringify(summaries));
        for (const work of items) await writeFile(join(directory, 'works', variant, `${work.id}.json`), JSON.stringify(work));
    }
}
