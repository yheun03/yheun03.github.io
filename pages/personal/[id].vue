<template>
    <GalleryDetailPage variant="personal" :work="work!" />
</template>

<script setup lang="ts">
definePageMeta({ key: (route) => route.path });

const route = useRoute();
const { data: work, error } = await useGalleryRouteWork('personal', route.params.id as string);
if (error.value || !work.value) throw createError({ statusCode: 404, statusMessage: 'Project not found' });
</script>
