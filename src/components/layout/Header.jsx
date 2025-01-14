import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authcontext.jsx';
export function Header() {
    const { logout, user } = useAuth();
    return (
        <header className="bg-slate-400 max-w-full w-full top-0 left-0 ">
            <div className="container mx-auto flex justify-between items-center py-4 px-4">
                <Link to="/" >
                    <div className="text-2xl font-bold text-blue-600">
                        Movies
                    </div>
                </Link>
                {user ? (
                    <div>
                        <Link to="/profile" className="text-blue-600 font-semibold px-4 py-2  hover:text-white transition duration-300">
                            {user}
                        </Link>
                        <button onClick={logout}
                            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700"
                        >
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login" >
                            <button className="px-4 py-2 text-blue-600 font-semibold hover:text-blue-100">
                                Đăng nhập
                            </button>
                        </Link>
                        <Link to="/signup" >
                            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700">
                                Đăng ký
                            </button>
                        </Link>
                    </div>)
                }
            </div>
        </header>
    );
}