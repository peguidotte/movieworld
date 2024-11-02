// MovieInfo.jsx
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteButton from "../Buttons/FavoriteButton";
import AddButton from "../Buttons/AddButton";

const getStars = (rating) => {
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={`full-${i}`} style={{ color: "#FBC02D" }} />);
  }

  if (halfStar === 1) {
    stars.push(<StarHalfIcon key="half" style={{ color: "#FBC02D" }} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <StarBorderIcon key={`empty-${i}`} style={{ color: "#FBC02D" }} />
    );
  }

  return <div className="flex">{stars}</div>;
};

const MovieInfo = ({ movie, id, isFavorite, isAdd }) => (
  <div className="flex flex-col gap-2 w-2/4">
    <div>
      <h2 className="font-bold text-3xl">{movie.title}</h2>
      <p className="text-gray-500 text-sm">{movie.runtime} minutos</p>
    </div>
    <div className="flex gap-1 items-center mb-2">{getStars(movie.vote_average)}</div>
    <p className="text-balance text-sm">{movie.overview}</p>
    <p className="font-semibold text-xl ">{movie.tagline}</p>
    <div className="flex gap-2">
      <FavoriteButton id={id} initialFavorite={isFavorite} />
      <AddButton id={id} initialAdd={isAdd} />
      <button className="px-2 ml-5 text-white bg-purple-800 rounded-xl">
        avaliar
      </button>
    </div>
  </div>
);

export default MovieInfo;