<template>
    <NuxtLink :to="to" class="gallery-card">
        <div class="gallery-card__stage" :class="{ 'gallery-card__stage--empty': isPlaceholderCover }">
            <GalleryEmptyCapture v-if="isPlaceholderCover" :description="work.captureNotice" />
            <ProjectDeviceMockup v-else :src="coverCapture" :mockup="work.mockup" alt="" sizes="(min-width: 641px) 38vw, 76vw" />
        </div>
        <div class="gallery-card__heading">
            <h2>{{ work.title }}</h2>
            <span aria-hidden="true">↗</span>
        </div>
        <p>{{ work.role }}</p>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { WorkSummary } from '@data/works';
import { isPlaceholderCapture } from '~/composables/gallery/useGallery';

const props = defineProps<{
    work: WorkSummary;
    to: string;
}>();

const coverCapture = computed(() => props.work.captures[0] || '');
const isPlaceholderCover = computed(() => isPlaceholderCapture(coverCapture.value));
</script>
