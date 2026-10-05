<template>
    <dl class="base-stat-list" :aria-label="ariaLabel">
        <div v-for="(stat, index) in stats" :key="stat.label" :style="{ '--stagger-i': index }" data-stagger>
            <dt>
                <span>{{ stat.label }}</span>
                <details v-if="stat.description" class="base-stat-list__details">
                    <summary>
                        <span aria-hidden="true">i</span>
                        <span class="visually-hidden">{{ stat.label }}</span>
                    </summary>
                    <span class="base-stat-list__tooltip">{{ stat.description }}</span>
                </details>
            </dt>
            <dd>{{ stat.value }}{{ stat.suffix ?? '' }}</dd>
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
