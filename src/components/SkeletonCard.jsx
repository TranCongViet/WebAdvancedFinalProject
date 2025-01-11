export function SkeletonCard() {
    return (
        <div className="bg-white shadow-xl rounded-lg overflow-hidden animate-pulse">
            <div className="relative w-full h-60 bg-gray-300"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );
}


