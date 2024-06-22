import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchTrendingMovies } from '../utils/moviedb';
import { FaStar } from 'react-icons/fa';
import MovieDetails from '../components/MovieDetails';

export default function HomePage() {
    const [trending, setTrending] = useState([]);
    const [index, setIndex] = useState(0);
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [page, setPage] = useState(1);

    const getTrendingMovies = async (page) => {
        try {
            const data = await fetchTrendingMovies(page);
            setTrending(data.results);
            setIndex(0);
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
        getTrendingMovies(page);
    }, [page]);

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
                    {trending[index] && (
                        <div className="relative w-full h-full overflow-hidden -mt-24">
                            <img
                                src={`https://image.tmdb.org/t/p/original${trending[index].backdrop_path}`}
                                alt={trending[index].title}
                                className="w-full h-full object-cover brightness-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent "></div>
                            <div className="absolute md:top-[40vh] top-[65vh] left-4 right-4 md:left-28 md:w-1/3 text-white space-y-4 p-4 md:p-6 bg-zinc-900 bg-opacity-50 rounded-lg shadow-xl">
                                <h1 className="text-start text-xl md:text-5xl font-extrabold text-green-400">{trending[index].title}</h1>
                                <div className="flex flex-col ">
                                    <p className="text-start text-sm md:text-lg">{trending[index].release_date}</p>
                                    <div className="flex justify-between">
                                        <div className="flex items-center space-x-2">
                                            <FaStar size={20} color="yellow" className="md:text-lg" />
                                            <p className="text-sm md:text-lg">{Math.round(trending[index].vote_average * 100) / 100} / 10</p>
                                        </div>
                                        <button
                                            className="bg-green-500 text-white font-bold md:text-lg p-2 md:p-3 rounded-lg mt-2 md:mt-4 hover:bg-green-600 transition duration-300"
                                            onClick={() => setShowDetails(true)}

                                        >
                                            Voir détails
                                        </button>
                                    </div>

                                </div>
                                <p className="text-sm md:text-lg md:line-clamp-4 line-clamp-2 text-justify">{trending[index].overview}</p>

                            </div>
                        </div>
                    )}
                    <h1 className="absolute md:left-28 md:-bottom-24 -bottom-10 z-20 md:text-4xl text-2xl left-4">Films en tendances</h1>
                    <div className="container mx-auto md:py-28 py-16 px-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {trending.map((data, idx) => (
                                <div key={data.id} className="md:w-[400px] w-[180px] pb-2" onClick={() => setIndex(idx)}>
                                    <div className="relative">
                                        <img
                                            className="rounded-xl md:w-[370px] md:h-[560px] w-[170px] h-[250px] cursor-pointer transform transition duration-300 hover:scale-105"
                                            src={"https://image.tmdb.org/t/p/w500" + data.poster_path}
                                            alt={data.title}

                                        />
                                        <div className="absolute top-0 left-0 md:w-[370px] w-[170px] h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-xl">
                                            <h2 className="text-white text-lg md:text-xl text-center w-[80%] cursor-pointer"
                                            >{data.title}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8 md:mt-14">
                            <button
                                className="bg-green-500 text-white font-bold md:text-lg p-2 md:p-3 w-24 md:w-40 rounded-lg hover:bg-green-600 transition duration-300"
                                onClick={() => setPage(page + 1)}
                            >
                                Voir plus
                            </button>
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
