import { useState, useEffect } from "react";
import { SearchBar, ToggleTrending, SkeletonCard, MoviesCard, Trailer } from "../components";
import { MovieService } from "../utils/api"

export function HomePage() {
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [active, setActive] = useState("day");
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading1(true);
            const data = await MovieService.fetchPopularMovies(active);
            if (data) {
                console.log(data.data.content);
                setPopularMovies(data.data.content);
            }
            setLoading1(false);
        }
        fetchPopularMovies(active);
    }, []);

    useEffect(() => {
        const fetchTrendingMovies = async (active) => {
            setLoading(true);
            const data = await MovieService.fetchTrendingMovies(active);
            if (data) {
                console.log(data.data.content);
                setMovies(data.data.content);
            }
            setLoading(false);
        }
        fetchTrendingMovies(active);
    }, [active]);
    return (
        <div className="bg-gray-100">
            <SearchBar />
            <ToggleTrending active={active} setActive={setActive} />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                {loading
                    ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
                    : <MoviesCard movies={movies} />}
            </div>

            <div className="container mx-auto px-4 flex items-center py-4">
                <h1 className="text-2xl text-left font-bold text-black">
                    Popuar Movies
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                {loading1
                    ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
                    : <MoviesCard movies={popularMovies} />}
            </div>

            <div className="container mx-auto px-4 flex items-center py-4">
                <h1 className="text-2xl text-left font-bold text-black">
                    Latest trailers
                </h1>
            </div>
            <Trailer />
        </div>
    );
}