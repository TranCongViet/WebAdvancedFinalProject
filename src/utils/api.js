import { API_URL } from './config';
import axios from 'axios';

export const MovieService = {
    fetchTrendingMovies: async (timeWindow) => {
        try {
            const data = await axios(`${API_URL}/movie/trending-${timeWindow}`);
            return data.data
        }
        catch (error) {
            console.error("Error fetching trending movies:", error);
            throw error;
        }
    },
    fetchPopularMovies: async () => {
        try {
            const data = await axios(`${API_URL}/movie/popular`);
            return data.data
        }
        catch (error) {
            console.error("Error fetching popular movies:", error);
            throw error;
        }
    },
    fetchLatestTrailers: async () => {
        try {
            const data = await axios(`${API_URL}/movie/lastest-trailers`);
            return data.data
        }
        catch (error) {
            console.error("Error fetching latest trailers:", error);
            throw error;
        }
    },
    fetchGetMoviesByTMDB_id: async (tmdb_id) => {
        try {
            const data = await axios(`${API_URL}/movie/${tmdb_id}`);
            return data.data
        }
        catch (error) {
            console.error("Error fetching detail movie by tmdb_id:", error);
            throw error;
        }
    },

    addComment: async (movie_id, content, rating, token) => {
        try {
            const data = await axios.post(`${API_URL}/review`, {
                movieId: movie_id,
                content: content,
                rating: rating
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data
        }
        catch (error) {
            console.error("Error adding comment:", error);
            throw error;
        }
    },
    removeComment: async (movie_id, token) => {
        try {
            console.log("test movie_id", movie_id, token)
            const data = await axios.delete(`${API_URL}/review/${movie_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error removing comment:", error);
            throw error;
        }
    },
    removeWatchList: async (movie_id, token) => {
        try {
            const data = await axios.delete(`${API_URL}/movie-watch-list/${movie_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error removing watch list:", error);
            throw error;
        }
    },
    removeFavoriteList: async (movie_id, token) => {
        try {
            const data = await axios.delete(`${API_URL}/movie-favorite-list/${movie_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error removing favorite list:", error);
            throw error;
        }
    },




    fetchPersonByID: async (id) => {
        try {
            const data = await axios.get(`${API_URL}/people/${id}`);
            return data
        }
        catch (error) {
            console.error("Error fetching person by ID:", error);
            throw error;
        }
    },
    getAllMovieRatingList: async (token) => {
        try {
            const data = await axios.get(`${API_URL}/movie-rating-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data
        }
        catch (error) {
            console.error("Error fetching all movie rating list:", error);
            throw error;
        }
    },
    getAllMovieWatchList: async (token) => {
        try {
            const data = await axios.get(`${API_URL}/movie-watch-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error fetching all movie watch list:", error);
            throw error;
        }
    },
    getAllMovieFavoriteList: async (token) => {
        try {
            const data = await axios.get(`${API_URL}/movie-favorite-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data
        }
        catch (error) {
            console.error("Error fetching all movie favorite list:", error);
            throw error;
        }
    },
    recommendationByGenres: async (genres) => {
        try {
            const data = await axios.post(`${API_URL}/movie/filter`, {
                type: "OR",
                keywords: [genres.join(",")],
                genres: [genres.join(",")],
            });
            return data.data
        }
        catch (error) {
            console.error("Error fetching recommendation by genres:", error);
            throw error;
        }
    }
}