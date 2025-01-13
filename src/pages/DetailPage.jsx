import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieService } from '../utils/api';
import { CastCard, Review, TrailerDetail } from '../components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../context/AuthContext';

export function DetailPage() {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const { jwtToken, user } = useAuth();
    const [commentAdded, setCommentAdded] = useState(false);
    const [Recomendation, setRecomendation] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async (id) => {
            setLoading(true);
            const data = await MovieService.fetchGetMoviesByTMDB_id(id);
            if (data) {
                console.log("checkvar", data.data)
                setDetail(data.data);
            }
            setLoading(false);
        }
        fetchMovieDetails(id);
    }, []);

    useEffect(() => {
        const fetchMovieDetails = async (id) => {
            setLoading(true);
            const data = await MovieService.fetchGetMoviesByTMDB_id(id);
            if (data) {
                console.log("checkvar", data.data)
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
        console.log("Test data", data);
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
        console.log(`${action} button clicked`);
        // Thực hiện hành động khác tại đây
    };
    const handleRemove = async () => {
        try {
            const response = await MovieService.removeComment(detail.id, jwtToken);
            console.log("remove", response);
            setCommentAdded(!commentAdded);
        } catch (error) {
            console.error("Lỗi khi gọi API: ", error);
        }
    }

    if (loading) {
        return <SkeletonLoader />;
    }
    return (
        detail && (
            <div className="">
                {/* <div className="mx-auto text-black p-8 bg-cover bg-center sm:h-screen bg-no-repeat bg-slate-300" style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${detail.backdrop_path}')`,
                }}> */}
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
                                <p className="text-sm mt-1">Rating: {detail.voteAverage}/10</p>

                                <div className="flex items-center gap-4 mt-4">
                                    <button
                                        className={`flex items-center px-4 py-2 text-white rounded-full focus:outline-none ${jwtToken
                                            ? "bg-blue-600 hover:bg-blue-800"
                                            : "bg-blue-400 cursor-not-allowed"
                                            }`}
                                        disabled={!jwtToken} // Vô hiệu hóa nếu jwtToken là null
                                        onClick={() => jwtToken && handleClick("Add to Watchlist")} // Chỉ chạy hàm nếu jwtToken tồn tại
                                    >
                                        <i className="fas fa-plus mr-2"></i> Add to Watchlist
                                    </button>
                                    <button
                                        className={`flex items-center px-4 py-2 text-white rounded-full focus:outline-none ${jwtToken
                                            ? "bg-gray-600 hover:bg-gray-800"
                                            : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                        disabled={!jwtToken}
                                        onClick={() => jwtToken && handleClick("Like")}
                                    >
                                        <i className="fas fa-heart mr-2"></i> Like
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

                <div className="container mx-auto px-4 flex items-center py-4">
                    <h1 className="text-2xl text-left font-bold text-black">
                        Danh sách diễn viên
                    </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                    <CastCard CastList={detail.credits.cast} />
                </div>
                <div className="container mx-auto px-4 flex items-center py-4">
                    <h1 className="text-2xl text-left font-bold text-black">
                        Recommendation
                    </h1>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                    {loading1
                        ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
                        : <MoviesCard movies={popularMovies} />}
                </div>  */}
                <Review reviews={detail.reviews} newComment={newComment} newRating={newRating}
                    setNewComment={setNewComment} setNewRating={setNewRating} handleAddComment={handleAddComment} handleRemove={handleRemove}></Review>
            </div>
        )
    );
}
