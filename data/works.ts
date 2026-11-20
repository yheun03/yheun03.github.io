export type WorkCategory = 'project' | 'operation' | 'solution' | 'renewal' | 'award' | 'personal';

export type CaptureDevice = 'desktop' | 'tablet' | 'mobile';

export type WorkItem = {
    id: string;
    category: WorkCategory;
    title: string;
    period: string;
    type: string;
    role: string;
    tech: string[];
    introduction: string;
    myWorks: string[];
    achievements: string[];
    points: string[];
    pin: boolean;
    duration: string;
    captures: string[];
    languages: string[];
    thumbnail?: string;
    mockup?: { desktop?: string; tablet?: string; mobile?: string };
    captureDevices?: Record<string, CaptureDevice>;
    captureLabels?: string[];
    captureNotice?: string;
    links?: { label: string; href: string }[];
};

export type WorkSummary = Pick<WorkItem, 'id' | 'category' | 'title' | 'period' | 'type' | 'role' | 'tech' | 'pin' | 'languages' | 'captures' | 'thumbnail' | 'mockup' | 'captureDevices' | 'captureNotice'>;
