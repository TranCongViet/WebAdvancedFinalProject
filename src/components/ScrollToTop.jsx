import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn trang lên đầu khi location thay đổi
    }, [location]);

    return null; // Không cần render gì
};

