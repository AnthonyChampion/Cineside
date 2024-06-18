import React, { useEffect, useState } from 'react';
import { fetchGenresOfMovies } from '../utils/moviedb';
import MoviesFiltered from '../components/MoviesFiltered';

export default function MoviesByGenre() {
    const [filters, setFilters] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);

    const handleClickFilter = (filterId, filterName) => {
        setActiveFilter({ id: filterId, name: filterName });
    };

    const getGenresOfMovies = async () => {
        try {
            const data = await fetchGenresOfMovies();
            setFilters(data.genres);
        } catch (error) {
            console.error('Erreur dans la récupération des genres:', error);
        }
    };

    useEffect(() => {
        getGenresOfMovies();
    }, []);

    return (
        <section className="w-[90vw]">
            <div className="absolute flex flex-col mt-11 ml-12 p-4 w-[11%] rounded-xl bg-zinc-800 bg-opacity-60 z-10">
                {filters.map((filter) => (
                    <div key={filter.id}
                        className="list-none"
                        onClick={() => handleClickFilter(filter.id, filter.name)}
                    >
                        <button className="text-xl text-white p-2 hover:scale-125 hover:text-green-400 active:bg-green-400 focus:outline-none focus:ring focus:ring-green-400">
                            {filter.name}
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <MoviesFiltered activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>
        </section>
    );
}
