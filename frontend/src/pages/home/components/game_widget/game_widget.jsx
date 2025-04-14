import { useEffect } from "react";

const GameWidget = ({ title, desiredPrice, msrp=0 }) => {

    // Initialize slider to max
    // TODO: If desired price stored, set slider default to that
    useEffect(() => {
        document.querySelector(".slide-container > input").value = 100;
    }, [])

    return (
        <>
            <div className="game-widget">
                <h3>{title}</h3>
                <p>${desiredPrice}</p>
                <div className="slide-container">
                    <input type="range" min={0} max={100} />
                </div>
            </div>
        </>
    );
};

export default GameWidget;