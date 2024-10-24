import { Link } from "react-router-dom";
import { useState } from "react";
import "./MovieCard.css";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";
import { Tooltip, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

// Customização da Tooltip
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    fontSize: "0.7rem",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
});

export default function MovieCard({ id, title, poster_path }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const toggleAdd = () => {
    setIsAdd(!isAdd);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      key={id}
      className="movie-card flex flex-col text-left justify-center items-center hover:scale-125 focus-within:scale-125 duration-300"
      aria-labelledby={`movie-title-${id}`} // Associate the card with the title
    >
      <Link to={`/movies/${id}`}>
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
        <CustomTooltip
          placement="top"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 300 }}
          title={
            isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"
          }
        >
          <button
            onClick={toggleFavorite}
            className="pr-1"
            aria-pressed={isFavorite} // ARIA attribute to indicate toggle state
            aria-label={
              isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"
            } // ARIA label for screen readers
          >
            {isFavorite ? (
              <FavoriteIcon className="icon text-[red]" />
            ) : (
              <FavoriteBorderIcon className="icon text-white" />
            )}
          </button>
        </CustomTooltip>
        <CustomTooltip
          placement="top"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 300 }}
          title={
            isAdd
              ? "Remover da Lista de interesse"
              : "Adicionar a Lista de interesse"
          }
        >
          <button
            onClick={toggleAdd}
            aria-pressed={isAdd} // ARIA attribute to indicate toggle state
            aria-label={
              isAdd
                ? "Remover da Lista de interesse"
                : "Adicionar a Lista de interesse"
            } // ARIA label for screen readers
          >
            {isAdd ? (
              <AddCircleIcon className="icon" />
            ) : (
              <AddCircleOutlineIcon className="icon" />
            )}
          </button>
        </CustomTooltip>
      </div>
    </div>
  );
}
