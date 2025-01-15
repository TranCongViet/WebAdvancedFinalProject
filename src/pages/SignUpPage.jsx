import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { useAuth } from '../context/AuthContext';

export function SignUpPage() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    if (user != null) {
        navigate('/');
    }
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`https://movies-recommendation-api-xhpa.onrender.com/user/register`, {
                username: data.username,
                password: data.password,
                email: data.email,
            });
            setMessage("Đăng ký thành công, chuyển hướng về trang đăng nhập sau 2s...");
            setIsError(false);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (!error.response) {
                setMessage('Server không phản hồi, vui lòng thử lại sau!');
            } else {
                setMessage(error.response.data.message);
            }
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-gray-50 relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <FadeLoader />
                </div>
            )}
            <section className="max-w-full w-full flex items-center h-screen justify-center">
                <div className={`w-full flex flex-col items-center justify-center px-6 py-8 lg:py-0 `}>
                    <div className="w-full bg-white rounded-lg shadow  xl:p-0 sm:max-w-md ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold  text-gray-900 md:text-2xl">
                                Tạo tài khoản mới
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
                                                message: 'Tên đăng nhập cần ít nhất 4 ký tự',
                                            },
                                        })}
                                    />
                                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Nhập email của bạn"
                                        {...register('email', {
                                            required: 'Email là bắt buộc',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Email không hợp lệ',
                                            },
                                        })}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
                                        {...register('password', {
                                            required: 'Mật khẩu là bắt buộc',
                                            minLength: {
                                                value: 4,
                                                message: 'Mật khẩu phải có độ dài từ 4 đến 255 ký tự',
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: 'Mật khẩu phải có độ dài từ 4 đến 255 ký tự',
                                            },
                                        })}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Xác nhận mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        {...register('confirmPassword', {
                                            required: 'Vui lòng xác nhận mật khẩu',
                                            minLength: {
                                                value: 4,
                                                message: 'Mật khẩu phải có độ dài từ 4 đến 255 ký tự',
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: 'Mật khẩu phải có độ dài từ 4 đến 255 ký tự',
                                            },
                                            validate: (value) => value === watch('password') || 'Mật khẩu không khớp',
                                        })}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-black bg-blue-600 hover:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Đăng kí
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Bạn đã có tài khoản?{' '}
                                    <Link to="/login" className="font-medium text-primary-600 hover:underline">
                                        Đăng nhập tại đây
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}