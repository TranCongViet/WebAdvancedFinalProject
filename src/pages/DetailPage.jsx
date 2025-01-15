import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MovieService } from '../utils/api';
import { CastCard, Review, TrailerDetail, MoviesCard } from '../components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FadeLoader } from 'react-spinners';
import { useAuth } from '../context/AuthContext';
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify

export function DetailPage() {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const { jwtToken } = useAuth();
    const [commentAdded, setCommentAdded] = useState(false);
    const [Recomendation, setRecomendation] = useState(null);
    const [Recomendation2, setRecomendation2] = useState(null);
    const [checkIsWatchList, setCheckIsWatchList] = useState(false);
    const [checkIsLiked, setCheckIsLiked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const movieDetails = await fetchMovieDetails(id);

                if (movieDetails && movieDetails.genres) {

                    const genreNames = movieDetails.genres.map(genre => genre.name);

                    await recommendationByGenres(genreNames);

                    await recommendationBySimilar(movieDetails.title)
                }
                const check1 = await MovieService.checkIsWatchList(id, jwtToken);
                setCheckIsWatchList(check1.data.data);
                const check2 = await MovieService.checkIsLiked(id, jwtToken);
                setCheckIsLiked(check2.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchMovieDetails = async (id) => {
            const data = await MovieService.fetchGetMoviesByTMDB_id(id);
            if (data) {
                setDetail(data.data);
                return data.data;
            }
            return null;
        };

        const recommendationByGenres = async (genres) => {
            const data = await MovieService.recommendationByGenres(genres);
            if (data) {
                setRecomendation(data.data.data.content);
            }
        };

        // const getMovieByList = await MovieService.getMoviesByList(data.data.data.result);
        // setMovies(getMovieByList.data.data.content);

        const recommendationBySimilar = async (title) => {
            const data = await MovieService.recommendationBySimilar(title);
            console.log("check", data);
            if (data) {
                const temp = await MovieService.getMoviesByList(data.data.data.result);
                console.log("check temp", temp);
                setRecomendation2(temp.data.data.content);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchMovieDetails = async (id) => {
            setLoading(true);
            const data = await MovieService.fetchGetMoviesByTMDB_id(id);
            if (data) {
                setDetail(data.data);
            }
            setLoading(false);
        }
        fetchMovieDetails(id);
    }, [id, commentAdded]);

    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);


    const handleAddComment = async () => {
        if (newComment.trim() === "" || newRating === 0) {
            alert("Vui lòng nhập bình luận và đánh giá!");
            return;
        }
        const data = await MovieService.addComment(detail.id, newComment, newRating, jwtToken);
        if (data.status == "error") {
            alert("Bạn đã bình luận và đánh giá rồi!");
            setNewComment("");
            setNewRating(0);
            return;
        }
        setNewComment("");
        setNewRating(0);
        setCommentAdded(!commentAdded);
    };
    const SkeletonLoader = () => (
        <div className="text-black p-8 bg-cover bg-center animate-pulse h-screen">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row  items-start gap-6">
                    <div className="w-full sm:w-60 h-80 bg-gray-300 rounded-lg"></div>

                    <div className="flex-1 space-y-4 w-full">
                        <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
                        <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
                        <div className="w-2/3 h-6 bg-gray-300 rounded"></div>
                        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
    const handleClick = (action) => {
        if (action == "handleRemoveWatchList") handleRemoveWatchList();
        if (action == "handleLike") handleLike();
        if (action == "handleUnlike") handleUnlike();
        if (action == "handleAddWatchList") handleAddWatchList();
        // Thực hiện hành động khác tại đây
    };
    const handleRemove = async () => {
        try {
            const response = await MovieService.removeComment(detail.id, jwtToken);
            setCommentAdded(!commentAdded);
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
        }
    }
    const handleRemoveWatchList = async () => {
        try {
            const response = await MovieService.removeWatchList(detail.id, jwtToken);
            setCheckIsWatchList(false);
            toast.error("Xoá khỏi watch list thành công!");
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
            setCheckIsWatchList(false);
            toast.error("Xoá khỏi watch list thành công!");
        };
    }
    const handleUnlike = async () => {
        try {
            const response = await MovieService.removeFavoriteList(detail.id, jwtToken);
            setCheckIsLiked(false);
            toast.error("Xoá khỏi favorite list thành công!");
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
            setCheckIsLiked(false);
            toast.error("Xoá khỏi favorite list thành công!");
        };
    }
    const handleAddWatchList = async () => {
        try {
            const response = await MovieService.addMovieWatchList(detail.id, jwtToken);
            setCheckIsWatchList(true);
            toast.success("Thêm vào watch list! 🎉");
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
            toast.success("Thêm vào watch list! 🎉");
            setCheckIsWatchList(true);
        };
    }
    const handleLike = async () => {
        try {
            const response = await MovieService.addFavoriteList(detail.id, jwtToken);
            setCheckIsLiked(true);
            toast.success("Thêm vào favorite list! 🎉");
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
        };
    }
    if (loading) {
        return <SkeletonLoader />;
    }
    if (loading == false && detail == null) {
        return <div className="h-screen text-center mt-10 text-2xl font-bold">Không tìm thấy dữ liệu này trong Database 😢</div>;
    }
    return (
        detail && (
            <div className="w-full">
                <ToastContainer />
                <div className="mx-auto text-black p-8 bg-cover bg-center  bg-slate-300" >
                    <div className="">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="w-full sm:w-60 sm:h-full  mb-4 sm:mb-0">
                                <img
                                    src={detail.poster_path ? `https://image.tmdb.org/t/p/original${detail.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
                                    alt={detail.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            <div className="flex-1">
                                <h1 className="text-3xl sm:text-4xl font-bold">{detail.title}</h1>
                                <p className="text-black-400 mt-2">{detail.release_date}</p>
                                <p className="text-sm mt-1">
                                    {detail.genres?.map(genre => genre.name).join(", ")}
                                </p>
                                <p className="text-sm mt-1">Rating: {detail.voteAverage.toFixed(2)}/10🌟</p>

                                <div className={`flex items-center gap-4 mt-4 `}>
                                    <button
                                        className={`flex items-center px-4 py-2 text-white rounded-full focus:outline-none ${!jwtToken ? "hidden" : ""} ${jwtToken
                                            ? "bg-blue-600 hover:bg-blue-800"
                                            : "bg-blue-400 cursor-not-allowed"
                                            }`}
                                        disabled={!jwtToken} // Vô hiệu hóa nếu jwtToken là null
                                        onClick={() => jwtToken && handleClick(checkIsWatchList ? "handleRemoveWatchList" : "handleAddWatchList")} // Chạy hàm với nội dung phù hợp
                                    >
                                        <i className={`fas ${checkIsWatchList ? "fa-minus" : "fa-plus"}`}></i>
                                    </button>

                                    <button
                                        className={`flex items-center px-4 py-2 text-white rounded-full focus:outline-none ${!jwtToken ? "hidden" : ""} ${jwtToken
                                            ? "bg-gray-600 hover:bg-gray-800"
                                            : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                        disabled={!jwtToken} // Vô hiệu hóa nếu jwtToken là null
                                        onClick={() => jwtToken && handleClick(checkIsLiked ? "handleUnlike" : "handleLike")} // Chạy hàm với nội dung phù hợp
                                    >
                                        <i
                                            className={`fas fa-heart ${checkIsLiked ? "text-red-600" : "text-gray-400"}`}
                                        ></i>
                                    </button>
                                    <button className="flex items-center px-4 py-2 text-white rounded-full focus:outline-none bg-red-600 hover:bg-red-800 "
                                        onClick={() => setSelectedMovie(detail.trailers[0].key)}>
                                        <i className="fas fa-play mr-2"></i> Play Trailer
                                    </button>
                                </div>
                                <TrailerDetail
                                    youtubeId={selectedMovie}
                                    onClose={() => setSelectedMovie(null)}
                                />

                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold">Overview</h2>
                                    <p className="mt-4 text-black-200">{detail.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" p-4 flex items-center justify-between w-full">
                    <h1 className="text-2xl  font-bold text-black">
                        Danh sách diễn viên
                    </h1>
                    <Link to={`/castList/${detail.id}`} className="text-base font-bold text-black hover:underline cursor-pointer">
                        Xem tất cả
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                    <CastCard CastList={detail.credits.cast.slice(0, 10)} />
                </div>


                <div className="container px-4 flex items-center py-4">
                    <h1 className="text-2xl text-left font-bold text-black">
                        Gợi ý phim theo thể loại
                    </h1>
                </div>

                {
                    Recomendation === null
                        ? (
                            <div className="h-60 inset-0 flex items-center justify-center bg-gray-100 ">
                                <FadeLoader />
                            </div>
                        )
                        : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">

                                <MoviesCard movies={Recomendation.slice(5)} />
                            </div>
                        )
                }


                <div className="container px-4 flex items-center py-4">
                    <h1 className="text-2xl text-left font-bold text-black">
                        Gợi ý phim tương tự
                    </h1>
                </div>

                {
                    Recomendation2 === null
                        ? (
                            <div className="h-60 inset-0 flex items-center justify-center bg-gray-100 ">
                                <FadeLoader />
                            </div>
                        )
                        : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">

                                <MoviesCard movies={Recomendation2.slice(0, 5)} />
                            </div>
                        )
                }


                <Review reviews={detail.reviews} newComment={newComment} newRating={newRating}
                    setNewComment={setNewComment} setNewRating={setNewRating} handleAddComment={handleAddComment} handleRemove={handleRemove}></Review>
            </div>
        )
    );
}
