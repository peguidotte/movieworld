import { Link } from "react-router-dom";
import { useState } from "react";
import "./MovieCard.css";
import FavoriteButton from "../Buttons/FavoriteButton";
import AddButton from "../Buttons/AddButton";

export default function MovieCard({ id, title, poster_path }) {
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  const watchListMovies = JSON.parse(localStorage.getItem('watchListMovies')) || [];

  const isFavorite = favoriteMovies.includes(id);
  const isAdd = watchListMovies.includes(id);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isActive = isHovered 

  return (
    <div
      key={id}
      className={`movie-card flex flex-col text-left justify-center items-center duration-300 ${
        isActive ? "scale-125" : ""
      }`}
      aria-labelledby={`movie-title-${id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      
    >
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: { isFavorite, isAdd },
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w185${poster_path}`}
          alt={`${title} - clique para ver mais`}
          className="movie-img h-72 rounded-sm"
        />
        <div className={`${isActive ? "movie-info" : "hidden"} top-[0] p-2`}>
          <h2 id={`movie-title-${id}`} className="text-base">
            {title}
          </h2>
          <p className="text-xs text-gray-600">clique para ver detalhes</p>
        </div>
      </Link>
      <div className={`${isActive ? "movie-info" : "hidden"} bottom-[2%] px-2`}>
        
          <FavoriteButton
            id={id}
            initialFavorite={isFavorite}
          />
        
        
          <AddButton
            id={id}
            initialAdd={isAdd}
          />
        
      </div>
    </div>
  );
}
