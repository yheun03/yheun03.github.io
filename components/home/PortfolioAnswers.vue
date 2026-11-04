<template>
    <HomeSection
        id="answers"
        section-class="section--answers"
        title-id="section-answers-title"
        :title="t('answers.title')"
        :description="t('answers.description')"
    >
        <dl class="answers__list" data-animate>
            <div v-for="question in questions" :key="question.name" class="answers__item">
                <dt>
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
