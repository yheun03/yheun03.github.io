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
            try {
                localStorage.setItem(STORAGE_KEY, value);
            } catch {
                // 저장소가 차단되어도 현재 문서의 언어는 유지한다.
            }
            document.documentElement.lang = value;
        }
    }

    async function initLocale() {
        if (!import.meta.client) return;
        let saved: string | null = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch {
            // 저장소 접근이 제한된 환경에서는 기본 언어를 사용한다.
        }
        await setLocale(isLocale(saved) ? saved : 'ko');
    }

    async function toggleLocale() {
        await setLocale(locale.value === 'ko' ? 'en' : 'ko');
    }

    return { locale, t, content, initLocale, toggleLocale };
}
