import React, { useEffect, useState } from "react";
import { fetchMoviesByGenre, fetchMovieDetails } from "../utils/moviedb";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import MovieDetails from "./MovieDetails";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

export default function MoviesFiltered({ activeFilter = {} }) {
    const [page, setPage] = useState(0);
    const [moviesFiltered, setMoviesFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const MOVIES_COUNT = 20;

    useEffect(() => {
        const getMoviesFiltered = async (page) => {
            setLoading(true);
            setError(null);
            try {
                let allMovies = [];
                let currentPage = page + 1;

                while (allMovies.length < MOVIES_COUNT) {
                    let data = await fetchMoviesByGenre(currentPage);

                    if (data && data.results) {
                        let filteredMovies = data.results.filter((movie) =>
                            movie.genre_ids.includes(activeFilter.id)
                        );
                        filteredMovies = filteredMovies.filter(
                            (movie) => !allMovies.some((m) => m.id === movie.id)
                        );

                        const remainingMovies = MOVIES_COUNT - allMovies.length;
                        if (filteredMovies.length > remainingMovies) {
                            filteredMovies = filteredMovies.slice(0, remainingMovies);
                        }

                        allMovies = [...allMovies, ...filteredMovies];

                        if (filteredMovies.length === 0 || allMovies.length >= MOVIES_COUNT) {
                            break;
                        }
                    }
                    currentPage++;
                }

                setMoviesFiltered(allMovies.slice(0, MOVIES_COUNT));
            } catch (error) {
                console.error("Erreur dans la récupération des films:", error);
                setError("Une erreur s'est produite dans la récupération des films. Essayez de nouveau.");
            } finally {
                setLoading(false);
            }
        };

        if (activeFilter && activeFilter.id) {
            setMoviesFiltered([]);
            getMoviesFiltered(page);
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
        <section className="absolute md:w-[82%] w-full md:h-[820px] bg-zinc-900 md:mt-12 mt-60 md:ml-[15%] overflow-scroll">
            {loading && <div className="text-white text-center">Chargement...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {!loading && !error && (
                <>
                    <div className="flex flex-wrap justify-center">
                        {moviesFiltered.map(movie => (
                            <div key={movie.id} className="md:w-[400px] w-[180px] pb-2 pl-1" onClick={() => handleMovieClick(movie)}>
                                <div className="relative">
                                    <img
                                        className="rounded-xl md:w-[380px] md:h-[560px] w-[170px] h-[250px] cursor-pointer transform transition duration-300 hover:scale-105"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <div className="absolute top-0 left-0 md:w-[380px] w-[170px] h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-xl">
                                        <h2 className="text-white text-lg md:text-xl text-center w-[80%] cursor-pointer">
                                            {movie.title}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-white w-[100%] flex justify-center mb-4">
                        <ReactPaginate
                            previousLabel={<IoMdArrowDropleftCircle />}
                            nextLabel={<IoMdArrowDroprightCircle />}
                            breakLabel={"..."}
                            pageCount={20} // Replace with actual pageCount
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName="flex justify-center items-center mt-4 md:mt-8 mb-4"
                            pageClassName="mx-1"
                            pageLinkClassName="bg-zinc-800 px-3 py-1 rounded-lg hover:bg-green-500"
                            previousClassName="mx-1"
                            previousLinkClassName="px-3 py-1 rounded-lg hover:bg-green-500"
                            nextClassName="mx-1"
                            nextLinkClassName="px-3 py-1 rounded-lg hover:bg-green-500"
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