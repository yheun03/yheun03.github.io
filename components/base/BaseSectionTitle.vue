<template>
    <div class="section-title" :data-animate="animate ? '' : null">
        <p v-if="eyebrow" class="section-title__eyebrow">{{ eyebrow }}</p>
        <component :is="headingTag" :id="titleId" class="section-title__title">
            {{ title }}
            <svg
                class="section-title__spark"
                v-if="spark"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
                />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx="4" cy="20" r="2" />
            </svg>
        </component>
        <p v-if="description" :id="descriptionId" class="section-title__description">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        eyebrow?: string;
        title: string;
        description?: string;
        titleId: string;
        descriptionId?: string;
        headingTag?: 'h1' | 'h2';
        spark?: boolean;
        animate?: boolean;
    }>(),
    { headingTag: 'h2', spark: false, animate: true },
);
</script>
