import FilmChoose from '@/components/Filmler/FilmChoose/FilmChoose'
import React from 'react'
import { getUserFromCookie } from '@/lib/getUserFromCookie/getUserFromCookie'

async function Profile() {
    const data = await getUserFromCookie()
    console.log("PROFİK SAYFASI DATA ",data);
    
    return (
        <div className='px-4 py-20 mt-12 ' >
            <h1 className='text-center font-bold text-3xl text-cyan-200 mb-2'>Hoşgeldin {data?.kullaniciAdi.toUpperCase()}</h1>
            <p className='text-center text-cyan-100 text-sm md:text-base'>
                Burada beğendiğin, kaydettiğin ve izlediğin filmler listelenir 🎬
            </p>
            <div className="cizgi w-1/3 mx-auto border-1 border-cyan-50/10 mt-5"></div>

            <FilmChoose/>
        </div>

    )
}

export default Profile