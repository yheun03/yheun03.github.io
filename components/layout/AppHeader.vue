<template>
    <header class="app-header">
        <BaseLink class="app-header__brand" href="/" :aria-label="t('a11y.portfolioHome')"
            ><img :src="resolveAppPath('/assets/icons/logo-eun.svg')" width="120" height="49" alt=""
        /></BaseLink>
        <nav class="app-header__links" :aria-label="t('a11y.primaryNavigation')">
            <BaseLink
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                :aria-current="currentPath === link.href ? 'page' : currentPath.startsWith(`${link.href}/`) ? 'location' : undefined"
                >{{ link.label }}</BaseLink
            >
        </nav>
        <div class="app-header__utilities">
            <BaseLink class="app-header__contact" href="#contact">Contact <span aria-hidden="true">↗</span></BaseLink>
            <div class="app-header__language" role="group" aria-label="Language">
                <button type="button" lang="ko" aria-label="KO, 한국어" :aria-pressed="locale === 'ko'" :disabled="switching" @click="switchLocale('ko')">
                    KO
                </button>
                <span aria-hidden="true">/</span>
                <button type="button" lang="en" aria-label="EN, English" :aria-pressed="locale === 'en'" :disabled="switching" @click="switchLocale('en')">
                    EN
                </button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const route = useRoute();
const currentPath = computed(() => route.path.replace(/\/+$/, '') || '/');
const { resolveAppPath } = useAppPath();
const { locale, setLocale, t } = useLocale();
const switching = ref(false);
const links = [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/projects' },
    { label: 'Personal', href: '/personal' },
    { label: 'Journey', href: '/journey' },
];
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
