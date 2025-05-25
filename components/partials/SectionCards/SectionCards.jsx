import React from 'react';
import Image from 'next/image';
import { FaStar, FaRegPlayCircle } from 'react-icons/fa';
import Link from 'next/link';

function SectionCards({ results, title, }) {
    const tumunuGor = true;
    return (
        <>



            <h1 className="text-[cyan] text-center  font-bold text-balance md:text-2xl px-3 py-3">
                {title}
            </h1>
            <div className="w-full p-3 md:border-r-12 inset-shadow-sm shadow-white  md:border-[#22d3ee]">
                {/* Scrollable Container */}
                <div className="md:overflow-x-auto md:overflow-y-hidden overflow-x-scroll custom-scrollbar border-r px-4">
                    {/* İçerik: flex olarak yatayda diziyoruz, ama md'de sabit genişlik vermeyi unutma */}
                    <div className="flex md:flex-row gap-2 md:gap-4 w-max ">
                        {results ? (results.slice(0, 8)).map((movie) => (
                            <div
                                key={movie.id}
                                className="relative w-[170px]  md:w-[280px] flex-shrink-1 group md:flex-shrink-0 hover:scale-110 duration-300 ease-in-out cursor-pointer"
                            >
                                <Image
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    alt={movie.title ? movie.title : movie.name}
                                    width={350}
                                    height={350}
                                    className="rounded-md object-cover"
                                />

                                {/* Hover Icon */}
                                <div className="absolute top-0 left-0 w-full h-full bg-black/70 opacity-0 -translate-y-10 transition-all duration-1000 group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center">
                                    <Link href={movie.title ? `/filmler/${movie.id}` : `/diziler/${movie.id}`}>
                                        <FaRegPlayCircle size={65} className="text-[cyan]" />
                                    </Link>
                                </div>

                                {/* Alt Bilgi */}
                                <div className="absolute bottom-3 left-0 p-2 flex flex-col">
                                    <h2 className="text-white text-base font-semibold z-10 relative">
                                        {movie.title || movie.name}
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        {movie.release_date
                                            ? movie.release_date.slice(0, 4)
                                            : movie.first_air_date?.slice(0, 4)}
                                    </p>
                                </div>

                                {/* Rating */}
                                <div className="p-2">
                                    <p className="absolute flex items-center gap-x-1 top-0 left-0 mx-2 mt-2 bg-cyan-950   rounded-full px-2 text-[cyan] text-sm">
                                        <FaStar /> {movie.vote_average?.toFixed(1)}
                                    </p>
                                </div>
                            </div>
                        ) ) : (<div>
                            <h1>Şuan Hizmet Veremiyoruz</h1>
                        </div>)}
                    </div>
                </div>
            </div>


        </>
    );
}

export default SectionCards;
