import React from 'react'
import Image from 'next/image'
import { tmdb } from '@/lib/api/tmdb';
import SimilarMovies from '@/components/Filmler/SimilarMovies/SimilarMovies';
import DetailMovie from '@/components/Filmler/DetailMovie/DetailMovie';

export async function generateMetaData({ params }) {
    const { slug } = params;
    const data = await tmdb.getMovieById(slug);
    return {
        title: data.original_title,
        description: data.overview,
        openGraph: {
            title: data.original_title,
            description: data.overview,
            url: `https://www.themoviedb.org/movie/${slug}`,
            images: [
                {
                    url: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
                    width: 800,
                    height: 600,
                    alt: data.original_title,
                },
            ],
        },
    }

}

async function FilmDetay({ params }) {
    const { slug } = params;
    const movie = await tmdb.getMovieById(slug);
    const movieGenres = await tmdb.getMovieGenres();
    return (
        <div className="relative min-h-screen bg-[#0f1115] text-white px-4 sm:px-6 md:px-12 py-10 w-full">
            {/* Arka Plan */}
            <DetailMovie movie={movie} />
            <SimilarMovies slug={slug}/>
        </div>

    )
}

export default FilmDetay