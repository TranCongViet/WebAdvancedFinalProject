import { Routes, Route } from 'react-router-dom';
import {
    HomePage, NotFound, SignUpPage,
    LoginPage, ForgotPasswordPage, ActiveAccountPage, DetailPage, CastDetailPage, ProfilePage, SearchPage, LlmMovieSearch, AiNavigate, CastListPage, MovieListPage
} from '../pages'
import { Header, Footer } from '../components/layout'
import { PrivateRoute, CheckLogin, CheckUser, ScrollToTopButton, ScrollToTop } from '../components';
export function User() {
    return (
        <div>
            <ScrollToTopButton />
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={
                    <CheckUser>
                        <HomePage />
                    </CheckUser>
                } />
                <Route path="/home" element={
                    <CheckUser>
                        <HomePage />
                    </CheckUser>
                } />
                <Route path="/signUp" element={
                    <CheckLogin>
                        <SignUpPage />
                    </CheckLogin>
                } />
                <Route path="/login" element={
                    <CheckLogin>
                        <LoginPage />
                    </CheckLogin>
                } />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/active-account" element={<ActiveAccountPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/llmMovieSearch" element={<LlmMovieSearch />} />
                <Route path="/ainavigation" element={<AiNavigate />} />
                <Route path="/person/:id" element={<CastDetailPage />} />
                <Route path="/movieList" element={<MovieListPage />} />
                <Route path="/castList/:id" element={<CastListPage />} />
                <Route path="/movie/:id" element={<DetailPage />} />
                <Route path="/profile" element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    )
}