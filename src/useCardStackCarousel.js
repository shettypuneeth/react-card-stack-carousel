import { useState, useRef, useEffect } from "react";

const TRANSITION_STATE = {
    IDLE: 0,
    ENTERING_NEXT: 1,
    ENTERING_PREVIOUS: 2,
};

const CARD_OFFSET_SMALL = 25;
const DEFAULT_AUTOPLAY = false;
const DEFAULT_AUTOPLAY_INTERVAL = 4000;
const DEFAULT_EASING_FUNCTION = "cubic-bezier(0.93, 0.01, 0.39, 1.01)";
const DEFAULT_TRANSITION_DURATION = 450;
const DEFAULT_START_INDEX = 0;
const DEFAULT_VERTICAL_OFFSET = 35;
const DEFAULT_SCALE_FACTOR = 0.08;
const DEFAULT_DELAY_FACTOR = 0.08;
const DEFAULT_OPACITY_FACTOR = 0.15;

/**
 * Custom hook managing the state, transitions and styling of the carousel
 * @param {*} config
 * @returns {object} activeIndex, onNext, onPrevious, getState
 */
export const useCardStackCarousel = (config) => {
    const {
        containerHeight,
        easing = DEFAULT_EASING_FUNCTION,
        scaleFactor = DEFAULT_SCALE_FACTOR,
        startIndex = DEFAULT_START_INDEX,
        totalCount,
        transitionDuration = DEFAULT_TRANSITION_DURATION,
        verticalOffset = DEFAULT_VERTICAL_OFFSET,
    } = config;

    const [activeIndex, setActiveIndex] = useState(startIndex);
    const [transitionState, setTransitionState] = useState(
        TRANSITION_STATE.IDLE
    );
    const transitionTimer = useRef(null);

    const validateParams = () => {
        if (startIndex >= totalCount) {
            throw new Error(
                `startIndex ${startIndex} should be less than totalCount ${totalCount}`
            );
        }
    };

    const getDelayInMs = (virtualIndex, count) => {
        let delay = 0;
        const isBoundary = virtualIndex === count - 1;

        if (isBoundary) {
            delay = 0;
        } else {
            delay = (1 + virtualIndex) * DEFAULT_DELAY_FACTOR;
        }

        return delay;
    };

    const getTop = (index, offset, scaleFactor) => {
        const progress = Math.min(index, 5);
        const top = -progress * (offset + (scaleFactor * containerHeight) / 3);
        return top;
    };

    const getState = (index) => {
        const isSmallScreen = containerHeight < 500;
        let virtualIndex = index - activeIndex;
        if (virtualIndex < 0) {
            virtualIndex = totalCount + virtualIndex;
        }

        const offset = isSmallScreen ? CARD_OFFSET_SMALL : verticalOffset;
        const scale = 1 - virtualIndex * scaleFactor;

        let delay = getDelayInMs(virtualIndex, totalCount);
        let top = getTop(virtualIndex, offset, scaleFactor);
        const zIndex = totalCount - virtualIndex;
        let opacity = 1 - virtualIndex * DEFAULT_OPACITY_FACTOR;
        let rotateX = 0;

        if (transitionState === TRANSITION_STATE.ENTERING_NEXT) {
            // set the delay during begin transition
            delay = 0;
            if (virtualIndex === 0) {
                const offset = isSmallScreen ? 0.7 : 0.65;
                top -= Math.round(containerHeight * offset);
                opacity = 0.8;
                rotateX = -90;
            } else {
                rotateX = -10;
            }
        }

        if (transitionState === TRANSITION_STATE.ENTERING_PREVIOUS) {
            delay = 0;
            if (virtualIndex === totalCount - 1) {
                top -= Math.round(containerHeight * 0.5);
                opacity = 0.6;
                rotateX = 65;
            } else {
                rotateX = 15;
            }
        }

        return {
            delay,
            easing,
            height: containerHeight,
            opacity,
            rotateX,
            scale,
            top,
            transitionDuration,
            zIndex,
        };
    };

    const onNext = () => {
        setTransitionState(TRANSITION_STATE.ENTERING_NEXT);

        transitionTimer.current = setTimeout(() => {
            setActiveIndex((activeIndex) => {
                const nextIndex = activeIndex + 1;
                const targetIndex = nextIndex >= totalCount ? 0 : nextIndex;
                return targetIndex;
            });

            setTransitionState(TRANSITION_STATE.IDLE);
        }, transitionDuration);
    };

    const onPrevious = () => {
        setTransitionState(TRANSITION_STATE.ENTERING_PREVIOUS);

        transitionTimer.current = setTimeout(() => {
            setActiveIndex((activeIndex) => {
                const previousIndex = activeIndex - 1;
                const targetIndex =
                    previousIndex < 0 ? totalCount - 1 : previousIndex;
                return targetIndex;
            });

            setTransitionState(TRANSITION_STATE.IDLE);
        }, transitionDuration);
    };

    useEffect(() => {
        validateParams();
    }, []);

    useAutoPlay(config, onNext);

    return {
        activeIndex,
        onNext,
        onPrevious,
        getState,
    };
};

const useAutoPlay = (config, actionCallback) => {
    const {
        autoplay = DEFAULT_AUTOPLAY,
        autoplayInterval = DEFAULT_AUTOPLAY_INTERVAL,
    } = config;
    const autoplayTimer = useRef(null);

    useEffect(() => {
        if (autoplay) {
            autoplayTimer.current = setInterval(() => {
                actionCallback();
            }, autoplayInterval);
        }

        return () => {
            clearInterval(autoplayTimer.current);
        };
    }, [autoplay, autoplayInterval]);
};
