import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import MovieCard from '../components/MovieCard/MovieCard.jsx';
import 'ldrs/bouncy';

export default function MoviesByGenre({ genreId, genreName }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&with_genres=${genreId}`
      );
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    };

    fetchMoviesByGenre();
  }, [genreId]);

  return (
    <div className='m-10'>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
        </div>
      ) : (
        <>
          <h2 className='text-2xl text-center text-bold ml-8 mt-10'>Os melhores -&gt; {genreName}</h2>
          <main className='flex flex-col items-center justify-center gap-5 mt-10'>
            <div className='flex flex-wrap gap-10 justify-center align-center mx-10'>
              {movies.map((movie) => (
                <MovieCard
                  id={movie.id}
                  title={movie.title || movie.name}
                  poster_path={movie.poster_path}
                />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}