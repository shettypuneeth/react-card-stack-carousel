import React from "react";
import { useCardStackCarousel } from "./useCardStackCarousel";
import CarouselItem from "./CarouselItem";
import Navigation from "./Navigation";
import { useRootHeight } from "./useRootHeight";

export function StackedCarousel(props) {
    const {
        autoplay,
        autoplayInterval,
        children,
        easingFunction,
        height,
        onNext,
        onPrevious,
        scaleFactor,
        startIndex,
        styleOverrides = {},
        transitionDuration,
        verticalOffset,
    } = props;

    const { handleNext, handlePrevious, getState } = useCardStackCarousel({
        autoplay,
        autoplayInterval,
        easingFunction,
        onNext,
        onPrevious,
        scaleFactor,
        startIndex,
        totalCount: children.length,
        transitionDuration,
        verticalOffset,
    });
    const rootHeight = useRootHeight(height);

    const renderCards = () => {
        return React.Children.map(children, (child, index) => {
            const styles = getState(index);

            return (
                <CarouselItem
                    key={index}
                    styleOverride={styleOverrides.CarouselItem}
                    {...styles}
                >
                    {child}
                </CarouselItem>
            );
        });
    };

    const { Root } = styleOverrides;
    const styles = Object.assign({}, Root, { height: rootHeight });

    return (
        <section className="rcsc-container" style={styles}>
            {renderCards()}

            <Navigation
                styleOverrides={styleOverrides}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
        </section>
    );
}
