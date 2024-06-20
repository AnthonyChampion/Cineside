import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCredits, fetchMovieDetails, fetchMovieTrailer, fetchSimilarMovies } from '../utils/moviedb';

const useMovieData = (movieId) => {
    const [credits, setCredits] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateCredits = useCallback(async (movieId) => {
        try {
            const creditsData = await fetchMovieCredits(movieId);
            setCredits(creditsData.cast);
        } catch (error) {
            setError('Erreur dans la récupération des crédits');
        }
    }, []);

    const updateSimilarMovies = useCallback(async (movieId) => {
        try {
            const similarMoviesData = await fetchSimilarMovies(movieId);
            setSimilarMovies(similarMoviesData.results);
        } catch (error) {
            setError('Erreur dans la récupération des films similaires');
        }
    }, []);

    const getTrailers = useCallback(async (movieId) => {
        try {
            const trailerData = await fetchMovieTrailer(movieId);
            setTrailer(trailerData.results);
        } catch (error) {
            setError('Erreur dans la récupération des trailers');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creditsData = await fetchMovieCredits(movieId);
                setCredits(creditsData.cast);

                const similarMoviesData = await fetchSimilarMovies(movieId);
                setSimilarMovies(similarMoviesData.results);

                const trailerData = await fetchMovieTrailer(movieId);
                setTrailer(trailerData.results);
            } catch (error) {
                setError('Erreur dans la récupération des données');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [movieId]);

    return { credits, similarMovies, trailer, loading, error, updateCredits, updateSimilarMovies, getTrailers };
};

const MovieDetails = ({ movie, onClose }) => {
    const [movieDetails, setMovieDetails] = useState(movie);
    const { credits, similarMovies, trailer, loading, error, updateCredits, updateSimilarMovies, getTrailers } = useMovieData(movie.id);

    const handleMovieClick = useCallback(async (similarMovie) => {
        try {
            const data = await fetchMovieDetails(similarMovie.id);
            setMovieDetails(data);

            // Update credits, similar movies, and trailers based on the clicked similar movie
            await updateCredits(similarMovie.id);
            await updateSimilarMovies(similarMovie.id);
            await getTrailers(similarMovie.id);
        } catch (error) {
            console.error('Erreur dans la récupération des détails:', error);
        }
    }, [setMovieDetails, updateCredits, updateSimilarMovies, getTrailers]);

    return (
        <div className="fixed inset-0 z-50 h-screen flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-white text-black rounded-lg overflow-scroll noscrollbar h-[98%] w-11/12 md:w-3/4 lg:w-2/3">
                <div className="relative">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                        alt={movieDetails.title}
                        className="w-full h-[400px] object-cover"
                    />
                    <button
                        className="absolute top-4 right-4 bg-green-400 text-white rounded-full w-10 h-10 flex items-center justify-center"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <div className="pt-6 pl-6 space-y-2 h-[fit] flex flex-col items-start text-[17px]">
                    <h2 className="text-2xl font-bold">{movieDetails.title}</h2>
                    <p><strong>Date de sortie:</strong> {movieDetails.release_date}</p>
                    <p><strong>Note:</strong> {Math.round((movieDetails.vote_average) * 100) / 100} / 10</p>
                    <p className="text-start"><strong>Genres:</strong> {movieDetails.genres?.map(genre => genre.name).join(', ')}</p>
                    <p className="text-justify pr-4"><strong>Synopsis: </strong> {movieDetails.overview}</p>
                </div>
                {loading ? (
                    <div className="p-2">Chargement...</div>
                ) : error ? (
                    <div className="p-2 text-red-500">{error}</div>
                ) : (
                    <>
                        {trailer.length > 0 && (
                            <div className="mt-8 md:mt-8 w-full">
                                <h3 className="text-xl font-bold pb-4 text-start pl-6">Bande annonce</h3>
                                <div className="flex flex-col items-center">
                                    {trailer.slice(0, 1).map(video => (
                                        <div key={video.id} className="w-full md:w-[75%] lg:w-[50%] mx-auto mb-4">
                                            <iframe
                                                width="100%"
                                                height="315" // Adjusted height for better mobile view
                                                src={`https://www.youtube.com/embed/${video.key}`}
                                                title={video.name}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                            <p className="text-center text-truncate mt-2 p-2">{video.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {credits && (
                            <div className="space-y-4 pl-6 pr-6 mt-8">
                                <h3 className="text-xl font-bold text-start">Credits</h3>
                                <ul className="flex md:flex-row flex-wrap justify-center w-[100%] space-x-5 md:space-x-3">
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
                                                <p className="text-sm text-gray-600 line-clamp-3 pb-2">{actor.character}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {similarMovies.length > 0 && (
                            <div className="mt-16">
                                <h3 className="text-xl font-bold pb-6 -mt-8 text-start pl-6">Films similaires</h3>
                                <ul className="flex flex-wrap justify-center w-[100%] pb-4">
                                    {similarMovies.slice(0, 16).map(similarMovie => (
                                        <li key={similarMovie.id} className="flex flex-wrap justify-center items-center w-32 h-38 pb-2">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                                                alt={similarMovie.title}
                                                className="w-[100px] h-[150px] object-cover rounded-xl cursor-pointer"
                                                onClick={() => handleMovieClick(similarMovie)}
                                                aria-label={similarMovie.title}
                                            />
                                            <p className="w-28  text-center text truncate">{similarMovie.title}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
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
