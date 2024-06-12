import axios from "axios";

const apiKey = `${import.meta.env.VITE_API_KEY}`;

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;

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