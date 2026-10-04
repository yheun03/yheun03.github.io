<template>
    <div class="gallery-editorial__header" data-reveal="hero">
        <BaseEditorialMasthead title-id="gallery-poster-title" :title="title" :kicker="kicker" :stats="stats"
            :description="dek" :figure="heroNumber" :figure-aria-label="heroAriaLabel" :status="statusLabel" />

        <div class="gallery-page__toolbar" role="group" :aria-label="toolbarAriaLabel">
            <GalleryMultiFilter v-if="filterOptions.length" data-reveal="up" data-reveal-delay="120"
                :selected="filterModes" :options="filterOptions" :label="filterLegend"
                @update:selected="emit('update:filterModes', $event)" />
            <BaseSegmentControl v-if="viewOptions.length" data-reveal="up" data-reveal-delay="180"
                :model-value="viewMode" :options="viewOptions" :label-text="viewLegend" :label-id="viewLabelId"
                label-hidden @update:model-value="emit('update:viewMode', $event as GalleryViewMode)" />
            <BaseSegmentControl v-if="sortOptions.length" data-reveal="up" data-reveal-delay="240"
                :model-value="sortMode" :options="sortOptions" :label-text="sortLegend" :label-id="sortLabelId"
                label-hidden @update:model-value="emit('update:sortMode', $event as WorkSortMode)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GalleryViewMode, WorkFilterMode, WorkSortMode } from '~/composables/gallery/useGallery';

defineProps<{
    viewMode: GalleryViewMode;
    title: string;
    dek: string;
    kicker?: string;
    heroNumber?: string;
    heroAriaLabel?: string;
    statusLabel?: string;
    stats?: string;
    sortLegend: string;
    filterLegend: string;
    viewLegend: string;
    toolbarAriaLabel: string;
    sortOptions: { value: WorkSortMode; label: string }[];
    filterOptions: { value: WorkFilterMode; label: string }[];
    viewOptions: { value: GalleryViewMode; label: string }[];
    sortMode: WorkSortMode;
    filterModes: WorkFilterMode[];
}>();

const emit = defineEmits<{
    'update:sortMode': [value: WorkSortMode];
    'update:filterModes': [value: WorkFilterMode[]];
    'update:viewMode': [value: GalleryViewMode];
}>();

const viewLabelId = 'gallery-toolbar-view-label';
const sortLabelId = 'gallery-toolbar-sort-label';
</script>
