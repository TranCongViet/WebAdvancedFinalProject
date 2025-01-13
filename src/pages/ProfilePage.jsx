import { useEffect, useState } from 'react';
import { MovieService } from '../utils/api';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
export function ProfilePage() {
    const [selected, setSelected] = useState(1);
    const { jwtToken } = useAuth();

    const [RatingList, setRatingList] = useState([]);
    const [FavoriteList, setFavoriteList] = useState([]);
    const [WatchList, setWatchList] = useState([]);

    const [LoadingRating, setLoadingRating] = useState(true);
    const [LoadingFavorite, setLoadingFavorite] = useState(true);
    const [LoadingWatch, setLoadingWatch] = useState(true);

    const getAllMovieRatingList = async () => {
        try {
            setLoadingRating(true);
            const data = await MovieService.getAllMovieRatingList(jwtToken);  // Detail
            console.log(data);
            if (data) {
                setRatingList(data.data.content);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
        } finally {
            setLoadingRating(false);
        }
    }
    const getAllMovieFavoriteList = async () => {
        try {
            setLoadingFavorite(true);
            const data = await MovieService.getAllMovieFavoriteList(jwtToken);  // Detail
            if (data) {
                setFavoriteList(data.content);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
            setFavoriteList([]);
        } finally {
            setLoadingFavorite(false);
        }
    }
    const getAllMovieWatchList = async () => {
        try {
            setLoadingWatch(true);
            const data = await MovieService.getAllMovieWatchList(jwtToken);
            if (data) {
                setWatchList(data.data.content);
            }
        }
        catch (error) {
            console.error("Lỗi khi gọi API: ", error);
            setWatchList([]);
        } finally {
            setLoadingWatch(false);
        }
    }

    const handleRemoveWatchList = async (movieId) => {
        try {
            const response = await MovieService.removeWatchList(movieId, jwtToken);
            if (response.data.status === "success") {
                getAllMovieWatchList();
            } else {
                console.error("Failed to remove movie");
            }
        } catch (error) {
            console.error("Error removing movie:", error);
        }
    };
    const handleRemoveFavoriteList = async (movieId) => {
        try {
            const response = await MovieService.removeFavoriteList(movieId, jwtToken);
            if (response.data.status === "success") {
                getAllMovieFavoriteList();
            } else {
                console.error("Failed to remove movie");
            }
        } catch (error) {
            getAllMovieFavoriteList();
            console.error("Error removing movie:", error);
        }
    };
    const handleRemoveRatingList = async (movieId) => {
        try {
            const response = await MovieService.removeRatingList(movieId, jwtToken);
            console.log("Test", response);
            if (response.data.status === "success") {
                getAllMovieRatingList();
            } else {
                console.error("Failed to remove movie");
            }
        } catch (error) {
            getAllMovieRatingList();
            console.error("Error removing movie:", error);
        }
    };

    useEffect(() => {
        if (selected === 3) {
            getAllMovieRatingList();
        } else if (selected === 2) {
            getAllMovieFavoriteList();
        } else if (selected === 1) {
            getAllMovieWatchList();
        }
    }, [selected]);


    const links = [
        { id: 1, label: 'Watch list', href: '#/profile' },
        { id: 2, label: 'Favorite list', href: '#/profile' },
        { id: 3, label: 'Rating list', href: '#/profile' },
    ];

    const user = {
        name: "John Doe",
        dob: "1990-01-01",
        avatar: "https://th.bing.com/th/id/OIP.GvNakgya1kk5A6CFQM6Z4gHaHZ?rs=1&pid=ImgDetMain", // Avatar image URL
    };

    const getContent = () => {
        if (selected === 1) {
            if (LoadingWatch) {
                return <p className="text-center min-h-72">Loading...</p>;
            }
            if (WatchList.length === 0) {
                return <p className="text-center min-h-72">Danh sách phim rỗng</p>;
            }
            return (
                <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                        {WatchList.map((movie) => (
                            <li key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                                <div className="flex">
                                    <div className="relative w-52 h-60 overflow-hidden ">
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
                                    <div className="ml-4">
                                        <h3 className="font-semibold">{movie.title}</h3>
                                        <p className="text-gray-500">{movie.release_date}</p>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-red-500 hover:text-red-700 flex items-center"
                                                onClick={() => handleRemoveWatchList(movie.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (selected === 2) {
            if (LoadingFavorite) {
                return <p className="text-center min-h-72">Loading...</p>;
            }
            if (FavoriteList.length === 0) {
                return <p className="text-center min-h-72">Danh sách phim rỗng</p>;
            }
            return (
                <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                        {FavoriteList.map((movie) => (
                            <li key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                                <div className="flex">
                                    <div className="relative w-60 h-60 overflow-hidden ">
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
                                    <div className="ml-4">
                                        <h3 className="font-semibold">{movie.title}</h3>
                                        <p className="text-gray-500">{movie.release_date}</p>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-red-500 hover:text-red-700 flex items-center"
                                                onClick={() => handleRemoveFavoriteList(movie.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (selected === 3) {
            if (LoadingRating) {
                return <p className="text-center min-h-72">Loading...</p>;
            }
            if (RatingList.length === 0) {
                return <p className="text-center min-h-72">Danh sách phim rỗng</p>;
            }
            return (
                <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                        {RatingList.map((rating) => (
                            <li key={rating.movie.id} className="bg-white rounded-lg shadow-md p-4">
                                <div className="flex">
                                    <div className="relative w-60 h-60 overflow-hidden ">
                                        <Link to={`/movie/${rating.movie.id}`}>
                                            <img
                                                src={rating.movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${rating.movie.poster_path}`
                                                    : "https://via.placeholder.com/500x750?text=No+Image"}
                                                alt={rating.movie.title || "Movie Poster"}
                                                className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-125"
                                            />
                                        </Link>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-semibold">{rating.movie.title}</h3>
                                        <p className="text-gray-500">{rating.movie.release_date}</p>
                                        <p className="text-gray-500">My rating: {rating.rating}</p>
                                        <div className="flex items-center space-x-2">
                                            <button className="text-red-500 hover:text-red-700 flex items-center"
                                                onClick={() => handleRemoveRatingList(rating.movie.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg flex items-center space-x-6">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                    <p className="text-gray-500 mt-2">Date of Birth: {new Date(user.dob).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="flex space-x-4 items-center justify-center mt-4">
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        className={`py-2 px-4 font-bold rounded text-gray-800 hover:underline hover:text-blue-600
                        ${selected === link.id
                                ? 'underline text-blue-700'
                                : ' hover:underline hover:text-blue-700'
                            }`}
                        onClick={() => setSelected(link.id)}
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            <div className="mt-6">
                {getContent()}
            </div>
        </div>
    );
}
