<template>
    <span class="base-badge" :class="[size === 'sm' ? 'base-badge--sm' : undefined, tone && tone !== 'default' ? `base-badge--${tone}` : undefined]">
        <slot />
    </span>
</template>

<script setup lang="ts">
defineProps<{
    size?: 'sm' | 'md';
    tone?: 'default' | 'toolbox' | 'work';
}>();
</script>
