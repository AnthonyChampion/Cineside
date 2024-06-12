// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../utils/moviedb';
import { register } from 'swiper/element/bundle';

import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";

register();



export default function HomePage() {

    const [trending, setTrending] = useState([]);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        setTrending(data.results);
    }

    useEffect(() => {
        getTrendingMovies();
    }, []);

    return (
        <section className="w-screen text-white text-justify">
            <div className="w-[100vw] h-[100vh] md:overflow-hidden -mt-[6vh]">
                {
                    trending.map((data) => (
                        <div className="relative inset-0" key={data.id}>
                            <img src={"https://image.tmdb.org/t/p/original" + data?.backdrop_path} alt={data?.title} className="hidden md:z-10 md:block md:w-screen md:h-screen md:cover first:w-[380]" />
                            <img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="md:hidden w-screen h-screen" />
                            <div className="absolute md:top-[20%] top-[40%] md:w-[30%] w-[80%] md:h-fit flex-col pl-4 pr-4 left-[10%] bg-zinc-800 rounded-xl bg-opacity-70 border border-zinc-800 text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                                <h1 className="font-bold md:text-[3rem] text-[2rem] tracking-wildest">{data?.title}</h1>
                                <h2 className="md:text-2xl md:pb-4">Genres</h2>
                                <p className="md:text-xl md:pb-4">Année de sortie</p>
                                <p className="md:text-lg line-clamp-4">{data?.overview}</p>
                                <div>
                                    <button className="bg-white text-black md:text-lg text-s w-fit md:w-[8rem] mb-2 tracking-[0.2rem] p-3 rounded-lg mt-4">
                                        Voir tout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className="absolute md:w-[50%] w-screen top-[75%] md:top-[55%] md:left-[47%] left-[5%] h-fit flex justify-center pt-2 blur-[20px] opacity-0 animate-showContent">
                <div className="w-full md:h-[fit] relative">
                    <swiper-container
                        centered-slides="true"
                        slides-per-view="3"
                        loop="true"
                    >
                        {
                            trending.map((data) => (
                                <swiper-slide
                                    key={data.id}>
                                    <div className="shrink-0 relative ">
                                        <img className="md:h-[380px] md:w-[250px] w-[100px] h-[150px] rounded-xl border-2 border-neutral-500" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                        />
                                    </div>
                                </swiper-slide>
                            ))
                        }

                    </swiper-container>
                    <div className="absolute z-10 top-[50%] -left-[55%] space-x-20 ">
                        <button id="prev" className="rounded-full bg-zinc-800 bg-opacity-80 hover:bg-zinc-500 hover:bg-opacity-80">
                            <HiOutlineChevronLeft size={60} />
                        </button>
                        <button id="next" className="rounded-full bg-zinc-800 bg-opacity-80 hover:bg-zinc-500 hover:bg-opacity-80">
                            <HiOutlineChevronRight size={60} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

