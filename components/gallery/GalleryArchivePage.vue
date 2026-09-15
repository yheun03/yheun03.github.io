<template>
    <GalleryLayout :variant="variant" :base-path="basePath">
        <article class="gallery-page section gallery-page--editorial" :class="galleryVariantClass"
            aria-labelledby="gallery-poster-title">
            <GalleryPageHeader :view-mode="viewMode" :title="t(titleKey)" :dek="lead" :kicker="editorialKicker"
                :hero-number="heroNumber" :hero-aria-label="heroAriaLabel" :status-label="t('gallery.indexLabel')"
                :stats="editorialStats" :sort-legend="sortLegend" :sort-aria-label="sortAriaLabel"
                :view-legend="viewLegend" :view-aria-label="viewAriaLabel" :toolbar-aria-label="toolbarAriaLabel"
                :sort-options="sortOptions" :view-options="viewOptions" :sort-mode="sortMode"
                @update:sort-mode="sortMode = $event" @update:view-mode="viewMode = $event" />

            <GalleryArchiveListRenderer :view-mode="viewMode" :editorial-year-groups="editorialYearGroups"
                :gallery-entries="galleryEntries" :base-path="basePath" :list-aria-label="t('gallery.projectList')"
                :flat-aria-label="t('gallery.otherProjects')" :entry-label="t('gallery.viewEntry')" />
        </article>
    </GalleryLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '~/composables/gallery/useGallery';
import GalleryArchiveListRenderer from '~/components/renderers/Page_GalleryArchive/GalleryArchiveListRenderer.vue';
import GalleryPageHeader from '~/components/gallery/GalleryPageHeader.vue';

const props = defineProps<{
    variant: GalleryArchiveVariant;
}>();

const galleryVariantClass = computed(() => `gallery-page--${props.variant}`);
const works = useGalleryRouteWorks(props.variant);

const {
    t,
    sortMode,
    viewMode,
    sortOptions,
    viewOptions,
    galleryEntries,
    editorialYearGroups,
    lead,
    editorialKicker,
    editorialStats,
    heroNumber,
    heroAriaLabel,
    sortLegend,
    sortAriaLabel,
    viewLegend,
    viewAriaLabel,
    toolbarAriaLabel,
    titleKey,
    basePath,
} = useGalleryArchive(props.variant, works);
</script>
