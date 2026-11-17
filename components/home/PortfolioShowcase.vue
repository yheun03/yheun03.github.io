<template>
    <HomeSection
        id="works"
        section-class="section--works"
        title-id="section-works-title"
        :title="t('story.showcaseTitle')"
        :description="t('story.showcaseDescription')"
    >
        <ul class="showcase__list">
            <li
                v-for="(work, index) in homeShowcaseWorks"
                :key="work.id"
                class="showcase__item"
                :style="{ '--animate-delay': `${index * 90}ms` }"
                data-animate
            >
                <StoryCaseCard
                    :featured="index === 0"
                    :cover="work.thumbnail ?? work.captures[0]"
                    :role="work.role"
                    :to="`/projects/${work.id}`"
                    :link-label="`${work.title}, ${t('story.caseCta')}`"
                    :tag="work.type"
                    :period="work.period"
                    :title="work.title"
                    :summary="work.introduction"
                    :tech="work.tech.slice(0, 4)"
                    :cta-label="t('story.caseCta')"
                    :tech-aria-label="t('story.techStackAriaLabel')"
                />
            </li>
        </ul>

        <nav class="showcase__more" :aria-label="t('story.galleriesAriaLabel')">
            <BaseButton to="/projects" :label="careerArchiveLabel" />
            <BaseButton to="/personal" :label="t('personal.fullArchiveLink')" variant="ghost" />
        </nav>
    </HomeSection>
</template>

<script setup lang="ts">
import type { WorkItem } from '@data/works';

const { t, content } = useLocale();
// 퍼블리싱 실무를 출발점으로 운영 문제 해결과 Vue 구조 설계까지 넓어진 흐름을 보여준다.
const showcaseIds = ['samhwa-eco-dashboard', 'tms-maintenance', 'framework'];
const homeShowcaseWorks = computed(() => {
    const works = content.value.works.career as unknown as WorkItem[];
    return showcaseIds.map((id) => works.find((work) => work.id === id)).filter((work): work is WorkItem => Boolean(work));
});
const careerArchiveLabel = computed(() => t('works.fullArchiveLink').replace('{total}', String(content.value.works.career.length)));
</script>
