import React, { useEffect, useState } from 'react';
import { fetchMoviesByGenre } from '../utils/moviedb';

export default function MoviesFiltered({ activeFilter = {} }) {

    const [moviesFiltered, setMoviesFiltered] = useState([]);

    useEffect(() => {
        const getMoviesFiltered = async () => {
            try {
                let data = await fetchMoviesByGenre();
                if (data && data.results) {
                    data = data.results.filter((movie) => movie.genre_ids.includes(activeFilter.id));
                    setMoviesFiltered(data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des films :", error);
            }
        };

        if (activeFilter && activeFilter.id) {
            getMoviesFiltered();
        }
    }, [activeFilter]);

    return (
        <section className="absolute w-[82%] bg-zinc-900 mt-12 ml-[15%]">
            <div className="flex flex-wrap justify-center">
                {moviesFiltered.map((data) => (
                    <div key={data.id} className="w-[280px] pb-2">
                        <img className="rounded-xl w-[260px] h-[350px]" src={"https://image.tmdb.org/t/p/w500" + data.poster_path} alt={data.title} />
                        <h2 className="text-center text-white text-lg md:text-s py-1 m-1 rounded-md">{data.title}</h2>
                    </div>
                ))}
            </div>
        </section>
    );
}
