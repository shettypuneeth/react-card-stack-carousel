import React from "react";
import CarouselItem from "./CarouselItem";
import Navigation from "./Navigation";
import { useCardStackCarousel } from "./useCardStackCarousel";
import { useRootHeight } from "./useRootHeight";
import { getMergedStyles } from "./getMergedStyles";

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

    const totalCount = React.Children.count(children);

    const rootHeight = useRootHeight(height);
    const { handleNext, handlePrevious, getState } = useCardStackCarousel({
        autoplay,
        autoplayInterval,
        easingFunction,
        onNext,
        onPrevious,
        scaleFactor,
        startIndex,
        totalCount,
        transitionDuration,
        verticalOffset,
    });

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

    const [className, inlineStyle] = getMergedStyles(
        "rcsc-container",
        { height: rootHeight },
        styleOverrides.Root
    );
    return (
        <section className={className} style={inlineStyle}>
            {renderCards()}

            {totalCount > 1 && (
                <Navigation
                    styleOverrides={styleOverrides}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            )}
        </section>
    );
}
