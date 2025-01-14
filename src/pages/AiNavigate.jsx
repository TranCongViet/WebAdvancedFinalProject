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
            const query = searchParams.get("query");
            console.log('1')
            const temp = await MovieService.AiNavigate(query);
            setNavigate(temp.data.data);
        };
        getSearchResult();
    }, [searchParams]);
    if (navigate != null) {
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
            Navigate(`/movie/${navigate.params.id}`)
        }
    }
    return (
        <div className="flex justify-center pt-5 h-screen bg-gray-100 bg-opacity-100">
            <FadeLoader />
        </div>
    );
}