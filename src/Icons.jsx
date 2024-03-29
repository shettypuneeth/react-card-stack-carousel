import React from "react";

function ArrowBase(props) {
    const { color, size, children, ...otherProps } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...otherProps}
        >
            {children}
        </svg>
    );
}

export const ArrowLeft = (props) => {
    return (
        <ArrowBase {...props}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </ArrowBase>
    );
};

export const ArrowRight = (props) => {
    return (
        <ArrowBase {...props}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </ArrowBase>
    );
};
