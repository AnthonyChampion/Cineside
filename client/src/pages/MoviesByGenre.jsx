import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MoviesFiltered from '../components/MoviesFiltered';
import { fetchGenresOfMovies } from '../utils/moviedb';

export default function MoviesByGenre() {
    const [filters, setFilters] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [page, setPage] = useState(1);

    const handleClickFilter = (filterId, filterName) => {
        setActiveFilter({ id: filterId, name: filterName });
        setPage(1);
    };

    const getGenresOfMovies = async () => {
        try {
            const data = await fetchGenresOfMovies();
            const filteredGenres = data.genres.filter(genre => genre.name !== "Téléfilm" && genre.name !== "Documentaire");
            setFilters(filteredGenres);
        } catch (error) {
            console.error('Erreur dans la récupération des genres:', error);
        }
    };

    useEffect(() => {
        getGenresOfMovies();
    }, []);

    return (
        <section className="w-screen">
            <div className="absolute w-full flex flex-wrap justify-center p-2 md:space-x-3 bg-zinc-800 md:bg-opacity-60 z-10">
                {filters.map((filter) => (
                    <div key={filter.id} className="list-none" onClick={() => handleClickFilter(filter.id, filter.name)}>
                        <button className="text-[17px] text-white p-2 hover:scale-125 hover:text-green-400 active:bg-green-400 focus:outline-none focus:ring focus:ring-green-400">
                            {filter.name}
                        </button>
                    </div>
                ))}
            </div>
            <MoviesFiltered activeFilter={activeFilter} page={page} setPage={setPage} />
        </section>
    );
}

MoviesByGenre.propTypes = {
    activeFilter: PropTypes.object,
    page: PropTypes.number,
    setPage: PropTypes.func,
};
