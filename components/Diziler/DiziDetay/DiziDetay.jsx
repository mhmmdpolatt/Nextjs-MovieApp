import React from 'react'
import Image from 'next/image'
import MoreMenu from '@/components/Filmler/MoreMenu/MoreMenu'

function DiziDetay({ dizi }) {

  return (
    <>
      {/* Arka Plan */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${dizi.backdrop_path}`}
          alt={dizi.name}
          fill
          className="object-cover opacity-30 blur-md"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start backdrop-blur-sm bg-[#393E46]/65 mt-16 border-b-4 border-t-4 border-cyan-300 rounded-lg" >
        {/* Poster */}
        <div className="w-full md:w-[300px] shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${dizi.poster_path}`}
            alt={dizi.name}
            width={500}
            height={750}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
        </div>

        <div className="absolute top-4 right-4 z-50">
          <div className="absolute top-4 right-4 z-50">
            <MoreMenu movie={dizi} />
          </div>
        </div>

        {/* Bilgiler */}
        <div className="flex-1 space-y-5">
          <h1 className="text-3xl font-bold text-cyan-300">{dizi.name}</h1>
          <p className="italic text-gray-400">{dizi.tagline || "Etiket bilgisi yok."}</p>
          <p className="text-sm text-cyan-200 bg-[#3fd2ec]/20 inline-block px-3 py-1 rounded-full">
            {dizi.genres?.map(g => g.name).join(', ') || "Tür bilgisi yok"}
          </p>
          <p className="text-gray-200">{dizi.overview}</p>

          {/* Genel Bilgiler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-300 pt-4 border-t border-gray-500">
            <p><strong>📅 İlk Yayın:</strong> {dizi.first_air_date}</p>
            <p><strong>📅 Son Yayın:</strong> {dizi.last_air_date}</p>
            <p><strong>📈 Puan:</strong> {dizi.vote_average?.toFixed(1)}</p>
            <p><strong>📥 Oy Sayısı:</strong> {dizi.vote_count}</p>
            <p><strong>🎬 Sezon:</strong> {dizi.number_of_seasons} sezon</p>
            <p><strong>🎞️ Bölüm:</strong> {dizi.number_of_episodes} bölüm</p>
            <p><strong>🌍 Ülke:</strong> {dizi.production_countries?.map(c => c.name).join(', ')}</p>
            <p><strong>🗣️ Diller:</strong> {dizi.spoken_languages?.map(l => l.name).join(', ')}</p>
            <p><strong>🌐 Web:</strong> <a href={dizi.homepage} className="text-cyan-400 underline" target="_blank">Resmi Site</a></p>
          </div>

          {/* Son ve Sıradaki Bölüm */}
          <div className="pt-6 space-y-4">
            {dizi.last_episode_to_air && (
              <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-cyan-500">
                <h3 className="font-bold text-cyan-300">📺 Son Bölüm: {dizi.last_episode_to_air.name}</h3>
                <p className="text-sm text-gray-300">{dizi.last_episode_to_air.overview || "Açıklama bulunamadı."}</p>
              </div>
            )}
            {dizi.next_episode_to_air && (
              <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-emerald-400">
                <h3 className="font-bold text-emerald-300">🎯 Sıradaki: {dizi.next_episode_to_air.name}</h3>
                <p className="text-sm text-gray-300">{dizi.next_episode_to_air.overview || "Açıklama bulunamadı."}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DiziDetay