<template>
    <HomeSection id="journey" section-class="section--journey-preview" title-id="section-journey-preview-title">
        <div class="journey-preview" data-animate>
            <div class="journey-preview__head">
                <p class="journey-preview__eyebrow">{{ t('journeyPreview.eyebrow') }}</p>
            </div>

            <div class="journey-preview__body">
                <h2 id="section-journey-preview-title" class="journey-preview__title">
                    <span>{{ t('journeyPreview.titleLine1') }}</span>
                    <span class="journey-preview__title-accent">{{ t('journeyPreview.titleLine2') }}</span>
                    <span>{{ t('journeyPreview.titleLine3') }}</span>
                </h2>

                <div class="journey-preview__aside">
                    <p class="journey-preview__description">{{ t('journeyPreview.description') }}</p>
                    <BaseButton to="/journey" :label="t('journeyPreview.cta')" />
                </div>
            </div>

            <ol class="journey-preview__timeline" :aria-label="t('journeyPreview.timelineLabel')">
                <li v-for="item in timeline" :key="item.year">
                    <span>{{ item.year }}</span>
                    <strong>{{ item.label }}</strong>
                </li>
            </ol>
        </div>
    </HomeSection>
</template>

<script setup lang="ts">
const { t } = useLocale();
const timeline = computed(() => [
    { year: '2018', label: t('journeyPreview.milestoneStart') },
    { year: '2019', label: t('journeyPreview.milestoneWork') },
    { year: 'NOW', label: t('journeyPreview.milestoneNow') },
]);
</script>
