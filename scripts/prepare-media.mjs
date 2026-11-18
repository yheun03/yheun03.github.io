import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import sharp from 'sharp';

const sourceDir = 'assets/images';
const outputDir = 'public/assets/media';
const manifest = {};
const expected = new Set();
async function collect(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => (entry.isDirectory() ? collect(join(directory, entry.name)) : [join(directory, entry.name)])));
    return nested.flat();
}
// Logos and social previews keep their original files; screenshots and photos use responsive copies.
const files = (await collect(sourceDir)).filter((file) => /\.(?:webp|jpe?g|png)$/i.test(file) && !/\/(?:companies|common)\//.test(file));
for (const file of files) {
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) continue;
    const widths = [...new Set([160, 320, 480, 960, 1440].map((size) => Math.min(size, width)))];
    const name = relative(sourceDir, file).replace(/\.[^.]+$/, '');
    const modified = (await stat(file)).mtimeMs;
    for (const size of widths) {
        const output = join(outputDir, `${name}-${size}.webp`);
        expected.add(output);
        const cached = await stat(output).catch(() => null);
        if (cached && cached.mtimeMs >= modified) continue;
        await mkdir(dirname(output), { recursive: true });
        await sharp(file).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(output);
    }
    manifest[`/assets/images/${relative(sourceDir, file)}`] = { width, height, widths };
}
for (const file of await collect(outputDir).catch(() => [])) {
    if (!expected.has(file)) await rm(file);
}
const content = `${JSON.stringify(manifest, null, 2)}\n`;
const manifestPath = 'data/media.json';
if ((await readFile(manifestPath, 'utf8').catch(() => '')) !== content) await writeFile(manifestPath, content);
console.log(`Prepared responsive images for ${files.length} sources.`);
