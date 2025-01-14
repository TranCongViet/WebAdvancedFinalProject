import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isOTPFormVisible, setIsOTPFormVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`https://movies-recommendation-api-xhpa.onrender.com/user/send-otp`, {
                email: email,
            });
            setIsOTPFormVisible(true);
        } catch (error) {
            setMessage(error.response.data.message);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.patch(`https://movies-recommendation-api-xhpa.onrender.com/user/reset-password`, {
                email: email,
                otp: otp,
                password: newPassword,
            });
            setMessage("Khôi phục mật khẩu thành công, chuyển hướng về trang đăng nhập sau 2s...");
            setIsError(false);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage(error.response.data.message);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader />
                </div>
            )}
            <div className="container mx-auto p-4 h-screen">
                <h1 className="text-3xl font-bold mb-4">Khôi phục mật khẩu</h1>
                <p className="mb-6">
                    Nhập email bạn đã sử dụng để đăng ký tài khoản, chúng tôi sẽ gửi cho bạn các bước cần thiết để đặt lại mật khẩu.
                </p>
                {message && (
                    <div
                        className={`p-4 text-sm mb-2 rounded-lg ${isError
                            ? 'text-red-700 bg-red-100'
                            : 'text-green-700 bg-green-100'
                            }`}
                        role="alert"
                    >
                        {message}
                    </div>
                )}
                {!isOTPFormVisible ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nhập email khôi phục"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Continue
                            </button>
                            <Link to="/" className="ml-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Cancel
                            </Link>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                                Mã OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nhập mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Xác nhận OTP
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>

    );
}
