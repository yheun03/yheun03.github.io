<template>
    <GalleryLayout :variant="variant" :base-path="basePath">
        <article class="silver-archive" :class="galleryVariantClass">
            <header class="silver-page-heading">
                <h1>{{ t(titleKey) }}</h1>
                <p>{{ lead }}</p>
            </header>
            <div class="silver-archive__toolbar" role="group" :aria-label="toolbarAriaLabel">
                <GalleryMultiFilter v-if="filterOptions.length" :selected="filterModes" :options="filterOptions" :label="filterLegend" @update:selected="filterModes = $event" />
                <div class="silver-archive__sort">
                    <p role="status" aria-live="polite">{{ resultLabel }}</p>
                    <label><span>{{ sortLegend }}</span><select v-model="sortMode"><option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option></select></label>
                </div>
            </div>
            <div class="silver-archive__grid">
                <NuxtLink v-for="work in filteredWorks" :key="work.id" :to="`${basePath}/${work.id}`" class="silver-project">
                    <div class="silver-project__stage">
                        <GalleryEmptyCapture v-if="isPlaceholderCapture(work.thumbnail || work.captures[0] || '')" />
                        <div v-else class="silver-project__screen"><BaseMediaImage :src="resolveAppPath(work.thumbnail || work.captures[0])" :alt="work.title" /></div>
                    </div>
                    <div class="silver-project__heading"><h2>{{ work.title }}</h2><span aria-hidden="true">↗</span></div>
                    <p>{{ work.role }}</p>
                </NuxtLink>
            </div>
        </article>
    </GalleryLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '~/composables/gallery/useGallery';
import { isPlaceholderCapture } from '~/composables/gallery/useGallery';

const props = defineProps<{
    variant: GalleryArchiveVariant;
}>();

const { resolveAppPath } = useAppPath();
const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);
const works = useGalleryRouteWorks(props.variant);

const {
    t,
    sortMode,
    filterModes,
    sortOptions,
    filterOptions,
    filteredWorks,
    lead,
    sortLegend,
    filterLegend,
    toolbarAriaLabel,
    titleKey,
    basePath,
} = useGalleryArchive(props.variant, works);

const resultLabel = computed(() => t('gallery.filteredCount').replace('{count}', String(filteredWorks.value.length)));
</script>
