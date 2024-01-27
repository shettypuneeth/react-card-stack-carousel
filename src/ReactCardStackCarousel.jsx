import React from "react";
import { useCardStackCarousel } from "./useCardStackCarousel";
import CarousalItem from "./CarousalItem";
import Navigation from "./Navigation";

export function ReactCardStackCarousel(props) {
    const {
        children,
        autoplay,
        height,
        width,
        easingFunction,
        scaleFactor,
        startIndex,
        transitionDuration,
        verticalOffset,
    } = props;

    const { onNext, onPrevious, getState } = useCardStackCarousel({
        autoplay,
        containerHeight: height,
        totalCount: children.length,
        easingFunction,
        scaleFactor,
        startIndex,
        transitionDuration,
        verticalOffset,
    });

    const renderCards = () => {
        return React.Children.map(children, (child, index) => {
            const styles = getState(index);

            return (
                <CarousalItem key={index} {...styles}>
                    {child}
                </CarousalItem>
            );
        });
    };

    return (
        <section className="rcsc-container" style={{ height, width }}>
            {renderCards()}

            <Navigation onNext={onNext} onPrevious={onPrevious} />
        </section>
    );
}
