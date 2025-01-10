import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { useAuth } from '../context/authcontext.jsx';

export function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, login } = useAuth();
    const navigate = useNavigate();
    if (user != null) {
        navigate('/');
    }
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`https://movies-recommendation-api-xhpa.onrender.com/user/login`, {
                username: data.username,
                password: data.password,
            });
            setMessage(response.data.message);
            setIsError(false);
            login(response.data.access_token, response.data.username);
        } catch (error) {
            if (!error.response) {
                setMessage('Server không phản hồi, vui lòng thử lại sau!');
            } else {
                if (error.response.data.message == "Tài khoản chưa được xác thực.") {

                    setMessage("Vui lòng kích hoạt tài khoản, chuyển hướng về trang kích hoạt sau 2s...")
                    setTimeout(() => {
                        navigate('/active-account');
                    }, 2000);
                }
            }
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        const authorizationCode = response.credential;
        console.log(authorizationCode)
        setLoading(true);
        try {
            // Gửi mã authorizationCode đến backend để lấy access_token
            const result = await axios.post(`https://movies-recommendation-api-xhpa.onrender.com/google`, {
                googleTokenId: authorizationCode,
            });

            login(result.data.token, result.data.username);
        } catch (error) {
            console.error("Đăng nhập thất bại", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error(error);
    };

    return (
        <div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader />
                </div>
            )}
            <GoogleOAuthProvider clientId="556513470710-a1cbs7ppecssiuc5875ohm0kfvdpfjdl.apps.googleusercontent.com">
                <section className="max-w-full w-full flex items-center h-screen justify-center">
                    <div className={`flex flex-col items-center justify-center px-6 py-8 lg:py-0`}>
                        <div className="bg-white rounded-lg shadow sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                                    Đăng nhập vào tài khoản của bạn
                                </h1>
                                {message && (
                                    <div
                                        className={`p-4 text-sm rounded-lg ${isError
                                            ? 'text-red-700 bg-red-100'
                                            : 'text-green-700 bg-green-100'
                                            }`}
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                )}
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                            Tên đăng nhập
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="Nhập tên đăng nhập"
                                            {...register('username', {
                                                required: 'Tên đăng nhập là bắt buộc',
                                                minLength: {
                                                    value: 4,
                                                    message: 'Tên đăng nhập cần ít nhất 6 ký tự',
                                                }
                                            })}
                                        />
                                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                            Mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                    </div>
                                    <div className="flex justify-end">
                                        <Link to="/forgot-password" className="text-sm font-medium hover:underline">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-black bg-blue-600 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Đăng nhập
                                    </button>
                                </form>

                                <div className="flex justify-center">
                                    <GoogleLogin
                                        onSuccess={handleGoogleLoginSuccess}
                                        onFailure={handleGoogleLoginFailure}
                                        useOneTap
                                        className="w-full flex justify-center mt-4 hover:opacity-50 rounded-lg"
                                    />
                                </div>
                                <p className="text-sm font-light text-gray-500">
                                    Bạn chưa có tài khoản?{' '}
                                    <Link to="/signup" className="font-medium text-primary-600 hover:underline">
                                        Đăng kí tại đây
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </GoogleOAuthProvider>
        </div>
    );
}
