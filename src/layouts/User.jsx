import { Routes, Route } from 'react-router-dom';
import { HomePage, NotFound, SignUpPage, LoginPage } from '../pages'
import { Header, Footer } from '../components/layout'
export function User() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    )
}