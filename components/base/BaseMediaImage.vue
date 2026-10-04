<template>
    <img :src="src" :alt="alt" :width="width" :height="height" :loading="priority ? 'eager' : 'lazy'" decoding="async"
        :fetchpriority="priority ? 'high' : undefined" />
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        src: string;
        alt: string;
        width?: number;
        height?: number;
        priority?: boolean;
    }>(),
    {
        priority: false,
    },
);
</script>
