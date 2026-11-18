// 갤러리(실무·개인) 필터·정렬·SEO·상세 라우트 작업 조회
import type { WorkItem, WorkSummary } from '@data/works';

export type GalleryArchiveVariant = 'career' | 'personal';
export type WorkSortMode = 'start' | 'title';
export type WorkFilterMode = 'featured' | 'problem' | 'frontend' | 'operation' | 'cms' | 'individual' | 'team';

function getStartValue(period: string) {
    const [start = ''] = period.split('~');
    const match = start.match(/(\d{4})(?:\D+(\d{1,2}))?/);
    if (!match) return 0;
    return Number(match[1]) * 100 + Number(match[2] ?? '1');
}

export function isPlaceholderCapture(src: string | undefined | null) {
    return !src || /placeholder/i.test(src);
}

const galleryVariantConfig = {
    career: {
        titleKey: 'gallery.careerTitle',
        metaTitleKey: 'gallery.careerMetaTitle',
        metaDescriptionKey: 'gallery.careerMetaDescription',
        basePath: '/projects',
        listLabelKey: 'gallery.backToCareerList',
    },
    personal: {
        titleKey: 'gallery.personalTitle',
        metaTitleKey: 'gallery.personalMetaTitle',
        metaDescriptionKey: 'gallery.personalMetaDescription',
        basePath: '/personal',
        listLabelKey: 'gallery.backToPersonalList',
    },
} as const;

export function getGalleryVariantConfig(variant: GalleryArchiveVariant) {
    return galleryVariantConfig[variant];
}

export function useGalleryArchive(variant: GalleryArchiveVariant, works: Ref<WorkSummary[]>) {
    const { t, locale } = useLocale();
    const sortMode = ref<WorkSortMode>('start');
    const filterModes = ref<WorkFilterMode[]>([]);
    const config = getGalleryVariantConfig(variant);

    const sortOptions = computed<{ value: WorkSortMode; label: string }[]>(() => [
        { value: 'start', label: t('gallery.sortStart') },
        { value: 'title', label: t('gallery.sortTitle') },
    ]);

    const sortedWorks = computed(() => {
        return [...works.value].sort((a, b) =>
            sortMode.value === 'start'
                ? getStartValue(b.period) - getStartValue(a.period)
                : a.title.localeCompare(b.title, locale.value === 'ko' ? 'ko-KR' : 'en-US', {
                      numeric: true,
                      sensitivity: 'base',
                  }),
        );
    });

    const filterOptions = computed<{ value: WorkFilterMode; label: string }[]>(() =>
        variant === 'career'
            ? [
                  { value: 'featured', label: t('gallery.filterFeatured') },
                  { value: 'problem', label: t('gallery.filterProblem') },
                  { value: 'frontend', label: t('gallery.filterFrontend') },
                  { value: 'operation', label: t('gallery.filterOperation') },
                  { value: 'cms', label: t('gallery.filterCms') },
              ]
            : [
                  { value: 'featured', label: t('gallery.filterFeatured') },
                  { value: 'individual', label: t('gallery.filterIndividual') },
                  { value: 'team', label: t('gallery.filterTeam') },
              ],
    );

    const filteredWorks = computed(() => sortedWorks.value.filter((work) => matchesFilters(work, filterModes.value)));

    const lead = computed(() => t(variant === 'career' ? 'gallery.careerLead' : 'gallery.personalLead').replace('{total}', String(works.value.length)));

    const sortLegend = computed(() => t('gallery.sortLegend'));
    const filterLegend = computed(() => t('gallery.filterLegend'));

    const toolbarAriaLabel = computed(() => t('gallery.toolbarAriaLabel'));

    usePortfolioSeo(() => ({
        title: t(config.metaTitleKey),
        description: t(config.metaDescriptionKey),
        path: config.basePath,
        locale: locale.value,
        keywords: works.value.flatMap((work) => [work.title, ...work.languages, ...work.tech]),
        schemaType: 'CollectionPage',
        breadcrumbs: [
            { name: t('footer.homeLink'), path: '/' },
            { name: t(config.titleKey), path: config.basePath },
        ],
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: works.value.length,
            itemListElement: works.value.map((work, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: work.title,
                url: getPortfolioAbsoluteUrl(`${config.basePath}/${work.id}/`),
            })),
        },
    }));

    return {
        t,
        sortMode,
        filterModes,
        sortOptions,
        filterOptions,
        filteredWorks,
        lead,
        sortLegend,
        filterLegend,
        toolbarAriaLabel,
        titleKey: config.titleKey,
        basePath: config.basePath,
    };
}

function matchesFilter(work: WorkSummary, filter: WorkFilterMode) {
    if (filter === 'featured') return work.pin;
    if (filter === 'individual') return /^(개인|Personal)\s*\//i.test(work.type);
    if (filter === 'team') return /^(팀|Team)\s*\//i.test(work.type);
    if (filter === 'problem') return ['tms-maintenance', 'hanjinkal', 'oms', 'company-renewal'].includes(work.id);
    if (filter === 'frontend') return ['framework', 'orchem-mes', 'infra', 'samhwa-eco-dashboard'].includes(work.id);
    if (filter === 'operation') return work.category === 'operation' || ['hanon', 'tms-maintenance'].includes(work.id);
    if (filter === 'cms') return ['hanjinkal', 'company-renewal', 'company-renewal-2022', 'kyungdongwon-cms'].includes(work.id);
    return true;
}

function matchesFilters(work: WorkSummary, filters: readonly WorkFilterMode[]) {
    return filters.length === 0 || filters.some((filter) => matchesFilter(work, filter));
}

export function useGalleryRouteWorks(variant: GalleryArchiveVariant) {
    const { locale } = useLocale();
    const { resolveAppPath } = useAppPath();
    return useAsyncData(
        () => `works-${locale.value}-${variant}`,
        () => $fetch<WorkSummary[]>(resolveAppPath(`/content/${locale.value}/works-${variant}.json`)),
        { default: () => [], deep: false },
    );
}

export function useGalleryRouteWork(variant: GalleryArchiveVariant, id: string) {
    const { locale } = useLocale();
    const { resolveAppPath } = useAppPath();
    return useAsyncData(
        () => `work-${locale.value}-${variant}-${id}`,
        () => $fetch<WorkItem>(resolveAppPath(`/content/${locale.value}/works/${variant}/${id}.json`)),
        { deep: false },
    );
}
