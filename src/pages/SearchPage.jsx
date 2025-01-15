import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { MovieService } from '../utils/api';
import { FadeLoader } from 'react-spinners';

export function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    // State cho bộ lọc
    const [filters, setFilters] = useState({
        genre: "",
        title: searchParams.get("query") || "",
        collection: "",
        keywords: "",
        minVote: 0,
        maxVote: 10,
        startDate: "",
        endDate: "",
    });
    useEffect(() => {
        const getFullGenres = async () => {
            const data = await MovieService.getGenres();
            // Thêm thể loại "Tất cả" vào mảng genres
            const allGenres = [{ id: 0, name: "All Genres" }, ...data.data.data];
            setGenres(allGenres);
        };
        getFullGenres();
    }, []);
    useEffect(() => {
        const getSearchResult = async () => {
            const page = searchParams.get("page") || "1";
            const query = searchParams.get("query");
            setLoading(true);
            const data = await MovieService.searchMovies(query, page, filters);
            if (data && data.data.data.content) {
                setMovies(data.data.data.content);
                setMaxPage(data.data.data.totalPages);
            }
            setFilters({
                genre: "",
                title: searchParams.get("query") || "",
                collection: "",
                keywords: "",
                minVote: 0,
                maxVote: 10,
                startDate: "",
                endDate: "",
            });
            setLoading(false);
        };
        const checkFilter = searchParams.get("filter") ? handleFilter() : getSearchResult();
        //getSearchResult();
    }, [searchParams]);

    const handleFilter = async () => {
        const filter = async () => {
            setLoading(true);
            // Cập nhật URL với tham số filter=true
            searchParams.set("filter", "true");
            searchParams.set("query", filters.title);
            setSearchParams(searchParams);
            const data = await MovieService.filter(filters, searchParams.get("page"));
            setMovies(data.data.data.content)
            setMaxPage(data.data.data.totalPages);
            setLoading(false);
        };
        filter();
    };

    const handleFilterButton = async () => {
        const filter = async () => {
            setLoading(true);
            // Cập nhật URL với tham số filter=true
            searchParams.set("filter", "true");
            searchParams.set("page", "1");
            searchParams.set("query", filters.title);
            setSearchParams(searchParams);
            const data = await MovieService.filter(filters, searchParams.get("page"));
            setMovies(data.data.data.content)
            setMaxPage(data.data.data.totalPages);
            setLoading(false);
        };
        filter();
    };

    // Xử lý thay đổi bộ lọc
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 rounded-lg p-5">
            {/* Sidebar (Bộ lọc) */}
            <div className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4 mb-4 lg:mb-0">
                <h3 className="text-lg font-semibold mb-4">Bộ lọc</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Thể loại</label>
                    <select className="block w-full p-2 border rounded" name="genre" onChange={handleFilterChange} >
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.name}
                            >
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Key search</label>
                    <input
                        type="text"
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        className="block w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Keywords</label>
                    <input
                        type="text"
                        name="keywords"
                        value={filters.keywords}
                        onChange={handleFilterChange}
                        className="block w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Collection</label>
                    <select className="block w-full p-2 border rounded" name="collection" onChange={handleFilterChange} >
                        {[
                            { id: "movies", name: "All Movies" },
                            { id: "movies_trending_week", name: "Trending This Week" },
                            { id: "movies_trending_day", name: "Trending Today" },
                            { id: "movies_upcoming", name: "Upcoming Movies" },
                            { id: "movies_top_rated", name: "Top Rated Movies" },
                            { id: "movies_popular", name: "Popular Movies" },
                            { id: "movies_now_playing", name: "Now Playing" },
                        ].map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rating tối thiểu</label>
                    <input
                        type="number"
                        name="minVote"
                        value={filters.minVote}
                        onChange={handleFilterChange}
                        min="0"
                        max="10"
                        className="block w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rating tối đa</label>
                    <input
                        type="number"
                        name="maxVote"
                        value={filters.maxVote}
                        onChange={handleFilterChange}
                        min="0"
                        max="10"
                        className="block w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ngày phát hành từ</label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        className="block w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ngày phát hành đến</label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                        className="block w-full p-2 border rounded"
                    />
                </div>
                <button
                    onClick={handleFilterButton}
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                    Áp dụng bộ lọc
                </button>
            </div>

            <div className="w-full lg:w-3/4 lg:pl-5">
                <SearchBar />
                <div className="mb-3 text-blue-600 font-semibold">
                    Tìm kiếm: <span className="font-semibold text-black">{searchParams.get("query")}</span>
                </div>
                {loading ? (
                    <div className="h-screen inset-0 flex items-start justify-center bg-gray-100">
                        <FadeLoader />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {movies.length === 0 || +searchParams.get("page") > maxPage ? (
                            <div className="text-center h-screen">
                                Không tìm thấy kết quả nào 😢.
                            </div>
                        ) : (
                            <>
                                {movies.map((movie) => (
                                    <div key={movie.id} className="flex bg-white shadow-md rounded-lg overflow-hidden mb-4">
                                        <div className="w-1/4 h-60">
                                            <Link to={`/movie/${movie.id}`}>
                                                <img
                                                    src={
                                                        movie.poster_path
                                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                            : "https://via.placeholder.com/500x750?text=No+Image"
                                                    }
                                                    alt={movie.title || "Movie Poster"}
                                                    className="w-full h-full object-contain"
                                                />
                                            </Link>
                                        </div>
                                        <div className="w-3/4 p-4">
                                            <Link to={`/movie/${movie.id}`}>
                                                <h2 className="text-lg font-semibold hover:underline text-gray-800 mb-2 truncate">
                                                    {movie.title || "No Title"}
                                                </h2>
                                            </Link>
                                            <p className="text-gray-600 text-sm mb-4">
                                                Release Date: {movie.release_date || "Unknown"}
                                            </p>
                                            <p className="text-gray-700 text-sm line-clamp-3">
                                                {movie.overview || "No description available."}
                                            </p>
                                        </div>
                                    </div>
                                ))
                                }
                                <div className="mx-auto mt-4">
                                    <Pagination pageLimit={movies.length > 0 ? maxPage : 1} />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}