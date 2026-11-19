<template>
    <span class="gallery-card__empty-capture" role="img" :aria-label="emptyCaptureLabel">
        <span class="gallery-card__empty-capture-kicker">{{ emptyCaptureKicker }}</span>
        <span class="gallery-card__empty-capture-copy">{{ emptyCaptureCopy }}</span>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    description?: string;
}>();
const { t } = useLocale();

const emptyCaptureKicker = computed(() => t('gallery.emptyCaptureTitle'));
const emptyCaptureCopy = computed(() => props.description || t('gallery.emptyCaptureDescription'));
const emptyCaptureLabel = computed(() => `${emptyCaptureKicker.value}. ${emptyCaptureCopy.value}`);
</script>
