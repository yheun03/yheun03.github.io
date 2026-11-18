<template>
    <NuxtPage />
</template>

<script setup lang="ts">
const { initLocale } = useLocale();

onMounted(async () => {
    document.documentElement.classList.toggle('reduce-effects', useReducedEffects());
    try {
        await initLocale();
    } catch {
        document.documentElement.lang = 'ko';
    }
});
</script>
