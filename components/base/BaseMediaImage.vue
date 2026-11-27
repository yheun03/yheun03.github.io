<template>
    <img
        :src="imageSrc"
        :srcset="srcset"
        :sizes="responsive && image ? imageSizes : undefined"
        :alt="alt"
        :width="width ?? image?.width"
        :height="height ?? image?.height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
    />
</template>

<script setup lang="ts">
import { responsiveWidths } from '@data/responsive-widths.mjs';

const props = withDefaults(
    defineProps<{
        src: string;
        alt: string;
        width?: number;
        height?: number;
        sizes?: string;
        priority?: boolean;
        responsive?: boolean;
    }>(),
    { sizes: '(min-width: 1024px) 45vw, 90vw', priority: false, responsive: true },
);

const image = computed(() => getMediaImage(props.src));
const sources = computed(() => {
    const info = image.value;
    if (!props.responsive || !info) return [];
    return responsiveWidths(info.width).map((width: number) => ({ width, src: `${info.base}-${width}.webp` }));
});
const imageSizes = computed(() => props.priority ? props.sizes : `auto, ${props.sizes}`);
const imageSrc = computed(() => sources.value.at(-1)?.src ?? props.src);
const srcset = computed(() => sources.value.map(({ src, width }) => `${src} ${width}w`).join(', ') || undefined);
// The preload uses the same candidates as the image so the browser issues one request.
if (import.meta.server && props.priority && srcset.value) {
    useHead({ link: [{
        rel: 'preload', as: 'image', imagesrcset: srcset.value, imagesizes: imageSizes.value,
        fetchpriority: 'high',
    }] });
}
</script>
