import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard/MovieCard.jsx';
import 'ldrs/bouncy';

export default function MoviesByGenrePage({genreId, genreName}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&with_genres=${genreId}`
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
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
          <h2 className='text-2xl text-bold ml-8 mt-10'>Melhores filmes de {genreName}</h2>
          <section className='flex flex-wrap gap-10 justify-center align-center mx-10'>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))
            ) : (
              <div className='col-span-4 mt-5'>
                <p className="text-white text-lg">Nenhum filme encontrado</p>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}