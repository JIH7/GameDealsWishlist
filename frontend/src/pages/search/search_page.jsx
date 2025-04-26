import { useState } from "react";
import "./search_page.css"

const SearchResult = ({ game, addGame }) => {
    return (
        <>
            <div className="card result">
                <img className="thumbnail" src={game.thumb} alt={game.external} />
                <h2>{game.external}</h2>
                <button onClick={() => addGame(game)}>Add Game</button>
            </div>
        </>
    );
};

const SearchPage = ({ addGame }) => {
    const [results, setResults] = useState([]);

    const searchURL = "https://www.cheapshark.com/api/1.0/games?title=";

    const getResults = async () => {
        const searchTerm = document.querySelector("#search-term").value;
        const res = await fetch(searchURL + searchTerm);
        const data = await res.json();

        console.log(data);
        setResults(data);
    };

    return (
        <>
        <h1>Search</h1>
        <div>
            <input type="text" id="search-term" placeholder="Search for games..." />
            <button onClick={getResults}>Search</button>
        </div>
        {
            results ? (results.map(el => (<SearchResult game={el} addGame={addGame} />))) : (<></>)
        }
        </>
    );
};

export default SearchPage;