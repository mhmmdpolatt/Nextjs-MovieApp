import React from 'react'
import Image from 'next/image'
import { FaRegPlayCircle, FaStar } from 'react-icons/fa'
import Link from 'next/link'

function DiziKartlari({ results, title }) {
    return (
        <div className='flex flex-col items-start w-full'>

            <h1 className="text-white text-center font-bold text-balance md:text-2xl px-3 py-3">{title}</h1>

            <div className='flex flex-wrap justify-end items-start md:justify-start px-3 md:gap-0 w-full'>
                {results.map((movie) => (
                    <Link key={movie.id} className="relative mt-4 mx-1 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[19%] min-w-[120px]  overflow-hidden group  border-b-5 border-[cyan]" href={movie.title ? `/filmler/${movie.id}` : `/diziler/${movie.id}`}>

                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.title}`}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                            width={350}
                            height={350}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-[yellow]/20 opacity-0 -translate-y-10 transition-all duration-1000 backdrop-blur-xs group-hover:opacity-100 group-hover:translate-y-0 flex items-center justify-center">

                            <FaRegPlayCircle size={65} className="text-[rgb(255,251,0)]" />

                        </div>
                        {/* Overlay Katman */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white flex flex-col justify-end p-3 transition-opacity duration-300">
                            <h2 className="text-sm md:text-base font-semibold">{movie.name}</h2>
                            <p className="text-xs md:text-sm text-gray-300">{movie.release_date?.slice(0, 4)}</p>
                            <p className="flex items-center gap-x-1 text-xs md:text-sm text-[cyan]">
                                <FaStar /> {movie.vote_average.toFixed(1)}
                            </p>
                        </div>

                    </Link>
                ))}
            </div>

            <div className="cizgi border-b-1 border-b-cyan-300/35 w-[85%] mx-auto mt-12"></div>
        </div>
    )
}

export default DiziKartlari