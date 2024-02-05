import React from "react";
import { useCardStackCarousel } from "./useCardStackCarousel";
import CarousalItem from "./CarousalItem";
import Navigation from "./Navigation";

export function StackedCarousel(props) {
    const {
        autoplay,
        autoplayInterval,
        children,
        containerClassName,
        easingFunction,
        height,
        navContainerClassName,
        onNext,
        onPrevious,
        scaleFactor,
        startIndex,
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

    const styles = { height };
    const containerClasses = `rcsc-container ${containerClassName || ""}`;

    return (
        <section className={containerClasses} style={styles}>
            {renderCards()}

            <Navigation
                className={navContainerClassName}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
        </section>
    );
}
