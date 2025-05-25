"use client"
import React, { useState } from 'react'
import FilmChooseCard from '../FilmChooseCard/FilmChooseCard'

function FilmChoose() {
    const [seciliType, setSeciliType] = useState("begendigiFilmler")  // burası değişti
    const chooses = [
        {
            typeChoose: "begendigiFilmler",
            title: "Beğendiklerim"
        },
        {
            typeChoose: "izlediklerim",
            title: "İzlediklerim"
        },
        {
            typeChoose: "dahaSonraIzle",
            title: "Sonra İzleyeceklerim"
        },
    ]

    const handleClick = async (typeChoose) => {
        setSeciliType(typeChoose)
    }

    return (
        <>
            <div className="mt-12 flex flex-col justify-center items-center">
                {/* Seçim Butonları */}
                <ul className="custom-scrollbar flex justify-center gap-x-4 w-full overflow-x-auto px-4 sm:px-16 pb-4">
                    {chooses.map((item) => (
                        <li key={item.typeChoose} className="flex-shrink-0">
                            <button
                                onClick={() => handleClick(item.typeChoose)}
                                className={`
                                ${item.typeChoose === seciliType ? "bg-cyan-400 text-black" : "bg-[#393E46] text-white"}
                                text-sm sm:text-base md:text-lg font-semibold
                                hover:bg-[#00ADB5] hover:text-black
                                transition-all duration-300
                                rounded-2xl px-6 py-3 shadow-md
                                whitespace-nowrap
                            `}
                            >
                                {item.title}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Film Kartları */}
            </div>
            <FilmChooseCard seciliType={seciliType} />
        </>
    )
}

export default FilmChoose
