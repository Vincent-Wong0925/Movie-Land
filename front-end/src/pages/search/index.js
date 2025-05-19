import React, { useEffect } from "react";
import './search.css';
import '../../index.css';
import { Link, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchMovieByName, selectSearch, selectSearchLoading } from "../../store/features/searchSlice";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const movieName = searchParams.get('name');
    const genre = searchParams.get('genre');
    const dispatch = useDispatch();
    const searchResult = useSelector(selectSearch);
    const searchLoading = useSelector(selectSearchLoading);

    useEffect(() => {
        dispatch(searchMovieByName(movieName));
    },[dispatch, movieName]);

    if (searchLoading) {
        return(
            <div className="Loading page">
                Loading...
            </div>
        )
    }

    if (!searchResult.results) {
        return(
            <div className="page">
                No result found
            </div>
        )
    }

    return(
        <div className="Search page">
            {searchResult.results.map(movie => 
                <Link className="search-card" to={`/detail/${movie.id}`}>
                    <img className="search-card-img" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster"/>
                    <div className="search-card-container">
                        <p className="search-card-item search-card-title">{movie.title}</p>
                        <p className="search-card-item search-card-release">{movie.release_date}</p>
                        <p className="search-card-item search-card-score">Score: {(movie.vote_average * 10).toFixed(1)}%</p>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Search;