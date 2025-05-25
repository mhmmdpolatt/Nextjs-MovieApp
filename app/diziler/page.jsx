import CategoriesTV from '@/components/Diziler/CategoriesTV/CategoriesTV'
import GetPopular from '@/components/Diziler/GetPopularTV/GetPopular'
import GetTrendTV from '@/components/Diziler/GetTrendTV/GetTrendTV'
import TrendDiziler from '@/components/Diziler/TrendDiziler/TrendDiziler'
import React from 'react'
import { getUserFromCookie } from '@/lib/getUserFromCookie/getUserFromCookie'

async function page() {
    const data = await getUserFromCookie();
    return (
        <div className="relative  flex-col justify-start items-center md:p-15   ">
            <GetTrendTV />

            <div className=" md:flex flex-row-reverse shadow-2xl justify-between mt-4 bg-[#1c1f26] items-start py-3 px-2 border-t-3  border-cyan-300 " style={{
                boxShadow: '10px 0 15px -5px cyan, -10px 0 15px -5px cyan' // yellow-300 tonu
            }}>
                <CategoriesTV value="Dizi" />
                <div className='flex flex-col gap-4'>
                    {/* <GetPopular /> */}
                    <TrendDiziler />


                </div>

            </div>
        </div>
    )
}

export default page