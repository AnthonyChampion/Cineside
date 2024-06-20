import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchTrendingMovies } from '../utils/moviedb';
import { register } from 'swiper/element/bundle';
import { FaStar } from 'react-icons/fa';
import MovieDetails from '../components/MovieDetails';

register();

export default function HomePage() {
    const [slides, setSlides] = useState(0);
    const [trending, setTrending] = useState([]);
    const [index, setIndex] = useState(0);
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    const setSlidesPerview = () => {
        setSlides(window.innerWidth < 640 ? 2 : 3);
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
            console.error('Erreur dans la récupération des films:', error);
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
            console.error('Erreur dans la récupération des détails:', error);
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
        <section className="w-screen h-screen text-white bg-zinc-900">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-green-500" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative w-full h-full overflow-hidden -mt-14">
                        {trending[index] && (
                            <>
                                <img
                                    src={`https://image.tmdb.org/t/p/original${trending[index].backdrop_path}`}
                                    alt={trending[index].title}
                                    className="w-full h-full object-cover brightness-50"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
                                <div className="absolute top-1/4 left-4 right-4 md:left-28 md:w-3/4 md:md:w-1/3 text-white space-y-4 p-4 md:p-6 bg-black bg-opacity-50 rounded-lg shadow-xl">
                                    <h1 className="text-2xl md:text-5xl font-extrabold text-green-400">{trending[index].title}</h1>
                                    <p className="text-sm md:text-lg">{trending[index].release_date}</p>
                                    <div className="flex items-center space-x-2">
                                        <FaStar size={20} color="yellow" className="md:text-lg" />
                                        <p className="text-sm md:text-lg">{Math.round(trending[index].vote_average * 100) / 100} / 10</p>
                                    </div>
                                    <p className="text-sm md:text-lg md:line-clamp-4 line-clamp-3 text-justify">{trending[index].overview}</p>
                                    <button
                                        className="bg-green-500 text-black text-sm md:text-lg p-2 md:p-3 rounded-lg mt-2 md:mt-4 hover:bg-green-600 transition duration-300"
                                        onClick={() => setShowDetails(true)}
                                    >
                                        Voir plus
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="absolute bottom-2 w-full md:w-2/4 md:h-[45%] md:right-8 items-center flex justify-center">
                        <div className="w-4/5 md:w-full">
                            <swiper-container centered-slides="false" slides-per-view={slides} loop="true" space-between={10}>
                                {trending.map((data, idx) => (
                                    <swiper-slide key={data.id}>
                                        <div className="relative inset-0 transition-transform transform hover:scale-105">
                                            <img
                                                className="w-[140px] h-[200px] md:w-[250px] md:h-[370px] object-cover rounded-lg shadow-lg cursor-pointer"
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
            {showDetails && (
                <MovieDetails
                    movie={movieDetails}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </section>
    );
}
