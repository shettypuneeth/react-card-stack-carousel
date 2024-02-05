import React from "react";

export default React.memo(function CarousalItem(props) {
    const {
        easing,
        delay,
        transitionDuration,
        opacity,
        rotateX,
        scale,
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

    const style = {
        opacity,
        transition,
        transitionDelay: `${delay}s, ${delay}s`,
        transform,
        zIndex,
    };

    return (
        <div style={style} className="rcsc-item">
            {children}
        </div>
    );
});
