<template>
    <AppLayout :links="layoutLinks" active-id="" brand-href="/" :active-path="basePath"
        :page-variant="`archive-${variant}`" :footer-text="t('footer.copyright')">
        <slot />
    </AppLayout>
</template>

<script setup lang="ts">
import type { GalleryArchiveVariant } from '~/composables/gallery/useGallery';

defineProps<{
    variant: GalleryArchiveVariant;
    basePath: string;
}>();

const { t } = useLocale();
const layoutLinks = useSubpageLinks();
</script>

<style lang="scss">
@use '~/assets/style/gallery.scss';
</style>
