import React, { useEffect, useState } from "react";
import { fetchMoviesByGenre, fetchMovieDetails } from "../utils/moviedb";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import MovieDetails from "./MovieDetails";

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
        <section className="absolute w-[82%] h-[820px] bg-zinc-900 mt-12 ml-[15%] overflow-scroll">
            {loading && <div className="text-white text-center">Chargement...</div>}
            {error && <div className="text-red-500 text-center">{error}</div>}
            {!loading && !error && (
                <>
                    <div className="flex flex-wrap justify-center">
                        {moviesFiltered.map((data) => (
                            <div key={data.id} className="w-[270px] pb-2">
                                <img
                                    className="rounded-xl w-[250px] h-[350px] cursor-pointer"
                                    src={"https://image.tmdb.org/t/p/w500" + data.poster_path}
                                    alt={data.title}
                                    onClick={() => handleMovieClick(data)}
                                />
                                <h2 className="text-center text-white text-lg md:text-s py-1 m-1 rounded-md">{data.title}</h2>
                            </div>
                        ))}
                    </div>
                    <div className="text-white w-[100%] flex justify-center mb-4">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={20}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"flex justify-center mt-4"}
                            pageClassName={"mx-1"}
                            pageLinkClassName={"px-3 py-1 bg-zinc-800 text-white hover:bg-green-400"}
                            previousClassName={"mx-1"}
                            previousLinkClassName={"px-3 py-1 bg-zinc-800 text-white hover:bg-green-400"}
                            nextClassName={"mx-1"}
                            nextLinkClassName={"px-3 py-1 bg-zinc-800 text-white hover:bg-green-400"}
                            breakClassName={"mx-1"}
                            breakLinkClassName={"px-3 py-1 bg-zinc-800 text-white"}
                            activeClassName={"bg-green-400"}
                            activeLinkClassName={"text-green-400 active:bg-green-400 focus:outline-none focus:ring focus:ring-green-400"}
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