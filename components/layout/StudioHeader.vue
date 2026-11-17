<template>
    <header class="studio-nav">
        <BaseLink class="studio-nav__brand" :href="home ? '#hello' : '/'" aria-label="Eun Younghwan — Home"
            ><img :src="resolveAppPath('/assets/icons/logo.svg')" width="210" height="44" alt=""
        /></BaseLink>
        <nav class="studio-nav__links" aria-label="Main navigation">
            <BaseLink
                v-for="link in links"
                :key="link.label"
                :href="link.href"
                :aria-current="!home && route.path.startsWith(link.href) ? 'page' : undefined"
                >{{ link.label }}</BaseLink
            >
            <button type="button" :disabled="switching" :aria-label="locale === 'ko' ? 'Switch to English' : '한국어로 변경'" @click="switchLocale">
                {{ locale === 'ko' ? 'EN' : '한국어' }}
            </button>
        </nav>
        <BaseLink class="studio-nav__contact" href="#contact">Contact <span aria-hidden="true">↗</span></BaseLink>
    </header>
</template>

<script setup lang="ts">
const props = defineProps<{ home?: boolean }>();
const route = useRoute();
const { resolveAppPath } = useAppPath();
const { locale, toggleLocale } = useLocale();
const switching = ref(false);
const links = computed(() => [
    { label: 'Work', href: props.home ? '#works' : '/projects' },
    { label: 'About', href: props.home ? '#about' : '/about' },
    ...(props.home ? [{ label: 'Skills', href: '#approach' }] : []),
    { label: 'Personal', href: '/personal' },
    { label: 'Journey', href: '/journey' },
]);
async function switchLocale() {
    if (switching.value) return;
    switching.value = true;
    try {
        await toggleLocale();
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
    background: #f4f5f4;
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
        flex-shrink: 0;
        img {
            display: block;
            width: 190px;
            height: auto;
        }
        font-size: 34px;
        font-weight: 750;
        letter-spacing: -0.09em;
        color: #2354d8;
    }
    &__links {
        display: flex;
        align-items: center;
        gap: clamp(16px, 2.4vw, 36px);
        font-size: 13px;
        a,
        button {
            padding: 8px 0;
        }
        a:hover,
        a[aria-current='page'],
        button:hover {
            color: #2354d8;
        }
        a[aria-current='page'] {
            text-decoration: underline;
            text-underline-offset: 6px;
        }
        button {
            border: 0;
            background: none;
            color: inherit;
            font: inherit;
            cursor: pointer;
        }
        button:disabled {
            color: #566273;
            opacity: 1;
            cursor: wait;
        }
    }
    &__contact {
        display: flex;
        align-items: center;
        gap: 18px;
        font-size: 13px;
        span {
            font-size: 22px;
        }
    }
}
@media (max-width: 640px) {
    .studio-nav {
        flex-wrap: wrap;
        gap: 8px 20px;
        padding-block: 12px;
        &__brand {
            flex-shrink: 0;
            img {
                display: block;
                width: 190px;
                height: auto;
            }
            font-size: 29px;
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
