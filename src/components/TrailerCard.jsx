import { Link } from "react-router-dom";

export function TrailerCard({ TrailerMovie, onMovieClick }) {
    return (
        TrailerMovie.map((movie) => (
            <div
                key={movie.id}
                className="bg-white shadow-xl rounded-lg overflow-hidden relative group"
            >
                <div className="relative w-full h-60 overflow-hidden">
                    <div onClick={() => {
                        if (movie.trailers && movie.trailers.length > 0) {
                            onMovieClick(movie.trailers[0].key);
                        } else {
                            console.warn("No trailer available for this movie.");
                        }
                    }}>
                        <img
                            src={movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://image.tmdb.org/t/p/w500/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg"}
                            alt={movie.title || "Movie Poster"}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                className="bg-white text-black rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
                                aria-label="Play Trailer"
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <Link to={`/movie/${movie.id}`}>
                        <h2 className="text-sm font-semibold text-gray-800 truncate cursor-pointer hover:underline text-center">
                            {movie.title}
                        </h2>
                    </Link>
                </div>
            </div>
        ))
    );
}
