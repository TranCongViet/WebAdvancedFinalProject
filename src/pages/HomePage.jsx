import { useState, useEffect } from "react";
import { SearchBar, ToggleTrending, SkeletonCard, MoviesCard, TrailerCard, TrailerDetail, ScrollToTopButton } from "../components";
import { MovieService } from "../utils/api"

export function HomePage() {
    const [movies, setMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [latestTrailers, setLatestTrailers] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const [active, setActive] = useState("day");
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading1(true);
            const data = await MovieService.fetchPopularMovies(active);
            if (data) {
                setPopularMovies(data.data.content);
            }
            setLoading1(false);
        }
        const fetchLatestTrailers = async () => {
            setLoading2(true);
            const data = await MovieService.fetchLatestTrailers();
            if (data) {
                setLatestTrailers(data.content);
            }
            setLoading2(false);
        }
        fetchLatestTrailers();
        fetchPopularMovies(active);
    }, []);

    useEffect(() => {
        const fetchTrendingMovies = async (active) => {
            setLoading(true);
            const data = await MovieService.fetchTrendingMovies(active);
            if (data) {
                setMovies(data.data.content);
            }
            setLoading(false);
        }
        fetchTrendingMovies(active);
    }, [active]);
    return (
        <div className="bg-gray-100">
            <ScrollToTopButton />
            <SearchBar />
            <ToggleTrending active={active} setActive={setActive} />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                {loading
                    ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
                    : <MoviesCard movies={movies} />}
            </div>

            <div className="container px-4 flex items-center py-4">
                <h1 className="text-2xl text-left font-bold text-black">
                    Popular Movies
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                {loading1
                    ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
                    : <MoviesCard movies={popularMovies} />}
            </div>

            <div className="container px-4 flex items-center py-4">
                <h1 className="text-2xl text-left font-bold text-black">
                    Latest trailers
                </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-5">
                {loading2
                    ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
                    : (
                        <TrailerCard TrailerMovie={latestTrailers.slice(0, 8)} onMovieClick={setSelectedMovie} />
                    )
                }
            </div>
            <TrailerDetail
                youtubeId={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
}