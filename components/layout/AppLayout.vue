<template>
    <div class="app-layout" :class="{ 'app-layout--home': home }">
        <a class="skip-link" href="#main-content" @click="focusMainContent">{{ t('a11y.skipToContent') }}</a>
        <AppHeader />
        <main id="main-content" ref="pageRoot" class="portfolio-page" :class="{ 'portfolio-page--home': home }" tabindex="-1">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    home?: boolean;
}>();

const { t } = useLocale();
const pageRoot = ref<HTMLElement | null>(null);

usePageMotion(pageRoot);

function focusMainContent(event: MouseEvent) {
    event.preventDefault();
    pageRoot.value?.focus({ preventScroll: false });
}
</script>
