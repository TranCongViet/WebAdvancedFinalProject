import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ children }) {
    const { setUser } = useAuth();
    setUser(localStorage.getItem('user'));
    if (!localStorage.getItem('user')) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
