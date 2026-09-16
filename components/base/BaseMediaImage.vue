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
        width: 1200,
        height: 675,
        priority: false,
    },
);
</script>
