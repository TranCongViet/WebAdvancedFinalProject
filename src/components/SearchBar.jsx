import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(
        localStorage.getItem("searchType") || "Search"
    ); // Lấy giá trị từ localStorage hoặc giá trị mặc định

    useEffect(() => {
        localStorage.setItem("searchType", selectedOption); // Cập nhật localStorage mỗi khi selectedOption thay đổi
    }, [selectedOption]);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (selectedOption === "Search") {
            navigate(`/search?query=${query}&page=1`);
        } else if (selectedOption === "LLM Movie Search") {
            navigate(`/llmMovieSearch?query=${query}`);
        } else if (selectedOption === "AI Navigation") {
            navigate(`/ainavigation?query=${query}`);
        }
        setQuery(""); // Xóa nội dung tìm kiếm sau khi gửi
    };
    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const TypeSearch = ["Search", "LLM Movie Search", "AI Navigation"];

    return (
        <form
            className="py-4 px-4 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-2"
            onSubmit={handleSearch}
        >
            <div className="w-full md:w-auto">
                <select
                    value={selectedOption} // Liên kết với trạng thái
                    onChange={handleChange} // Xử lý khi có sự thay đổi
                    className="w-full md:w-[155px] h-10 text-black bg-gray-50 rounded-lg focus:outline-none"
                >
                    {TypeSearch.map((s, i) => (
                        <option key={i} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            <div className="relative w-full md:w-auto flex-grow">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full h-10 p-4 pl-10 text-sm text-gray-900 rounded-lg bg-gray-50 outline-none"
                    placeholder="Search ..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="w-full md:w-auto h-10 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white text-sm font-medium rounded-lg focus:ring-4"
            >
                Search
            </button>
        </form>
    );
}
