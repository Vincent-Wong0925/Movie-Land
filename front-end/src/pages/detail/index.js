import React, { useEffect, useState } from "react";
import './detail.css';
import '../../index.css';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById, selectSearch, selectSearchLoading } from "../../store/features/searchSlice";
import { selectAuthenticated, selectUser } from '../../store/features/userSlice';
import Comments from "../../components/comments";
import { checkAuthenticated } from "../../util";
import { addToFilmList, deleteFromList, fetchFilmFromList, updateWatched } from "../../api";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [inList, setInList] = useState(false);
    const [watched, setWatched] = useState(false);
    const [update, setUpdate] = useState(true);

    const movie = useSelector(selectSearch);
    const movieLoading = useSelector(selectSearchLoading);
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectAuthenticated);


    useEffect(() => {
        checkAuthenticated(dispatch);

        dispatch(getMovieById(id));

        fetchFilmFromList(user.id, id)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }

                if (response.length === 0) {
                    setInList(false);
                } else {
                    setInList(true);
                    setWatched(response[0].watched);
                }
            })
            .catch(err => console.log(err));
    }, [dispatch, id, update]);

    const handleAddToFavorite = () => {
        addToFilmList(user.id, movie.id)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setUpdate(state => !state);
            })
            .catch(err => console.log(err));
    }

    const handleDeleteFavorite = () => {
        deleteFromList(user.id, movie.id)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setUpdate(state => !state);
            })
            .catch(err => console.log(err));
    }

    const handleUpdateWatched = () => {
        updateWatched(user.id, movie.id, !watched)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setWatched(state => !state);
                setUpdate(state => !state);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="Detail page">
            <div className="detail-container">
                <img className="detail-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' />
                <div className="detail-info">
                    <h1 className="detail-title lime">{movie.title}</h1>
                    <span className="detail-misc">{movie.release_date} | {!movie.genres ? 'unknown genres' : Array.prototype.map.call(movie.genres, s => s.name).join(', ')} | {movie.runtime} minutes</span>
                    <p className="detail-score">Score: {(movie.vote_average * 10).toFixed(1)}%</p>

                    {isAuthenticated &&
                        <div className="detail-btn-container">
                            <button className={`detail-favorite-btn ${inList && 'fill'}`} onClick={inList ? handleDeleteFavorite : handleAddToFavorite}>
                                <svg xmlns="http://www.w3.org/2000/svg" height='24' fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                                <span>{inList ? 'Remove from favorite' : 'Add to favorite'}</span>
                            </button>

                            {inList &&
                                <button className={`detail-watched-btn ${watched && 'watched'}`} onClick={handleUpdateWatched}>
                                    {watched &&
                                        <svg xmlns="http://www.w3.org/2000/svg" height="18" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                        </svg>
                                    }
                                    Watched
                                </button>
                            }
                        </div>}

                    <h2 className="lime">Overview</h2>
                    <p className="detail-tagline">{movie.tagline}</p>
                    <p className="detail-overview">{movie.overview}</p>
                </div>
            </div>
            <Comments movie_id={id} />
        </div>
    )
}

export default Detail;