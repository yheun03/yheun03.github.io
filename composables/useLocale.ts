// 현재 언어의 문구와 콘텐츠, 언어 전환 기능 제공
import ko from '@i18n/ko.json';

export type Locale = 'ko' | 'en';

export type PortfolioContent = typeof ko.content;

const STORAGE_KEY = 'portfolio-locale';
let englishMessages: typeof ko | undefined;

function getMessages(locale: Locale) {
    return locale === 'en' ? (englishMessages ?? ko) : ko;
}

async function loadMessages(locale: Locale) {
    if (locale !== 'en' || englishMessages) return;
    const { default: messages } = await import('@i18n/en.json');
    englishMessages = messages as unknown as typeof ko;
}

function isLocale(value: string | null): value is Locale {
    return value === 'ko' || value === 'en';
}

function getByPath(obj: unknown, path: string): string {
    const value = path.split('.').reduce<unknown>((acc, key) => {
        if (!acc || typeof acc !== 'object' || Array.isArray(acc)) return undefined;
        return (acc as Record<string, unknown>)[key];
    }, obj);
    return typeof value === 'string' ? value : path;
}

export function useLocale() {
    const locale = useState<Locale>('locale', () => 'ko');
    const content = computed(() => getMessages(locale.value).content as PortfolioContent);

    function t(key: string) {
        return getByPath(getMessages(locale.value), key);
    }

    async function setLocale(value: Locale) {
        await loadMessages(value);
        locale.value = value;
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, value);
            document.documentElement.lang = value;
        }
    }

    async function initLocale() {
        if (!import.meta.client) return;
        const saved = localStorage.getItem(STORAGE_KEY);
        await setLocale(isLocale(saved) ? saved : 'ko');
    }

    async function toggleLocale() {
        await setLocale(locale.value === 'ko' ? 'en' : 'ko');
    }

    return { locale, t, content, initLocale, toggleLocale };
}
