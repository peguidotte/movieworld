import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard/MovieCard.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

export default function Profile() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [watchList, setWatchList] = useState([]);
    

    useEffect(() => {
        const favoriteIds = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
        const watchListIds = JSON.parse(localStorage.getItem('watchListMovies')) || [];

        const fetchMovies = async (ids, setMovies) => {
            const movies = await Promise.all(
                ids.map(async (id) => {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
                    );
                    const data = await response.json();
                    return data;
                })
            );
            setMovies(movies);
        };

        fetchMovies(favoriteIds, setFavoriteMovies);
        fetchMovies(watchListIds, setWatchList);
    }, []);

    return (
        <div className='m-10'>
            <h2 className='text-2xl text-bold ml-8'>Favorite Movies <FavoriteIcon className="text-purple-800"/></h2>
            {favoriteMovies.length > 0 ? (
                <Swiper
                    spaceBetween={0}
                    slidesPerView={6}
                    modules={[Scrollbar]}
                    scrollbar={{ draggable: true }}
                >
                    {favoriteMovies.map((movie) => (
                        <SwiperSlide key={movie.id} className='py-10 px-4 cursor-grab active:cursor-grabbing'>
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className='mx-[40%] text-center my-10'>Os filmes favoritos aparecerão aqui!</p>
            )}
            <h2 className='text-2xl text-bold ml-8 mt-10'>Watch List <AddToQueueIcon className="text-purple-800"/></h2>
            {watchList.length > 0 ? (
                <Swiper
                    spaceBetween={0}
                    slidesPerView={6}
                    modules={[Scrollbar]}
                    scrollbar={{ draggable: true }}
                >
                    {watchList.map((movie) => (
                        <SwiperSlide key={movie.id} className='py-10 px-4 cursor-grab active:cursor-grabbing'>
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                poster_path={movie.poster_path}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className='mx-[40%] text-center my-10'>Os filmes da lista de interesse aparecerão aqui!</p>
            )}
        </div>
    );
}