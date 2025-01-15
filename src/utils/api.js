import { get } from 'react-hook-form';
import { AiNavigate } from '../pages';
import { API_URL, LLM_URL } from './config';
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
    removeRatingList: async (movie_id, token) => {
        try {
            const data = await axios.delete(`${API_URL}/review/${movie_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        }
        catch (error) {
            console.error("Error removing rating list:", error);
            throw error;
        }
    },
    addMovieWatchList: async (movie_id, token) => {
        try {
            const data = await axios.post(`${API_URL}/movie-watch-list`, {
                movieId: movie_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error adding event listener:", error);
            throw error;
        }
    },
    addFavoriteList: async (movie_id, token) => {
        try {
            const data = await axios.post(`${API_URL}/movie-favorite-list`, {
                movieId: movie_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error adding favorite list:", error);
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
                genres: genres
            });
            return data
        }
        catch (error) {
            console.error("Error fetching recommendation by genres:", error);
            throw error;
        }
    },
    // Lấy movie có tương đương với title
    recommendationBySimilar: async (title) => {
        try {
            const data = await axios.get(`${LLM_URL}/retriever/`, {
                params: {
                    llm_api_key: 'AIzaSyBDzzeUPb8DvFzNboDn4qA2BrzGOMNIZmU',
                    collection_name: 'movies',
                    query: title
                }
            });
            return data
        }
        catch (error) {
            console.error("Error recommend similar movies:", error);
            throw error;
        }
    },
    searchMovies: async (query, page) => {
        try {
            if (query === "") {
                const data = await axios.get(`${API_URL}/movie/search`, {
                    params: {
                        title: "",
                        page: page
                    }
                });
                return data;
            }
            const data = await axios.get(`${API_URL}/movie/search`, {
                params: {
                    title: query,
                    page: page
                }
            });
            return data
        }
        catch (error) {
            console.error("Error searching movies:", error);
            throw error;
        }
    },
    checkIsWatchList: async (movie_id, token) => {
        try {
            const data = await axios.get(`${API_URL}/movie-watch-list/${movie_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error checking watch list:", error);
            throw error;
        }
    },
    checkIsLiked: async (movie_id, token) => {
        try {
            const data = await axios.get(`${API_URL}/movie-favorite-list/${movie_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error checking favorite list:", error);
            throw error;
        }
    },
    filter: async (filterList, page) => {
        try {
            let genres = filterList.genres ?? [];
            if (filterList.genre && filterList.genre !== "All Genres" && filterList.genre !== "") {
                genres.push(filterList.genre);
            }

            let keywords = filterList.keywords && filterList.keywords !== "" ? [filterList.keywords] : [];

            let collection = filterList.collection == "movies" ? "" : filterList.collection;

            const data = await axios.post(`${API_URL}/movie/filter`, {
                type: "OR",
                title: filterList.title,
                keywords: keywords,
                genres: genres,
                collection: collection,
                minVote: filterList.minVote > 0 ? parseInt(filterList.minVote) : 0,
                maxVote: filterList.maxVote < 10 ? parseInt(filterList.maxVote) : 10,
                startDate: filterList.startDate != "" ? filterList.startDate : "1000-01-01",
                endDate: filterList.endDate != "" ? filterList.endDate : "3000-01-01",
                page: page - 1
            });
            console.log("Dữ liệu out", data);
            return data
        }
        catch (error) {
            console.error("Error filtering movies:", error);
            throw error;
        }
    },
    getGenres: async () => {
        try {
            const data = await axios.get(`${API_URL}/movie/genres`);
            return data
        }
        catch (error) {
            console.error("Error fetching genres:", error);
            throw error;
        }
    },
    llmSearchMovies: async (query) => {
        try {
            const data = await axios.get(`${LLM_URL}/retriever/`, {
                params: {
                    llm_api_key: 'AIzaSyBDzzeUPb8DvFzNboDn4qA2BrzGOMNIZmU',
                    collection_name: 'movies',
                    query: query
                }
            });
            return data
        }
        catch (error) {
            console.error("Error searching movies:", error);
            throw error;
        }
    },
    AiNavigate: async (query) => {
        try {
            const data = await axios.post(`${LLM_URL}/navigate/?llm_api_key=AIzaSyBDzzeUPb8DvFzNboDn4qA2BrzGOMNIZmU&query=${query}`, {
                params: {
                    llm_api_key: 'AIzaSyBDzzeUPb8DvFzNboDn4qA2BrzGOMNIZmU',
                    query: query
                }
            });
            return data
        }
        catch (error) {
            console.error("Error navigating movies:", error);
            throw error;
        }
    },
    getMoviesByList: async (list) => {
        try {
            const data = await axios.post(`${API_URL}/movie/list`, {
                ids: list,
                size: 10
            });
            return data
        }
        catch (error) {
            console.error("Error fetching movies by list:", error);
            throw error;
        }
    },
    // Lấy thông tin phim theo MongoID
    getMoviesByMongoID: async (id) => {
        try {
            const temp = [id];
            const data = await axios.post(`${API_URL}/movie/list`, {
                ids: temp,
                size: 1
            });
            return data
        }
        catch (error) {
            console.error("Error fetching movies by mongoID:", error);
            throw error;
        }
    },
    // Lấy thông tin diễn viên theo MongoID
    getCastByMongoID: async (mongoID) => {
        try {
            const temp = [mongoID]
            const data = await axios.post(`${API_URL}/people/list`, {
                ids: temp,
                size: 1
            });
            return data
        }
        catch (error) {
            console.error("Error fetching cast by mongoID:", error);
            throw error;
        }
    },

    // Lấy hồ sơ người dùng
    getProfile: async (token) => {
        try {
            const data = await axios.get(`${API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data
        }
        catch (error) {
            console.error("Error fetching profile:", error);
            throw error;
        }
    }
}