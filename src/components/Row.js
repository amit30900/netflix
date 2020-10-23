import React, { useEffect, useState } from 'react'
import './Row.css'
import Youtube from 'react-youtube';

import instance from '../axios'
import movieTrailer from 'movie-trailer';

const Row = ({ title, fetchUrl, isLarge }) => {

    const base_url = 'https://image.tmdb.org/t/p/original/';

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {

        async function fetchData() {
            const request = await instance.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }

        fetchData();
    }, [fetchUrl])

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

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__images">
                {
                    movies.map(movie => (
                        <img
                            className={`row__poster ${isLarge && 'row__imagesLarge'}`}
                            key={movie.id}
                            onClick={() => handleMovie(movie)}
                            src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path} `}
                            alt={movie.name}
                        />
                    ))
                }
            </div>

            { trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}

        </div>

    )
}

export default Row
