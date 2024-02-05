declare module "react-card-stack-carousel" {
    import { ReactNode } from "react";

    export interface StackedCarouselProps {
        height: number;
        children: ReactNode;
        autoplay?: boolean;
        autoplayInterval?: number;
        containerClassName?: string;
        easingFunction?: string;
        navContainerClassName?: string;
        onNext?: () => void;
        onPrevious?: () => void;
        scaleFactor?: number;
        startIndex?: number;
        transitionDuration?: number;
        verticalOffset?: number;
    }

    export const StackedCarousel: (props: StackedCarouselProps) => ReactNode;
}
