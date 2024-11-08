import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import 'ldrs/bouncy';
import { CircularPagination } from '../components/CircularPagination';
import SearchIcon from "@mui/icons-material/Search";

export default function MovieListPage() {
  const [search, setSearch] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setFilmes(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setFilmes([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    const url = search
      ? `https://api.themoviedb.org/3/search/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&query=${search}&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&page=${currentPage}`;

    fetchMovies(url);
  }, [search, currentPage]);

  return (
    <main className='flex flex-col items-center justify-center gap-5 mt-10'>
      <form className='w-2/4 flex flex-col justify-center gap-2 mb-5 relative'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Pesquise um filme...'
          className=' text-purple-900 p-2 px-4 mb-5 rounded-xl focus:outline-none'/>
          <SearchIcon className='text-purple-800 absolute right-2 top-[16.5%]'/>
      </form>
      <section className='flex flex-wrap gap-10 justify-center align-center mx-10'>
      {loading ? (
        <div className='col-span-4 mt-5'>
          <l-bouncy
            size="45"
            speed="1.75"
            color="white" 
          ></l-bouncy>
        </div>
      ) : (
        filmes.length > 0 ? (
          filmes.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))
        ) : (
          <div className='col-span-4 mt-5'>
            <p className="text-white text-lg">Título não encontrado</p>
          </div>
        )
      )}
      </section>
      <div className='col-span-4 flex justify-center my-5'>
        <CircularPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}/>
      </div>
    </main>
  );
}