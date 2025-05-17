import React from "react";
import './genres.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";

const Genres = ({ genres }) => {
    const settings = {
        speed: 500,
        rows: 2,
        slidesPerRow: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesPerRow: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesPerRow: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesPerRow: 1,
                }
            },
        ]
    };
    return (
        <div className="Genres-container">
            <Slider {...settings}>
                {genres.map(genre => (
                    <div className="genres-card" id={genre.id}>
                        <Link className="genres-link">
                            {genre.name}
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Genres;