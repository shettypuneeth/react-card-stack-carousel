declare module "react-card-stack-carousel" {
    import { ReactNode, FC } from "react";

    type StyleKeys = "Root" | "CarouselItem" | "Navigation" | "NavIcon";
    type StyleOverrides = Partial<Record<StyleKeys, React.CSSProperties | string>>;

    export interface StackedCarouselProps {
        height: number | string;
        children: ReactNode;
        autoplay?: boolean;
        autoplayInterval?: number;
        easingFunction?: string;
        onNext?: () => void;
        onPrevious?: () => void;
        scaleFactor?: number;
        startIndex?: number;
        styleOverrides?: StyleOverrides;
        transitionDuration?: number;
        verticalOffset?: number;
    }

    export const StackedCarousel: FC<StackedCarouselProps>;
}
