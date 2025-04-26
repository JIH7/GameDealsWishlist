import { useState, useEffect } from "react";

const GameWidget = ({ img, title, desiredPrice, msrp=80 }) => {

    // Initialize slider to max
    // TODO: If desired price stored, set slider default to that
    useEffect(() => {
        document.querySelector(".slide-container > input").value = 100;
    }, [])

    const [price, setPrice] = useState(desiredPrice);

    return (
        <>
            <div className="game-widget">
                <img src={img} alt={title} />
                <div>
                    <h3>{title}</h3>
                    <p>${price}</p>
                    <div className="slide-container">
                        <input onChange={e => setPrice(e.target.value)} type="range" min={0} max={msrp} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameWidget;