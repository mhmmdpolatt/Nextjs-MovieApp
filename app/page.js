'use client'
import HomeHeroSection from '@/components/partials/HomeHeroSection/HomeHeroSection'
import { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])


  return (
    loading ? (
      <div className="flex flex-col gap-y-3 justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-300">
          <FaPlayCircle size={75} className="text-cyan-300" />
        </div>
        <h1 className="text-white text-2xl font-bold mt-4">Yükleniyor...</h1>
      </div>
    ) : <HomeHeroSection />



  )



}
