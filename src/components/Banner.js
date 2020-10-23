import React, { useEffect, useState } from 'react'
import './Banner.css'

import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import instance from '../axios'
import requests from '../request'

const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');


    const base_url = 'https://image.tmdb.org/t/p/original/';



    useEffect(() => {

        async function fetchData() {
            const request = await instance.get(requests.fetchActionMovies)
            setMovie(
                request.data.results
                [Math.floor(Math.random() * request.data.results.length - 1)])
        }

        fetchData()


    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        }
    };

    const handleMovie = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            await movieTrailer(movie.original_name || movie.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                }).catch(error => console.log(error))
        }
    }



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }


    return (
        <>
            <div className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
                    position: 'center center'
                }}
            >
                <div className="banner__content">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    <div className="banner__buttonContainer">
                        <button
                            className="banner__button"
                            onClick={() => handleMovie(movie)}
                        >Play</button>
                        <button className="banner__button">My List</button>

                        <h1 className="banner__description">
                            {truncate(movie?.overview, 250)}
                        </h1>
                    </div>
                </div>
                <div className="banner__fade">

                </div>
            </div>
            <div className="player">
                {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
            </div>
        </>

    )
}

export default Banner
