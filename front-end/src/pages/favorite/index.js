import React, { useEffect, useState } from "react";
import './favorite.css';
import '../../index.css';
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { fetchFilmList, fetchTmdbMovie } from "../../api";
import { selectAuthenticated, selectUser } from "../../store/features/userSlice";

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
                <p className="favorite-card-item favorite-card-title">{film.title}</p>
                <p className="favorite-card-item favorite-card-release">{film.release_date}</p>
                <p className="favorite-card-item favorite-card-score">Score: {(film.vote_average * 10).toFixed(1)}%</p>
            </div>
        </Link>
    )
}

const Favorite = () => {
    const [filmList, setFilmList] = useState([]);
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) {
            return navigate('/login');
        }
        
        fetchFilmList(user.id)
            .then(response => setFilmList(response.result))
            .catch(err => console.log(err));
    }, [user, isAuthenticated, navigate]);

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