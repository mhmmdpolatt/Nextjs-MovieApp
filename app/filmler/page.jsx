import Categories from '@/components/Filmler/CategoriesMovie/Categories'
import MostPopular from '@/components/Filmler/MostPopular/MostPopular'
import NowPlaying from '@/components/Filmler/NowPlaying/NowPlaying'
import PopulerMovieList from '@/components/Filmler/PopulerMovieList/PopulerMovieList'
import TrendMovies from '@/components/Filmler/TrendMovies/TrendMovies'
import UpComing from '@/components/Filmler/UpComing/UpComing'
import React from 'react'

function Filmler() {
    return (
        <div className="relative  flex-col justify-start items-center md:p-15   ">
            <PopulerMovieList />
            <div className="md:flex flex-row-reverse shadow-2xl justify-between mt-4 bg-[#1c1f26] items-start py-3 px-2 border-t-3 shadow-cyan-300 border-cyan-300 ">
                <div className='md:w-1/6'>

                    <Categories value="Filmler" />
                </div>
                <div className='flex flex-col gap-4 md:w-5/6'>
                    <UpComing />
                    <MostPopular />
                    <NowPlaying />
                    <TrendMovies />
                </div>

            </div>
        </div>
    )
}

export default Filmler