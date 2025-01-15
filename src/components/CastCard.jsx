import { Link } from "react-router-dom";

export function CastCard({ CastList }) {
    return (
        CastList.map((cast) => (
            <div
                key={cast.cast_id}
                className="bg-white shadow-xl rounded-lg overflow-hidden"
            >
                <div className="relative w-full h-60 overflow-hidden ">
                    <Link to={`/person/${cast.id}`}>
                        <img
                            src={cast.profile_path
                                ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                                : "https://th.bing.com/th/id/R.910cabc7d55bb965d6c42571a2b7973a?rik=HRpRhGm%2fnmbF8g&pid=ImgRaw&r=0"}
                            alt={cast.name || "Movie Poster"}
                            className="w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-125"
                        />
                    </Link>
                </div>
                <div className="p-4">
                    <Link to={`/person/${cast.id}`}>
                        <h2 className="text-sm text-center font-semibold text-gray-800 truncate cursor-pointer hover:underline">{cast.name}</h2>
                    </Link>
                </div>
            </div>
        ))
    );
}