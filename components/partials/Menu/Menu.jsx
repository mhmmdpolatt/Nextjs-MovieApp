"use client"
import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { tmdb } from '@/lib/api/tmdb'
import KullaniciMenu from '../KullaniciMenu/KullaniciMenu'
import Link from 'next/link'

function Menu({ openMenu, handleCloseMenu, data }) {
    const [categoriesMovie, setCategoriesMovie] = useState([]);
    const [categoriesTV, setCategoriesTV] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const movieData = await tmdb.getMovieGenres();
                const tvData = await tmdb.getTVGenres();
                setCategoriesMovie(movieData.genres);
                setCategoriesTV(tvData.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className={`fixed inset-0 z-[1000] ${openMenu ? 'block' : 'hidden'}`}>
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleCloseMenu}
            />

            {/* Menu Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-full max-w-md bg-[#1c1f26] shadow-xl transform transition-transform duration-300
                ${openMenu ? 'translate-x-0' : '-translate-x-full'}
                overflow-y-auto flex flex-col`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-white/10">
                    <h2 className="text-xl font-semibold text-white tracking-wide">🎬 Menü</h2>
                    <button onClick={handleCloseMenu}>
                        <FaTimes size={22} className='text-white hover:text-red-400 transition-colors' />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-3 p-5 text-white font-semibold border-b border-white/10">
                    <KullaniciMenu data={data} handleCloseMenu={handleCloseMenu}  />
                    <Link href="/" onClick={handleCloseMenu} className="hover:text-cyan-400">🏠 Anasayfa</Link>
                    <Link href="/filmler" onClick={handleCloseMenu} className="hover:text-cyan-400">🎞️ Filmler</Link>
                    <Link href="/diziler" onClick={handleCloseMenu} className="hover:text-cyan-400">📺 Diziler</Link>
                    <Link href="/hakkinda" onClick={handleCloseMenu} className="hover:text-cyan-400">ℹ️ Hakkında</Link>
                </nav>

                {/* Film Kategorileri */}
                <section className="p-5">
                    <h3 className="text-cyan-300 text-lg font-bold mb-3">🎬 Türlere Göre Filmler</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {categoriesMovie.map((category, index) => (
                            <Link
                                href={{
                                    pathname: `/filmler/category/${category.id}`,
                                    query: { name: category.name, page: 1 },
                                }}
                                onClick={handleCloseMenu}
                                key={index}
                                className="bg-[#2b303b] text-white text-sm py-2 px-3 rounded-md shadow-sm hover:bg-cyan-600 hover:text-white transition-all"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Dizi Kategorileri */}
                <section className="p-5">
                    <h3 className="text-cyan-300 text-lg font-bold mb-3">📺 Türlere Göre Diziler</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {categoriesTV.map((category, index) => (
                            <Link
                                href={{
                                    pathname: `/diziler/category/${category.id}`,
                                    query: { name: category.name, page: 1 },
                                }}
                                onClick={handleCloseMenu}
                                key={index}
                                className="bg-[#2b303b] text-white text-sm py-2 px-3 rounded-md shadow-sm hover:bg-cyan-600 hover:text-white transition-all"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Menu;
