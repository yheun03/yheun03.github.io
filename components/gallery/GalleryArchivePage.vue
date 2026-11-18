<template>
    <GalleryLayout :variant="variant" :base-path="basePath">
        <article class="silver-archive" :class="galleryVariantClass">
            <header class="silver-page-heading">
                <h1>
                    <template v-for="(line, index) in titleLines" :key="index"><br v-if="index" />{{ line }}</template>
                </h1>
                <p>{{ lead }}</p>
            </header>
            <div class="silver-archive__toolbar" role="group" :aria-label="toolbarAriaLabel">
                <GalleryMultiFilter v-if="filterOptions.length" :selected="filterModes" :options="filterOptions" :label="filterLegend" @update:selected="filterModes = $event" />
                <div class="silver-archive__sort">
                    <p role="status" aria-live="polite">{{ resultLabel }}</p>
                    <div class="silver-archive__sort-control">
                        <span>{{ sortLegend }}</span>
                        <details ref="sortDropdown" class="silver-archive__sort-dropdown" @keydown.esc.prevent.stop="closeSort(true)" @focusout="handleSortFocusOut">
                            <summary :aria-label="`${sortLegend} · ${selectedSortLabel}`">
                                {{ selectedSortLabel }}<span aria-hidden="true">⌄</span>
                            </summary>
                            <ul :aria-label="sortLegend">
                                <li v-for="option in sortOptions" :key="option.value">
                                    <button type="button" :aria-pressed="sortMode === option.value" @click="selectSort(option.value)">
                                        {{ option.label }}<span v-if="sortMode === option.value" aria-hidden="true">✓</span>
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
            <div class="silver-archive__grid">
                <NuxtLink v-for="work in filteredWorks" :key="work.id" :to="`${basePath}/${work.id}`" class="silver-project">
                    <div class="silver-project__stage" :class="{ 'silver-project__stage--empty': isPlaceholderCapture(work.thumbnail || work.captures[0] || '') }">
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
import type { GalleryArchiveVariant, WorkSortMode } from '~/composables/gallery/useGallery';
import { isPlaceholderCapture } from '~/composables/gallery/useGallery';

const props = defineProps<{
    variant: GalleryArchiveVariant;
}>();

const { resolveAppPath } = useAppPath();
const { locale } = useLocale();
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
const titleLines = computed(() => locale.value === 'en' ? t(titleKey).split(' ') : [t(titleKey)]);
const sortDropdown = ref<HTMLDetailsElement | null>(null);
const selectedSortLabel = computed(() => sortOptions.value.find(option => option.value === sortMode.value)?.label);

function closeSort(returnFocus = false) {
    if (!sortDropdown.value?.open) return;
    sortDropdown.value.open = false;
    if (returnFocus) sortDropdown.value.querySelector('summary')?.focus();
}

function selectSort(value: WorkSortMode) {
    sortMode.value = value;
    closeSort(true);
}

function dismissSort(event: PointerEvent) {
    if (!sortDropdown.value?.contains(event.target as Node)) closeSort();
}

function handleSortFocusOut(event: FocusEvent) {
    if (!sortDropdown.value?.contains(event.relatedTarget as Node | null)) closeSort();
}

onMounted(() => document.addEventListener('pointerdown', dismissSort));
onBeforeUnmount(() => document.removeEventListener('pointerdown', dismissSort));
</script>
