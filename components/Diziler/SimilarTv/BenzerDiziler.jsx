
import React from 'react'
import Image from 'next/image'
import { tmdb } from '@/lib/api/tmdb'
import SectionCards from '@/components/partials/SectionCards/SectionCards';


async function BenzerDiziler({ id }) {
    const data = await tmdb.getSimilarTv(id);
    const results = data.results;
    if (results.length === 0) {
        return <p className='text-cyan-300 font-bold text-3xl mt-12 text-center'>Benzer Dizi bulunamadı</p>
    }
    
    return (
        <div className='relative z-10   rounded-lg px-1 sm:p-2 md:p-8 mt-3'>
            <h1 className='text-cyan-300 font-bold text-3xl mt-12 text-center'>Benzer Diziler</h1>
            <SectionCards results={results} value={"title"} />
          
        </div>
    )
}

export default BenzerDiziler