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
    const [loading, setLoading] = useState(true);

    const setSlidesPerview = () => {
        setSlides(window.innerWidth < 640 ? 1 : 3);
    };

    const getTrendingMovies = async () => {
        try {
            const data = await fetchTrendingMovies();
            setTrending(data.results);
            if (data.results.length > 0) {
                await getMovieDetails(data.results[0].id);
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch trending movies:', error);
            setLoading(false);
        }
    };

    const getMovieDetails = async (id) => {
        try {
            const data = await fetchMovieDetails(id);
            if (data) {
                setMovieDetails(data);
            }
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
        }
    };

    useEffect(() => {
        getTrendingMovies();
        setSlidesPerview();
        window.addEventListener('resize', setSlidesPerview);

        return () => {
            window.removeEventListener('resize', setSlidesPerview);
        };
    }, []);

    useEffect(() => {
        if (trending.length > 0) {
            getMovieDetails(trending[index]?.id);
        }
    }, [index, trending]);

    return (
        <section className="w-screen text-white text-justify">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="hidden md:block md:w-[100vw] md:h-[100vh] -mt-[6vh]">
                        <div className="relative inset-0">
                            {trending[index] && (
                                <>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${trending[index].backdrop_path}`}
                                        alt={trending[index].title}
                                        className="hidden md:z-10 md:block md:w-screen md:h-screen md:cover"
                                    />
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${trending[index].poster_path}`}
                                        alt={trending[index].title}
                                        className="md:hidden w-screen h-screen"
                                    />
                                    <div className="absolute md:top-[25%] md:w-[30%] flex-col md:left-[7%] text-white translate-y-[50px] blur-[20px] opacity-0 animate-showContent">
                                        <div className="bg-zinc-800 rounded-xl bg-opacity-70 space-y-4 p-4 shadow-3xl">
                                            <h1 className="font-bold text-green-500 md:text-5xl text-lg">{trending[index].title}</h1>
                                            <p className="text-lg">{trending[index].release_date}</p>
                                            <div className="flex items-center space-x-1">
                                                <FaStar size={20} color="yellow" />
                                                <p className="text-lg">{Math.round(trending[index].vote_average * 100) / 100} / 10</p>
                                            </div>
                                            <p>{movieDetails.genres?.map(genre => genre.name).join(', ')}</p>
                                            <p className="md:text-lg md:line-clamp-4">{trending[index].overview}</p>
                                            <div>
                                                <button className="md:block bg-white text-black md:text-lg text-s w-[fit] md:w-[8rem] md:p-3 p-2 rounded-lg mt-4 md:mb-4 mb-2">
                                                    Voir plus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="absolute md:w-[51%] w-screen md:top-[55%] top-0 md:left-[49%] md:h-fit flex justify-center md:pt-2 blur-[20px] opacity-0 animate-showContent">
                        <div className="w-full">
                            <swiper-container centered-slides="true" slides-per-view={slides} loop="true">
                                {trending.map((data, idx) => (
                                    <swiper-slide key={data.id}>
                                        <div className="relative inset-0">
                                            <img
                                                className="md:h-[360px] md:w-[250px] w-screen h-screen border border-zinc-400 md:rounded-xl"
                                                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                                                alt={data.title}
                                                onClick={() => setIndex(idx)}
                                            />
                                        </div>
                                    </swiper-slide>
                                ))}
                            </swiper-container>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
