import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SearchResult from '@/components/SearchResult/SearchResult'
import { RiMovie2Line } from 'react-icons/ri'

function HomeHeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Arka Plan */}
      <Image
        src="/HeroSection.jpg"
        alt="Hero Image"
        fill
        className="object-cover blur-sm brightness-75"
        priority
      />

      {/* Karartma Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* İçerik */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-12 text-white text-center z-10">
        {/* Logo ve Başlık */}
        <div className="flex flex-col items-center mb-8">
          <RiMovie2Line size={60} className="text-cyan-300 mb-2 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl">
            Sinemanın Büyüsüne Kapıl
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-300">
            En popüler filmleri, dizileri ve trend yapımları keşfet. Film dünyasına adım atmanın şimdi tam zamanı!
          </p>
        </div>

        {/* Arama Bileşeni */}
        <div className="w-full mx-auto flex justify-center">
          <SearchResult />
        </div>

        {/* Butonlar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/filmler"
            className="bg-cyan-600 hover:bg-cyan-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-cyan-400/30 transition-all duration-300"
          >
            🎬 Filmleri Keşfet
          </Link>
          <Link
            href="/diziler"
            className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#1e1e1e] font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            📺 Dizileri Keşfet
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
