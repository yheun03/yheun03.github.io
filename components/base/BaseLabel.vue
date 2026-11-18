<template>
    <p class="base-label">
        <slot>{{ label }}</slot>
    </p>
</template>

<script setup lang="ts">
defineProps<{
    label?: string;
}>();
</script>
