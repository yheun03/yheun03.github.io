<template>
    <div class="project-mockup" :class="{ 'project-mockup--multiple': devices.length > 1, 'project-mockup--scrollable': scrollable }">
        <div
            v-for="device in devices"
            :key="device.type"
            class="project-mockup__device"
            :class="[
                `project-mockup__device--${device.type}`,
                { 'project-mockup__device--landscape': device.type === 'tablet' && isLandscape(device.src) },
            ]"
        >
            <div
                class="project-mockup__viewport"
                :data-drag-scroll="scrollable ? '' : undefined"
                :tabindex="scrollable ? 0 : undefined"
                :role="scrollable ? 'region' : undefined"
                :aria-label="scrollable ? t('gallery.captureScrollRegion') : undefined"
            >
                <BaseMediaImage
                    :draggable="false"
                    :src="resolveAppPath(device.src)"
                    :alt="device.type === devices[0].type ? alt : ''"
                    :sizes="sizes"
                    :priority="priority"
                />
            </div>
            <BaseMediaImage
                class="project-mockup__frame"
                :src="resolveAppPath(device.frame)"
                alt=""
                :sizes="sizes"
                :priority="priority"
                aria-hidden="true"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import media from '@data/media.json';
import type { CaptureDevice, WorkItem } from '@data/works';

const props = withDefaults(
    defineProps<{
        src: string;
        alt: string;
        mockup?: WorkItem['mockup'];
        device?: CaptureDevice;
        sizes?: string;
        priority?: boolean;
        scrollable?: boolean;
    }>(),
    { sizes: '(min-width: 641px) 45vw, 90vw', priority: false, scrollable: false },
);
const { resolveAppPath } = useAppPath();
const { t } = useLocale();
const imageInfo = (src: string) => (media as Record<string, { width: number; height: number }>)[src];
const isLandscape = (src: string) => {
    const image = imageInfo(src);
    return image && image.width > image.height;
};
const devices = computed(() => {
    // Image height cannot identify a device: desktop full-page captures can be tall.
    const fallbackType = props.src.includes('tablet') ? 'tablet' : props.src.includes('mobile') ? 'mobile' : 'desktop';
    // A per-image device overrides both the composition and aspect-ratio inference.
    const captures = props.device
        ? [{ type: props.device, src: props.src }]
        : props.mockup
          ? (['desktop', 'tablet', 'mobile'] as const).flatMap((type) => {
                const src = props.mockup?.[type];
                return src ? [{ type, src }] : [];
            })
          : [{ type: fallbackType, src: props.src }];

    return captures.map((device) => {
        let frameFile = 'macbook.png';
        if (device.type === 'mobile') frameFile = 'iphone.png';
        if (device.type === 'tablet') frameFile = isLandscape(device.src) ? 'ipad-landscape.png' : 'ipad-portrait.png';
        return { ...device, frame: `/assets/images/devices/${frameFile}` };
    });
});
</script>

<style lang="scss" scoped>
.project-mockup {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;

    &__device {
        position: absolute;
        filter: drop-shadow(0 12px 12px #17233430);
    }

    &__viewport {
        position: absolute;
        overflow: hidden;
        isolation: isolate;
        background: #000;

        img {
            display: block;
            width: 100%;
            height: auto;
            object-position: top;
            filter: none;
        }
    }

    &--scrollable &__viewport {
        overflow-y: auto;
        overscroll-behavior-y: contain;
        scrollbar-width: thin;
        scrollbar-color: #7a8696 transparent;

        &:focus-visible {
            outline: 2px solid var(--color-primary);
            outline-offset: -3px;
        }
    }

    &__frame {
        position: absolute;
        inset: 0;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
        object-fit: fill;
        filter: none;
        pointer-events: none;
    }

    &__device--desktop {
        top: 10%;
        left: 7%;
        width: 86%;
        aspect-ratio: 3306 / 1897;

        // MacBook Air 원본 3306 × 1897, 화면 (373, 123), 2560 × 1600.
        .project-mockup__viewport {
            left: 11.2825%;
            top: 6.484%;
            width: 77.4349%;
            height: 84.3437%;
        }
    }

    &__device--tablet {
        top: 4%;
        left: 31%;
        width: 38%;
        aspect-ratio: 2245 / 2930;

        // iPad Pro 세로 원본 2245 × 2930, 화면 (96, 102), 2048 × 2732.
        .project-mockup__viewport {
            left: 4.2762%;
            top: 3.4812%;
            width: 91.2249%;
            height: 93.2423%;
            border-radius: 2.2% / 1.65%;
        }
    }

    &__device--tablet.project-mockup__device--landscape {
        left: 17%;
        width: 66%;
        aspect-ratio: 2930 / 2245;

        // iPad Pro 가로 원본 2930 × 2245, 화면 (102, 101), 2732 × 2048.
        .project-mockup__viewport {
            left: 3.4812%;
            top: 4.4989%;
            width: 93.2423%;
            height: 91.2249%;
            border-radius: 1.65% / 2.2%;
        }
    }

    &__device--mobile {
        top: 2%;
        left: 37.5%;
        width: 25%;
        aspect-ratio: 1470 / 3000;

        // iPhone 원본 1470 × 3000, 화면 (75, 66), 1320 × 2868.
        .project-mockup__viewport {
            left: 5.102%;
            top: 2.2%;
            width: 89.7959%;
            height: 95.6%;
            border-radius: 16.5% / 7.6%;
        }
    }

    &--multiple &__device--desktop {
        top: 6%;
        left: 1%;
        width: 86%;
    }

    &--multiple &__device--tablet {
        top: 22%;
        left: 68%;
        width: 30%;
    }

    &--multiple &__device--tablet.project-mockup__device--landscape {
        top: 44%;
        left: 60%;
        width: 38%;
    }

    &--multiple &__device--mobile {
        top: 35%;
        left: 56%;
        width: 17%;
    }
}
</style>
