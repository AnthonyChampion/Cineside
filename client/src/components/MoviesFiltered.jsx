import { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../utils/moviedb";

export default function MoviesFiltered({ activeFilter = {} }) {
    const [moviesFiltered, setMoviesFiltered] = useState([]);
    const MOVIES_COUNT = 20;

    useEffect(() => {
        const getMoviesFiltered = async () => {
            try {
                let allMovies = [];
                let currentPage = 1;
                while (allMovies.length < MOVIES_COUNT) {
                    let data = await fetchMoviesByGenre(currentPage);
                    if (data && data.results) {
                        let filteredMovies = data.results.filter((movie) => movie.genre_ids.includes(activeFilter.id));
                        allMovies = [...allMovies, ...filteredMovies];

                        if (filteredMovies.length === 0 || allMovies.length >= MOVIES_COUNT) {
                            break;
                        }
                    }
                    currentPage++;
                }
                setMoviesFiltered(allMovies.slice(0, MOVIES_COUNT));
            } catch (error) {
                console.error("Erreur dans l'affichage des films:", error);
            }
        };

        if (activeFilter && activeFilter.id) {
            setMoviesFiltered([]);
            getMoviesFiltered();
        }
    }, [activeFilter]);

    return (
        <section className="absolute w-[82%] h-[860px] bg-zinc-900 mt-12 ml-[15%] overflow-scroll">
            <div className="flex flex-wrap justify-center">
                {moviesFiltered.map((data) => (
                    <div key={data.id} className="w-[270px] pb-2">
                        <img className="rounded-xl w-[250px] h-[350px]" src={"https://image.tmdb.org/t/p/w500" + data.poster_path} alt={data.title} />
                        <h2 className="text-center text-white text-lg md:text-s py-1 m-1 rounded-md">{data.title}</h2>
                    </div>
                ))}
            </div>
        </section>
    );
}
