'use client'

import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function KullaniciMenu({ data,handleCloseMenu }) {
    const [open, setOpen] = useState(false)
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/user/deleteToken")
            router.refresh()
        } catch (error) {
            console.log("ÇIKIŞ YAPILAMADI", error);

        } finally {
            setTimeout(() => {
                router.push("/")
            }, 500)
        }
    }

    return (
        <>
            <div
                className='relative flex justify-center items-center px-4 bg-slate-700 rounded-3xl p-1 mr-2 cursor-pointer'
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}

            >
                <FaUser size={20} className='text-[cyan] mr-2' />
                {data ? (
                    <span className='text-white text-nowrap'>
                        {data.kullaniciAdi.toUpperCase()}
                    </span>
                ) : (
                    <Link
                        href="/giris"
                        className='text-[#ffffff] font-light mr-8 hover:text-[#DFD0B8] transition duration-300 ease-in-out'
                        onClick={handleCloseMenu}
                    >
                        Giriş Yap
                    </Link>
                )}

                {/* Hover Menüsü */}
                {data && open && (
                    <div className='absolute top-full  right-0 w-40 bg-[#1f2937] border border-gray-600 rounded-lg shadow-lg z-50'>
                        <ul className='flex flex-col'>
                            <li>
                                <Link
                                    href="/profile"
                                    className='block px-4 py-2 text-sm text-white hover:bg-cyan-600 rounded-t-lg'
                                    onClick={handleCloseMenu}
                                >
                                    Profil
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left px-4 py-2 text-sm text-white hover:bg-red-500 rounded-b-lg'
                                >
                                    Çıkış Yap
                                </button>
                            </li>
                        </ul>
                    </div>
                )}


            </div>
            {data && (
                <div className="md:hidden flex flex-col items-start space-y-2 border-b border-cyan-100 py-3">
                    <Link href="/profile" className="text-sm text-white hover:underline">
                        Profil
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-white hover:underline"
                    >
                        Çıkış Yap
                    </button>
                </div>
            )}


        </>

    )
}
