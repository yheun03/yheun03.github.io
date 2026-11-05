<template>
    <header class="app-header" :class="{ 'app-header--scrolled': isScrolled }">
        <BaseLink class="app-header__brand" :href="brandHref" :aria-label="t('a11y.portfolioHome')">
            <span aria-hidden="true">Eun</span>
        </BaseLink>
        <nav class="app-header__nav" :aria-label="t('a11y.primaryNavigation')">
            <BaseLink
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                class="app-header__link"
                :class="{ 'app-header__link--active': isActive(link.href) }"
                :aria-current="getAriaCurrent(link.href)"
            >
                {{ link.label }}
            </BaseLink>
        </nav>
        <div class="app-header__actions">
            <p class="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{{ statusMessage }}</p>
            <BaseButton
                class="app-header__theme-toggle"
                variant="ghost"
                :label="themeToggleLabel"
                :aria-label="themeToggleAriaLabel"
                :title="themeToggleAriaLabel"
                @click="handleThemeToggle"
            >
                <Transition name="toggle-swap" mode="out-in">
                    <span :key="themeToggleLabel" class="toggle-swap" aria-hidden="true">
                        <svg
                            class="app-header__theme-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            focusable="false"
                        >
                            <template v-if="isDarkTheme">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                            </template>
                            <path v-else d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
                        </svg>
                    </span>
                </Transition>
            </BaseButton>
            <BaseButton
                class="app-header__language-toggle"
                variant="ghost"
                :label="localeLabel"
                :aria-label="languageToggleAriaLabel"
                :title="languageToggleAriaLabel"
                :aria-busy="localeLoading"
                :disabled="localeLoading"
                @click="handleLocaleToggle"
            >
                <Transition name="toggle-swap" mode="out-in">
                    <span :key="localeLabel" class="toggle-swap">{{ localeLabel }}</span>
                </Transition>
            </BaseButton>
            <button
                ref="menuButtonRef"
                type="button"
                class="app-header__menu-btn"
                :aria-label="t(menuOpen ? 'a11y.mobileMenuClose' : 'a11y.mobileMenuOpen')"
                :aria-expanded="menuOpen"
                aria-controls="app-lnb-panel"
                aria-haspopup="dialog"
                @click="handleAppLnbToggle"
            >
                <svg
                    class="app-header__menu-icon"
                    v-if="menuOpen"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
                <svg
                    class="app-header__menu-icon"
                    v-else
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M4 5h16" />
                    <path d="M4 12h16" />
                    <path d="M4 19h16" />
                </svg>
                <span class="visually-hidden">
                    {{ t(menuOpen ? 'a11y.close' : 'a11y.menu') }}
                </span>
            </button>
        </div>
        <AppLnb id="app-lnb-panel" :open="menuOpen" :links="links" :active-path="activePath" :active-id="activeId" @close="closeMobileMenu" />
    </header>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const isScrolled = ref(false);
let scrollFrame = 0;

const handleScroll = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 48;
        if (isScrolled.value !== nextScrolled) isScrolled.value = nextScrolled;
        scrollFrame = 0;
    });
};

const statusMessage = ref('');
const localeLoading = ref(false);
const { locale, toggleLocale, t } = useLocale();
const { isDarkTheme, toggleTheme } = useTheme();

const localeLabel = computed(() => locale.value.toUpperCase());
const languageToggleAriaLabel = computed(() => `${localeLabel.value}: ${locale.value === 'ko' ? t('a11y.switchToEn') : t('a11y.switchToKo')}`);
const themeToggleLabel = computed(() => (isDarkTheme.value ? 'Light' : 'Dark'));
const themeToggleAriaLabel = computed(
    () => `${themeToggleLabel.value}: ${isDarkTheme.value ? t('a11y.switchToLightTheme') : t('a11y.switchToDarkTheme')}`,
);

async function handleLocaleToggle() {
    if (localeLoading.value) return;
    const switchingToEn = locale.value === 'ko';
    localeLoading.value = true;
    try {
        await toggleLocale();
        statusMessage.value = t(switchingToEn ? 'a11y.localeChangedEn' : 'a11y.localeChangedKo');
    } catch {
        statusMessage.value = t('a11y.localeChangeFailed');
    } finally {
        localeLoading.value = false;
    }
}

function handleThemeToggle() {
    const switchingToLight = isDarkTheme.value;
    toggleTheme();
    statusMessage.value = t(switchingToLight ? 'a11y.themeChangedLight' : 'a11y.themeChangedDark');
}

function closeMobileMenu() {
    menuOpen.value = false;
    nextTick(() => menuButtonRef.value?.focus());
}

const props = withDefaults(
    defineProps<{
        links: { href: string; label: string }[];
        activeId: string;
        brandHref?: string;
        activePath?: string;
    }>(),
    {
        brandHref: '#hello',
    },
);

const { isActive, getAriaCurrent } = useNavLinkState({
    activeId: () => props.activeId,
    activePath: () => props.activePath,
});

const handleAppLnbToggle = () => {
    menuOpen.value = !menuOpen.value;
};

const handleEscapeKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && menuOpen.value) closeMobileMenu();
};

watch(
    () => menuOpen.value,
    (open) => {
        if (!import.meta.client) return;
        document.documentElement.classList.toggle('app--menu-open', open);
    },
);

onMounted(() => {
    window.addEventListener('keydown', handleEscapeKeydown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});

onBeforeUnmount(() => {
    cancelAnimationFrame(scrollFrame);
    document.documentElement.classList.remove('app--menu-open');
    window.removeEventListener('keydown', handleEscapeKeydown);
    window.removeEventListener('scroll', handleScroll);
});
</script>
