function HomePage({ gameList }) {
    return (
        <>
            <h1>Games List</h1>
            {
                gameList ? (
                gameList.map((el, i) => {
                return (<p key={i}>{el.title}: Desired price is {el.desired_price}</p>)
                })
                ) : (
                <p>Gamelist does not exist</p>
                )
            }
        </>
    )
}

export default HomePage;