import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTopRatedMovies } from '../utils/moviedb';
import { FaStar } from "react-icons/fa";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";

export default function TopratedMovies() {

    const [toprated, setToprated] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();


    const getTopratedMovies = async () => {
        const data = await fetchTopRatedMovies(page);
        setToprated(data.results);
        setTotalPages(data.total_pages);
        setIndex(0);
        console.log(data)
    }
    function nextPage() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        getTopratedMovies(page);
    }, [page])


    return (
        <section className="w-screen h-fit text-white text-justify flex space-x-4">
            <img src={"https://image.tmdb.org/t/p/original" + toprated[index]?.backdrop_path} alt={toprated[index]?.title} className="hidden md:z-10 md:block h-[770px] mt-6 rounded-r-2xl" />
            <div className="absolute z-20 md:bottom-[10%]  md:left-[6%] w-[90%] text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                <div className="bg-zinc-800 rounded-xl bg-opacity-70 shadow-3xl flex items-center md:w-[60%] md:h-[250px]">
                    <div className="w-[35%] space-y-4 text-center flex-col ml-3 ">
                        <h1 className="font-bold text-green-500 md:text-4xl text-lg line-clamp-3">{toprated[index]?.title}</h1>
                        <p className="text-lg">{toprated[index]?.release_date}</p>
                        <div className="flex items-center space-x-1 justify-center">
                            <FaStar size={20} color='yellow' />
                            <p className="text-lg">{Math.round((toprated[index]?.vote_average) * 100) / 100} / 10</p>
                        </div>

                    </div>
                    <div className="w-[55%] h-[90%] ml-12 ">
                        <p>Synopsis:</p>
                        <p className="md:text-lg md:line-clamp-4 pt-2">{toprated[index]?.overview}</p>
                        <button className=" bg-white text-black md:text-lg text-s  md:w-[8rem] rounded-lg mt-6 p-2 ">
                            Voir plus
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute flex justify-center gap-[2.2rem] right-[6.5%] bottom-[3%] z-20 ">
                {page > 1 ? (
                    <button
                        onClick={previousPage}
                        className="cursor-pointe"
                    >
                        <IoMdArrowDropleftCircle size={40} />
                    </button>
                ) : null}
                <div className="text-white flex items-center">
                    Page {page} sur {totalPages}
                </div>
                <button
                    onClick={nextPage}
                    className="cursor-pointer "
                    disabled={page >= totalPages}
                >
                    <IoMdArrowDroprightCircle size={40} />
                </button>

            </div>
            <div className="absolute z-20 h-[880px] w-[26%] right-[1%] py-4 top-[8%] bg-zinc-700 rounded-2xl">
                <div >
                    <ul className="flex flex-wrap w-[100%] justify-center md:gap-2 ">
                        {
                            toprated.map((data, index) => (
                                <li
                                    key={data.id}
                                    className="w-fit flex-col flex-wrap text-center list-none">
                                    <img className="rounded-lg h-[140px] w-[100px]" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                        onClick={() => { setIndex(index) }}
                                    />{index + 1}
                                </li>
                            ))
                        }
                    </ul>

                </div>

            </div>

        </section>
    );
}
