import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(localStorage.getItem('user'));
    }, []);

    const login = async (token, user) => {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user', user);
        setUser(user);
        navigate('/'); // Chuyển hướng về trang home
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login'); // Chuyển hướng về trang login
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};