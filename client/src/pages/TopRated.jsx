import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTopRatedMovies } from '../utils/moviedb';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

export default function TopratedMovies() {

    const [toprated, setToprated] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const getTopratedMovies = async () => {
        const data = await fetchTopRatedMovies(page);
        setToprated(data.results);
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
            <div className="hidden md:block md:w-[73vw] md:h-[74.7vh] overflow-hidden mt-6 rounded-r-2xl">
                {
                    toprated.map((data) => (
                        <div className="relative inset-0" key={data.id}>
                            <img src={"https://image.tmdb.org/t/p/original" + data?.backdrop_path} alt={data?.title} className="hidden md:z-10 md:block h-[790px] object-cover" />
                            <img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="md:hidden w-screen h-screen" />
                            <div className="absolute md:top-[20%] md:w-[25%] md:h-fit flex-col pl-4 pr-4 space-y-3 md:left-[7%] bg-zinc-800 rounded-xl bg-opacity-70 border border-zinc-800 text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                                <h1 className="font-bold md:text-5xl text-lg md:pt-4 md:pb-4 pt-2">{data?.title}</h1>
                                <p className="md:text-lg text-zinc-400">{data?.release_date}</p>
                                <p className="text-s pb-2">{Math.round((data?.vote_average) * 100) / 100} / 10</p>
                                <p className="text-lg">Synopsis:</p>
                                <p className="md:text-lg md:line-clamp-4">{data?.overview}</p>
                                <div>
                                    <button className="md:block bg-white text-black md:text-lg text-s w-[fit] md:w-[8rem] md:p-3 p-2 rounded-lg mt-4 md:mb-4 mb-2">
                                        Voir plus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className="h-[83%] overflow-y-scroll no-scrollbar w-[25%] mt-6 py-4 bg-zinc-700 rounded-2xl">
                <h2 className="text-2xl text-center font-bold text-zinc-400">Films les mieux notés</h2>
                <div className="flex flex-wrap w-[100%] justify-center md:gap-6 py-6 ">
                    {
                        toprated.map((data) => (
                            <div
                                key={data.id}
                                className="w-[100%] flex">
                                <img className="rounded-lg h-[220px] w-[160px] ml-4" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                    onClick={() => { navigate("/movie/" + data.id) }} />

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
            <div className="absolute flex justify-center gap-40 right-[7%] bottom-[9%]">
                <HiOutlineChevronLeft className="size-12 cursor-pointer" onClick={previousPage} />
                <HiOutlineChevronRight className="size-12 cursor-pointer" onClick={nextPage} />
            </div>
        </section>
    );
}




{/* <section className="w-screen text-white text-justify">
            <div className="hidden md:block md:w-[100vw] md:h-[100vh] overflow-hidden -mt-[6vh]">
                {
                    toprated.map((data) => (
                        <div className="relative inset-0" key={data.id}>
                            <img src={"https://image.tmdb.org/t/p/original" + data?.backdrop_path} alt={data?.title} className="hidden md:z-10 md:block md:w-screen md:h-screen object-contain" />
                            <img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="md:hidden w-screen h-screen" />
                            <div className="absolute md:top-[20%] md:w-[30%] md:h-fit flex-col pl-4 pr-4 md:left-[10%] bg-zinc-800 rounded-xl bg-opacity-70 border border-zinc-800 text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                                <h1 className="font-bold md:text-5xl text-lg md:pt-4 md:pb-4 pt-2">{data?.title}</h1>
                                <h2 className="md:text-2xl md:pb-4">Genres</h2>
                                <p className="md:text-xl md:pb-4">Année de sortie</p>
                                <p className="md:text-lg md:line-clamp-4">{data?.overview}</p>
                                <div>
                                    <button className="md:block bg-white text-black md:text-lg text-s w-[fit] md:w-[8rem] md:p-3 p-2 rounded-lg mt-4 md:mb-4 mb-2">
                                        Voir plus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* <h2 className="absolute top-[11%] left-[5%] text-3xl font-bold text-white">Top classement TMDb</h2> */}
