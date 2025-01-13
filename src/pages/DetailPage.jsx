import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieService } from '../utils/api';
import { CastCard, Review } from '../components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from '../context/AuthContext';

export function DetailPage() {
    const { id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const { jwtToken } = useAuth();
    const [commentAdded, setCommentAdded] = useState(false); // State theo dõi thay đổi

    useEffect(() => {
        const fetchMovieDetails = async (id) => {
            setLoading(true);
            const data = await MovieService.fetchGetMoviesByTMDB_id(id);  // Detail
            if (data) {
                setDetail(data.data);
            }
            setLoading(false);
        }
        fetchMovieDetails(id);
    }, [id, commentAdded]);

    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);

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
        <div className="text-black p-8 bg-cover bg-center animate-pulse">
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

    if (loading) {
        return <SkeletonLoader />;
    }
    return (
        detail && (
            <div className=" ">
                <div className="text-black p-8 bg-cover bg-center sm:h-screen" style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${detail.backdrop_path}')`,
                }}>
                    <div className="container mx-auto ">
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
                                <p className="text-gray-400 mt-2">{detail.release_date}</p>
                                <p className="text-sm mt-1">
                                    {detail.genres?.map(genre => genre.name).join(", ")}
                                </p>
                                <p className="text-sm mt-1">Rating: {detail.voteAverage}/10</p>

                                <div className="flex items-center gap-4 mt-4">
                                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 focus:outline-none">
                                        <i className="fas fa-plus mr-2"></i> Add to Watchlist
                                    </button>
                                    <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-800 focus:outline-none">
                                        <i className="fas fa-heart mr-2"></i> Like
                                    </button>
                                    <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-800 focus:outline-none">
                                        <i className="fas fa-play mr-2"></i> Play Trailer
                                    </button>
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold">Overview</h2>
                                    <p className="mt-4 text-gray-200">{detail.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold">Danh sách diễn viên</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                    <CastCard CastList={detail.credits.cast} />
                </div>
                <Review reviews={detail.reviews} newComment={newComment} newRating={newRating}
                    setNewComment={setNewComment} setNewRating={setNewRating} handleAddComment={handleAddComment}></Review>
            </div>
        )
    );
}
