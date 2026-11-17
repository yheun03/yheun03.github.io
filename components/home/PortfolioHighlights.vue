<template>
    <section id="highlights" class="section section--highlights highlights" aria-labelledby="section-highlights-title">
        <div class="highlights__title-col">
            <BaseSectionTitle title-id="section-highlights-title" :title="t('highlights.title')" />
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

        <div ref="workspaceRef" class="highlights__workspace" data-animate>
            <HighlightsTabPanelRenderer
                :active-tab="activeTab"
                :panel-render-key="activeTab"
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
const workspaceRef = ref<HTMLElement | null>(null);
const tabs = computed(() => tabKeys.map((key) => ({ key, label: t(`highlights.${key}`) })));
const activeItems = computed(() => highlights.value[activeTab.value]);
const activeTabLabel = computed(() => t(`highlights.${activeTab.value}`));
const activeDescription = computed(() => highlights.value.descriptions[activeTab.value]);

async function handleHighlightTabChange(key: string) {
    activeTab.value = key as HighlightTabKey;
    await nextTick();
    const workspace = workspaceRef.value;
    if (!workspace) return;
    const headerHeight = document.querySelector('.app-header')?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + workspace.getBoundingClientRect().top - headerHeight - 24;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
}
</script>
