import React, { useEffect } from "react";
import './home.css';
import FilmSlider from "../../components/slider";
import Hero from "../../components/hero";
import Genres from "../../components/genres";
import { useDispatch, useSelector } from "react-redux";
import { getPopular, selectPopular } from "../../store/features/popularSlice";
import { getTopRated, selectTopRated } from "../../store/features/topRatedSlice";
import { getGenres, selectGenres } from "../../store/features/genreSlice";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopular());
        dispatch(getTopRated());
        dispatch(getGenres());
    }, [dispatch]);

    const popular = useSelector(selectPopular);
    const topRated = useSelector(selectTopRated);
    const genres = useSelector(selectGenres);

    return (
        <div className="Home">
            <Hero />

            <section className="popular-films">
                <h1>Popular</h1>
                <FilmSlider films={popular}/>
            </section>

            <section className="top-rated-films">
                <h1>Top Rated</h1>
                <FilmSlider films={topRated}/>
            </section>

            <section className="genres">
                <h1>Discover</h1>
                <Genres genres={genres} />
            </section>
        </div>
    )
}

export default Home;