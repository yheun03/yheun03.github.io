<template>
    <section id="highlights" class="section section--highlights highlights" aria-labelledby="section-highlights-title">
        <div class="highlights__title-col">
            <BaseSectionTitle title-id="section-highlights-title" :eyebrow="t('nav.highlights')" :title="t('highlights.title')" />
            <BaseTabList
                :model-value="activeTab"
                :items="tabs"
                tab-id-prefix="highlights-tab-"
                panel-id-prefix="highlights-panel"
                :list-label="t('highlights.categoriesAriaLabel')"
                class="highlights__filters"
                @update:model-value="handleHighlightTabChange"
            />
        </div>

        <div class="highlights__workspace" data-animate>
            <HighlightsTabPanelRenderer
                :active-tab="activeTab"
                :panel-render-key="activeTab"
                :active-tab-index="activeTabIndex"
                :active-tab-label="activeTabLabel"
                :active-description="activeDescription"
                :active-items="activeItems"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import HighlightsTabPanelRenderer from '~/components/renderers/Page_Home/HighlightsTabPanelRenderer.vue';

type HighlightTabKey = 'awards' | 'certifications' | 'roles' | 'activities';

const tabKeys: HighlightTabKey[] = ['awards', 'certifications', 'roles', 'activities'];
const { t, content } = useLocale();
const highlights = computed(() => content.value.highlights);
const activeTab = ref<HighlightTabKey>('awards');
const tabs = computed(() => tabKeys.map((key) => ({ key, label: t(`highlights.${key}`) })));
const activeTabIndex = computed(() => String(tabKeys.indexOf(activeTab.value) + 1).padStart(2, '0'));
const activeItems = computed(() => highlights.value[activeTab.value]);
const activeTabLabel = computed(() => t(`highlights.${activeTab.value}`));
const activeDescription = computed(() => highlights.value.descriptions[activeTab.value]);

function handleHighlightTabChange(key: string) {
    activeTab.value = key as HighlightTabKey;
}
</script>
