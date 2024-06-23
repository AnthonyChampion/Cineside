import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies, fetchMovieDetails } from '../utils/moviedb';
import { FaStar } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import MovieDetails from '../components/MovieDetails';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io';

export default function TopratedMovies() {
    const [toprated, setToprated] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [index, setIndex] = useState(0);
    const [selectMovie, setSelectedMovie] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const getTopratedMovies = async (page) => {
        try {
            const data = await fetchTopRatedMovies(page);
            setToprated(data.results);
            setTotalPages(data.total_pages);
            setIndex(0);
        } catch (error) {
            console.error('Erreur dans la récupération des films:', error);
        }
    };

    useEffect(() => {
        getTopratedMovies(page);
    }, [page]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
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
        <section className="w-screen h-fit text-white flex flex-col items-center md:mt-16 mt-10 bg-zinc-900">
            {toprated[index] && (
                <div className="relative w-full overflow-hidden md:-mt-24 -mt-12">
                    <img
                        src={"https://image.tmdb.org/t/p/original" + (toprated[index]?.backdrop_path)}
                        alt={toprated[index]?.title || "Image de film"}
                        className="w-full h-[300px] md:h-[680px] object-cover brightness-70"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "../src/assets/img_not_available.png";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                    <div className="absolute -bottom-6 md:bottom-8 md:left-14 left-5 text-white w-[90%] md:w-[35%] bg-zinc-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
                        <h1 className="font-bold text-green-500 text-xl md:text-4xl text-start">
                            {toprated[index]?.title || "Titre non disponible"}
                        </h1>
                        <p className="md:text-lg text-start">
                            {toprated[index]?.release_date || "Date de sortie inconnue"}
                        </p>
                        <div className="flex items-center space-x-1 my-2 justify-between">
                            <div className="flex items-center space-x-1">
                                <FaStar size={20} color="yellow" />
                                <p className="md:text-lg">
                                    {toprated[index]?.vote_average ? Math.round(toprated[index]?.vote_average * 100) / 100 : "-"} / 10
                                </p>
                            </div>
                            <button
                                className=" bg-green-500 text-white font-bold md:text-lg p-2 md:p-3 rounded-lg mt-2 md:mt-4 hover:bg-green-600 transition duration-300"
                                onClick={() => handleMovieClick(toprated[index])}
                            >
                                Voir détails
                            </button>
                        </div>
                        <p className="hidden md:visible text-sm md:text-lg mb-4 md:line-clamp-4 text-justify">
                            {toprated[index]?.overview || "Aucune description disponible"}
                        </p>
                    </div>
                </div>
            )}
            <div className="container mx-auto md:py-16 py-8 px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {toprated.map((movie, idx) => (
                        <div
                            key={movie.id}
                            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg bg-zinc-800"
                            onClick={() => setIndex(idx)}
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
                                    <FaStar size={20} color="yellow" />
                                    <p className="text-sm md:text-lg text-white">{Math.round(movie.vote_average * 100) / 100} / 10</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-center mt-8 md:mt-14">
                <ReactPaginate
                    previousLabel={<IoMdArrowDropleftCircle size={30} />}
                    nextLabel={<IoMdArrowDroprightCircle size={30} />}
                    breakLabel={"..."}
                    pageCount={20}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"flex justify-center items-center mt-4 mb-8"}
                    pageClassName={"mx-1"}
                    pageLinkClassName={"bg-zinc-800 px-3 py-1 rounded-lg hover:bg-green-500"}
                    previousClassName={"mx-1"}
                    previousLinkClassName={"rounded-lg hover:bg-green-500"}
                    nextClassName={"mx-1"}
                    nextLinkClassName={"rounded-lg hover:bg-green-500"}
                    breakClassName={"mx-1"}
                    breakLinkClassName={"px-3 py-1 bg-zinc-800 rounded-lg"}
                    activeClassName={"active"}
                    activeLinkClassName={"bg-green-500 px-3 py-1 rounded-lg"}
                />
            </div>
            {showDetails && (
                <MovieDetails
                    movie={selectMovie}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </section>
    );
}
