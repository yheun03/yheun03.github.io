<template>
    <dl class="base-stat-list" :aria-label="ariaLabel">
        <div v-for="(stat, index) in stats" :key="stat.label" :style="{ '--stagger-i': index }" data-stagger>
            <dt>
                <span>{{ stat.label }}</span>
                <details v-if="stat.description" class="base-stat-list__details">
                    <summary>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        <span class="visually-hidden">{{ stat.label }}</span>
                    </summary>
                    <span class="base-stat-list__tooltip">{{ stat.description }}</span>
                </details>
            </dt>
            <dd :aria-label="`${stat.value}${stat.suffix ?? ''}`">
                <span :data-count-to="Number.isFinite(Number(stat.value)) ? stat.value : undefined" aria-hidden="true">{{ stat.value }}</span
                ><span aria-hidden="true">{{ stat.suffix ?? '' }}</span>
            </dd>
        </div>
    </dl>
</template>

<script setup lang="ts">
export type BaseStatItem = {
    label: string;
    value: string | number;
    suffix?: string;
    description?: string;
};

defineProps<{
    stats: BaseStatItem[];
    ariaLabel?: string;
}>();
</script>
