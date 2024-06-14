import axios from "axios";

const apiKey = `${import.meta.env.VITE_API_KEY}`;

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const genresOfMovies = `${apiBaseUrl}/genre/movie/list?api_key=${apiKey}`;
const popularMovies = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`;

const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;


const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : { language: 'fr-FR', page: '' }
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log("error: ", error);
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint, { language: "fr-FR" });
}
export const fetchUpcommingMovies = () => {
    return apiCall(upcomingMoviesEndpoint, { language: "fr-FR" });
}
export const fetchGenresOfMovies = () => {
    return apiCall(genresOfMovies, { language: "fr-FR" });
}
export const fetchTopRatedMovies = (page = 1) => {
    if (page <= 0) page = 1;
    return apiCall(topRatedMoviesEndpoint, { language: "fr-FR", page: `${page}` });
}
export const fetchMoviesByGenre = () => {
    return apiCall(popularMovies, { language: "fr-FR" });
}
export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}

