import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import MovieCard from '../components/MovieCard/MovieCard.jsx';
import 'ldrs/bouncy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import TvIcon from '@mui/icons-material/Tv';
import StarIcon from '@mui/icons-material/Star';
import ElderlyIcon from '@mui/icons-material/Elderly';

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [tvSeries, setTvSeries] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [oldTopRatedMovies, setOldTopRatedMovies] = useState([]);

    const [loadingPopular, setLoadingPopular] = useState(true);
    const [loadingRecommended, setLoadingRecommended] = useState(true);
    const [loadingUpcoming, setLoadingUpcoming] = useState(true);
    const [loadingTvSeries, setLoadingTvSeries] = useState(true);
    const [loadingTopRated, setLoadingTopRated] = useState(true);
    const [loadingOldTopRated, setLoadingOldTopRated] = useState(true);

    useEffect(() => {
        const fetchMovies = async (url, setMovies, setLoading) => {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setLoading(false);
        };

        const favoriteIds = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

        fetchMovies('https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR', setPopularMovies, setLoadingPopular);
        fetchMovies(`https://api.themoviedb.org/3/movie/${favoriteIds.join(',')}/recommendations?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`, setRecommendedMovies, setLoadingRecommended);
        fetchMovies('https://api.themoviedb.org/3/movie/upcoming?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR', setUpcomingMovies, setLoadingUpcoming);
        fetchMovies('https://api.themoviedb.org/3/tv/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR', setTvSeries, setLoadingTvSeries);
        fetchMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR', setTopRatedMovies, setLoadingTopRated);
        fetchMovies('https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR&sort_by=vote_average.desc&release_date.lte=2000-12-31', setOldTopRatedMovies, setLoadingOldTopRated);
    }, []);

    const renderCarousel = (title, icon, movies, loading) => (
        <>
            <div className="ml-5 mt-10 flex items-center gap-2">
                <h2 className='text-2xl text-bold'>{title}</h2>
                <p className="text-purple-800">{icon}</p>
            </div>
            {loading ? (
                <div className='flex justify-center items-center h-64'>
                    <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
                </div>
            ) : (
                <Swiper
                    spaceBetween={0}
                    slidesPerView={6}
                    modules={[Scrollbar]}
                    scrollbar={{ draggable: true }}
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id} className='py-10 px-4 cursor-grab active:cursor-grabbing'>
                            <MovieCard
                                id={movie.id}
                                title={movie.title || movie.name}
                                poster_path={movie.poster_path}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );

    return (
        <div className='m-10'>
            {renderCarousel('Sensações do momento', <TrendingUpIcon className="text-purple-800"/>, popularMovies, loadingPopular)}
            {renderCarousel('Especiais para Você', <EmojiEmotionsIcon />, recommendedMovies, loadingRecommended)}
            {renderCarousel('Estão por Vir...', <UpcomingIcon />, upcomingMovies, loadingUpcoming)}
            {renderCarousel('Séries de TV', <TvIcon />, tvSeries, loadingTvSeries)}
            {renderCarousel('Os melhores!', <StarIcon />, topRatedMovies, loadingTopRated)}
            {renderCarousel('Os melhores de antigamente!', <ElderlyIcon />, oldTopRatedMovies, loadingOldTopRated)}
        </div>
    );
}