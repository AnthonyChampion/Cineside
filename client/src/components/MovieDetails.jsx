import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies } from '../utils/moviedb';

const useMovieData = (movieId) => {
    const [credits, setCredits] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creditsData = await fetchMovieCredits(movieId);
                setCredits(creditsData.cast);

                const similarMoviesData = await fetchSimilarMovies(movieId);
                setSimilarMovies(similarMoviesData.results);
            } catch (error) {
                console.error('Erreur dans la récupération des données:', error);
            }
        };

        fetchData();
    }, [movieId]);

    return { credits, similarMovies };
};

const MovieDetails = ({ movie, onClose }) => {
    const [movieDetails, setMovieDetails] = useState(movie);
    const { credits, similarMovies } = useMovieData(movie.id);

    const handleMovieClick = useCallback(async (similarMovie) => {
        try {
            const data = await fetchMovieDetails(similarMovie.id);
            setMovieDetails(data);
        } catch (error) {
            console.error('Erreur dans la récupération des détails:', error);
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 h-screen flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-white text-black rounded-lg overflow-hidden h-[98%] w-11/12 md:w-3/4 lg:w-2/3">
                <div className="relative">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                        alt={movieDetails.title}
                        className="w-full h-[250px] object-cover"
                    />
                    <button
                        className="absolute top-4 right-4 bg-green-400 text-white rounded-full w-10 h-10 flex items-center justify-center"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <div className=" p-6 -mt-3 space-y-4 h-[28%]">
                    <h2 className="text-2xl font-bold">{movieDetails.title}</h2>
                    <p><strong>Date de sortie:</strong> {movieDetails.release_date}</p>
                    <p><strong>Note:</strong> {Math.round((movieDetails.vote_average) * 100) / 100} / 10</p>
                    <p><strong>Genres:</strong> {movieDetails.genres?.map(genre => genre.name).join(', ')}</p>
                    <p className="line-clamp-3"><strong>Synopsis:</strong> {movieDetails.overview}</p>
                </div>
                {credits && (
                    <div className="p-6 space-y-4 -mt-2">
                        <h3 className="text-xl font-bold">Credits</h3>
                        <ul className="flex flex-row justify-center w-[100%] space-x-5">
                            {credits.slice(0, 10).map(actor => (
                                <li key={actor.id} className="flex flex-col items-center w-24 h-30">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                        className="w-24 h-24 rounded-full object-cover"
                                        aria-label={actor.name}
                                    />
                                    <div className="flex-col justify-center text-center w-[fit]">
                                        <p className="font-semibold">{actor.name}</p>
                                        <p className="text-sm text-gray-600">{actor.character}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {similarMovies.length > 0 && (
                    <div className="p-6">
                        <h3 className="text-xl font-bold pb-4 -mt-8">Films similaires</h3>
                        <ul className="flex flex-row justify-center w-[100%] space-x-3">
                            {similarMovies.slice(0, 10).map(similarMovie => (
                                <li key={similarMovie.id} className="flex flex-col justify-center items-center w-28 h-38">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                                        alt={similarMovie.title}
                                        className="w-[100px] h-[150px] object-cover rounded-xl cursor-pointer"
                                        onClick={() => handleMovieClick(similarMovie)}
                                        aria-label={similarMovie.title}
                                    />
                                    <p className="w-28 text truncate">{similarMovie.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        backdrop_path: PropTypes.string,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        genres: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
        overview: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MovieDetails;
