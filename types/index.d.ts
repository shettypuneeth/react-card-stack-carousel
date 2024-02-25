declare module "react-card-stack-carousel" {
    import { ReactNode } from "react";

    type StyleKeys = "Root" | "CarouselItem" | "Navigation" | "NavIcon";
    type StyleOverrides = Record<StyleKeys, React.CSSProperties | string>;

    export interface StackedCarouselProps {
        height: number | string;
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
        styleOverrides?: StyleOverrides;
        transitionDuration?: number;
        verticalOffset?: number;
    }

    export const StackedCarousel: (props: StackedCarouselProps) => ReactNode;
}
