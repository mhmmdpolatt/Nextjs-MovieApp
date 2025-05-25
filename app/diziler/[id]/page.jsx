import DiziDetay from '@/components/Diziler/DiziDetay/DiziDetay'
import React from 'react'
import { tmdb } from '@/lib/api/tmdb';
import BenzerDiziler from '@/components/Diziler/SimilarTv/BenzerDiziler';

async function page({ params }) {
    const { id } = params;
    const data = await tmdb.getTvById(id);
    console.log("Dizi Detay", data);
    return (

        <div className="relative min-h-screen bg-[#0f1115] text-white px-4 sm:px-6 md:px-12 py-10 w-full">
            {/* Arka Plan */}
            <DiziDetay dizi={data} />
            <BenzerDiziler id={id} />
        </div>

    )
}

export default page