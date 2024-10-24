import { Link } from "react-router-dom";
import { useState } from "react";
import "./MovieCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

export default function MovieCard({ id, title, poster_path }) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdd, setIsAdd] = useState(false)

  const toggleAdd = () => {
    setIsAdd(!isAdd)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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

  return (
    <>
      <div
        key={id}
        className="movie-card flex flex-col text-left justify-center items-center hover:scale-125 focus-within:scale-125 duration-300"
      >
        <Link to={`/movies/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w185${poster_path}`}
            alt={title}
            className="movie-img h-72 rounded-sm"
          />
          <div className="movie-info top-[0] p-2">
            <h2 className="text-base">{title}</h2>
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
              isAdd ? "Remover da Lista de interesse" : "Adicionar a Lista de interesse"
            }
          >
            <button
              onClick={toggleAdd}
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
    </>
  );
}
