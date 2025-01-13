import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { MovieService } from '../utils/api'
import { FadeLoader } from 'react-spinners';

export function SearchPage() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSearchResult = async () => {
            const page = searchParams.get("page") || "1";
            const query = searchParams.get("query");
            setLoading(true);
            if (query) {
                const data = await MovieService.searchMovies(query, page);
                console.log("Testing search", data)
                if (data && data.data.data.content) {
                    setMovies(data.data.data.content);
                    setMaxPage(data.data.data.totalPages);
                }
                setLoading(false);
            }
        };
        getSearchResult();
    }, [searchParams]);
    return (
        <div className="flex flex-col bg-gray-100 rounded-lg p-5">
            <SearchBar />
            <div className="mb-3 text-blue-600 font-semibold">
                Tìm kiếm: <span className="font-semibold text-black">{searchParams.get("query")}</span>
            </div>
            {
                loading ? (
                    <div className="h-screen inset-0 flex items-start justify-center bg-gray-100 ">
                        <FadeLoader />
                    </div>
                ) :
                    <div className="space-y-4">
                        {movies.length === 0 || +searchParams.get("page") > maxPage ? (
                            <div className="text-center h-screen">
                                Không tìm thấy kết quả nào.
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
                                ))}
                                <div className="mx-auto mt-4">
                                    <Pagination pageLimit={movies.length > 0 ? maxPage : 1} />
                                </div>
                            </>
                        )}
                    </div>
            }
        </div>
    );
}
