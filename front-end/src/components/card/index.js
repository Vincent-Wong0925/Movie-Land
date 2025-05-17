import React from "react";
import './card.css';
import { NavLink } from "react-router";

const Card = ({ id, poster, title, release_date, score }) => {
    return (
        <div className="Card" id={id}>
            <NavLink className="card-link">
                <img className="card-img" src={poster} alt="film poster" />
                <span className="card-info">
                    <p className="card-title">{title}</p>
                    <p className="card-date">Release date: {release_date}</p>
                    <p className="card-popularity">Score: {score.toFixed(1)}%</p>
                </span>
            </NavLink>
        </div>
    )
}

export default Card;