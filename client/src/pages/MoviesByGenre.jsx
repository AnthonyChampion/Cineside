import React, { useEffect, useState } from 'react'
import { fetchGenresOfMovies } from '../utils/moviedb';
import MoviesFiltered from '../components/MoviesFiltered';

export default function MoviesByGenre() {

    const [listFilter, setListFilter] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);

    const handleClickFilter = (filtreId, filtreName) => {

        setActiveFilter({ id: filtreId, name: filtreName });

    };

    const getGenresOfMovies = async () => {
        const data = await fetchGenresOfMovies();
        setListFilter(data.genres);
    }

    useEffect(() => {
        getGenresOfMovies();
    }, []);

    return (
        <section className="w-[90vw]">
            <div className="absolute flex flex-col mt-11 ml-12 p-4 w-[11%] rounded-xl bg-zinc-800 bg-opacity-60 z-10">
                {listFilter.map((filtre) => (

                    <div key={filtre.id}
                        className="list-none"
                        onClick={() => handleClickFilter(filtre.id, filtre.name)}
                    >
                        <button className="text-xl text-white p-2 hover:scale-125 hover:text-green-400 active:bg-green-400 focus:outline-none focus:ring focus:ring-green-400">
                            {filtre.name}
                        </button>
                    </div>
                ))}
            </div>
            < div>
                <MoviesFiltered activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>

        </section >
    )
}
