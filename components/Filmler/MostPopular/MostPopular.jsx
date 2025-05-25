import React from 'react'
import { tmdb } from '@/lib/api/tmdb';
import FilmKartları from '../FilmKartları/FilmKartları';

async function MostPopular() {
    const data = await tmdb.getPopularMovies();
    const results = data.results.filter((movie) => movie.vote_average > 6.5).slice(0,10); //Arrow Functiionda Süslü parantez kullanrısan return kullanmalısın o yüzden süslü parantezi kaldırdım tek satırda olduğu için süslü parantez kullanmadım
    return (
        <FilmKartları results={results} title={"En Çok Beğenilenler"} />
    )
}

export default MostPopular