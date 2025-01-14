import { useEffect, useState } from "react"
import { MovieService } from "../utils/api";
import { CastCard } from "../components";
import { useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
export function CastListPage() {
    const { id } = useParams();
    const [Loading, setLoading] = useState(true);
    const [listCast, setListCast] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async (id) => {
            setLoading(true);
            const data = await MovieService.fetchGetMoviesByTMDB_id(id);
            if (data) {
                setListCast(data.data);
            }
            setLoading(false);
        }
        fetchMovieDetails(id);
    }, [id]);
    if (Loading) {
        return (
            <div className="h-screen inset-0 flex items-center justify-center bg-gray-100 ">
                <FadeLoader />
            </div>
        )
    }
    return (
        <>
            <div className="container mx-auto px-4 flex items-center justify-between py-4">
                <h1 className="text-2xl text-left font-bold text-red-500">
                    Danh sách diễn viên {listCast.title}
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-5 pt-5">
                <CastCard CastList={listCast.credits.cast} />
            </div>
        </>
    )
}