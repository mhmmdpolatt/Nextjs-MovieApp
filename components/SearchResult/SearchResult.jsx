"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";
import Link from 'next/link';
import Loading from '../partials/Loading/Loading';
import { tmdb } from '@/lib/api/tmdb';

function SearchResult() {
    const [movie, setMovie] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genresMovie, setGenresMovie] = useState([]);
    const [genresTV, setGenresTV] = useState([]);
    const pathname = usePathname();
    const isFilmPage = pathname.includes('/filmler') || pathname === '/';

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const [movieRes, tvRes] = await Promise.all([
                    fetch("https://api.themoviedb.org/3/genre/movie/list?language=tr-TR", {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
                            accept: 'application/json',
                        }
                    }),
                    fetch("https://api.themoviedb.org/3/genre/tv/list?language=tr-TR", {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
                            accept: 'application/json',
                        }
                    })
                ]);
                const movieData = await movieRes.json();
                const tvData = await tvRes.json();
                setGenresMovie(movieData.genres || []);
                setGenresTV(tvData.genres || []);
            } catch (err) {
                console.error("Türler çekilemedi:", err);
            }
        };

        fetchGenres();
    }, []);

    const searchMovies = async (e) => {
        const value = e.target.value;
        setMovie(value);

        if (!value) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            const endpoint = isFilmPage
                ? `search/movie?query=${value}&language=tr-TR`
                : `search/tv?query=${value}&language=tr-TR`;

            const res = await fetch(`https://api.themoviedb.org/3/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
                    accept: 'application/json',
                },
            });

            const data = await res.json();
            setResults(data.results || []);
        } catch (err) {
            console.error('Arama hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    const getGenreNames = (ids, isFilm) => {
        const genres = isFilm ? genresMovie : genresTV;
        return ids
            ?.map(id => genres.find(g => g.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    return (
        <div className='w-full flex px-2 relative md:w-[45%]'>
            <input
                type="text"
                placeholder="Film / Dizi Ara"
                className='w-full py-2 pl-4 pr-10 rounded-lg backdrop-blur-2xl bg-white/15 text-white placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-cyan-500 border-none'
                onChange={searchMovies}
                value={movie}
            />
            <span className='absolute right-4 top-2.5 text-[#B0B0B0]'>
                <FaSearch size={20} />
            </span>

            {results.length > 0 && (
                <div className="absolute top-full right-1/2 translate-x-1/2 w-[95%] md:w-full bg-[#222831] border border-white/35 rounded-2xl px-4 shadow-lg z-50 max-h-96 overflow-y-auto">
                    <h1 className='text-center mt-2 text-white underline'>Arama Sonuçlarınız</h1>

                    <div className="sticky top-0 left-0 flex justify-start z-20 py-2 bg-[#222831]">
                        <button
                            className="text-cyan-500 bg-gray-700 hover:text-gray-100 shadow-2xl rounded-full p-2"
                            onClick={() => setResults([])}
                        >
                            <FaTimes size={15} />
                        </button>
                    </div>

                    <Loading loading={loading} />

                    {results.map((item, index) => (
                        <Link
                            href={isFilmPage ? `/filmler/${item.id}` : `/diziler/${item.id}`}
                            key={index}
                            className="flex items-center gap-x-4 border-b border-white/15 hover:bg-[#393E46] py-3"
                        >
                            {item.poster_path && (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                                    alt={item.title || item.name}
                                    width={80}
                                    height={80}
                                    className='rounded-lg w-[80px] object-cover'
                                />
                            )}
                            <div className='flex flex-col gap-y-1'>
                                <h1 className='text-white font-medium'>{item.title || item.name}</h1>
                                <p className='text-[#B0B0B0] text-xs'>{item.release_date?.slice(0, 4)}</p>
                                <p className='text-sm text-cyan-400 italic'>{getGenreNames(item.genre_ids, isFilmPage)}</p>
                                <div className='flex items-center gap-x-2'>
                                    <FaStar size={14} className='text-yellow-300' />
                                    <span className='text-sm text-white'>{item.vote_average?.toFixed(1)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResult;
