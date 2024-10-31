import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MovieCard.css";
import FavoriteButton from '../Buttons/FavoriteButton';
import AddButton from '../Buttons/AddButton';

export default function MovieCard({ id, title, poster_path }) {
  const isFavorite = JSON.parse(localStorage.getItem(`favorite-${id}`)) || false;
  const isAdd = JSON.parse(localStorage.getItem(`add-${id}`)) || false;

  return (
    <div
      key={id}
      className="movie-card flex flex-col text-left justify-center items-center hover:scale-125 focus-within:scale-125 duration-300"
      aria-labelledby={`movie-title-${id}`}
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
        <div className="movie-info top-[0] p-2">
          <h2 id={`movie-title-${id}`} className="text-base">
            {title}
          </h2>
          <p className="text-xs text-gray-600">clique para ver detalhes</p>
        </div>
      </Link>
      <div className="movie-info bottom-[2%] px-2">
        <FavoriteButton id={id} initialFavorite={isFavorite} />
        <AddButton id={id} initialAdd={isAdd} />
      </div>
    </div>
  );
}