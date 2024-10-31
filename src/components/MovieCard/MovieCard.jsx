import { Link } from "react-router-dom";
import { useState } from "react";
import "./MovieCard.css";
import FavoriteButton from "../Buttons/FavoriteButton";
import AddButton from "../Buttons/AddButton";

export default function MovieCard({ id, title, poster_path }) {
  const isFavorite =
    JSON.parse(localStorage.getItem(`favorite-${id}`)) || false;
  const isAdd = JSON.parse(localStorage.getItem(`add-${id}`)) || false;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isActive = isHovered || isFocused;

  return (
    <div
      key={id}
      className={`movie-card flex flex-col text-left justify-center items-center duration-300 ${
        isActive ? "scale-125" : ""
      }`}
      aria-labelledby={`movie-title-${id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
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
            onFocus={handleFocus}
            tabIndex="0"
          />
        
        
          <AddButton
            id={id}
            initialAdd={isAdd}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex="0"
          />
        
      </div>
    </div>
  );
}
