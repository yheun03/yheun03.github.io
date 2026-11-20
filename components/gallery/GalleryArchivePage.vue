<template>
    <AppLayout>
        <article class="gallery-page">
            <header class="page-heading">
                <h1>
                    <template v-for="(line, index) in titleLines" :key="index"><br v-if="index" />{{ line }}</template>
                </h1>
                <p>{{ lead }}</p>
            </header>
            <div class="gallery-page__toolbar" role="group" :aria-label="toolbarAriaLabel">
                <GalleryMultiFilter
                    v-if="filterOptions.length"
                    :selected="filterModes"
                    :options="filterOptions"
                    :label="filterLegend"
                    @update:selected="filterModes = $event"
                />
                <div class="gallery-page__sort">
                    <p role="status" aria-live="polite">{{ resultLabel }}</p>
                    <div class="gallery-page__sort-control">
                        <span>{{ sortLegend }}</span>
                        <details
                            ref="sortDropdown"
                            class="gallery-page__sort-dropdown"
                            @keydown.esc.prevent.stop="closeSort(true)"
                            @focusout="handleSortFocusOut"
                        >
                            <summary :aria-label="`${sortLegend}, ${selectedSortLabel}`">{{ selectedSortLabel }}<span aria-hidden="true">⌄</span></summary>
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
            <div class="gallery-page__grid">
                <ProjectGalleryCard v-for="work in filteredWorks" :key="work.id" :work="work" :to="`${basePath}/${work.id}`" />
            </div>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant, WorkSortMode } from '~/composables/gallery/useGallery';

const props = defineProps<{
    variant: GalleryArchiveVariant;
}>();

const { locale } = useLocale();
const { data: works } = await useGalleryRouteWorks(props.variant);

const { t, sortMode, filterModes, sortOptions, filterOptions, filteredWorks, lead, sortLegend, filterLegend, toolbarAriaLabel, titleKey, basePath } =
    useGalleryArchive(props.variant, works);

const resultLabel = computed(() => t('gallery.filteredCount').replace('{count}', String(filteredWorks.value.length)));
const titleLines = computed(() => (locale.value === 'en' ? t(titleKey).split(' ') : [t(titleKey)]));
const sortDropdown = ref<HTMLDetailsElement | null>(null);
const selectedSortLabel = computed(() => sortOptions.value.find((option) => option.value === sortMode.value)?.label);

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

<style lang="scss" src="~/assets/style/gallery/_archive.scss"></style>
