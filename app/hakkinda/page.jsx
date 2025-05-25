'use client'
import React from 'react';
import { RiMovie2Line } from 'react-icons/ri';
import Link from 'next/link';

function Hakkinda() {
  return (
    <main className="min-h-screen bg-[#1c1f26] text-white py-16 px-6 md:px-16 mt-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Logo + Başlık */}
        <div className="flex items-center gap-4">
          <RiMovie2Line size={48} className="text-cyan-400" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Hakkımızda</h1>
        </div>

        {/* Açıklama */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-300">
            Movie App, kullanıcıların popüler film ve dizi içeriklerine kolayca ulaşmasını sağlayan modern bir web uygulamasıdır. TMDB API kullanılarak geliştirilen bu platform, kullanıcı dostu arayüzüyle sinema severlere mükemmel bir keşif deneyimi sunar.
          </p>

          <p className="text-lg leading-relaxed text-gray-300">
            Filmleri ve dizileri türlerine göre filtreleyebilir, detaylı bilgilere ulaşabilir ve favori içeriklerinizi keşfedebilirsiniz.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            Hesap oluşturup sevdiğiniz filmleri kaydedebilir izleme listesi oluşturabilirsiniz
          </p>
        </section>

        {/* Kullanılan Teknolojiler */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">Kullanılan Teknolojiler</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Next.js 13+</li>
            <li>Tailwind CSS</li>
            <li>TMDB (The Movie Database) API</li>
            <li>React Icons</li>
          </ul>
        </section>

        {/* Geliştirici Bilgisi */}
        <section className="border-t border-white/10 pt-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">Geliştirici</h2>
          <p className="text-gray-400">
            Bu uygulama, modern web teknolojileri tutkunu{' '}
            <Link
              href="https://muhammedpolat.vercel.app"
              target="_blank"
              className="text-cyan-400 hover:underline"
            >
              MHD Dev
            </Link>{' '}
            tarafından geliştirilmiştir.
          </p>
        </section>

      </div>
    </main>
  );
}

export default Hakkinda;
