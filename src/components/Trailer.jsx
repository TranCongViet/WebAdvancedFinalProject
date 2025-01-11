import { useState } from "react";

export function Trailer() {
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Dữ liệu phim giả lập
    const movies = [
        {
            id: 1,
            title: "Movie 1",
            poster: "https://tiki.vn/blog/wp-content/uploads/2023/01/Y7deW5ZtpOonbiD_XawHLHdkjKYKHvWxvxNZzKdXXn0L8InieLIH_-U5m0u-RUlFtXKp0Ty91Itj4Oxwn_tjKg_UZo3lxFSrOH_DHIbpKP1LDn80z6BbOxj4d8bmymdy8PWFGjLkTpCdoz-3X-KY7IedQ_dxWJlHSIBWwCYhgM02FvUfVUgLKOQxrQWgjw.jpg",
            youtubeId: "dQw4w9WgXcQ", // Video giả lập trên YouTube
        },
        {
            id: 2,
            title: "Movie 2",
            poster: "https://tiki.vn/blog/wp-content/uploads/2023/01/Y7deW5ZtpOonbiD_XawHLHdkjKYKHvWxvxNZzKdXXn0L8InieLIH_-U5m0u-RUlFtXKp0Ty91Itj4Oxwn_tjKg_UZo3lxFSrOH_DHIbpKP1LDn80z6BbOxj4d8bmymdy8PWFGjLkTpCdoz-3X-KY7IedQ_dxWJlHSIBWwCYhgM02FvUfVUgLKOQxrQWgjw.jpg",
            youtubeId: "5NV6Rdv1a3I",
        },
    ];

    // Component hiển thị danh sách phim
    const MoviesGrid = ({ movies, onMovieClick }) => (
        <div className="grid grid-cols-2 gap-4 p-4">
            {movies.map((movie) => (
                <div
                    key={movie.id}
                    className="cursor-pointer"
                    onClick={() => onMovieClick(movie.youtubeId)}
                >
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform"
                    />
                    <h3 className="text-center mt-2 font-medium">{movie.title}</h3>
                </div>
            ))}
        </div>
    );

    // Component hiển thị video YouTube
    const MovieDetail = ({ youtubeId, onClose }) => {
        if (!youtubeId) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div className="bg-black p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-1 text-white font-bold text-4xl "
                    >
                        x
                    </button>
                    <div className="relative w-full" style={{ paddingTop: "80%" }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mt-4">Movies Gallery</h1>
            <MoviesGrid movies={movies} onMovieClick={setSelectedMovie} />
            <MovieDetail
                youtubeId={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
};

