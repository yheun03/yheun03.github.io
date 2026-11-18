<template>
    <header class="studio-nav">
        <BaseLink class="studio-nav__brand" :href="home ? '#hello' : '/'" aria-label="Eun Younghwan — Home"
            ><img :src="resolveAppPath('/assets/icons/favicon.svg')" width="35" height="32" alt=""
        /></BaseLink>
        <nav class="studio-nav__links" aria-label="Main navigation">
            <BaseLink
                v-for="link in links"
                :key="link.label"
                :href="link.href"
                :aria-current="!home && route.path.startsWith(link.href) ? 'page' : undefined"
                >{{ link.label }}</BaseLink
            >
        </nav>
        <div class="studio-nav__utilities">
            <BaseLink class="studio-nav__contact" href="#contact">Contact <span aria-hidden="true">↗</span></BaseLink>
            <div class="studio-nav__language" role="group" aria-label="Language">
                <button type="button" lang="ko" aria-label="한국어" :aria-pressed="locale === 'ko'" :disabled="switching" @click="switchLocale('ko')">KO</button>
                <span aria-hidden="true">/</span>
                <button type="button" lang="en" aria-label="English" :aria-pressed="locale === 'en'" :disabled="switching" @click="switchLocale('en')">EN</button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const props = defineProps<{ home?: boolean }>();
const route = useRoute();
const { resolveAppPath } = useAppPath();
const { locale, setLocale } = useLocale();
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

<style scoped lang="scss">
.studio-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    min-height: 82px;
    padding: 16px 5%;
    border-bottom: 1px solid #23355426;
    background: var(--silver-paper);
    color: #222a35;
    font-family: Arial, 'Pretendard', sans-serif;
    line-height: 1.4;
    a {
        text-decoration: none;
    }
    a:focus-visible,
    button:focus-visible {
        outline: 2px solid #2354d8;
        outline-offset: 5px;
    }
    &__brand {
        display: grid;
        place-items: center;
        flex-shrink: 0;
        min-width: 44px;
        min-height: 44px;
        img {
            display: block;
        }
    }
    &__links {
        display: flex;
        align-items: center;
        gap: clamp(16px, 2.4vw, 36px);
        font-size: 13px;
        a {
            padding: 8px 0;
        }
        a:hover,
        a[aria-current='page'] {
            color: #2354d8;
        }
        a[aria-current='page'] {
            text-decoration: underline;
            text-underline-offset: 6px;
        }
    }
    &__utilities {
        display: flex;
        align-items: center;
        gap: 24px;
        flex-shrink: 0;
    }
    &__language {
        display: flex;
        align-items: center;
        color: #566273;
        font-size: 11px;

        button {
            min-width: 30px;
            min-height: 44px;
            margin: 0;
            padding: 8px 4px;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: pointer;
        }
        button[aria-pressed='true'] {
            color: #222a35;
            font-weight: 700;
        }
        button:hover {
            color: #2354d8;
        }
        button:disabled {
            opacity: 0.6;
            cursor: wait;
        }
        span {
            color: #bfc7d1;
        }
    }
    &__contact {
        display: flex;
        align-items: center;
        gap: 18px;
        min-height: 44px;
        font-size: 13px;
        span {
            font-size: 22px;
        }
    }
}
@media (max-width: 900px) {
    .studio-nav {
        flex-wrap: wrap;
        gap: 8px 20px;
        padding-block: 12px;
        &__utilities {
            margin-left: auto;
            gap: 20px;
        }
        &__links {
            order: 3;
            width: 100%;
            justify-content: space-between;
            gap: 10px;
            font-size: 12px;
        }
    }
}
</style>
