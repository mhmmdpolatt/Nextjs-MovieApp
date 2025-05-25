import React from 'react'
import { tmdb } from '@/lib/api/tmdb'
import FilmKartları from '../FilmKartları/FilmKartları';

async function TrendMovies() {
    const data = await tmdb.getTrendingMovies();
    const results = data.results.slice(8, 13);
  return (
    <FilmKartları results={results} title={"Trend Filmler"} />    

)
}

export default TrendMovies