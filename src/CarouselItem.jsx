import React from "react";
import { getMergedStyles } from "./getMergedStyles";

export default React.memo(function CarouselItem(props) {
    const {
        easing,
        delay,
        transitionDuration,
        opacity,
        rotateX,
        scale,
        styleOverride,
        tX,
        tY,
        tZ,
        zIndex,
        children,
    } = props;

    const duration = transitionDuration / 1000;
    const transition = `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`;
    const transform = `
        translate3d(${tX}, ${tY}, ${tZ})
        rotateX(${rotateX}deg)
        scale(${scale})
    `;

    const computedStyle = {
        opacity,
        transition,
        transitionDelay: `${delay}s, ${delay}s`,
        transform,
        zIndex,
    };

    const [className, inlineStyle] = getMergedStyles(
        "rcsc-item",
        computedStyle,
        styleOverride
    );

    return (
        <div style={inlineStyle} className={className}>
            {children}
        </div>
    );
});
