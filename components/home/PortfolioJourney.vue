<template>
    <section id="journey" class="section section--journey" aria-labelledby="section-journey-title">
        <BaseEditorialMasthead
            class="journey__masthead"
            title-id="section-journey-title"
            :title="t('journey.title')"
            :kicker="t('journey.archiveLabel')"
            :stats="journeyStats"
            :eyebrow="t('nav.journey')"
            :description="t('journey.summary')"
            :figure="journeyRange"
            :status="t('journey.status')"
            :heading-tag="props.headingTag"
        />

        <div class="journey__flow" data-animate>
            <div class="journey__view-switch">
                <p class="journey__view-kicker" aria-hidden="true">{{ t('journey.kicker') }}</p>
                <BaseSegmentControl
                    :model-value="viewMode"
                    :options="resolvedViewOptions"
                    :label-text="t('journey.viewLegend')"
                    label-id="journey-view-label"
                    label-hidden
                    @update:model-value="setViewMode($event as typeof viewMode)"
                />
            </div>

            <JourneyViewRenderer
                :view-mode="viewMode"
                :affiliation-blocks="affiliationBlocks"
                :chronological-year-groups="chronologicalYearGroups"
                :affiliation-aria-label="t('journey.viewAffiliation')"
                :chronological-aria-label="t('journey.viewChronological')"
                :temp-label="tempLabel"
                :clients-aria-label="t('journey.clientsAriaLabel')"
                :show-chapter-label="t('journey.showChapter')"
                :hide-chapter-label="t('journey.hideChapter')"
                :more-clients-label="t('journey.moreClients')"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import JourneyViewRenderer from '~/components/renderers/Page_Home/JourneyViewRenderer.vue';

const props = withDefaults(
    defineProps<{
        headingTag?: 'h1' | 'h2';
    }>(),
    {
        headingTag: 'h2',
    },
);

const { t } = useLocale();
const { viewMode, viewOptions, affiliationBlocks, chronologicalYearGroups, setViewMode } = useJourneyView();

const resolvedViewOptions = computed(() => viewOptions.value.map((o) => ({ value: o.value, label: t(o.labelKey) })));
const tempLabel = computed(() => t('journey.tempLabel'));
const milestoneCount = computed(() => affiliationBlocks.value.reduce((total, block) => total + block.timeline.length, 0));
const journeyStats = computed(() =>
    t('journey.stats').replace('{chapters}', String(affiliationBlocks.value.length)).replace('{milestones}', String(milestoneCount.value)),
);
const journeyRange = computed(() => {
    const years = affiliationBlocks.value.flatMap((block) => block.timeline.flatMap((item) => item.period.match(/\d{4}/g)?.map(Number) ?? []));
    return years.length ? `${Math.min(...years)}—NOW` : 'NOW';
});
</script>
