import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTopRatedMovies } from '../utils/moviedb';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

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
        <section className="w-screen h-[90vh] text-white text-justify flex space-x-4">
            <img src={"https://image.tmdb.org/t/p/original" + toprated[index]?.backdrop_path} alt={toprated[index]?.title} className="hidden md:z-10 md:block h-[800px] mt-6 rounded-r-2xl object-cover" />
            <div className="absolute flex justify-center gap-[3.5rem] right-[1%] top-[8%]">
                <button className="cursor-pointer p-4 w-[12rem] bg-zinc-800 shadow-3xl rounded-xl font-semibold" onClick={previousPage}>
                    Page précédente
                </button>
                <button className=" cursor-pointer p-4 w-[12rem] bg-zinc-800 shadow-3xl rounded-xl font-semibold" onClick={nextPage}>
                    Page suivante
                </button>
            </div>
            <div className="h-[800px] overflow-y-scroll no-scrollbar w-[23%] mt-[5%] py-4 bg-zinc-700 rounded-2xl">
                <h2 className="text-2xl text-center font-bold text-zinc-400">Films les mieux notés</h2>
                <div className="flex flex-wrap w-[100%] justify-center md:gap-6 py-6 ">
                    {
                        toprated.map((data, index) => (
                            <div
                                key={data.id}
                                className="w-[100%] flex">
                                <img className="rounded-lg h-[220px] w-[160px] ml-4" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                    onClick={() => { setIndex(index) }}
                                />
                                <div className="w-[70%] flex flex-col pl-4 pr-4 pt-2 space-y-2">
                                    <h2 className="w-[90%] text-xl truncate ..">{data?.title}</h2>
                                    <p className="text-s text-zinc-400">{data?.release_date}</p>
                                    <p className="text-s">{Math.round((data?.vote_average) * 100) / 100} / 10</p>
                                    <p className="w-[90%] md:text-s md:line-clamp-4 pt-2">{data?.overview}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>

        </section>
    );
}
