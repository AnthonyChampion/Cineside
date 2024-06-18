import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { fetchMovieDetails, searchMovies } from '../utils/moviedb';
import MovieDetails from './MovieDetails';

export default function MovieSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchTerm.trim() === '') return;

        try {
            const params = { query: searchTerm };
            const results = await searchMovies(params);

            if (results && results.results && results.results.length > 0) {
                setMovies(results.results);
                setError('');
            } else {
                setMovies([]);
                setError('No movies found.');
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovies([]);
            setError('Failed to fetch movies. Please try again.');
        }
    };

    const handleClose = () => {
        setMovies([]);
        setError('');
        setSearchTerm('');
    };

    const handleMovieClick = async (movie) => {
        try {
            const data = await fetchMovieDetails(movie.id);
            setSelectedMovie(data);
            setShowDetails(true);
        } catch (error) {
            console.error('Erreur dans la récupération des détails:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-xl h-11 w-[20rem] bg-zinc-900 text-center text-white "
                    placeholder="Rechercher un film"
                />
                <button type="submit" className="ml-2"><IoMdSearch className="size-6 md:hidden" /></button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {movies.length > 0 && (
                <div className="fixed inset-0 z-50 h-screen flex justify-center items-center bg-black bg-opacity-70">
                    <div className="bg-white text-black rounded-lg overflow-scroll noscroll-bar h-[98%] w-11/12 md:w-3/4 lg:w-2/3">
                        <div className="relative">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto ">
                                {movies.map((movie) => (
                                    <div key={movie.id} className="relative flex flex-col h-[400px] justify-center items-center">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-[260px] h-[350px] object-cover rounded-xl"
                                            onClick={() => handleMovieClick(movie)}
                                        />
                                        <h2 className="w-[260px] text truncate ">{movie.title}</h2>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="absolute top-4 right-4 bg-green-400 text-white rounded-full w-10 h-10 flex items-center justify-center"
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showDetails && (
                <MovieDetails
                    movie={selectedMovie}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </div>
    );
}
