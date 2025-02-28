import "./home_page.css";

function HomePage({ gameList }) {
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
                <p>Gamelist does not exist</p>
                )
            }
        </main>
        </>
    )
}

export default HomePage;