import { useEffect } from "react";
import "./home_page.css";
import GameWidget from "./components/game_widget/game_widget";

const HomePage = ({ gameList, updateList }) => {
    // Fetch game list when component mounts
    useEffect(() => updateList, []);

    return (
        <>
        <h1>Games List</h1>
        <main className="card">
            {
                gameList ? (
                gameList.map((el, i) => {
                return (<GameWidget title={el.title} desiredPrice={el.desired_price} />)
                })
                ) : (
                <p>Gamelist is empty</p>
                )
            }
        </main>
        </>
    )
}

export default HomePage;