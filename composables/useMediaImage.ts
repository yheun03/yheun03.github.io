import dimensions from '@data/media.json';

const images: Record<string, number[]> = dimensions;

export function getMediaImage(src: string) {
    const marker = '/assets/images/';
    const index = src.indexOf(marker);
    if (index < 0) return;
    const path = src.slice(index + marker.length);
    const size = images[path];
    if (!Array.isArray(size)) return;
    const [width, height] = size;
    const base = src.slice(0, index) + '/assets/media/' + path.replace(/\.[^.]+$/, '');
    return { width, height, base };
}
