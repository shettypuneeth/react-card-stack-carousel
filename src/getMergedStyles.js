export const getMergedStyles = (className, inlineStyle, styleOverride) => {
    if (styleOverride) {
        if (typeof styleOverride === "string") {
            const mergedClassName = `${className} ${styleOverride}`;
            return [mergedClassName, inlineStyle];
        } else {
            const mergedInlineStyle = Object.assign({}, styleOverride, inlineStyle);
            return [className, mergedInlineStyle];
        }
    }

    return [className, inlineStyle];
};
