import { Routes, Route } from 'react-router-dom';
import {
    HomePage, NotFound, SignUpPage,
    LoginPage, ForgotPasswordPage, ActiveAccountPage, DetailPage, CastDetailPage, ProfilePage
} from '../pages'
import { Header, Footer } from '../components/layout'
export function User() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signUp" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/active-account" element={<ActiveAccountPage />} />
                <Route path="/person/:id" element={<CastDetailPage />} />
                <Route path="/movie/:id" element={<DetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    )
}