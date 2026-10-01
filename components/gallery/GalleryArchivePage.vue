<template>
    <GalleryLayout :variant="variant" :base-path="basePath">
        <article class="gallery-page section gallery-page--editorial" :class="galleryVariantClass" aria-labelledby="gallery-poster-title">
            <GalleryPageHeader
                :view-mode="viewMode"
                :title="t(titleKey)"
                :dek="lead"
                :kicker="editorialKicker"
                :hero-number="heroNumber"
                :hero-aria-label="heroAriaLabel"
                :status-label="t('gallery.indexLabel')"
                :stats="editorialStats"
                :sort-legend="sortLegend"
                :filter-legend="filterLegend"
                :view-legend="viewLegend"
                :toolbar-aria-label="toolbarAriaLabel"
                :sort-options="sortOptions"
                :view-options="viewOptions"
                :filter-options="filterOptions"
                :filter-modes="filterModes"
                :sort-mode="sortMode"
                @update:filter-modes="filterModes = $event"
                @update:sort-mode="sortMode = $event"
                @update:view-mode="viewMode = $event"
            />

            <GalleryArchiveListRenderer
                :view-mode="viewMode"
                :editorial-year-groups="editorialYearGroups"
                :gallery-entries="galleryEntries"
                :base-path="basePath"
                :list-aria-label="t('gallery.projectList')"
                :flat-aria-label="t('gallery.otherProjects')"
                :entry-label="t('gallery.viewEntry')"
            />
        </article>
    </GalleryLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '~/composables/gallery/useGallery';
import GalleryArchiveListRenderer from '~/components/renderers/Page_GalleryArchive/GalleryArchiveListRenderer.vue';

const props = defineProps<{
    variant: GalleryArchiveVariant;
}>();

const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);
const works = useGalleryRouteWorks(props.variant);

const {
    t,
    sortMode,
    filterModes,
    viewMode,
    sortOptions,
    filterOptions,
    viewOptions,
    galleryEntries,
    editorialYearGroups,
    lead,
    editorialKicker,
    editorialStats,
    heroNumber,
    heroAriaLabel,
    sortLegend,
    filterLegend,
    viewLegend,
    toolbarAriaLabel,
    titleKey,
    basePath,
} = useGalleryArchive(props.variant, works);
</script>
