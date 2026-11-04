<template>
    <HomeSection id="toolbox" section-class="section--toolbox" title-id="section-toolbox-title">
        <template #head>
            <BaseSectionTitle title-id="section-toolbox-title" :title="t('toolbox.title')" />
            <p class="section-title__description">{{ t('toolbox.copy') }}</p>
        </template>

        <div class="spotlight-block" data-animate>
            <ul class="toolbox__grid feature-grid feature-grid--toolbox">
                <li v-for="(skill, index) in skills" :key="skill.key" data-stagger :style="{ '--stagger-i': index }">
                    <FeatureCard variant="skill" :title="skill.title" :items="skill.items" :description="skill.description" />
                </li>
            </ul>
        </div>
    </HomeSection>
</template>

<script setup lang="ts">
const { t, content } = useLocale();
const skills = computed(() => content.value.skills);
</script>
