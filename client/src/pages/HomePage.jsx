// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchTrendingMovies } from '../utils/moviedb';
import { register } from 'swiper/element/bundle';
import { FaStar } from 'react-icons/fa';

register();

export default function HomePage() {

    const [slides, setSlides] = useState(0);
    const [trending, setTrending] = useState([]);
    const [index, setIndex] = useState(0);
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
        setIndex(0);
    }
    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        if (data) setMovieDetails(data);
        setIndex(0);
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
            <div className="hidden md:block md:w-[100vw] md:h-[100vh] -mt-[6vh]">
                <div className="relative inset-0">
                    <img src={"https://image.tmdb.org/t/p/original" + trending[index]?.backdrop_path} alt={trending[index]?.title} className="hidden md:z-10 md:block md:w-screen md:h-screen md:cover" />
                    <img src={"https://image.tmdb.org/t/p/w500" + trending[index]?.poster_path} alt={trending[index]?.title} className="md:hidden w-screen h-screen" />
                    <div className="absolute md:top-[25%] md:w-[30%] flex-col md:left-[7%]  text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                        <div className="bg-zinc-800 rounded-xl bg-opacity-70 space-y-4 p-4 shadow-3xl">
                            <h1 className="font-bold text-green-500 md:text-5xl text-lg">{trending[index]?.title}</h1>
                            <p className="text-lg">{trending[index]?.release_date}</p>
                            <div className="flex items-center space-x-1">
                                <FaStar size={20} color='yellow' />
                                <p className="text-lg">{Math.round((trending[index]?.vote_average) * 100) / 100} / 10</p>
                            </div>
                            <p>{movieDetails[index]?.genre.name}</p>
                            <p className="md:text-lg md:line-clamp-4">{trending[index]?.overview}</p>
                            <div>
                                <button className="md:block bg-white text-black md:text-lg text-s w-[fit] md:w-[8rem] md:p-3 p-2 rounded-lg mt-4 md:mb-4 mb-2">
                                    Voir plus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="absolute md:w-[51%] w-screen md:top-[55%] top-0 md:left-[49%] md:h-fit flex justify-center md:pt-2 blur-[20px] opacity-0 animate-showContent">
                <div className="w-full">
                    <swiper-container
                        centered-slides="true"
                        slides-per-view={slides}
                        loop="true"
                    >
                        {
                            trending.map((data, index) => (
                                <swiper-slide
                                    key={data.id}>
                                    <div className="relative inset-0">
                                        <img className="md:h-[360px] md:w-[250px] w-screen h-screen border border-zinc-400 md:rounded-xl" src={"https://image.tmdb.org/t/p/w500" + data?.poster_path} alt={data?.title}
                                            onClick={() => { setIndex(index) }} />
                                    </div>
                                </swiper-slide>
                            ))
                        }
                    </swiper-container>
                </div>
            </div>
        </section>
    )
}

