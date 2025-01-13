import { createContext, useState, useContext, useEffect } from 'react';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);
    useEffect(() => {
        setUser(localStorage.getItem('user'));
        setJwtToken(localStorage.getItem('jwt_token'));
    }, []);

    const login = async (token, user) => {
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user', user);
        setUser(user);
        setJwtToken(token);
        navigate('/'); // Chuyển hướng về trang home
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        setUser(null);
        setJwtToken(null);
        navigate('/login'); // Chuyển hướng về trang login
    };

    return (
        <AuthContext.Provider value={{ user, jwtToken, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};