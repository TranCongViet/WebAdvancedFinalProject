import { Routes, Route } from 'react-router-dom';
import {
    HomePage, NotFound, SignUpPage,
    LoginPage, ForgotPasswordPage, ActiveAccountPage, DetailPage, CastDetailPage, ProfilePage, SearchPage, LlmMovieSearch, AiNavigate, CastListPage
} from '../pages'
import { Header, Footer } from '../components/layout'
import { PrivateRoute } from '../components';
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
                <Route path="/search" element={<SearchPage />} />
                <Route path="/llmMovieSearch" element={<LlmMovieSearch />} />
                <Route path="/ainavigation" element={<AiNavigate />} />
                <Route path="/person/:id" element={<CastDetailPage />} />
                <Route path="/castList/:id" element={<CastListPage />} />
                <Route path="/movie/:id" element={<DetailPage />} />
                <Route path="/profile" element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    )
}