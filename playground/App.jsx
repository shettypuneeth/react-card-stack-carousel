import React from "react";
import { StackedCarousel } from "react-card-stack-carousel/index";
import "react-card-stack-carousel/styles/styles.css";

export default function App() {
    return (
        <main className="container">
            <StackedCarousel autoplay={false} height={"200 md:500"}>
                <div className="sample-card bg-color-1">0</div>
                <div className="sample-card bg-color-2">1</div>
                <div className="sample-card bg-color-3">2</div>
                <div className="sample-card bg-color-4">3</div>
            </StackedCarousel>
        </main>
    );
}
