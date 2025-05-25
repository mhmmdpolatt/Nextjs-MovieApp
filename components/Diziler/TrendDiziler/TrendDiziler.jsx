import React from 'react'
import { tmdb } from '@/lib/api/tmdb'
import FilmKartları from '@/components/Filmler/FilmKartları/FilmKartları';

async function TrendDiziler() {
    const data = await tmdb.getTrendingTV()
    const results=data.results;
  return (
        <FilmKartları results={results} title={"Trend Diziler"} /> //DiziKartları bileşenine results ve title prop'larını geçiyoruz
    )
}

export default TrendDiziler