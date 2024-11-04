import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './CastCarousel.css'; 

const CastCarousel = ({ cast }) => {
  if (!cast || !cast.cast) {
    return null; 
  }

  return (
    <aside className="w-2/4">
      <h2 className="ml-5 font-bold text-2xl mt-5">Elenco</h2>
      <Swiper
        className='cast-swiper'
        spaceBetween={10}
        slidesPerView={5} 
        modules={[Navigation, Scrollbar, A11y, Keyboard]}
        scrollbar={{ draggable: true }}
        keyboard={{ enabled: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {cast.cast.map((actor) => (
          <SwiperSlide key={actor.id}>
            <div className="cast-item flex flex-col gap-1 items-center mx-2 pointer-events-none">
              <img
                className="rounded-xl cast-img"
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w154${actor.profile_path}` : 'https://placehold.co/154'}
                alt={actor.name}
              />
              <p className="text-center text-xs">{actor.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </aside>
  )
};

export default CastCarousel;