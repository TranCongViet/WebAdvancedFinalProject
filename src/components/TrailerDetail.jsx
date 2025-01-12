
export function TrailerDetail({ youtubeId, onClose }) {
    if (!youtubeId) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-black p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-4 text-white font-bold text-2xl bg-red-500 p-2 rounded-2xl hover:bg-red-700"
                    aria-label="Close"
                >
                    ✕
                </button>

                <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: "70%" }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
