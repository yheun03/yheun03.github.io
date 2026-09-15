<template>
    <HomeSection id="answers" section-class="section--answers" title-id="section-answers-title"
        :eyebrow="t('answers.eyebrow')" :title="t('answers.title')" :description="t('answers.description')">
        <dl class="answers__list">
            <div v-for="(question, index) in questions" :key="question.name" class="answers__item" data-animate>
                <dt>
                    <span aria-hidden="true">Q{{ String(index + 1).padStart(2, '0') }}</span>
                    {{ question.name }}
                </dt>
                <dd>{{ question.acceptedAnswer }}</dd>
            </div>
        </dl>
    </HomeSection>
</template>

<script setup lang="ts">
const { t, content } = useLocale();
const questions = computed(() => content.value.seo.questions);
</script>
