import { useState, useRef, useEffect } from "react";

const TRANSITION_STATE = { Idle: 0, EnteringNext: 1, EnteringPrevious: 2 };
const DIRECTION = { None: 0, Next: 1, Previous: 2 };

const DEFAULT_AUTOPLAY = false;
const DEFAULT_AUTOPLAY_INTERVAL = 4000;
const DEFAULT_EASING_FUNCTION = "cubic-bezier(0.93, 0.01, 0.39, 1.01)";
const DEFAULT_TRANSITION_DURATION = 450;
const DEFAULT_START_INDEX = 0;
const DEFAULT_VERTICAL_OFFSET = 10;
const DEFAULT_SCALE_FACTOR = 0.9;
const DEFAULT_DELAY_FACTOR = 0.08;
const DEFAULT_OPACITY_FACTOR = 0.15;
const DEFAULT_OFFSET_DAMPENING_FACTOR = 0.5;

/**
 * Custom hook managing the state, transitions and styling of the carousel
 * @param {*} config
 * @returns {object} activeIndex, onNext, onPrevious, getState
 */
export const useCardStackCarousel = (config) => {
    const {
        easing = DEFAULT_EASING_FUNCTION,
        scaleFactor = DEFAULT_SCALE_FACTOR,
        startIndex = DEFAULT_START_INDEX,
        totalCount,
        transitionDuration = DEFAULT_TRANSITION_DURATION,
        verticalOffset = DEFAULT_VERTICAL_OFFSET,
    } = config;

    const [activeIndex, setActiveIndex] = useState(startIndex);
    const [transitionState, setTransitionState] = useState(TRANSITION_STATE.Idle);
    const direction = useRef(DIRECTION.None);

    const validateParams = () => {
        if (startIndex >= totalCount) {
            throw new Error(
                `startIndex ${startIndex} should be less than totalCount ${totalCount}`
            );
        }
    };

    const getDelayInMs = (virtualIndex, totalCount) => {
        const ceilIndex = totalCount - 1;
        const isForwardBoundary =
            direction.current === DIRECTION.Next && virtualIndex === ceilIndex;
        const isBackwardBoundary =
            direction.current === DIRECTION.Previous && virtualIndex === 0;

        if (isForwardBoundary || isBackwardBoundary) {
            return 0;
        } else {
            if (direction.current === DIRECTION.Next) {
                return (1 + virtualIndex) * DEFAULT_DELAY_FACTOR;
            } else if (direction.current === DIRECTION.Previous) {
                return (totalCount - virtualIndex) * DEFAULT_DELAY_FACTOR;
            }
        }
    };

    const getCoordinates = (progress, offset, scaleFactor) => {
        const tX = 0;
        const tY = `${
            -progress * (offset - progress * DEFAULT_OFFSET_DAMPENING_FACTOR)
        }%`;

        const scale = (1 - scaleFactor) * 1000;
        const tZ = `${-scale * progress}px`;

        return { tX, tY, tZ };
    };

    const getState = (index) => {
        let virtualIndex = index - activeIndex;
        if (virtualIndex < 0) {
            virtualIndex = totalCount + virtualIndex;
        }

        const progress = Math.min(virtualIndex, 5);
        const offset = verticalOffset;
        const scale = 1;

        let delay = getDelayInMs(virtualIndex, totalCount);
        let { tX, tY, tZ } = getCoordinates(progress, offset, scaleFactor);
        const zIndex = totalCount - virtualIndex;
        let opacity = 1 - virtualIndex * DEFAULT_OPACITY_FACTOR;
        let rotateX = 0;

        if (transitionState === TRANSITION_STATE.EnteringNext) {
            // reset the delay during transition setup for immediate effect
            delay = 0;
            if (virtualIndex === 0) {
                tY = `-${50 + verticalOffset}%`;
                rotateX = -90;
            } else {
                rotateX = -10;
            }
        }

        if (transitionState === TRANSITION_STATE.EnteringPrevious) {
            // reset the delay during transition setup for immediate effect
            delay = 0;
            if (virtualIndex === totalCount - 1) {
                tY = `-${72}%`;
                opacity = 0.6;
                rotateX = 65;
            } else {
                rotateX = 15;
            }
        }

        return {
            delay,
            easing,
            opacity,
            rotateX,
            scale,
            tX,
            tY,
            tZ,
            transitionDuration,
            zIndex,
        };
    };

    const handleTransition = (nextDirection, nextTransition, getNextIndex) => {
        if (totalCount === 1) {
            return;
        }

        direction.current = nextDirection;
        setTransitionState(nextTransition);

        setTimeout(() => {
            setActiveIndex(getNextIndex);
            setTransitionState(TRANSITION_STATE.Idle);
        }, transitionDuration);
    };

    const handleNext = () => {
        handleTransition(
            DIRECTION.Next,
            TRANSITION_STATE.EnteringNext,
            (activeIndex) => (activeIndex + 1) % totalCount
        );
        config.onNext && config.onNext();
    };

    const handlePrevious = () => {
        handleTransition(
            DIRECTION.Previous,
            TRANSITION_STATE.EnteringPrevious,
            (activeIndex) => (activeIndex - 1 + totalCount) % totalCount
        );
        config.onPrevious && config.onPrevious();
    };

    useEffect(() => {
        validateParams();
    }, [totalCount, startIndex]);

    useAutoPlay(config, handleNext);

    return {
        activeIndex,
        handleNext,
        handlePrevious,
        getState,
    };
};

const useAutoPlay = (config, actionCallback) => {
    const { autoplay = DEFAULT_AUTOPLAY, autoplayInterval = DEFAULT_AUTOPLAY_INTERVAL } =
        config;
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
