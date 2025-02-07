import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieService } from '../utils/api';
import { FadeLoader } from 'react-spinners';
import { SearchBar } from '../components';

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

    const fetchDataMoviePage = async () => {
        try {
            const result = await MovieService.getMoviesByMongoID(navigate.params.movie_ids[0]);
            Navigate(`/movie/${result.data.data.content[0].id}`)
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    const fetchDataCastPage = async () => {
        try {
            const result = await MovieService.getListMovieByMongoID(navigate.params.movie_ids);
            console.log("Toi can check var", result.data.data.content[0].id);
            Navigate(`/castList/${result.data.data.content[0].id}`)
            setLoading(false);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }

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
            if (navigate.params == null) {
                return <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
                    Truy vấn của bạn không tìm thấy kết quả 😢
                </div>
            }
            fetchDataMoviePage();
        }
        else if (navigate.route == "CAST_PAGE") {
            if (navigate.params == null) {
                return <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
                    Truy vấn của bạn không tìm thấy kết quả
                </div>
            }
            fetchDataCastPage();
        }
        return <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
            Truy vấn của bạn không tìm thấy kết quả
        </div>
    }

    return (
        <div className="flex flex-col bg-gray-100 rounded-lg p-5">
            <SearchBar />
            <div className=" text-blue-600 font-semibold ">
                Tìm kiếm: <span className="font-semibold text-black">{searchParams.get("query")}</span>
            </div>
            {
                (loading) ?
                    <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
                        <FadeLoader />
                    </div> : <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100 font-bold text-3xl">  Lỗi server AI
                    </div>
            }
        </div>
    );
}