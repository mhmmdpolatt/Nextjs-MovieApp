import React from 'react';
import Link from 'next/link';
import { RiMovie2Line } from 'react-icons/ri';

function Footer() {
  return (
    <footer className='bg-[#1c1f26] text-white py-8 px-4 mt-12'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6'>

        {/* Logo ve Ad */}
        <div className='flex items-center gap-3'>
          <RiMovie2Line size={40} className='text-cyan-300' />
          <h1 className='text-xl font-bold'>Movie App</h1>
        </div>

        {/* Hızlı Linkler */}
        <div className='flex flex-wrap justify-center gap-4 text-sm text-gray-300'>
          <Link href='/' className='hover:text-cyan-400 transition'>Anasayfa</Link>
          <Link href='/filmler' className='hover:text-cyan-400 transition'>Filmler</Link>
          <Link href='/diziler' className='hover:text-cyan-400 transition'>Diziler</Link>
          <Link href='/hakkinda' className='hover:text-cyan-400 transition'>Hakkında</Link>
        </div>

        {/* Geliştirici ve Telif */}
        <div className='text-center text-sm text-gray-400'>
          <p>© 2025 Movie App. All rights reserved.</p>
          <p>
            Developed by{' '}
            <Link
              href='https://muhammedpolat.vercel.app'
              target='_blank'
              className='text-cyan-400 hover:underline'
            >
              MHD Dev
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
