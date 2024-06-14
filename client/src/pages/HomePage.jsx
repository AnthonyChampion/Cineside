// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchTrendingMovies } from '../utils/moviedb';
import { register } from 'swiper/element/bundle';

import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";

register();

export default function HomePage() {

    const [slides, setSlides] = useState(0);
    const [trending, setTrending] = useState([]);
    const [movieDetails, setMovieDetails] = useState({});

    const setSlidesPerview = () => {
        setSlides(
            window.innerWidth < 640
                ? 1
                : window.innerWidth >= 640
                    ? 3
                    : 0
        );
    };

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        setTrending(data.results);
        console.log(data.results)
    }
    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        if (data) setMovieDetails(data);
    }

    useEffect(() => {
        getTrendingMovies();
        getMovieDetails();
        setSlidesPerview();
        window.addEventListener("resize", setSlidesPerview);

        return () => {
            window.removeEventListener("resize", setSlidesPerview);
        };
    }, []);

    return (
        <section className="w-screen text-white text-justify">
            <div className="hidden md:block md:w-[100vw] md:h-[100vh] overflow-hidden -mt-[6vh]">
                {
                    trending.map((data) => (
                        <div className="relative inset-0" key={data.id}>
                            <img src={"https://image.tmdb.org/t/p/original" + data?.backdrop_path} alt={data?.title} className="hidden md:z-10 md:block md:w-screen md:h-screen md:cover first:w-[380]" />
                            <img src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title} className="md:hidden w-screen h-screen" />
                            <div className="absolute md:top-[20%] md:w-[30%] md:h-fit flex-col pl-4 pr-4 md:left-[10%] bg-zinc-800 rounded-xl bg-opacity-70 text-white space-y-2 translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                                <h1 className="font-bold md:text-5xl text-lg md:pt-4 md:pb-4 pt-2">{data?.title}</h1>
                                <p className="text-lg">Date de sortie: {data?.release_date}</p>
                                <p className="text-lg">Note: {Math.round((data?.vote_average) * 100) / 100} / 10</p>
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
            <div className="absolute md:w-[50%] w-screen md:top-[55%] top-0 md:left-[47%] md:h-fit flex justify-center md:pt-2 blur-[20px] opacity-0 animate-showContent">
                <div className="w-full">
                    <swiper-container
                        centered-slides="true"
                        slides-per-view={slides}
                        loop="true"
                    >
                        {
                            trending.map((data) => (
                                <swiper-slide
                                    key={data.id}>
                                    <div className="relative inset-0">
                                        <img className="md:h-[360px] md:w-[250px] w-screen h-screen border border-zinc-400 md:rounded-xl" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                        />
                                        <div className="md:hidden absolute flex-col bottom-12 p-2 bg-zinc-800 rounded-xl bg-opacity-70 border border-zinc-800 text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                                        </div>
                                    </div>
                                </swiper-slide>
                            ))
                        }

                    </swiper-container>
                    <div className="hidden md:block absolute z-10 top-[50%] -left-[55%] space-x-20 ">
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

