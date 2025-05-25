
import React from 'react'
import Image from 'next/image'
import { tmdb } from '@/lib/api/tmdb'
import SectionCards from '@/components/partials/SectionCards/SectionCards';


async function SimilarMovies({ slug }) {
    const data = await tmdb.getSimilarMovies(slug);
    const results = data.results;

    if (results.length === 0) {
        return <p className='text-cyan-300 font-bold text-3xl mt-12 text-center'>Benzer film bulunamadı</p>
    }
    return (
        <div className='relative z-10 bg-[#393E46]/65 backdrop-blur-sm border-b-4 border-t-4 border-cyan-300 rounded-lg px-1 sm:p-6 md:p-8 mt-16'>
            <h1 className='text-cyan-300 font-bold text-3xl mt-12 text-center'>Benzer Filmler</h1>
            <SectionCards results={results} value={"title"} />

        </div>
    )
}

export default SimilarMovies