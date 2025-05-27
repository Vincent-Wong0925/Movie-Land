import React from "react";
import './slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "../card";

const FilmSlider = ({ films }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
        ]
    };

    return (
        <div className="FilmSlider">
            <Slider {...settings}>
                {films.map(film => <Card id={film.id} title={film.title} poster={`https://image.tmdb.org/t/p/w500${film.poster_path}`} score={film.vote_average * 10} release_date={film.release_date} />)}
            </Slider>
        </div>
    )
}

export default FilmSlider;