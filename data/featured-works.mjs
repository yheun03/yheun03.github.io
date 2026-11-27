const featuredIds = ['framework', 'orchem-mes', 'hanjinkal', 'samhwa-eco-dashboard', 'oms', 'company-renewal'];

export function featuredWorks(works) {
    return featuredIds.flatMap((id) => {
        const work = works.find((item) => item.id === id);
        if (!work) return [];
        const { title, role, captures, mockup, captureDevices, captureNotice } = work;
        const cover = captures[0];
        return [{
            id, title, role, captures: captures.slice(0, 1), mockup, captureNotice,
            captureDevices: captureDevices?.[cover] ? { [cover]: captureDevices[cover] } : undefined,
        }];
    });
}
