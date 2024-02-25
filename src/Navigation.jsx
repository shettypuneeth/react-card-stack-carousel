import { ArrowLeft, ArrowRight } from "./Icons";
import { getMergedStyles } from "./getMergedStyles";

export default function Navigation(props) {
    const { onNext, onPrevious, styleOverrides } = props;
    const arrowSize = 16;

    const [containerClassName, containerInlineStyle] = getMergedStyles(
        "rcsc-nav-container",
        null,
        styleOverrides.Navigation
    );
    const [iconClassName, iconInlineStyle] = getMergedStyles(
        "rcsc-nav-icon",
        null,
        styleOverrides.NavIcon
    );

    return (
        <nav style={containerInlineStyle} className={containerClassName}>
            <div style={iconInlineStyle} onClick={onPrevious} className={iconClassName}>
                <ArrowLeft color="#fff" size={arrowSize} />
            </div>
            <div style={iconInlineStyle} onClick={onNext} className={iconClassName}>
                <ArrowRight color="#fff" size={arrowSize} />
            </div>
        </nav>
    );
}
