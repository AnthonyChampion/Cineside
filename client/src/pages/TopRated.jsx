import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTopRatedMovies } from '../utils/moviedb';
import { FaStar } from "react-icons/fa";

export default function TopratedMovies() {

    const [toprated, setToprated] = useState([]);
    const [page, setPage] = useState(1);
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();


    const getTopratedMovies = async () => {
        const data = await fetchTopRatedMovies(page);
        setToprated(data.results);
        setIndex(0);
    }
    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        setPage(page - 1);
    }

    useEffect(() => {
        getTopratedMovies(page);
    }, [page])


    return (
        <section className="w-screen h-fit text-white text-justify flex space-x-4">
            <img src={"https://image.tmdb.org/t/p/original" + toprated[index]?.backdrop_path} alt={toprated[index]?.title} className="hidden md:z-10 md:block h-[750px] mt-6 rounded-r-2xl" />
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
            <div className="absolute flex justify-center gap-[4rem] right-[1%] bottom-[2%] z-20">
                <button className="cursor-pointer p-4 w-[14rem] bg-zinc-800 rounded-xl font-semibold" onClick={previousPage}>
                    Page précédente
                </button>
                <button className=" cursor-pointer p-4 w-[14rem] bg-zinc-800 rounded-xl font-semibold" onClick={nextPage}>
                    Page suivante
                </button>

            </div>
            <div className="absolute z-20 h-[880px] w-[27%] right-[1%] py-4 top-[8%] bg-zinc-700 rounded-2xl">
                <div className="flex flex-wrap w-[100%] justify-center md:gap-6 ">
                    {
                        toprated.map((data, index) => (
                            <div
                                key={data.id}
                                className="w-fit flex flex-wrap">
                                <img className="rounded-lg h-[150px] w-[100px]" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                    onClick={() => { setIndex(index) }}
                                />
                            </div>
                        ))
                    }
                </div>

            </div>

        </section>
    );
}
