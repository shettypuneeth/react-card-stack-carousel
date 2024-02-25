const BREAKPOINTS = [
    { name: "2xl", value: 1536 },
    { name: "xl", value: 1280 },
    { name: "lg", value: 1024 },
    { name: "md", value: 768 },
    { name: "sm", value: 640 },
];

export const getRootHeight = (heightProp) => {
    if (!heightProp) {
        throw new Error("'height' prop is required");
    }

    if (typeof heightProp === "number") {
        return heightProp;
    }

    for (const breakpoint of BREAKPOINTS) {
        const mediaQuery = window.matchMedia(
            `(min-width: ${breakpoint.value}px)`
        );

        if (mediaQuery.matches) {
            const regex = new RegExp(`${breakpoint.name}:(\\d+)`);
            const matches = regex.exec(heightProp);
            if (matches) {
                return matches[1];
            }
        }
    }

    // fallback to default
    const defaultHeightMatch = heightProp.match(/^(\d+)/);
    if (defaultHeightMatch) {
        return defaultHeightMatch[1];
    } else {
        throw new Error(`Invalid height prop: ${heightProp}`);
    }
};
