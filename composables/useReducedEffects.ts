type NavigatorWithPerformanceHints = Navigator & {
    connection?: {
        effectiveType?: string;
        saveData?: boolean;
    };
    deviceMemory?: number;
};

/** 사용자 설정과 기기·네트워크 힌트를 기준으로 장식 효과 비용을 줄인다. */
export function useReducedEffects() {
    if (!import.meta.client) return false;

    const client = navigator as NavigatorWithPerformanceHints;
    const connection = client.connection;
    const slowNetwork = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
    const lowMemory = typeof client.deviceMemory === 'number' && client.deviceMemory <= 2;
    const lowCpu = typeof client.hardwareConcurrency === 'number' && client.hardwareConcurrency <= 2;

    return (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(prefers-reduced-data: reduce)').matches ||
        connection?.saveData === true ||
        slowNetwork ||
        lowMemory ||
        lowCpu
    );
}
