<template>
    <fieldset class="gallery-filter">
        <legend class="gallery-filter__label">
            {{ label }}
            <span>{{ t('gallery.filterHint') }}</span>
        </legend>
        <div class="gallery-filter__options">
            <button
                type="button"
                class="gallery-filter__chip"
                :class="{ 'gallery-filter__chip--active': selected.length === 0 }"
                :aria-pressed="selected.length === 0"
                @click="emit('update:selected', [])"
            >
                {{ t('gallery.filterAll') }}
            </button>
            <label v-for="option in options" :key="option.value" class="gallery-filter__option">
                <input type="checkbox" class="visually-hidden" :checked="selected.includes(option.value)" @change="toggle(option.value)" />
                <span class="gallery-filter__chip">
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
                        <path v-if="selected.includes(option.value)" d="M20 6 9 17l-5-5" />
                        <path v-else d="M12 5v14M5 12h14" />
                    </svg>
                    {{ option.label }}
                </span>
            </label>
        </div>
    </fieldset>
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

function toggle(value: WorkFilterMode) {
    const next = props.selected.includes(value) ? props.selected.filter((item) => item !== value) : [...props.selected, value];
    emit('update:selected', next);
}
</script>
