import { ArrowLeft, ArrowRight } from "./Icons";

export default function Navigation(props) {
    const { className = "", onNext, onPrevious } = props;
    const arrowSize = 16;

    const containerClasses = `rcsc-nav-container ${className}`;

    return (
        <nav className={containerClasses}>
            <div onClick={onPrevious} className="rcsc-nav-icon">
                <ArrowLeft color="#fff" size={arrowSize} />
            </div>
            <div onClick={onNext} className="rcsc-nav-icon">
                <ArrowRight color="#fff" size={arrowSize} />
            </div>
        </nav>
    );
}
