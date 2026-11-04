<template>
    <NuxtLink :to="to" class="story-case surface-card" :aria-label="linkLabel">
        <p class="story-case__head">
            <BaseIndexLabel variant="tag" tag="span">
                {{ tag }}
            </BaseIndexLabel>
            <span class="story-case__period">{{ period }}</span>
        </p>

        <h3>{{ title }}</h3>
        <p class="story-case__summary">{{ summary }}</p>

        <BaseChipList :items="tech" :aria-label="techAriaLabel" />

        <span class="story-case__cta" aria-hidden="true">
            {{ ctaLabel }}
            <svg
                class="story-case__cta-arrow"
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </span>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    to: string;
    linkLabel: string;
    tag: string;
    period: string;
    title: string;
    summary: string;
    tech: string[];
    ctaLabel: string;
    techAriaLabel?: string;
}>();
</script>
