"use client"
import React from 'react'
import Link from 'next/link'
import { RiMovie2Line } from "react-icons/ri";
import SearchResult from '../../SearchResult/SearchResult';
import { FaUser } from "react-icons/fa";
import KullaniciMenu from '../KullaniciMenu/KullaniciMenu';
import { IoIosMenu } from "react-icons/io";
import { useState } from 'react';
import Menu from '../Menu/Menu';
import { IoMdHome } from "react-icons/io";
import { MdLocalMovies, } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";





function Navbar({ data }) {
    const [openMenu, setOpenMenu] = useState(false)
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }
    const handleCloseMenu = () => {
        setOpenMenu(false)
    }

    return (
        <>

            <div className='fixed right-1/2 translate-x-1/2 w-[90%] mx-auto hidden md:flex justify-between items-center py-2 bg-[#393E46] shadow-lg  rounded-ee-2xl rounded-es-2xl z-50'>
                {/* LOGO */}
                <div className='flex items-center gap-x-3 ml-8'>
                    <RiMovie2Line size={40} className='text-[cyan]' />
                    <h1 className='text-[cyan] text-2xl font-extrabold'>My Movies</h1>
                </div>
                {/* LOGO */}



                {/* LİNKLER*/}
                <div className='flex gap-x-8 items-center text-[cyan]
                 font-light mr-8'>
                    <Link href="/" className='hover:text-[#DFD0B8] transition duration-300 ease-in-out'>Anasayfa</Link>
                    <Link href="/filmler" className='hover:text-[#DFD0B8] transition duration-300 ease-in-out'>Filmler</Link>
                    <Link href="/diziler" className='hover:text-[#DFD0B8] transition duration-300 ease-in-out'>Diziler</Link>
                </div>
                {/* LİNKLER*/}


                <SearchResult />

                <KullaniciMenu data={data} />
                {/* SEARCH BAR */}
            </div>


            {/* MOBILE NAVBAR */}
            {/* ------------------------------------------------------------------------------------------------------- */}
            <div className='flex flex-col items-center gap-y-2 md:hidden bg-[#393E46] py-2'>
                <div className='flex items-center gap-x-3 justify-center mt-4'>
                    <RiMovie2Line size={40} className='text-cyan-100' />
                    <h1 className='text-cyan-200 text-2xl font-extrabold'>MOVİE APP</h1>
                </div>
                <SearchResult />
                {/* Üst Menü */}
                <div className="flex gap-x-8 items-center justify-center text-cyan-100 font-light mt-2">
                    <button onClick={handleOpenMenu} className="flex flex-col items-center gap-x-1 hover:text-[#DFD0B8] transition">
                        <IoIosMenu size={22} /> Menü
                    </button>
                    <div className='flex flex-col items-center justify-center gap-x-1 '>
                        <IoMdHome size={22} />
                        <Link href="/" className="hover:text-[#DFD0B8] transition">Anasayfa</Link>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-x-1 '>
                        <MdLocalMovies size={22} />
                        <Link href="/filmler" className="hover:text-[#DFD0B8] transition gap-x-1 ">Filmler</Link>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-x-1 '>
                        <MdLiveTv size={22}/>
                        <Link href="/diziler" className="hover:text-[#DFD0B8] transition">Diziler</Link>
                    </div>
                </div>

                {openMenu && (
                    <Menu openMenu={openMenu} handleCloseMenu={handleCloseMenu} data={data} />
                )}



            </div>


        </>
    )
}

export default Navbar