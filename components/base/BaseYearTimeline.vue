<template>
    <div class="year-timeline" role="list" :aria-label="ariaLabel">
        <section
            v-for="(era, index) in eras"
            :key="era.key"
            class="year-timeline__era"
            :class="{ 'year-timeline__era--flat': !era.year }"
            role="listitem"
            :aria-labelledby="era.year ? yearHeadingId(era) : undefined"
            :aria-label="!era.year ? flatAriaLabel : undefined"
        >
            <div v-if="era.year" class="year-timeline__year" data-reveal="left" :data-reveal-delay="Math.min(index * 60, 240)">
                <h2
                    :id="yearHeadingId(era)"
                    class="year-timeline__year-title"
                    :class="{ 'year-timeline__year-title--range': /[–—~]/.test(era.year) }"
                    :aria-label="era.year"
                >
                    <span v-for="(year, yearIndex) in era.year.split(/\s*[–—~]\s*/)" :key="yearIndex" class="year-timeline__year-part">
                        <template v-if="yearIndex > 0">–</template>{{ year }}
                    </span>
                </h2>
            </div>
            <component :is="entriesTag" class="year-timeline__entries">
                <slot name="era" :era="era" :index="index" />
            </component>
        </section>
    </div>
</template>

<script setup lang="ts" generic="TEra extends { key: string; year?: string }">
type EditorialYearEraItem = {
    key: string;
    year?: string;
};

const props = withDefaults(
    defineProps<{
        eras: readonly TEra[];
        ariaLabel: string;
        idPrefix?: string;
        flatAriaLabel?: string;
        entriesTag?: 'ol' | 'ul' | 'div';
    }>(),
    {
        idPrefix: 'year-timeline',
        entriesTag: 'div',
    },
);

defineSlots<{
    era(props: { era: TEra; index: number }): unknown;
}>();

function yearHeadingId(era: EditorialYearEraItem) {
    return `${props.idPrefix}-${era.key}`;
}
</script>
