import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MovieDetails from "./MovieDetails";
import { fetchMoviesByGenre, fetchMovieDetails } from "../utils/moviedb";

const MOVIES_PER_PAGE = 20;

export default function MoviesFiltered({ activeFilter = {}, page, setPage }) {
    const [moviesFiltered, setMoviesFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const moviesListRef = useRef(null);

    useEffect(() => {
        const fetchMovies = async (page) => {
            setPage(page);
            setLoading(true);
            setError(null);

            try {
                let accumulatedMovies = [];
                let currentPage = page;

                while (accumulatedMovies.length < MOVIES_PER_PAGE) {
                    const data = await fetchMoviesByGenre(currentPage);
                    if (!data || data.results.length === 0) {
                        break;
                    }

                    const filteredMovies = data.results.filter((movie) =>
                        activeFilter?.id ? movie.genre_ids.includes(activeFilter.id) : true
                    );

                    accumulatedMovies = [...accumulatedMovies, ...filteredMovies];

                    if (filteredMovies.length < MOVIES_PER_PAGE) {
                        currentPage++;
                    } else {
                        break;
                    }
                }

                setMoviesFiltered(accumulatedMovies.slice(0, MOVIES_PER_PAGE));
            } catch (error) {
                console.error("Erreur dans la récupération des films:", error);
                setError("Une erreur s'est produite dans la récupération des films. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies(page);
    }, [activeFilter, page]);

    const handleMovieClick = async (movie) => {
        try {
            const data = await fetchMovieDetails(movie.id);
            setSelectedMovie(data);
            setShowDetails(true);
        } catch (error) {
            console.error("Erreur dans la récupération des détails du film:", error);
        }
    };

    const scrollToTop = () => {
        if (moviesListRef.current) {
            moviesListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const loadNextPage = () => {
        setPage(page + 1);
        setMoviesFiltered([]);
        scrollToTop();
    };

    return (
        <section className="w-screen bg-zinc-900 overflow-auto">
            {loading && <div className="text-white text-center md:mt-20 mt-[70%]">Chargement...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {!loading && !error && (
                <>
                    {activeFilter?.name && (
                        <div className="text-white text-center flex md:text-2xl text-lg absolute md:mt-20 md:left-20 mt-[60%] left-4 cursor-pointer">
                            Catégorie:<p className="text-green-500 pl-2">{activeFilter.name}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:m-20 md:mt-36 m-4 mt-[70%]">
                        {moviesFiltered.map((movie) => (
                            <div
                                key={movie.id}
                                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg bg-zinc-800"
                                onClick={() => handleMovieClick(movie)}
                            >
                                <img
                                    className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "../src/assets/img_not_available.png";
                                    }}
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <h2 className="text-lg md:text-xl font-bold text-white">{movie.title}</h2>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className="rounded-full bg-green-500 text-white text-xs md:text-sm flex items-center justify-center w-10 h-10">
                                            {Math.round(movie.vote_average * 10) / 10 || "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8 md:mt-14">
                        <button
                            className="bg-green-500 text-white font-bold md:text-lg p-2 md:p-3 w-40 md:w-56 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={loadNextPage}
                        >
                            Films suivants
                        </button>
                    </div>
                </>
            )}
            {showDetails && (
                <MovieDetails
                    movie={selectedMovie}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </section>
    );
}

MoviesFiltered.propTypes = {
    activeFilter: PropTypes.object,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
};
