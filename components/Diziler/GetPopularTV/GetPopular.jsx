import React from 'react'
import Image from 'next/image';
import { tmdb } from '@/lib/api/tmdb';
async function GetPopular() {
    const data = await tmdb.getPopularTV();
    const results = data.results.slice(0, 6);
    return (
        <div className='mx-auto w-full px-4'>
            <div className='mt-4 flex    overflow-x-auto md:overflow-x-hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 '>

                {results.map((movie) => {
                    return (
                        <div
                            className='flex flex-col  min-w-[20px] md:w-full gap-y-1 flex-shrink-0 w-1/4 h-1/4  '
                            key={movie.id}
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                                width={80}
                                height={80}
                                className='rounded-full object-cover w-[80px] h-[80px] border-4 border-cyan-500 hover:scale-110 duration-200'
                                alt={movie.title}
                            />
                            <p className='text-start text-sm text-wrap text-cyan-200 px-2'>{movie.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GetPopular