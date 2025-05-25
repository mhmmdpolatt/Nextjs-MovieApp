import React from 'react'
import { tmdb } from '@/lib/api/tmdb'
import Link from 'next/link';

async function CategoriesTV({ value }) {
    const data = await tmdb.getTVGenres();
    const results = data.genres.slice(0, 18);

    return (
        <div className='hidden md:block mt-8 w-full'>
            <h1 className='text-white font-bold mb-3' >Türlere Göre {value}</h1>
            <div className='w-full   flex justify-center flex-wrap bg-[#222831] gap-x-1  border-t border-yellow-300  '>
                {results.map((category, index) => (
                    <Link href={{
                        pathname: `/diziler/category/${category.id}`,
                        query: { name: category.name, page: 1 }
                    }} className=' text-gray-400 w-full hover:bg-gray-500  border-b border-white/15 p-3' key={index}>{category.name}</Link>
                ))}
            </div>

        </div>
    )
}

export default CategoriesTV