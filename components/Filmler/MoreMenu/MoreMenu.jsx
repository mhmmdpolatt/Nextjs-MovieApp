"use client"
import Loading from "@/components/partials/Loading/Loading"
import { useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { CiBookmarkPlus } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

export default function MoreMenu({ movie }) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [uyari, setUyari] = useState("")
    const [loading, setLoading] = useState(false)

    const handleAction = async (typeChoose) => {
        console.log("MOVİEEEEE", movie);
        try {
            setLoading(true)
            const res = await fetch(`/api/user/filmAction`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ movie, typeChoose }),
            })
            const response = await res.json();
            if (res.ok) {
                setMessage(response.message)
            }
            else {
                setUyari(response.message)
            }
        } catch (error) {
            alert(error)

        } finally {
            setTimeout(() => {
                setMessage("")
                setUyari("")
            }, 1000);
            setLoading(false)
        }



    }

    return (
        <div className="relative">

            <button
                onClick={() => setOpen(!open)}
                className="text-white p-2 bg-cyan-800 hover:bg-[#5e6b7c] rounded-full transition"
            >
                <FiMoreVertical size={22} />
            </button>


            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-[#6a6a6a] border border-cyan-300 rounded-lg shadow-lg z-50">
                    <ul className="text-sm text-white font-medium px-2 py-1 ">
                        <button
                            className="hover:bg-cyan-500 hover:text-black px-4 py-2 cursor-pointer transition flex justify-center items-center gap-x-1.5"
                            onClick={() => handleAction("begendigiFilmler")}
                            disabled={loading}
                        >
                            <MdFavorite size={25} className="text-red-500" /> Favorilere Ekle
                        </button>
                        <button
                            className="hover:bg-cyan-500 hover:text-black px-4 py-2 cursor-pointer transition flex justify-center items-center gap-x-1.5"
                            onClick={() => handleAction("izlediklerim")}
                            disabled={loading}
                        >
                            <FaCheckCircle size={25} className="text-green-400" /> İzlediklerime Ekle
                        </button>
                        <button
                            className="hover:bg-cyan-500 hover:text-black px-4 py-2 cursor-pointer transition flex justify-center items-center gap-x-1.5"
                            onClick={() => handleAction("dahaSonraIzle")}
                            disabled={loading}
                        >
                            <CiBookmarkPlus size={25} className="text-cyan-400 font-extrabold" />  Daha Sonra İzle
                        </button>
                        {loading && <p className="animate-spin mx-auto rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500 mt-2"></p>}
                        <li className={`${message ? "block" : "hidden"} rounded-2xl font-bold bg-green-400  mt-4 hover:bg-cyan-500 hover:text-black px-4 py-2 cursor-pointer transition`}>{message ? `${message}` : null}</li>
                        <li className={`${uyari ? "block" : "hidden"} rounded-2xl font-bold bg-red-500  hover:bg-cyan-500 hover:text-black px-4 py-2 cursor-pointer transition mt-4 mb-4`}>{uyari ? `${uyari}` : null}</li>

                    </ul>
                </div>
            )}
        </div>
    )
}
