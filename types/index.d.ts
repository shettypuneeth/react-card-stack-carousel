declare module "CarousalItem" {
    import { ReactNode } from "react";

    export interface CarousalItemProps {
        easing: string;
        delay: number;
        duration: string;
        height: number;
        opacity: number;
        rotateX: number;
        scale: number;
        top: number;
        zIndex: number;
    }

    const CarousalItem: (props: CarousalItemProps) => ReactNode;

    export default CarousalItem;
}
