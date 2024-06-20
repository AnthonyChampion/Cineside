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
                <img src={"https://image.tmdb.org/t/p/original" + toprated[index]?.backdrop_path} alt={toprated[index]?.title} className="w-full h-[400px] md:h-[680px] object-cover rounded-b-2xl -mt-14" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-2xl"></div>
                <div className="absolute bottom-8 left-8 text-white w-[90%] md:w-[50%] bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
                    <h1 className="font-bold text-green-500 text-2xl md:text-4xl">{toprated[index]?.title}</h1>
                    <p className="text-lg">{toprated[index]?.release_date}</p>
                    <div className="flex items-center space-x-1 my-2">
                        <FaStar size={20} color="yellow" />
                        <p className="text-lg">{Math.round((toprated[index]?.vote_average) * 100) / 100} / 10</p>
                    </div>
                    <p className="text-sm md:text-lg mb-4 line-clamp-3 md:line-clamp-4 text-justify">{toprated[index]?.overview}</p>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleMovieClick(toprated[index])}
                    >
                        Voir plus
                    </button>
                </div>
            </div>
            <div className="w-full px-4 mt-6 md:mt-10">
                <ul className="flex flex-wrap justify-center gap-4">
                    {toprated.map((movie, idx) => (
                        <li key={movie.id} className="w-24 md:w-32" onClick={() => setIndex(idx)}>
                            <img
                                className={`cursor-pointer rounded-lg transition-transform transform hover:scale-105 ${index === idx && "border-4 border-green-500"}`}
                                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                                alt={movie.title}
                            />
                            <p className="text-center mt-2">{idx + 1}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full flex justify-center mt-8">
                <ReactPaginate
                    previousLabel={<IoMdArrowDropleftCircle size={30} />}
                    nextLabel={<IoMdArrowDroprightCircle size={30} />}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"flex justify-center items-center mt-4"}
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
