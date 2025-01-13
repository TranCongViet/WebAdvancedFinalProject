import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { MovieService } from '../utils/api';

import { useParams } from 'react-router-dom';

export function CastDetailPage() {
    const { id } = useParams();
    const [Loading, setLoading] = useState(false);
    const [person, setPerson] = useState(null);

    useEffect(() => {
        const fetchPersonByID = async (id) => {
            console.log("id", id);
            setLoading(true);
            const data = await MovieService.fetchPersonByID(id);  // Detail
            if (data) {
                console.log("person", data.data);
                setPerson(data.data);
            }
            setLoading(false);
        }
        fetchPersonByID(id);
    }, [id]);
    return (
        person != null && (
            <div className=" ">
                <div className="text-black p-8 bg-cover bg-center min-h-screen">
                    <div className="container mx-auto ">
                        <div className="grid grid-cols-1 sm:grid-cols-3 w-full sm:gap-4">
                            <div className="col-span-1 w-full h-full  mb-2">
                                <img
                                    src={person && person.profile_path ? `https://image.tmdb.org/t/p/original${person.profile_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
                                    alt={person ? person.name : "No Name"}
                                    className="object-cover rounded-lg"
                                />

                                <h2 className="text-xl font-bold text-gray-800 truncate  text-left">
                                    Thông tin cá nhân
                                </h2>

                                <div className="flex flex-col mt-1">
                                    <h2 className="text-lg font-semibold text-gray-800 truncate  text-left">
                                        Giới tính
                                    </h2>
                                    <p>{person.gender === 1 ? "Nữ" : person.gender === 2 ? "Nam" : "Không xác định"}</p>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <h2 className="text-lg font-semibold text-gray-800 truncate  text-left">
                                        Nghề nghiệp
                                    </h2>
                                    <p>{person.known_for_department}</p>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <h2 className="text-lg font-semibold text-gray-800 truncate  text-left">
                                        Ngày sinh
                                    </h2>
                                    <p>{person.birthday}</p>
                                </div>
                            </div>
                            <div className="col-span-2 ">
                                <div>
                                    <h2 className="text-3xl font-bold text-left">
                                        {person.name}
                                    </h2>
                                    <p className="mt-2">{person.biography}</p>
                                    <h1 className="text-2xl font-bold mt-2">Danh sách diễn suất</h1>
                                    <div className="container mx-auto p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {person.movie_credits.cast
                                                .sort((a, b) => {
                                                    return new Date(b.release_date) - new Date(a.release_date);
                                                })
                                                .map((actor) => (
                                                    <div key={actor.id}>
                                                        <div className="bg-white rounded-md shadow-md p-4">
                                                            <h2 className="text-xl font-bold mb-2">{actor.release_date}</h2>
                                                            <ul>
                                                                <li className="mb-2">
                                                                    <span className="font-bold">{actor.title}</span>
                                                                </li>
                                                                <li>
                                                                    {/* <span className="font-bold">Character</span> */}
                                                                    <span className="text-gray-500">as {actor.character}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
