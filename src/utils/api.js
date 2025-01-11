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