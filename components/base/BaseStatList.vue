<template>
    <dl class="base-stat-list" :aria-label="ariaLabel">
        <div v-for="(stat, index) in stats" :key="stat.label" :style="{ '--stagger-i': index }" data-stagger>
            <dd>{{ stat.value }}{{ stat.suffix ?? '' }}</dd>
            <dt>
                <span>{{ stat.label }}</span>
                <details v-if="stat.description" class="base-stat-list__details">
                    <summary :aria-label="`${stat.label} 상세 설명`">i</summary>
                    <span class="base-stat-list__tooltip" role="tooltip">{{ stat.description }}</span>
                </details>
            </dt>
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
