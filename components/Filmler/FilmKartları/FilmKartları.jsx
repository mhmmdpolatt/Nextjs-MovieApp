import React from 'react'
import Image from 'next/image'
import { FaStar, FaRegPlayCircle } from 'react-icons/fa';
import Link from 'next/link';
import film from '@/lib/models/film';

function FilmKartları({ results, title }) {
    const genreMap = {
        28: "Aksiyon",
        12: "Macera",
        16: "Animasyon",
        35: "Komedi",
        80: "Suç",
        18: "Dram",
        10751: "Aile",
        14: "Fantastik",
        36: "Tarih",
        27: "Korku",
        10402: "Müzik",
        9648: "Gizem",
        10749: "Romantik",
        878: "Bilim Kurgu",
        10770: "TV Filmi",
        53: "Gerilim",
        10752: "Savaş",
        37: "Western"
    };
    const tvGenreMap = {
        10759: "Aksiyon & Macera",
        16: "Animasyon",
        35: "Komedi",
        80: "Suç",
        99: "Belgesel",
        18: "Dram",
        10751: "Aile",
        10762: "Çocuk",
        9648: "Gizem",
        10763: "Haber",
        10764: "Reality TV",
        10765: "Bilim Kurgu & Fantastik",
        10766: "Pembe Dizi",
        10767: "Talk Show",
        10768: "Savaş & Politika",
        37: "Western"
    };

    return (
        <div className='flex flex-col items-start w-full'>

            <h1 className="text-cyan-50 text-center font-bold text-balance p-0 md:text-2xl px-3 py-3">{title}</h1>

            <div className="flex flex-wrap justify-end items-start md:justify-start px-3 md:gap-0 w-full">
                {results.map((movie) => (
                    <div
                        key={movie.id}
                        className="relative group mt-4 mx-1 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[19%] min-w-[120px] cursor-pointer"
                    >
                        {/* Overview kutusu */}
                        {movie.overview && (
                            <div className="absolute top-0 left-full ml-3 w-72 max-h-80 bg-gradient-to-br from-[#1c1f26] via-[#20232a] to-[#1c1f26] shadow-2xl rounded-lg p-4 text-gray-100 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 z-50 border-l-4 border-cyan-400 hidden md:block pointer-events-none">

                                {/* Başlık + puan */}
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-[15px] font-bold truncate w-[80%] text-cyan-200">{movie.title || movie.name}</h2>
                                    <div className="flex items-center text-[cyan] text-sm gap-1">
                                        <FaStar className="text-cyan-300" />
                                        <span>{movie.vote_average.toFixed(1)}</span>
                                    </div>
                                </div>

                                {/* Türler */}
                                {movie.genre_ids && (
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {movie.genre_ids.map((id) => (
                                            <span
                                                key={id}
                                                className="bg-cyan-800/40 text-cyan-300 px-2 py-0.5 text-[11px] rounded-md"
                                            >
                                                {movie.title
                                                    ? genreMap[id] || "Bilinmeyen Tür"
                                                    : tvGenreMap[id] || "Bilinmeyen Tür"}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Konu başlığı */}
                                <h4 className="text-[14px] text-cyan-400 font-semibold mb-1 mt-2">🎬 Konu Özeti</h4>

                                {/* Konu metni */}
                                <p className="overflow-y-auto max-h-44 pr-1 text-[13px] text-gray-300 leading-relaxed tracking-wide scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent font-bold">
                                    {movie.overview.slice(0, 180)} ...
                                </p>
                            </div>
                        )}

                        {/* Film kartı */}
                        <Link
                            href={movie.title ? `/filmler/${movie.id}` : `/diziler/${movie.id}`}
                            className="block relative border-b-5 border-[#00f2ff] overflow-hidden group"
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={`${movie.title}`}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                                width={350}
                                height={350}
                            />

                            {/* Play ikonu */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[cyan]/10 opacity-0 -translate-y-10 transition-all duration-1000 backdrop-blur-xs group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center">
                                <FaRegPlayCircle size={65} className="text-[cyan]" />
                            </div>

                            {/* Kart alt bilgi */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white flex flex-col justify-end p-3 transition-opacity duration-300">
                                <h2 className="text-sm md:text-base font-semibold truncate">{movie.title || movie.name}</h2>
                                <p className="text-xs md:text-sm text-gray-300">{movie.release_date?.slice(0, 4)}</p>
                                <p className="flex items-center gap-x-1 text-xs md:text-sm text-[cyan]">
                                    <FaStar /> {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>


            <div className="cizgi border-b-1 border-b-cyan-300/35 w-[85%] mx-auto mt-12"></div>
        </div>

    )
}

export default FilmKartları;
