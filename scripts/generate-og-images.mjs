import { mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';

// Run after editing project titles or replacing social-preview source illustrations.
const directory = 'assets/images/common/og';
const works = JSON.parse(await readFile('data/works/ko.json', 'utf8'));
const detailsOnly = process.argv.includes('--details-only');
const escape = (value) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);
const textWidth = (value) => [...value].reduce((width, character) => width + (/[^\x00-\x7F]/.test(character) ? 2 : 1), 0);
function lines(value, limit = 20) {
    const result = [''];
    for (const word of value.split(/\s+/)) {
        if (result.at(-1).length && textWidth(`${result.at(-1)} ${word}`) > limit) result.push(word);
        else result[result.length - 1] += `${result.at(-1) ? ' ' : ''}${word}`;
    }
    return result;
}
const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><style>text{font-family:Arial,'Apple SD Gothic Neo',sans-serif;fill:#202124}.muted{fill:#666}</style>${body}</svg>`);
async function card({ name, title, label, subtitle, source, illustration = false, korean = false }) {
    const titleLines = lines(title);
    const fontSize = titleLines.length > 3 ? 40 : 46;
    const layers = [];
    if (source) {
        layers.push({ input: await sharp(source).resize(illustration ? 1200 : 580, illustration ? 630 : 390, { fit: illustration ? 'cover' : 'contain', background: '#eceef0' }).png().toBuffer(), left: illustration ? 0 : 568, top: illustration ? 0 : 116 });
    }
    layers.push({ input: svg(`
        <defs><linearGradient id="fade"><stop stop-color="#f5f5f5"/><stop offset=".79" stop-color="#f5f5f5"/><stop offset="1" stop-color="#f5f5f5" stop-opacity="0"/></linearGradient></defs>
        <rect width="${illustration ? 700 : 555}" height="630" fill="${illustration ? 'url(#fade)' : '#f5f5f5'}"/>
        <text x="56" y="82" font-size="35" font-weight="700">eun<tspan fill="#e53935">.</tspan></text>
        <text x="56" y="149" font-size="16" letter-spacing="2" class="muted">${escape(label.toUpperCase())}</text>
        ${titleLines.map((line, index) => `<text x="56" y="${226 + index * (fontSize + 9)}" font-size="${fontSize}" font-weight="700" letter-spacing="-1.5">${escape(line)}</text>`).join('')}
        ${lines(subtitle, 38).slice(0, 2).map((line, index) => `<text x="56" y="${(titleLines.length > 4 ? 495 : 467) + index * 26}" font-size="18" class="muted">${escape(line)}</text>`).join('')}
        <rect y="548" width="1200" height="82" fill="#f5f5f5" fill-opacity=".96"/>
        <path d="M56 548H1144" stroke="#d8dadd"/>
        <text x="56" y="585" font-size="16" class="muted">${korean ? '은영환 / 웹 퍼블리셔' : 'YOUNGHWAN EUN / WEB PUBLISHER'}</text>
        <text x="1144" y="585" text-anchor="end" font-size="16" class="muted">yheun03.github.io</text>
    `), left: 0, top: 0 });
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#eceef0' } }).composite(layers).jpeg({ quality: 90, mozjpeg: true }).toFile(`${directory}/${name}.jpg`);
}
await mkdir(directory, { recursive: true });
if (!detailsOnly) for (const [name, title, label, subtitle] of [
    ['about', 'Hello, I am Eun.', 'About me', 'Small details. Consistent interfaces.'],
    ['journey', 'Learning. Building. Growing.', 'Career & education', 'From first markup to Vue interfaces.'],
    ['projects', 'Professional projects', 'Selected work', 'Corporate websites, CMS & business UI.'],
    ['personal', 'Ideas into interfaces.', 'Personal projects', 'Independent experiments with Vue & Nuxt.'],
]) await card({ name, title, label, subtitle, source: `${directory}/sources/${name}.png`, illustration: true });
for (const [variant, items] of Object.entries(works)) {
    for (const work of items) {
        const capture = [work.thumbnail, ...work.captures].find((path) => path && !/placeholder|\.svg$/i.test(path));
        await card({
            name: `${variant}-${work.id}`, title: work.title,
            label: variant === 'career' ? '실무 프로젝트' : '개인 프로젝트',
            korean: true,
            subtitle: `${work.period} / ${work.languages.slice(0, 3).join(', ')}`,
            source: capture ? capture.replace(/^\/assets\//, 'assets/') : `${directory}/sources/projects.png`,
            illustration: !capture,
        });
    }
}
console.log(`Generated ${(detailsOnly ? 0 : 4) + Object.values(works).flat().length} social preview cards at 1200 x 630.`);
