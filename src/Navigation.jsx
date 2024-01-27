import { ArrowLeft, ArrowRight } from "./Icons";

export default function Navigation(props) {
    const { onNext, onPrevious, isSmallScreen } = props;
    const arrowSize = isSmallScreen ? 16 : 18;

    const className =
        "bg-zinc-700 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer hover:bg-zinc-500";

    return (
        <nav className="rcsc-nav-container">
            <div onClick={onPrevious} className="rcsc-nav-icon">
                <ArrowLeft color="#fff" size={arrowSize} />
            </div>
            <div onClick={onNext} className="rcsc-nav-icon">
                <ArrowRight color="#fff" size={arrowSize} />
            </div>
        </nav>
    );
}
