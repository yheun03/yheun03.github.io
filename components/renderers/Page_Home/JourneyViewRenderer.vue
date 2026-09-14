<template>
    <section v-if="viewMode === 'affiliation'" class="journey__chapters" :aria-label="affiliationAriaLabel">
        <article
            v-for="(block, companyIndex) in affiliationBlocks"
            :key="companyKey(block, companyIndex)"
            class="journey__chapter"
            :class="{ 'journey__chapter--temp': block.temp }"
        >
            <div class="journey__chapter-card">
                <p class="journey__chapter-index">{{ String(companyIndex + 1).padStart(2, '0') }}</p>
                <p v-if="block.temp" class="journey__temp-label">{{ tempLabel }}</p>
                <h3 class="journey__chapter-title">{{ block.summary.company }}</h3>
                <p class="journey__chapter-meta">
                    <span v-for="meta in summaryMeta(block.summary.team)" :key="`${companyIndex}-${meta}`">
                        {{ meta }}
                    </span>
                    <strong>{{ block.summary.period }}</strong>
                </p>
                <p class="journey__chapter-intro">{{ block.summary.intro }}</p>
                <ul v-if="block.summary.roles.length" class="journey__chapter-roles">
                    <li v-for="role in block.summary.roles" :key="`${companyIndex}-${role}`">
                        {{ role }}
                    </li>
                </ul>
                <ul v-if="block.summary.clients.length" class="journey__clients" :aria-label="clientsListAriaLabel(block.summary.clients)">
                    <li v-for="client in block.summary.clients.slice(0, visibleClientCount)" :key="`${companyIndex}-${client}`">
                        {{ client }}
                    </li>
                    <li v-if="block.summary.clients.length > visibleClientCount" class="journey__clients-more">
                        {{ moreClientsText(block.summary.clients.length - visibleClientCount) }}
                        <span class="visually-hidden">
                            {{ block.summary.clients.slice(visibleClientCount).join(', ') }}
                        </span>
                    </li>
                </ul>
            </div>

            <div class="journey__chapter-log">
                <button
                    v-if="isCompactView"
                    class="journey__chapter-toggle"
                    type="button"
                    :aria-expanded="isChapterExpanded(companyIndex)"
                    :aria-controls="chapterTimelineId(companyIndex)"
                    @click="toggleChapter(companyIndex)"
                >
                    <span>{{ chapterToggleLabel(companyIndex, block.timeline.length) }}</span>
                    <span class="journey__chapter-toggle-icon" aria-hidden="true">
                        {{ isChapterExpanded(companyIndex) ? '−' : '+' }}
                    </span>
                </button>
                <ol v-show="isChapterExpanded(companyIndex)" :id="chapterTimelineId(companyIndex)" class="journey__steps">
                    <TimelineItem
                        v-for="(item, ti) in block.timeline"
                        :key="`${companyIndex}-${ti}-${item.period}`"
                        :period="item.period"
                        :title="item.title"
                        :description="item.description"
                    />
                </ol>
            </div>
        </article>
    </section>

    <!-- @vue-generic {import('~/composables/portfolio/useJourneyView').JourneyYearGroup} -->
    <BaseYearTimeline
        v-else
        variant="home"
        :ariaLabel="chronologicalAriaLabel"
        :eras="chronologicalYearGroups"
        id-prefix="journey-year"
        entries-tag="ol"
    >
        <template #era="{ era: group }">
            <TimelineItem
                v-for="entry in group.entries"
                :key="entry.key"
                hide-period
                :title="entry.title"
                :description="entry.description"
                :affiliation="entry.company"
                heading-tag="h3"
            />
        </template>
    </BaseYearTimeline>
</template>

<script setup lang="ts">
import type { JourneyCompanyBlock, JourneyViewMode, JourneyYearGroup } from '~/composables/portfolio/useJourneyView';

const props = defineProps<{
    viewMode: JourneyViewMode;
    affiliationBlocks: readonly JourneyCompanyBlock[];
    chronologicalYearGroups: readonly JourneyYearGroup[];
    affiliationAriaLabel: string;
    chronologicalAriaLabel: string;
    tempLabel: string;
    clientsAriaLabel: string;
    showChapterLabel: string;
    hideChapterLabel: string;
    moreClientsLabel: string;
}>();

const visibleClientCount = 5;
const isCompactView = ref(false);
const expandedChapters = ref<Set<number>>(new Set());
let compactMedia: MediaQueryList | undefined;

function syncCompactView(event: MediaQueryListEvent | MediaQueryList) {
    isCompactView.value = event.matches;
}

onMounted(() => {
    compactMedia = window.matchMedia('(max-width: 767px)');
    syncCompactView(compactMedia);
    compactMedia.addEventListener('change', syncCompactView);
});

onBeforeUnmount(() => compactMedia?.removeEventListener('change', syncCompactView));

function isChapterExpanded(index: number) {
    return !isCompactView.value || expandedChapters.value.has(index);
}

function toggleChapter(index: number) {
    const next = new Set(expandedChapters.value);
    next.has(index) ? next.delete(index) : next.add(index);
    expandedChapters.value = next;
}

function chapterTimelineId(index: number) {
    return `journey-chapter-timeline-${index}`;
}

function chapterToggleLabel(index: number, count: number) {
    const label = isChapterExpanded(index) ? props.hideChapterLabel : props.showChapterLabel;
    return label.replace('{count}', String(count));
}

function summaryMeta(team: string) {
    return team
        .split(' / ')
        .map((item) => item.trim())
        .filter(Boolean);
}

function moreClientsText(count: number) {
    return props.moreClientsLabel.replace('{count}', String(count));
}

function clientsListAriaLabel(clients: readonly string[]) {
    return `${props.clientsAriaLabel}: ${clients.join(', ')}`;
}

function companyKey(block: JourneyCompanyBlock, index: number) {
    return `${index}-${block.summary.company}`;
}
</script>
