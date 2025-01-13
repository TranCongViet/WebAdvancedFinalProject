import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
export function Review({ reviews, newComment, newRating, setNewComment, setNewRating, handleAddComment, handleRemove }) {

    console.log("Test review", reviews);
    const { user } = useAuth();
    return (
        <div className="bg-gray-500 text-white p-6 rounded-lg shadow-lg">

            {user ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Bình luận & Đánh giá</h2>

                    <div className="mb-6">
                        <textarea
                            className="w-full p-2 rounded-md bg-white text-gray-950 border border-gray-700"
                            placeholder="Nhập bình luận..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <div className="flex items-center mt-4">
                            <span className="mr-4">Rate:</span>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={newRating}
                                onChange={(e) => setNewRating(parseInt(e.target.value, 10))}
                                className="w-16 p-2 bg-gray-900 text-white border border-gray-700 rounded-md text-center"
                            />
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-800"
                            onClick={handleAddComment}
                        >
                            Thêm bình luận
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-white">Bạn chưa đăng nhập để tham gia bình luận!</p>
            )
            }
            {
                reviews.length > 0 ? (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Bình luận</h3>
                        <ul className="space-y-4">
                            {reviews.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sắp xếp theo ngày giảm dần
                                .map((reviews, index) => (
                                    <li key={index} className="bg-gray-900 p-4 rounded-md">
                                        <div className="flex justify-between items-center mt-2 text-gray-400">
                                            <span>{reviews.author} - {reviews.author_details.rating} Sao</span>
                                            <span className="text-sm">
                                                {new Date(reviews.updated_at).toLocaleDateString('en-GB')}
                                            </span>
                                        </div>
                                        <div>
                                            <p>{reviews.content}</p>
                                            {
                                                reviews.author == user &&
                                                <div className="flex justify-end">
                                                    <button className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 8.588l-7.053 7.053a.997.997 0 001.414 1.414L10 10.414l7.053 7.053a.997.997 0 001.414-1.414L11.414 10 20 2.588A1 1 0 0018.588 1H11.414a1 1 0 00-.952.344l-7.053 7.053a1 1 0 000 1.414l7.053 7.053a1 1 0 001.414 0l7.053-7.053a1 1 0 00-.344-.952H11.414a1 1 0 00-.952-.344l-7.053-7.053a1 1 0 00-1.414 0L10 8.588z" />
                                                        </svg>
                                                        <span onClick={handleRemove}>Remove</span>
                                                    </button>
                                                </div>

                                            }
                                        </div>

                                    </li>
                                ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-white">Không có bình luận ở đây. Hãy bình luận đầu tiên!</p>
                )
            }
        </div>
    );
};
