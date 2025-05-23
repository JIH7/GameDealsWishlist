import { useEffect } from "react";
import "./home_page.css";
import GameWidget from "./components/game_widget/game_widget";

const HomePage = ({ gameList, updateList, setCurrentPage, setCookie }) => {
    // Fetch game list when component mounts
    useEffect(() => updateList, []);

    return (
        <>
        <h1>Games List</h1>
        <main className="card">
            {
                gameList ? (
                gameList.map((el, i) => {
                return (<GameWidget img={el.thumbnail} title={el.title} desiredPrice={el.desired_price} />)
                })
                ) : (
                <p>Gamelist is empty</p>
                )
            }
        </main>
        <footer>
            <button onClick={e => setCurrentPage("search")}>Search</button>
            <button onClick={() => setCookie()}>Log Out</button>
        </footer>
        </>
    )
}

export default HomePage;