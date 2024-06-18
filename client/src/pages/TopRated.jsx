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
        const data = await fetchTopRatedMovies(page);
        setToprated(data.results);
        setTotalPages(data.total_pages);
        setIndex(0);
    };

    useEffect(() => {
        getTopratedMovies(page);
    }, [page]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    const handleVoirPlusClick = async (movie) => {
        try {
            const data = await fetchMovieDetails(movie.id);
            setSelectedMovie(data);
            setShowDetails(true);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    return (
        <section className="w-screen h-fit text-white text-justify flex space-x-4">
            <img src={"https://image.tmdb.org/t/p/original" + toprated[index]?.backdrop_path} alt={toprated[index]?.title} className="hidden md:z-10 md:block h-[770px] mt-6 rounded-r-2xl" />
            <div className="absolute z-20 md:bottom-[10%] md:left-[6%] w-[90%] text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                <div className="bg-zinc-800 rounded-xl bg-opacity-70 shadow-3xl flex items-center md:w-[60%] md:h-[250px]">
                    <div className="w-[35%] space-y-4 text-center flex-col ml-3">
                        <h1 className="font-bold text-green-500 md:text-4xl text-lg line-clamp-3">{toprated[index]?.title}</h1>
                        <p className="text-lg">{toprated[index]?.release_date}</p>
                        <div className="flex items-center space-x-1 justify-center">
                            <FaStar size={20} color="yellow" />
                            <p className="text-lg">{Math.round((toprated[index]?.vote_average) * 100) / 100} / 10</p>
                        </div>
                    </div>
                    <div className="w-[55%] h-[90%] ml-12">
                        <p>Synopsis:</p>
                        <p className="md:text-lg md:line-clamp-4 pt-2">{toprated[index]?.overview}</p>
                        <button
                            className="bg-white text-black md:text-lg text-s md:w-[8rem] rounded-lg mt-6 p-2"
                            onClick={() => handleVoirPlusClick(toprated[index])}
                        >
                            Voir plus
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute z-20 h-[880px] w-[26%] right-[1%] py-4 top-[8%] bg-zinc-700 rounded-2xl">
                <div>
                    <ul className="flex flex-wrap w-[100%] justify-center md:gap-2">
                        {toprated.map((data, index) => (
                            <li key={data.id} className="w-fit flex-col flex-wrap text-center list-none">
                                <img
                                    className="rounded-lg h-[140px] w-[100px]"
                                    src={"https://image.tmdb.org/t/p/w500" + data?.poster_path}
                                    alt={data?.title}
                                    onClick={() => { setIndex(index) }}
                                />
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="absolute text-white w-[20%] flex justify-center z-30 bottom-[1.5%] right-[4%]">
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
                    pageLinkClassName={"px-3 py-1 bg-zinc-800 text-white hover:bg-green-400"}
                    previousClassName={"mx-1"}
                    previousLinkClassName={"px-3 py-1 text-white"}
                    nextClassName={"mx-1"}
                    nextLinkClassName={"px-3 text-white"}
                    breakClassName={"mx-1"}
                    breakLinkClassName={"px-3 py-1 bg-zinc-800 text-white"}
                    activeClassName={"bg-green-400"}
                    activeLinkClassName={"text-white text-green-400 active:bg-green-400 focus:outline-none focus:ring focus:ring-green-400"}
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
