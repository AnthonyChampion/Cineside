// MovieDetails.js
import React from 'react';
import PropTypes from 'prop-types';

const MovieDetails = ({ movie, onClose }) => {


    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-white text-black rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-2/3">
                <div className="relative">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-64 object-cover"
                    />
                    <button
                        className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold">{movie.title}</h2>
                    <p><strong>Date de sortie:</strong> {movie.release_date}</p>
                    <p><strong>Note:</strong> {movie.vote_average} / 10</p>
                    <p><strong>Genres:</strong> {movie.genres?.map(genre => genre.name).join(', ')}</p>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        backdrop_path: PropTypes.string,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        genres: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
        overview: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MovieDetails;

