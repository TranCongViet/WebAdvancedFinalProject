import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieService } from '../utils/api';
import { FadeLoader } from 'react-spinners';

export function AiNavigate() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [navigate, setNavigate] = useState();
    const Navigate = useNavigate();
    useEffect(() => {
        const getSearchResult = async () => {
            try {
                const query = searchParams.get("query");
                const temp = await MovieService.AiNavigate(query);
                setNavigate(temp.data.data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };
        getSearchResult();
    }, [searchParams]);

    const fetchData = async () => {
        try {
            console.log("Test mongoid", navigate.params.movie_ids[0]);
            const result = await MovieService.getMoviesByMongoID(navigate.params.movie_ids[0]); // Đợi kết quả trả về từ `data()`
            console.log("Test", result);
            //Navigate(`/movie/${id}`)
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    if (navigate != null) {
        if (navigate.status == "500") {
            <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
                Lỗi server AI
            </div>
        }
        if (navigate.route == "HOME_PAGE" || navigate.route == "NONE") {
            Navigate('/');
        }
        else if (navigate.route == "PROFILE_PAGE") {
            Navigate('/profile');
        }
        else if (navigate.route == "SEARCH_PAGE") {
            localStorage.setItem("searchType", "Search");
            Navigate(`/search?query=${navigate.params.keyword}&page=1`)
        }
        else if (navigate.route == "MOVIE_PAGE") {
            console.log("Đã vô");
            if (navigate.params == null) {
                return <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
                    Truy vấn của bạn không tìm thấy kết quả
                </div>
            }
            fetchData();
        }
        else if (navigate.route == "CAST_PAGE") {
            if (navigate.params == null) {
                return <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
                    Truy vấn của bạn không tìm thấy kết quả
                </div>
            }
            Navigate(`/ castList / ${navigate.params.movie_ids[0]}`)
        }
        return <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
            Truy vấn của bạn không tìm thấy kết quả
        </div>
    }

    return (
        (loading) ?
            <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
                <FadeLoader />
            </div> : <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100 font-bold text-3xl">  Lỗi server AI
            </div>
    );
}