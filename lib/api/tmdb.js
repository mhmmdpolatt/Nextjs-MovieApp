const BASE_URL = 'https://api.themoviedb.org/3';
// Ortak fetch fonksiyonu
async function fetchFromTMDB(endpoint) {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}language=en-US`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        accept: 'application/json',
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`TMDB API error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`TMDB HATA: ${err.message}`);
    return null;
  }
}


// Tüm API'leri burada topla
export const tmdb = {
  getPopularMovies: () => fetchFromTMDB('/movie/popular'),
  getTrendingMovies: () => fetchFromTMDB('/trending/movie/day'),
  getTrendingTV: () => fetchFromTMDB('/trending/tv/day'),
  getNowPlaying: () => fetchFromTMDB('/movie/now_playing'),
  getUpcoming: () => fetchFromTMDB('/movie/upcoming'),
  getPopularTV: () => fetchFromTMDB('/tv/popular'),
  getMovieGenres: () => fetchFromTMDB('/genre/movie/list'),
  getTVGenres: () => fetchFromTMDB('/genre/tv/list'),
  getMovieReviews:(id)=>fetchFromTMDB(`/movie/${id}/reviews`),
  getMovieVideos:(id)=>fetchFromTMDB(`/movie/${id}/videos`),
  getMovieById: (id) => fetchFromTMDB(`/movie/${id}`),
  getTvById: (id) => fetchFromTMDB(`/tv/${id}`),
  getMovieVideos: (id) => fetchFromTMDB(`/movie/${id}/videos`),
  getMovieCredits: (id) => fetchFromTMDB(`/movie/${id}/credits`),
  getMovieWatchProviders: (id) => fetchFromTMDB(`/movie/${id}/watch/providers`),
  getSimilarMovies: (id) => fetchFromTMDB(`/movie/${id}/similar`),
  getSimilarTv: (id) => fetchFromTMDB(`/tv/${id}/similar`),
  getByCategorieMovie: (id, page) =>
    fetchFromTMDB(`/discover/movie?with_genres=${id}&page=${page}`),
  getByCategorieTV: (id, page) =>
    fetchFromTMDB(`/discover/tv?with_genres=${id}&page=${page}`),
  searchMovies: (query) => fetchFromTMDB(`/search/movie?query=${value}&language=tr-TR`),
  searchTV: (query) => fetchFromTMDB(`/search/tv&query=${encodeURIComponent(query)}`),
};
