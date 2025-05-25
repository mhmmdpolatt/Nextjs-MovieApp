'use client';

import React, { useEffect, useState } from 'react';
import { tmdb } from "../../../lib/api/tmdb";
import Link from 'next/link';

function Categories({ value,mobileMenu }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await tmdb.getMovieGenres();
                setCategories(data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className={'hidden md:block mt-8 w-[100%]'}>
            <h1 className='text-white font-bold mb-3'>Türlere Göre {value}</h1>
            <div className='w-full flex justify-center flex-wrap bg-[#222831] gap-x-1 border-t border-cyan-300'>
                {categories.map((category, index) => (
                    <Link
                        href={{
                            pathname: `/filmler/category/${category.id}`,
                            query: { name: category.name, page: 1 },
                        }}
                        className='text-gray-400 w-full hover:bg-gray-500 border-b border-white/15 p-3'
                        key={index}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;
