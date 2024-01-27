import React from "react";
import { ReactCardStackCarousel } from "react-card-stack-carousel";
import "react-card-stack-carousel/src/styles.css";

export default function App() {
    return (
        <main className="container">
            <ReactCardStackCarousel
                autoplay={false}
                height={100}
                startIndex={0}
                transitionDuration={500}
                verticalOffset={5}
                width={100}
            >
                <div className="sample-card" style={{ backgroundColor: "red" }}>
                    1
                </div>
                <div
                    className="sample-card"
                    style={{ backgroundColor: "blue" }}
                >
                    2
                </div>
                <div
                    className="sample-card"
                    style={{ backgroundColor: "green" }}
                >
                    3
                </div>
            </ReactCardStackCarousel>
        </main>
    );
}
