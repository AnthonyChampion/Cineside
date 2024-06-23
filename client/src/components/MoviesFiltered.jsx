import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import MovieDetails from "./MovieDetails";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { fetchMoviesByGenre, fetchMovieDetails } from "../utils/moviedb";

export default function MoviesFiltered({ activeFilter = {} }) {
    const [page, setPage] = useState(0);
    const [moviesFiltered, setMoviesFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const MOVIES_COUNT = 20;

    useEffect(() => {
        const getMoviesFiltered = async (currentPage) => {
            setLoading(true);
            setError(null);

            try {
                let allMovies = [];

                while (allMovies.length < MOVIES_COUNT) {
                    const data = await fetchMoviesByGenre(currentPage);

                    if (!data || !data.results) break;

                    const filteredMovies = data.results
                        .filter((movie) => movie.genre_ids.includes(activeFilter?.id))
                        .filter((movie) => !allMovies.some((m) => m.id === movie.id));

                    const remainingMovies = MOVIES_COUNT - allMovies.length;
                    const slicedMovies = filteredMovies.slice(0, remainingMovies);

                    allMovies = [...allMovies, ...slicedMovies];

                    if (slicedMovies.length === 0 || allMovies.length >= MOVIES_COUNT) break;

                    currentPage++;
                }

                setMoviesFiltered(allMovies.slice(0, MOVIES_COUNT));
            } catch (error) {
                console.error("Erreur dans la récupération des films:", error);
                setError("Une erreur est survenue dans la récupération des films. Essayez de nouveau.");
            } finally {
                setLoading(false);
            }
        };

        if (activeFilter?.id) {
            setMoviesFiltered([]);
            getMoviesFiltered(page + 1);
        }
    }, [activeFilter, page]);

    const handlePageClick = (data) => {
        setPage(data.selected);
    };

    const handleMovieClick = async (movie) => {
        try {
            const data = await fetchMovieDetails(movie.id);
            setSelectedMovie(data);
            setShowDetails(true);
        } catch (error) {
            console.error('Erreur dans la récupération des détails:', error);
        }
    };

    return (
        <section className="w-screen bg-zinc-900 overflow-auto">
            {loading && <div className="text-white text-center">Chargement...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {!loading && !error && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:m-20 m-4 mt-[60%]">
                        {moviesFiltered.map(movie => (
                            <div
                                key={movie.id}
                                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg bg-zinc-800"
                                onClick={() => handleMovieClick(movie)}
                            >
                                <img
                                    className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
                                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
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
                                            {Math.round(movie.vote_average * 10) / 10 || "Note à venir"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-white w-full flex justify-center mb-4">
                        <ReactPaginate
                            previousLabel={<IoMdArrowDropleftCircle size={30} />}
                            nextLabel={<IoMdArrowDroprightCircle size={30} />}
                            breakLabel={"..."}
                            pageCount={20}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName="flex justify-center items-center mt-4 md:mt-8 mb-4"
                            pageClassName="mx-1"
                            pageLinkClassName="bg-zinc-800 px-3 py-1 rounded-lg hover:bg-green-500"
                            previousClassName="mx-1"
                            previousLinkClassName="rounded-lg hover:bg-green-500"
                            nextClassName="mx-1"
                            nextLinkClassName="rounded-lg hover:bg-green-500"
                            breakClassName="mx-1"
                            breakLinkClassName="px-3 py-1 bg-zinc-800 px-3 py-1 rounded-lg"
                            activeClassName="active"
                            activeLinkClassName="bg-green-500 px-3 py-1 rounded-lg"
                        />
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
};
