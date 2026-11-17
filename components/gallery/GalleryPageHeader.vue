<template>
    <div class="gallery-editorial__header" data-reveal="hero">
        <BaseEditorialMasthead title-id="gallery-poster-title" :title="title" :description="dek" />

        <div class="gallery-page__toolbar" role="group" :aria-label="toolbarAriaLabel">
            <GalleryMultiFilter
                v-if="filterOptions.length"
                :selected="filterModes"
                :options="filterOptions"
                :label="filterLegend"
                @update:selected="emit('update:filterModes', $event)"
            />
            <div class="gallery-page__controls">
                <p class="gallery-page__result" role="status" aria-live="polite" aria-atomic="true">{{ resultLabel }}</p>
                <BaseSegmentControl
                    v-if="viewOptions.length"
                    class="gallery-page__view"
                    :model-value="viewMode"
                    :options="viewOptions"
                    :label-text="viewLegend"
                    :label-id="viewLabelId"
                    @update:model-value="emit('update:viewMode', $event as GalleryViewMode)"
                >
                    <template #option="{ option }">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path v-if="option.value === 'editorial'" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                            <template v-else>
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                            </template>
                        </svg>
                        {{ option.label }}
                    </template>
                </BaseSegmentControl>
                <label v-if="sortOptions.length" class="gallery-page__sort">
                    <span>{{ sortLegend }}</span>
                    <select :value="sortMode" @change="handleSortChange">
                        <option v-for="option in sortOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                    </select>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GalleryViewMode, WorkFilterMode, WorkSortMode } from '~/composables/gallery/useGallery';

defineProps<{
    viewMode: GalleryViewMode;
    title: string;
    dek: string;
    sortLegend: string;
    filterLegend: string;
    viewLegend: string;
    toolbarAriaLabel: string;
    resultLabel: string;
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

function handleSortChange(event: Event) {
    emit('update:sortMode', (event.target as HTMLSelectElement).value as WorkSortMode);
}
</script>
