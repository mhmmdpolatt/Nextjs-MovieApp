"use client"
import React, { useEffect, useState } from 'react'
import { FaRegPlayCircle } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import SkeletonCard from '@/components/partials/SkeletonCard/SkeletonCard'
import { FiMoreVertical } from "react-icons/fi";

function FilmChooseCard({ seciliType }) {
    const [filmler, setFilmler] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [openMenuId, setOpenMenuId] = useState(null);


    const [userName, setUserName] = useState("Kullanıcı")

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const res = await fetch(`/api/user/getChooseFilmAction?typeChoose=${seciliType}`)
                const response = await res.json();
                console.log("DÖNEN CEVAP", response);
                setUserName(response.user)
                setFilmler(response.liste)
            } catch (error) {
                console.error("Hata oluştu:", error)
            } finally {
                setLoading(false)
            }
        }

        getData();
    }, [seciliType])

    console.log("KULLANICI FİLMLER", filmler);


    const handleDeleteMovieForList = async (movieId, typeChoose) => {
        console.log("FİLM ID VE SEÇİLİ TYPE", movieId, typeChoose);

        try {
            setLoadingDelete(true)
            const res = await fetch("/api/user/filmAction", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movieID: movieId,
                    typeChoose: typeChoose,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Silme hatası:", data);
                alert(data.message || "Film silinirken hata oluştu");
                return;
            }

            console.log("Silme başarılı:", data);
            // TODO: Sayfa yenile, state güncelle, toast at vs.
        } catch (error) {
            console.error("İstek hatası:", error);
            alert("Film silinirken ağ hatası oluştu");
        } finally {
            setLoadingDelete(false)
            setFilmler((prev) => prev.filter((f) => f._id !== movieId));
        }
    };


    return (
        <div className="p-4">
            {loading && <SkeletonCard />}

            {!loading && filmler?.length === 0 ? (
                <div className="text-center text-cyan-100 my-10">
                    <p className="text-xl font-semibold">Henüz hiç film eklememişsin! 🍿</p>
                    <p className="text-sm mt-2 text-cyan-400">Favori filmlerini eklemeye başla ve arşivini oluştur.</p>
                </div>
            ) : (
                <p className="text-center text-cyan-100">{filmler?.length} Sonuç</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 sm:px-8 mt-6">
                {filmler?.map((film) => (
                    <div
                        key={film._id}
                        className="relative flex flex-col bg-gradient-to-b from-cyan-950/80 to-cyan-900/30 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                    >
                        {/* Menü Butonu */}
                        <div className="absolute top-3 right-3 z-30">
                            <button
                                onClick={() => setOpenMenuId(openMenuId === film._id ? null : film._id)}
                                className="text-white bg-cyan-700/80 hover:bg-cyan-500/80 p-2 rounded-full shadow-lg transition-all duration-300 ring-1 ring-cyan-300/40"
                                aria-label="Açılır Menü"
                                title="Açılır Menü"
                            >
                                <FiMoreVertical size={20} />
                            </button>

                            {openMenuId === film._id && (
                                <div className="absolute right-0 mt-2 w-auto bg-white rounded-xl shadow-xl py-2 z-40 border border-cyan-300 animate-fadeIn origin-top-right">
                                    <button
                                        className="block w-full text-left px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        onClick={() => {
                                            handleDeleteMovieForList(film._id, seciliType);
                                            setOpenMenuId(null);
                                        }}
                                    >
                                        🎬 Filmi Listeden Kaldır
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Film Kartı */}
                        <Link href={`${film.tur === "film" ? `filmler/${film.id}` : `diziler/${film.id}`}`} className="relative block cursor-pointer group">
                            <div className="aspect-[2/3] overflow-hidden rounded-t-2xl shadow-inner shadow-cyan-700/60 relative">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                    alt={film.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-cyan-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl flex items-center justify-center">
                                <FaRegPlayCircle size={64} className="text-white drop-shadow-xl hover:scale-110 transition-transform duration-300" />
                            </div>

                            {/* Film Bilgileri */}
                            <div className="px-4 py-3 bg-cyan-950/80 backdrop-blur-sm rounded-b-2xl text-white">
                                <h3 title={film.title} className="text-md font-semibold truncate">
                                    {film.title || film.name}
                                </h3>
                                <h3 className="text-sm capitalize text-cyan-200">{film.tur}</h3>
                                <p className="flex items-center gap-2 mt-1 text-amber-400 font-medium">
                                    <FaStar className="text-yellow-400" /> {film.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

        </div>









    )
}

export default FilmChooseCard;
