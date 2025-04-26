import { useState } from "react";
import "./search_page.css"

const SearchResult = ({ title }) => {
    return (
        <>
            <div className="card result">
                <h2>{title}</h2>
                <button>Add Game</button>
            </div>
        </>
    );
};

const SearchPage = () => {
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
            results ? (results.map(el => (<SearchResult title={el.external} />))) : (<></>)
        }
        </>
    );
};

export default SearchPage;