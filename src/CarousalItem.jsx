import React from "react";

export default React.memo(function CarousalItem(props) {
    const {
        easing,
        delay,
        transitionDuration,
        opacity,
        rotateX,
        scale,
        top,
        zIndex,
        children,
    } = props;

    const duration = transitionDuration / 1000;
    const transition = `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`;

    const style = {
        opacity,
        transition,
        transitionDelay: `${delay}s, ${delay}s`,
        transform: `scale(${scale}) translateY(${top}px) rotateX(${rotateX}deg)`,
        zIndex,
    };

    return (
        <div style={style} className="rcsc-item">
            {children}
        </div>
    );
});
