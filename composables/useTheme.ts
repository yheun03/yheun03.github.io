export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

function isThemeMode(value: string | null): value is ThemeMode {
    return value === 'light' || value === 'dark';
}

export function useTheme() {
    const theme = useState<ThemeMode>('theme', () => 'light');
    const isDarkTheme = computed(() => theme.value === 'dark');

    function setTheme(value: ThemeMode) {
        theme.value = value;
        if (import.meta.client) {
            try {
                localStorage.setItem(STORAGE_KEY, value);
            } catch {
                // 저장소가 차단되어도 현재 문서의 테마는 적용한다.
            }
            document.documentElement.dataset.theme = value;
        }
    }

    function initTheme() {
        if (!import.meta.client) return;
        let saved: string | null = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch {
            // 저장소 접근이 제한된 환경에서는 시스템 설정을 사용한다.
        }
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(isThemeMode(saved) ? saved : system);
    }

    function toggleTheme() {
        setTheme(theme.value === 'dark' ? 'light' : 'dark');
    }

    return { isDarkTheme, initTheme, toggleTheme };
}
