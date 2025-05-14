import React from "react";
import './home.css';
import Card from "../../components/card";

const Home = () => {
    return (
        <div className="Home">
            <Card id="1234" title="Film Title" release_date="2008-11-21" popularity={82.5432} poster="https://image.tmdb.org/t/p/w342/1E5baAaEse26fej7uHcjOgEE2t2.jpg"/>
        </div>
    )
}

export default Home;