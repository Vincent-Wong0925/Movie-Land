import React, { useEffect } from "react";
import './detail.css';
import '../../index.css';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById, selectSearch, selectSearchLoading } from "../../store/features/searchSlice";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMovieById(id));
    }, [dispatch, id]);

    const movie = useSelector(selectSearch);
    const movieLoading = useSelector(selectSearchLoading);


    if (movieLoading) {
        return (
            <div className="Loading page">
                Loading
            </div>
        )
    }

    return (
        <div className="Detail page">
            <div className="detail-container">
                <img className="detail-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' />
                <div className="detail-info">
                    <h1 className="detail-title lime">{movie.title}</h1>
                    <span className="detail-misc">{movie.release_date} | {!movie.genres ? 'unknown genres' : Array.prototype.map.call(movie.genres, s => s.name).join(', ')} | {movie.runtime} minutes</span>
                    <p className="detail-score">Score: {(movie.vote_average * 10).toFixed(1)}%</p>
                    <h2 className="lime">Overview</h2>
                    <p className="detail-tagline">{movie.tagline}</p>
                    <p className="detail-overview">{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default Detail;