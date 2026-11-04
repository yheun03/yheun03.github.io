<template>
    <details class="gallery-filter">
        <summary class="gallery-filter__trigger">
            <span class="gallery-filter__trigger-label">{{ triggerLabel }}</span>
            <strong>{{ selectionLabel }}</strong>
            <svg
                class="gallery-filter__chevron"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        </summary>

        <fieldset class="gallery-filter__panel">
            <legend class="visually-hidden">{{ label }}</legend>
            <button
                type="button"
                class="gallery-filter__clear"
                :class="{ 'gallery-filter__clear--active': selected.length === 0 }"
                :aria-label="t('gallery.filterAll')"
                @click="emit('update:selected', [])"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
                {{ t('gallery.filterAll') }}
            </button>
            <label v-for="option in options" :key="option.value" class="gallery-filter__option">
                <input type="checkbox" :aria-label="option.label" :checked="selected.includes(option.value)" @change="toggle(option.value)" />
                <span aria-hidden="true">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </span>
                {{ option.label }}
            </label>
        </fieldset>
    </details>
</template>

<script setup lang="ts">
import type { WorkFilterMode } from '~/composables/gallery/useGallery';

const props = defineProps<{
    selected: readonly WorkFilterMode[];
    options: readonly { value: WorkFilterMode; label: string }[];
    label: string;
}>();

const emit = defineEmits<{
    'update:selected': [value: WorkFilterMode[]];
}>();

const { t } = useLocale();
const triggerLabel = computed(() => t('gallery.filterTrigger'));
const selectionLabel = computed(() =>
    props.selected.length ? t('gallery.filterSelected').replace('{count}', String(props.selected.length)) : t('gallery.filterAll'),
);

function toggle(value: WorkFilterMode) {
    const next = props.selected.includes(value) ? props.selected.filter((item) => item !== value) : [...props.selected, value];
    emit('update:selected', next);
}
</script>
