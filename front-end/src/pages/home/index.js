import React, { useEffect } from "react";
import './home.css';
import FilmSlider from "../../components/slider";
import Hero from "../../components/hero";
import Genres from "../../components/genres";
import { useDispatch, useSelector } from "react-redux";
import { getPopular, selectPopular } from "../../store/features/popularSlice";

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopular());
    }, [dispatch]);

    const popular = useSelector(selectPopular);

    return (
        <div className="Home">
            <Hero />

            <section className="popular-films">
                <h1>Popular</h1>
                <FilmSlider films={popular}/>
            </section>

            <section className="top-rated-films">
                <h1>Top Rated</h1>
                <FilmSlider films={films}/>
            </section>

            <section className="genres">
                <h1>Discover</h1>
                <Genres />
            </section>
        </div>
    )
}

export default Home;