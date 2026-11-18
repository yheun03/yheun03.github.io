/** Display companies and their timelines from the most recent period. */
export function useJourneyView() {
    const { content } = useLocale();

    function periodValue(period: string) {
        const match = period.match(/(\d{4})(?:\.(\d{1,2}))?/);
        return match ? Number(match[1]) * 100 + Number(match[2] ?? 1) : 0;
    }

    function endValue(period: string) {
        const end = period.split('~')[1]?.trim();
        if (end && /현재|present/i.test(end)) return Infinity;
        return periodValue(end || period);
    }

    const affiliationBlocks = computed(() =>
        content.value.journey
            .map((block) => ({
                ...block,
                timeline: [...block.timeline].sort((a, b) => periodValue(b.period) - periodValue(a.period)),
            }))
            .sort((a, b) => endValue(b.summary.period) - endValue(a.summary.period)),
    );

    return { affiliationBlocks };
}
