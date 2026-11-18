<template>
    <img
        :src="imageSrc"
        :srcset="srcset"
        :sizes="image ? sizes : undefined"
        :alt="alt"
        :width="width ?? image?.width"
        :height="height ?? image?.height"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
    />
</template>

<script setup lang="ts">
import media from '@data/media.json';

const props = withDefaults(
    defineProps<{
        src: string;
        alt: string;
        width?: number;
        height?: number;
        sizes?: string;
        priority?: boolean;
    }>(),
    { sizes: '(min-width: 1024px) 45vw, 90vw', priority: false },
);

const sourceIndex = computed(() => props.src.indexOf('/assets/images/'));
const sourcePath = computed(() => (sourceIndex.value >= 0 ? props.src.slice(sourceIndex.value) : props.src));
const image = computed(() => (media as Record<string, { width: number; height: number; widths: number[] }>)[sourcePath.value]);
const responsivePath = (width: number) =>
    `${props.src.slice(0, sourceIndex.value)}/assets/media/${sourcePath.value.slice('/assets/images/'.length).replace(/\.[^.]+$/, '')}-${width}.webp`;
const imageSrc = computed(() => (image.value ? responsivePath(image.value.widths.at(-1)!) : props.src));
const srcset = computed(() => image.value?.widths.map((width) => `${responsivePath(width)} ${width}w`).join(', '));
</script>
