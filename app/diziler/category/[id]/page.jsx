import React from 'react'
import { tmdb } from '@/lib/api/tmdb'
import FilmKartları from '@/components/Filmler/FilmKartları/FilmKartları'
import CategoriesTV from '@/components/Diziler/CategoriesTV/CategoriesTV'
import Pagination from '@/components/partials/Pagination/Pagination'

async function page({ params, searchParams }) {
    const { id } = params
    const { name } = searchParams
    const page = Number(searchParams.page) || 1
    const data = await tmdb.getByCategorieTV(id, page);
    const results=data.results
    console.log("KATOGRİYE DÖRE DİZİLER", data);

    return (
        <div className="relative  flex-col justify-start items-center md:p-15   ">

            <div className="md:flex flex-row-reverse shadow-2xl justify-between mt-4 bg-[#393E46] items-start py-3 px-2 border-t-3 shadow-cyan-300 border-cyan-300">

                {/* Sağdaki sidebar — 1/4 genişlik */}
                <div className="md:w-1/6">
                    <CategoriesTV value="Filmler" />
                </div>

                {/* Soldaki ana içerik — 3/4 genişlik */}
                <div className="md:w-5/6">
                    <FilmKartları results={results} title={`${name} Kategorisindeki Diziler`} />
                </div>

            </div>
            {/* PAGİNATİON */}

            <div className="mt-6 flex justify-center">
                <Pagination
                    currentPage={data.page}
                    totalPages={100}
                    id={id}
                    name={name}
                />
            </div>

        </div>
    )
}

export default page