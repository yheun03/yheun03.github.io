import type { WorkItem } from '@data/works';
import ko from '~/data/works/ko.json';
import en from '~/data/works/en.json';

// Nitro serves the same records during SSR that GitHub Pages serves as static JSON.
export default defineEventHandler((event) => {
    const { locale, path } = getRouterParams(event);
    if (locale !== 'ko' && locale !== 'en') throw createError({ statusCode: 404 });
    const works = (locale === 'ko' ? ko : en) as Record<'career' | 'personal', WorkItem[]>;
    const archive = /^works-(career|personal)\.json$/.exec(path ?? '');
    if (archive) {
        return works[archive[1] as 'career' | 'personal'].map(({ id, category, title, period, type, role, tech, pin, languages, captures, thumbnail, mockup, captureNotice }) => ({
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
    }
    const detail = /^works\/(career|personal)\/([\w-]+)\.json$/.exec(path ?? '');
    const work = detail && works[detail[1] as 'career' | 'personal'].find((item) => item.id === detail[2]);
    if (!work) throw createError({ statusCode: 404 });
    return work;
});
