import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../utils/config';
import axios from 'axios';
export function PrivateRoute({ children }) {
    const { setUser, jwtToken, logout } = useAuth();
    setUser(localStorage.getItem('user'));
    if (!localStorage.getItem('user')) {
        return <Navigate to="/login" replace />;
    }
    const check = async () => {
        try {
            // Gọi API và truyền JWT vào header
            const response = await axios.get(`${API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            // Kiểm tra dữ liệu trả về nếu không có lỗi
            console.log('API response:', response.data);

        } catch (error) {
            // Kiểm tra lỗi từ server
            if (error.response) {
                const { status, message } = error.response.data;

                if (status === 'error' && message === 'Token không hợp lệ') {
                    console.error('Token không hợp lệ. Vui lòng đăng nhập lại.');
                    logout();
                }
            }
        }
    };
    check();
    return children;
}

export function CheckLogin({ children }) {
    const { setUser } = useAuth();
    setUser(localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export function CheckUser({ children }) {

    const { jwtToken, logout } = useAuth();

    const check = async () => {
        console.log("check");
        try {
            // Gọi API và truyền JWT vào header
            const response = await axios.get(`${API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            // Kiểm tra dữ liệu trả về nếu không có lỗi
            console.log('API response:', response.data);

        } catch (error) {
            // Kiểm tra lỗi từ server
            console.log("test", error);
            if (error.response) {
                const { status, message } = error.response.data;

                if (status === 'error' && message === 'Token không hợp lệ') {
                    console.error('Token không hợp lệ. Vui lòng đăng nhập lại.');
                    logout();
                }
            }
        }
    };
    check();
    return children;
}