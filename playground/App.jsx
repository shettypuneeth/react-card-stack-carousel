import React from "react";
import { StackedCarousel } from "react-card-stack-carousel";
import "react-card-stack-carousel/dist/styles.css";

export default function App() {
    const cardWidth = 500;
    const cardHeight = 500;

    const cardStyles = { width: cardWidth, height: cardHeight };
    return (
        <main className="container">
            <StackedCarousel autoplay={false} height={cardHeight}>
                <div className="sample-card bg-color-1" style={cardStyles}>
                    0
                </div>
                <div className="sample-card bg-color-2" style={cardStyles}>
                    1
                </div>
                <div className="sample-card bg-color-3" style={cardStyles}>
                    2
                </div>
                <div className="sample-card bg-color-4" style={cardStyles}>
                    3
                </div>
            </StackedCarousel>
        </main>
    );
}
