import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import 'ldrs/bouncy'
import { CircularPagination } from '../components/CircularPagination';
import SearchIcon from "@mui/icons-material/Search";

export default function MovieListPage() {

  const [search, setSearch] = useState('');
  const [filmes, setFilmes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTimeout(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br&page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
      setFilmes(data.results);
      setTotalPages(data.total_pages);
    })
    .catch(error => console.error(error))
    .finally(() => console.log('fetch finalizado'));
    });
  }, [currentPage]);

  const filmesFiltrados = filmes.filter(movie => (movie.title.toLowerCase().includes(search.toLowerCase())));


  return (
    <>
      <main className='flex flex-col items-center justify-center gap-5'>
        <form className='w-2/4 flex flex-col justify-center gap-2 mb-5'>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Pesquise um filme...'
            className=' text-purple-900 p-2 px-4 mb-5 rounded-xl focus:outline-none relative'/>
            <SearchIcon className='text-purple-800 absolute left-[73%] top-[16.5%]'/>
        </form>
        <section className='flex flex-wrap gap-10 justify-center align-center mx-10'>
        {
          filmesFiltrados.length > 0 ?
          filmesFiltrados.map((movie) => {
              console.log(movie);
              return <MovieCard key={movie.id} {...movie} />
          })
          :
          <div className='col-span-4 mt-5'>
          <l-bouncy
            size="45"
            speed="1.75"
            color="white" 
          ></l-bouncy>
          </div>
        }
        </section>
        <div className='col-span-4 flex justify-center'>
          <CircularPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}/>
        </div>
      </main>
    </>
  )
}
