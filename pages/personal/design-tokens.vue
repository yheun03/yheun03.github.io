<template>
    <AppLayout>
        <article class="token-page section" aria-labelledby="token-page-title">
            <header class="token-hero" data-reveal="hero">
                <h1 id="token-page-title">{{ t('tokens.title') }}</h1>
                <p>
                    {{ t('tokens.introBefore') }} <code>assets/style/abstracts/_theme.scss</code>, {{ t('tokens.introMiddle') }}
                    <code>_tokens.scss</code>{{ t('tokens.introAfter') }}
                </p>
                <nav class="token-hero__actions" :aria-label="t('tokens.navigation')">
                    <BaseButton :label="t('tokens.viewCatalog')" href="/personal/components" />
                    <BaseButton :label="t('tokens.viewPersonal')" href="/personal" variant="ghost" />
                    <BaseButton :label="t('tokens.viewHome')" href="/" variant="ghost" />
                </nav>
            </header>

            <section class="token-section" data-reveal="up" aria-labelledby="color-token-title">
                <div class="token-section__head">
                    <h2 id="color-token-title">{{ t('tokens.colorTitle') }}</h2>
                    <p>{{ t('tokens.colorDescription') }}</p>
                </div>
                <div class="token-grid token-grid--colors">
                    <article v-for="token in colorTokens" :key="token.name" class="token-card" data-reveal="scale">
                        <span class="token-swatch" :style="{ background: token.value }" aria-hidden="true" />
                        <div>
                            <h3>{{ token.name }}</h3>
                            <p class="token-card__value">{{ token.value }}</p>
                            <p>{{ token.reason }}</p>
                        </div>
                    </article>
                </div>
            </section>

            <section class="token-section" data-reveal="up" aria-labelledby="space-token-title">
                <div class="token-section__head">
                    <h2 id="space-token-title">{{ t('tokens.spacingTitle') }}</h2>
                    <p>{{ t('tokens.spacingDescription') }}</p>
                </div>
                <div class="token-table" role="table" :aria-label="t('tokens.spacingTable')">
                    <div class="token-table__row token-table__row--head" role="row">
                        <span role="columnheader">{{ t('tokens.tokenColumn') }}</span>
                        <span role="columnheader">{{ t('tokens.valueColumn') }}</span>
                        <span role="columnheader">{{ t('tokens.reasonColumn') }}</span>
                    </div>
                    <div v-for="token in spacingTokens" :key="token.name" class="token-table__row" role="row">
                        <span role="cell">{{ token.name }}</span>
                        <span role="cell">{{ token.value }}</span>
                        <span role="cell">{{ token.reason }}</span>
                    </div>
                </div>
            </section>

            <section class="token-section" data-reveal="up" aria-labelledby="type-token-title">
                <div class="token-section__head">
                    <h2 id="type-token-title">{{ t('tokens.typeTitle') }}</h2>
                    <p>{{ t('tokens.typeDescription') }}</p>
                </div>
                <div class="type-list">
                    <article v-for="token in typographyTokens" :key="token.name" class="type-item" data-reveal="up">
                        <div>
                            <h3>{{ token.name }}</h3>
                            <p class="type-item__meta">{{ token.value }}</p>
                            <p>{{ token.reason }}</p>
                        </div>
                        <p class="type-item__sample" :class="token.sampleClass">{{ t('tokens.typeSample') }}</p>
                    </article>
                </div>
            </section>

            <section class="token-section" data-reveal="up" aria-labelledby="shape-token-title">
                <div class="token-section__head">
                    <h2 id="shape-token-title">{{ t('tokens.shapeTitle') }}</h2>
                    <p>{{ t('tokens.shapeDescription') }}</p>
                </div>
                <div class="token-grid">
                    <article v-for="token in shapeTokens" :key="token.name" class="token-card token-card--shape" data-reveal="scale">
                        <span class="shape-demo" :class="token.demoClass" aria-hidden="true" />
                        <div>
                            <h3>{{ token.name }}</h3>
                            <p class="token-card__value">{{ token.value }}</p>
                            <p>{{ token.reason }}</p>
                        </div>
                    </article>
                </div>
            </section>
        </article>
    </AppLayout>
</template>

<script setup lang="ts">
const { t, content, locale } = useLocale();

const colorTokens = computed(() => content.value.designTokens.colors);
const spacingTokens = computed(() => content.value.designTokens.spacing);
const typographyTokens = computed(() => content.value.designTokens.typography);
const shapeTokens = computed(() => content.value.designTokens.shapes);

usePortfolioSeo(() => ({
    title: t('catalog.tokensMetaTitle'),
    description: t('catalog.tokensMetaDescription'),
    path: '/personal/design-tokens',
    locale: locale.value,
    type: 'article',
    noindex: true,
}));
</script>

<style scoped>
.token-page {
    display: grid;
    gap: var(--section-gap);
    width: 100%;
    max-width: none;
    margin: 0;
    padding: var(--section-pad-y) var(--page-pad-x);
}

.token-hero,
.token-section {
    display: grid;
    gap: 32px 8%;
}

.token-hero {
    grid-template-columns: 1.3fr 1fr;
    max-width: 1080px;
    padding-block: 0 64px;
    border-bottom: 1px solid var(--color-divider-subtle);
}

.token-section {
    grid-template-columns: 1fr 1.8fr;
    padding: 56px 0;
    border-top: 1px solid var(--color-divider);
}

.token-section > :not(.token-section__head) {
    grid-column: 2;
}

.token-section__head {
    grid-row: 1;
    margin: 0;
}

.token-hero h1 {
    grid-row: span 2;
    color: var(--color-primary);
    font-family: var(--font-editorial);
    font-size: var(--page-title-size);
    font-weight: 400;
    line-height: 1.12;
    letter-spacing: -0.055em;
    word-break: keep-all;
}

.token-hero p {
    font-size: 20px;
    line-height: 1.7;
}

.token-hero code {
    overflow-wrap: anywhere;
}

.token-hero p,
.token-section__head p {
    max-width: 52ch;
    color: var(--color-text-muted);
}

.token-hero__actions {
    margin-top: var(--space-6);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
}

.token-section__head {
    display: grid;
    gap: var(--space-4);
}

.token-section__head h2 {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 400;
    line-height: var(--line-height-heading);
    letter-spacing: -0.04em;
}

.token-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 288px), 1fr));
    gap: clamp(24px, 2.5vw, 40px);
}

.token-card,
.type-item,
.token-table {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-card);
    background: var(--color-surface);
}

.token-card {
    display: grid;
    gap: var(--space-6);
    padding: var(--card-padding);
}

.token-card h3,
.type-item h3 {
    font-family: var(--font-display);
    font-size: var(--font-size-title-1);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-title);
    letter-spacing: var(--tracking-heading);
}

.token-card p,
.type-item p {
    color: var(--color-text-muted);
}

.token-card__value {
    margin: var(--space-2) 0 var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
    color: var(--color-text-muted);
}

.token-swatch {
    min-height: 112px;
    border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-glow);
}

.token-table {
    overflow: hidden;
}

.token-table__row {
    display: grid;
    grid-template-columns: minmax(144px, 0.8fr) minmax(128px, 0.7fr) minmax(0, 1.5fr);
    gap: var(--space-5);
    padding: var(--space-5) var(--space-6);
    border-top: 1px solid color-mix(in srgb, var(--color-border) 62%, transparent);
}

.token-table__row:first-child {
    border-top: 0;
}

.token-table__row--head {
    background: var(--color-surface-strong);
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
}

.token-table__row span:nth-child(1),
.token-table__row span:nth-child(2) {
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
}

.type-list {
    display: grid;
    gap: clamp(24px, 2.5vw, 40px);
}

.type-item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(224px, 0.8fr);
    gap: var(--space-fluid-md);
    align-items: center;
    padding: var(--card-padding);
}

.type-item__sample {
    color: var(--color-text);
}

.type-item__meta {
    margin: var(--space-2) 0 var(--space-3);
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    font-size: var(--font-size-label);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-label);
}

.type-item__sample--display1 {
    font-family: var(--font-display);
    font-size: var(--font-size-display-1);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-tight);
    letter-spacing: var(--tracking-tight);
}

.type-item__sample--display3 {
    font-family: var(--font-display);
    font-size: var(--font-size-display-3);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-display);
    letter-spacing: var(--tracking-tight);
}

.type-item__sample--display5 {
    font-family: var(--font-display);
    font-size: var(--font-size-display-5);
    font-weight: var(--font-weight-black);
    line-height: var(--line-height-heading);
    letter-spacing: var(--tracking-heading);
}

.type-item__sample--title {
    font-family: var(--font-display);
    font-size: var(--font-size-title-1);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-title);
    letter-spacing: var(--tracking-heading);
}

.type-item__sample--body {
    font-family: var(--font-body);
    font-size: var(--font-size-body-1);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body);
    letter-spacing: 0;
}

.type-item__sample--label {
    font-family: var(--font-body);
    font-size: var(--font-size-chip);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-ui);
    letter-spacing: var(--tracking-ui);
    text-transform: uppercase;
}

.shape-demo {
    width: min(100%, 192px);
    height: 80px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
}

.shape-demo--card {
    border-radius: var(--radius-lg);
}

.shape-demo--square {
    width: 192px;
    height: 56px;
    border-radius: 0;
}

.shape-demo--soft {
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft);
}

.shape-demo--ring {
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-ring);
}

@media (max-width: 767px) {
    .token-page {
        width: 100%;
        padding: var(--section-pad-y) var(--page-pad-x);
    }

    .token-hero h1,
    .token-section__head h2 {
        overflow-wrap: break-word;
    }

    .token-hero__actions {
        display: grid;

        .base-button {
            width: 100%;
            justify-content: center;
        }
    }

    .token-table__row,
    .type-item {
        grid-template-columns: 1fr;
    }

    .token-table__row {
        gap: var(--space-2);
        padding: var(--space-4);
    }

    .type-item__sample {
        overflow-wrap: anywhere;
    }

    .shape-demo,
    .shape-demo--square {
        width: min(100%, 192px);
    }
}
@media (max-width: 640px) {
    .token-hero,
    .token-section {
        grid-template-columns: 1fr;
        gap: 36px;
    }

    .token-hero h1,
    .token-section__head {
        grid-row: auto;
    }

    .token-section > :not(.token-section__head) {
        grid-column: 1;
    }
}
</style>
