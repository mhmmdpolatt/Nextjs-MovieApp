import React from 'react'
import Image from 'next/image'
import { tmdb } from '@/lib/api/tmdb'
import MoreMenu from '../MoreMenu/MoreMenu'

async function DetailMovie({ movie }) {
    const videoData = await tmdb.getMovieVideos(movie.id);
    console.log("VİDEO DATA", videoData);

    const reviewData = await tmdb.getMovieReviews(movie.id)
    const review=reviewData.results
    console.log("Yorumlar",reviewData);
    

    const trailer = videoData.results.find(
        (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
    );
    const data = await tmdb.getMovieCredits(movie.id)
    const cast = data.cast.slice(0, 5)
    return (
        <>

            <div className="absolute inset-0 z-0">
                <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover opacity-30 blur-sm"
                />
                <div className="absolute inset-0 bg-[#393E46]/20"></div>
            </div>

            {/* İçerik */}

            <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col md:flex-col gap-8 items-start backdrop-blur-sm bg-[#393E46]/65 mt-16 border-b-4 border-t-4 border-cyan-300 rounded-lg ">
                {trailer && (
                    <div className="mt-8 w-full">
                        <h2 className="text-lg font-bold text-cyan-300 mb-2">🎞️ Fragman</h2>
                        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[420px] xl:h-[480px] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                title={trailer.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>

                    </div>
                )}

                <div className="absolute top-4 right-4 z-50">
                    <div className="absolute top-4 right-4 z-50">
                        <MoreMenu movie={movie} />
                    </div>
                </div>
                {/* Poster */}

                <div className='flex flex-col md:flex-row gap-x-8'>
                    <div className="w-full md:w-[300px] flex-shrink-0 mb-6 md:mb-0">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={500}
                            height={750}
                            className="rounded-lg shadow-lg w-full h-auto object-cover"
                        />
                    </div>


                    {/* Bilgiler */}
                    <div className="flex-1 space-y-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400">{movie.title}</h1>
                        <p className="text-sm text-gray-400 italic">{movie.tagline || 'Etiket bilgisi bulunamadı.'}</p>
                        <p className="inline-block bg-[#3fd2ec] p-1 rounded-2xl px-3 text-sm sm:text-base text-shadow-gray-600">
                            {movie.genres?.map(g => g.name).join(', ')}
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed">{movie.overview}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300 mt-6">
                            <p><strong>🎬 Süre:</strong> {movie.runtime} dakika</p>
                            <p><strong>🗓️ Vizyon:</strong> {movie.release_date}</p>
                            <p><strong>💸 Bütçe:</strong> ${movie.budget.toLocaleString()}</p>
                            <p><strong>🌎 Diller:</strong> {movie.spoken_languages?.map(lang => lang.name).join(', ')}</p>
                            <p><strong>📈 Oy Ortalaması:</strong> {movie.vote_average}</p>
                            <p><strong>📥 Oy Sayısı:</strong> {movie.vote_count}</p>
                            <p><strong>🎭 Türler:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
                            <p><strong>📍 Ülkeler:</strong> {movie.production_countries?.map(c => c.name).join(', ')}</p>
                        </div>
                        {/* {FRAGMAN} */}


                        {/* Oyuncular */}

                        <div className='flex flex-col justify-center items-start'>
                            <h1 className='font-bold text-xl text-cyan-500'>Oyuncular</h1>
                            <div className="flex gap-4 py-2 flex-wrap ">
                                {cast.map((actor) => (
                                    <div
                                        key={actor.id}
                                        className="min-w-[120px] flex flex-col items-center p-3 s"
                                    >
                                        <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                                            <Image
                                                src={
                                                    actor.profile_path
                                                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                                        : "/default-user.png" // fallback ekledik
                                                }
                                                alt={actor.name}
                                                width={80}
                                                height={80}
                                                className="object-cover w-full h-full border-3 border-red-100 rounded-full shadow-lg"
                                            />
                                        </div>
                                        <p className="text-sm text-center font-medium text-gray-100">{actor.name}</p>
                                        <p className="text-xs text-center text-gray-400">{actor.character}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {review.length > 0 && (
                    <div className="mt-8 w-full">
                        <h2 className="text-lg font-bold text-cyan-300 mb-4">👥 İzleyici Yorumları</h2>
                        <div className="space-y-4">
                            {review.map((review, index) => (
                                <div key={index} className="bg-[#1f1f1f] p-4 rounded-lg shadow-md">
                                    <p className="text-sm text-gray-300 mb-2">👤 <strong>{review.author}</strong></p>
                                    <p className="text-sm italic text-gray-400">{review.content.slice(0, 300)}...</p>
                                    {review.author_details.rating && (
                                        <p className="text-yellow-300 mt-2">⭐ {review.author_details.rating}/10</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default DetailMovie