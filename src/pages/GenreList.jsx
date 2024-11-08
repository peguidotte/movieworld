import React, { useEffect, useState } from 'react';
import MoviesByGenre from './MoviesByGenrePage';
import 'ldrs/bouncy';

export default function GenreList() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      );
      const data = await response.json();
      setGenres(data.genres || []);
      setLoading(false);
    };

    fetchGenres();
  }, []);

  const selectedGenreName = genres.find(genre => genre.id === selectedGenre)?.name;

  return (
    <div className='m-3'>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
        </div>
      ) : (
        <>
          <main className='flex flex-wrap gap-5 justify-center'>
            {genres.map((genre) => (
              <button
                key={genre.id}
                className={`p-2 rounded ${selectedGenre === genre.id ? 'bg-purple-600 text-white' : 'bg-purple-800 text-white'}`}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </main>
          {selectedGenre ? (
            <MoviesByGenre genreId={selectedGenre} genreName={selectedGenreName} />
          ) : (
            <p className='text-center mt-10'>Escolha um gênero para te exibirmos os melhores!</p>
          )}
        </>
      )}
    </div>
  );
}