<template>
    <div class="gallery-editorial__header" data-reveal="hero">
        <BaseEditorialMasthead
            title-id="gallery-poster-title"
            :title="title"
            :kicker="kicker"
            :stats="stats"
            :description="dek"
            :figure="heroNumber"
            :figure-aria-label="heroAriaLabel"
            :status="statusLabel"
        />

        <nav class="gallery-page__toolbar" :aria-label="toolbarAriaLabel">
            <BaseSegmentControl
                v-if="viewOptions.length"
                :model-value="viewMode"
                :options="viewOptions"
                :label-text="viewLegend"
                :label-id="viewLabelId"
                label-hidden
                @update:model-value="emit('update:viewMode', $event as GalleryViewMode)"
            />
            <BaseSegmentControl
                v-if="sortOptions.length"
                :model-value="sortMode"
                :options="sortOptions"
                :label-text="sortLegend"
                :label-id="sortLabelId"
                label-hidden
                @update:model-value="emit('update:sortMode', $event as WorkSortMode)"
            />
        </nav>
    </div>
</template>

<script setup lang="ts">
import type { GalleryViewMode, WorkSortMode } from '~/composables/gallery/useGallery';

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
    sortAriaLabel: string;
    viewLegend: string;
    viewAriaLabel: string;
    toolbarAriaLabel: string;
    sortOptions: { value: WorkSortMode; label: string }[];
    viewOptions: { value: GalleryViewMode; label: string }[];
    sortMode: WorkSortMode;
}>();

const emit = defineEmits<{
    'update:sortMode': [value: WorkSortMode];
    'update:viewMode': [value: GalleryViewMode];
}>();

const viewLabelId = 'gallery-toolbar-view-label';
const sortLabelId = 'gallery-toolbar-sort-label';
</script>
