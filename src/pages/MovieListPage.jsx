import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoviesCard, Pagination } from '../components';
import { MovieService } from '../utils/api';
import { FadeLoader } from 'react-spinners';

export function MovieListPage() {
    const [searchParams] = useSearchParams();
    const [maxPage, setMaxPage] = useState(1);
    const [title, setTitle] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const fetchMovies = async () => {
            const name = searchParams.get('name');
            const page = searchParams.get("page") || "1";
            console.log("Vo day chưa", page);
            let data;
            if (name === "trending_day") {
                data = await MovieService.getMoviesTrendingDay(page);
                setMaxPage(data.data.data.totalPages);
                setTitle("xu hướng trong ngày")
            } else if (name === "trending_week") {
                data = await MovieService.getMoviesTrendingWeek(page);
                setMaxPage(data.data.data.totalPages);
                setTitle("xu hướng trong tuần")
            } else if (name === "popular") {
                data = await MovieService.getMoviesPopular(page);
                setMaxPage(data.data.data.totalPages);
                setTitle("phim phổ biến")
            } else {
                setMovies([]);
                setLoading(false);

                throw new Error("Invalid movie category");
            }
            setMovies(data.data.data.content);
            setLoading(false);
        };
        fetchMovies();
    }, [searchParams]);
    if (loading) {
        return (
            <div className="h-screen inset-0 flex items-center justify-center bg-gray-100 ">
                <FadeLoader />
            </div>
        )
    }
    if (!loading && movies.length === 0) {
        return (
            <div className="text-center text-xl font-bold text-gray-800 p-8 h-screen" >
                Không tìm thấy danh sách phim cần tìm 😢
            </div>
        )
    }
    return (
        <>
            <div className="container mx-auto px-4 flex items-center justify-between py-4">
                <h1 className="text-2xl text-left font-bold text-red-500">
                    Danhh sách phim {title}
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5 pt-5">
                <MoviesCard movies={movies} />
            </div>
            <div className="mx-auto mt-4 mb-4">
                <Pagination pageLimit={movies.length > 0 ? maxPage : 1} />
            </div>
        </>
    );
};

