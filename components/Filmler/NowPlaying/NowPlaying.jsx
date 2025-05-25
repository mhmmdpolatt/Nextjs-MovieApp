import React from 'react'
import { tmdb } from '@/lib/api/tmdb'
import Image from 'next/image';
import FilmKartları from '../FilmKartları/FilmKartları';

async function NowPlaying() {
    const data =await tmdb.getNowPlaying();
    const results=data.results.slice(0,10);
    
  return (
    <>
        <FilmKartları results={results} title={"En Yeniler"} />
    </>
  )
}

export default NowPlaying