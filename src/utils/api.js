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
            console.log("Check var", movie_id, content, rating, token);
            const data = await axios.post(`${API_URL}/review`, {
                content: content,
                movieId: movie_id,
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
    fetchPersonByID: async (id) => {
        try {
            const data = await axios.get(`${API_URL}/people/${id}`);
            return data.data
        }
        catch (error) {
            console.error("Error fetching person by ID:", error);
            throw error;
        }
    },

    // searchByName: async (query, page) => {
    //     const server = localStorage.getItem('server');
    //     const res = await fetch(`${API_URL}/${server}/search?q=${query}&page=${page}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     const data = await res.json();
    //     return data.data;
    // },
    // searchByGenre: async (genre, page) => {
    //     const server = localStorage.getItem('server');
    //     const res = await fetch(`${API_URL}/${server}/genre?genre=${genre}&page=${page}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     const data = await res.json();
    //     return data.data;
    // },
}