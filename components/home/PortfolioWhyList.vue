<template>
    <section class="section section--why-list" :aria-label="t('about.principlesAriaLabel')">
        <ol class="why__list">
            <li v-for="principle in aboutContent.principles" :key="principle.title" data-animate>
                <h3>
                    {{ principle.titleBefore }}<em>{{ principle.titleAccent }}</em
                    >{{ principle.titleAfter }}
                </h3>
                <p>{{ principle.description }}</p>
                <BaseLink v-if="principle.href" class="why__evidence" :href="principle.href">
                    {{ principle.evidence }}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </BaseLink>
            </li>
        </ol>
    </section>
</template>

<script setup lang="ts">
const { t, content } = useLocale();
const aboutContent = computed(() => content.value.about);
</script>
