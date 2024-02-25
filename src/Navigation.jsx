import { ArrowLeft, ArrowRight } from "./Icons";

export default function Navigation(props) {
    const { onNext, onPrevious, styleOverrides } = props;
    const arrowSize = 16;

    return (
        <nav style={styleOverrides.Navigation} className="rcsc-nav-container">
            <div
                style={styleOverrides.NavIcon}
                onClick={onPrevious}
                className="rcsc-nav-icon"
            >
                <ArrowLeft color="#fff" size={arrowSize} />
            </div>
            <div
                style={styleOverrides.NavIcon}
                onClick={onNext}
                className="rcsc-nav-icon"
            >
                <ArrowRight color="#fff" size={arrowSize} />
            </div>
        </nav>
    );
}
