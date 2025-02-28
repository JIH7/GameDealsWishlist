import { useEffect } from "react";
import "./home_page.css";

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
                return (<p key={i}>{el.title}: Desired price is {el.desired_price} {el.id}</p>)
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