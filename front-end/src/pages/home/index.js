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
            <FilmSlider films={films}/>
        </div>
    )
}

export default Home;