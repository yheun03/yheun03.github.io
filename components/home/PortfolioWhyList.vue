<template>
    <section class="section section--why-list" :aria-label="t('about.principlesAriaLabel')">
        <ol class="why__list">
            <li v-for="(principle, index) in aboutContent.principles" :key="principle.title" data-animate>
                <BaseIndexLabel :value="String(index + 1).padStart(2, '0')" aria-hidden="true" />
                <h3>{{ principle.title }}</h3>
                <p>{{ principle.description }}</p>
                <BaseLink v-if="principle.href" class="why__evidence" :href="principle.href">
                    {{ principle.evidence }} <span aria-hidden="true">→</span>
                </BaseLink>
            </li>
        </ol>
    </section>
</template>

<script setup lang="ts">
const { t, content } = useLocale();
const aboutContent = computed(() => content.value.about);
</script>
