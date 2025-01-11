import { Link } from "react-router-dom";

export function MoviesCard({ movies }) {
    return (
        movies.map((movie) => (
            <div
                key={movie.id}
                className="bg-white shadow-xl rounded-lg overflow-hidden"
            >
                <div className="relative w-full h-60 overflow-hidden ">
                    <Link to={`/movie/${movie.id}`}>
                        <img
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Image"}
                            alt={movie.title || "Movie Poster"}
                            className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-125"
                        />
                    </Link>
                </div>
                <div className="p-4">
                    <Link to={`/movie/${movie.id}`}>
                        <h2 className="text-sm font-semibold text-gray-800 truncate cursor-pointer hover:underline">{movie.title}</h2>
                    </Link>
                    <p className="text-gray-600 text-sm">{movie.release_date}</p>
                </div>
            </div>
        ))
    );
}