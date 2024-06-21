import React, { useEffect, useState } from 'react';
import { fetchTopRatedMovies, fetchMovieDetails } from '../utils/moviedb';
import { FaStar } from 'react-icons/fa';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import MovieDetails from '../components/MovieDetails';

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
        <section className="w-screen h-fit text-white flex flex-col items-center">
            <div className="relative w-full">
                <img src={"https://image.tmdb.org/t/p/original" + toprated[index]?.backdrop_path} alt={toprated[index]?.title} className="w-full h-[400px] md:h-[680px] object-cover -mt-14" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                <div className="absolute -bottom-6 md:bottom-8 md:left-14 left-5 text-white w-[90%] md:w-[35%] bg-zinc-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
                    <h1 className="font-bold text-green-500 text-xl md:text-4xl text-start">{toprated[index]?.title}</h1>
                    <p className="md:text-lg text-start">{toprated[index]?.release_date}</p>
                    <div className="flex items-center space-x-1 my-2">
                        <FaStar size={20} color="yellow" />
                        <p className="md:text-lg">{Math.round((toprated[index]?.vote_average) * 100) / 100} / 10</p>
                    </div>
                    <p className="text-sm md:text-lg mb-4 line-clamp-2 md:line-clamp-4 text-justify">{toprated[index]?.overview}</p>
                    <button
                        className="absolute md:top-20 top-16 md:right-4 right-6  bg-green-500 hover:bg-green-700 text-white text-sm md:text-lg font-bold py-2 px-4 rounded"
                        onClick={() => handleMovieClick(toprated[index])}
                    >
                        Voir détails
                    </button>
                </div>
            </div>
            <div className="w-full mt-6 md:mt-10">
                <ul className="flex flex-wrap justify-center">
                    {toprated.map((movie, idx) => (
                        <div key={movie.id} className="md:w-[390px] md:h-[570px] w-[180px] pb-2" onClick={() => setIndex(idx)}>
                            <div className="relative">
                                <img
                                    className="rounded-xl md:w-[370px] md:h-[560px] w-[170px] h-[250px] cursor-pointer transform transition duration-300 hover:scale-105"
                                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                                    alt={movie.title}

                                />
                                <div className="absolute top-0 left-0 md:w-[370px] w-[170px] h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-xl">
                                    <h2 className="text-white text-lg md:text-xl text-center w-[80%] cursor-pointer"
                                    >{movie.title}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="w-full flex justify-center md:mt-4">
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"flex justify-center items-center mt-4 mb-8"}
                    pageClassName={"mx-1"}
                    pageLinkClassName={"bg-zinc-800  px-3 py-1 rounded-lg hover:bg-green-500"}
                    previousClassName={"mx-1"}
                    previousLinkClassName={"px-3 py-1 rounded-lg hover:bg-green-500"}
                    nextClassName={"mx-1"}
                    nextLinkClassName={"px-3 py-1 rounded-lg hover:bg-green-500"}
                    breakClassName={"mx-1"}
                    breakLinkClassName={"px-3 py-1 bg-zinc-800  px-3 py-1 rounded-lg"}
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
