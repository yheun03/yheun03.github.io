<template>
    <header class="editorial-masthead">
        <div class="editorial-masthead__top">
            <p v-if="kicker" class="editorial-masthead__kicker">{{ kicker }}</p>
            <p v-if="stats" class="editorial-masthead__stats">{{ stats }}</p>
        </div>

        <div class="editorial-masthead__hero">
            <div class="editorial-masthead__copy">
                <p v-if="eyebrow" class="editorial-masthead__eyebrow">{{ eyebrow }}</p>
                <component :is="headingTag" :id="titleId" class="editorial-masthead__title">
                    {{ title }}
                </component>
                <p v-if="description" class="editorial-masthead__description">{{ description }}</p>
            </div>

            <p v-if="figure" class="editorial-masthead__figure" aria-hidden="true">{{ figure }}</p>
            <p v-if="figureAriaLabel" class="visually-hidden">{{ figureAriaLabel }}</p>
        </div>

        <div v-if="status" class="editorial-masthead__foot">
            <span aria-hidden="true" />
            <p>{{ status }}</p>
        </div>
    </header>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    titleId: string;
    title: string;
    kicker?: string;
    stats?: string;
    eyebrow?: string;
    description?: string;
    figure?: string;
    figureAriaLabel?: string;
    status?: string;
    headingTag?: 'h1' | 'h2';
}>(), {
    headingTag: 'h1',
});
</script>
