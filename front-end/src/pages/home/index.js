import React from "react";
import './home.css';
import FilmSlider from "../../components/slider";
import Hero from "../../components/hero";

const films = [
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
    {id: '1', title: 'film title', release_date: '2008-11-21', popularity: 82.5, poster_path: '/1E5baAaEse26fej7uHcjOgEE2t2.jpg'},
]

const Home = () => {
    return (
        <div className="Home">
            <Hero />

            <section className="popular-films">
                <h1>Popular</h1>
                <FilmSlider films={films}/>
            </section>

            <section className="top-rated-films">
                <h1>Top Rated</h1>
                <FilmSlider films={films}/>
            </section>

            <section className="genres">
                <h1>Discover</h1>
                <FilmSlider films={films}/>
            </section>
        </div>
    )
}

export default Home;