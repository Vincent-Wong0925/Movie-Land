import React, { useEffect, useState } from "react";
import './favorite.css';
import '../../index.css';
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbMovie } from "../../api";
import { selectAuthenticated, selectUser } from "../../store/features/userSlice";
import { getFilmList, selectFavorite } from "../../store/features/favoriteSlice";

const FavoriteCard = ({ film_id, watched }) => {
    const [film, setFilm] = useState({});

    useEffect(() => {
        fetchTmdbMovie(film_id)
            .then(response => setFilm(response))
            .catch(err => console.log(err));
    }, [film_id]);

    return (
        <Link className="favorite-card" to={`/detail/${film.id}`}>
            <img className="favorite-card-img" src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="movie poster" />
            <div className="favorite-card-container">
                <div className="favorite-card-info">
                    <p className="favorite-card-item favorite-card-title">{film.title}</p>
                    <p className="favorite-card-item favorite-card-release">{film.release_date}</p>
                    <p className="favorite-card-item favorite-card-score">Score: {(film.vote_average * 10).toFixed(1)}%</p>
                </div>

                <div className="favorite-card-watched">
                    {watched &&
                        <div className="favorite-card-watched-container">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                            </svg>
                            Watched
                        </div>}
                </div>
            </div>
        </Link>
    )
}

const Favorite = () => {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectAuthenticated);
    const filmList = useSelector(selectFavorite);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }

        dispatch(getFilmList(user.id));
    }, [user, isAuthenticated, navigate, dispatch]);

    if (!filmList) {
        return (
            <div className="Error page">
                Something went wrong
            </div>
        )
    }

    return (
        <div className="Favorite page">
            <h1 className="lime">Favorite movies</h1>
            {!filmList.length ? <p>No moveies yet</p> : filmList.map(film =>
                <FavoriteCard film_id={film.film_id} watched={film.watched} key={film.film_id} />
            )}
        </div>
    )
}

export default Favorite;