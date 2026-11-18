<template>
    <header class="app-header">
        <BaseLink class="app-header__brand" :href="home ? '#hello' : '/'" :aria-label="t('a11y.portfolioHome')"
            ><img :src="resolveAppPath('/assets/icons/favicon.svg')" width="35" height="32" alt=""
        /></BaseLink>
        <nav class="app-header__links" :aria-label="t('a11y.primaryNavigation')">
            <BaseLink
                v-for="link in links"
                :key="link.label"
                :href="link.href"
                :aria-current="!home && route.path.startsWith(link.href) ? 'page' : undefined"
                >{{ link.label }}</BaseLink
            >
        </nav>
        <div class="app-header__utilities">
            <BaseLink class="app-header__contact" href="#contact">Contact <span aria-hidden="true">↗</span></BaseLink>
            <div class="app-header__language" role="group" aria-label="Language">
                <button type="button" lang="ko" aria-label="한국어" :aria-pressed="locale === 'ko'" :disabled="switching" @click="switchLocale('ko')">
                    KO
                </button>
                <span aria-hidden="true">/</span>
                <button type="button" lang="en" aria-label="English" :aria-pressed="locale === 'en'" :disabled="switching" @click="switchLocale('en')">
                    EN
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const props = defineProps<{ home?: boolean }>();
const route = useRoute();
const { resolveAppPath } = useAppPath();
const { locale, setLocale, t } = useLocale();
const switching = ref(false);
const links = computed(() => [
    { label: 'About', href: props.home ? '#about' : '/about' },
    { label: 'Work', href: props.home ? '#works' : '/projects' },
    ...(props.home ? [{ label: 'Skills', href: '#approach' }] : []),
    { label: 'Personal', href: '/personal' },
    { label: 'Journey', href: '/journey' },
]);
async function switchLocale(value: 'ko' | 'en') {
    if (switching.value || locale.value === value) return;
    switching.value = true;
    try {
        await setLocale(value);
    } finally {
        switching.value = false;
    }
}
</script>
