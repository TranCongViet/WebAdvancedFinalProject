export function ToggleTrending({ active, setActive }) {
    return (
        <div className="container p-4 flex items-center">
            <h1 className="text-2xl text-left font-bold text-black">
                Trending
            </h1>
            <div className="relative flex items-center border ml-2 border-gray-300 rounded-full w-48 py-2 bg-white">
                <div
                    className={`absolute top-0 h-full w-1/2 bg-blue-600 rounded-full transition-transform duration-300 transform ${active === "week" ? "translate-x-full" : "translate-x-0"
                        }`}
                ></div>
                <button
                    onClick={() => setActive("day")}
                    className={`relative z-10 w-1/2 text-center font-medium transition-colors duration-300 ${active === "day" ? "text-white" : "text-blue-900"
                        }`}
                >
                    Today
                </button>

                <button
                    onClick={() => setActive("week")}
                    className={`relative z-10 w-1/2 text-center font-medium transition-colors duration-300 ${active === "week" ? "text-white" : "text-blue-900"
                        }`}
                >
                    This Week
                </button>
            </div>
        </div>
    );
}