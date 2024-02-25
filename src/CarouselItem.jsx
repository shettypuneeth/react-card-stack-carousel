import React from "react";

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
    const mergedStyles = Object.assign({}, styleOverride, computedStyle);

    return (
        <div style={mergedStyles} className="rcsc-item">
            {children}
        </div>
    );
});