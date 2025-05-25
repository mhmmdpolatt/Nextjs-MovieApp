


import React from 'react'
import { tmdb } from "../../../lib/api/tmdb"
import Image from 'next/image';
import { FaStar, FaRegPlayCircle } from 'react-icons/fa';
import SectionCards from '../../partials/SectionCards/SectionCards';

async function PopulerMovieList() {
    const data = await tmdb.getPopularMovies();
    const results = data.results; //Arrow Functiionda Süslü parantez kullanrısan return kullanmalısın o yüzden süslü parantezi kaldırdım tek satırda olduğu için süslü parantez kullanmadım
    return (
        <>
            <div className=' '>
                <SectionCards results={results} title={"Bu Haftanın Trendleri"} />
            </div>
        </>
    )
}

export default PopulerMovieList