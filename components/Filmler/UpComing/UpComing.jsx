import React from 'react'
import { tmdb } from "../../../lib/api/tmdb"
import Image from 'next/image';

async function UpComing() {
    const data = await tmdb.getUpcoming();
    const results = data.results.slice(0, 6);

    return (
        <div className='mx-auto w-full px-4'>
            <h1 className='text-cyan-400 font-semibold text-lg md:text-xl lg:text-2xl'>Yakında Gelecek Olanlar</h1>

            <div className='mt-4 flex overflow-x-auto md:overflow-x-hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 '>

                {results.map((movie) => {
                    return (
                        <div
                            className='flex flex-col items-center justify-center min-w-[20px] md:w-full gap-y-1 flex-shrink-0'
                            key={movie.id}
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                                width={80}
                                height={80}
                                className='rounded-full object-cover w-[80px] h-[80px] border-4 border-cyan-500 hover:scale-110 duration-200'
                                alt={movie.title}
                            />
                            <p className='text-center text-sm text-cyan-200 px-2 text-wrap'>{movie.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UpComing;
