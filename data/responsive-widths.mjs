const breakpoints = [160, 320, 480, 960, 1440];

export function responsiveWidths(width) {
    const largest = Math.min(width, breakpoints.at(-1));
    return [...breakpoints.filter((size) => size < largest), largest];
}
