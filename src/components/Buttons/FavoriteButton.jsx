import React, { useState, useEffect } from 'react';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
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

const FavoriteButton = ({ id, initialFavorite}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (isFavorite) {
      if (!favorite.includes(id)) {
        favorite.push(id);
      }
    } else {
      const index = favorite.indexOf(id);
      if (index > -1) {
        favorite.splice(index, 1);
      }
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(favorite));
  }, [isFavorite, id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <CustomTooltip
      placement="top"
      arrow
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    >
      <button
        onClick={toggleFavorite}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      >
        {isFavorite ? (
          <FavoriteIcon className="icon text-purple-800" />
        ) : (
          <FavoriteBorderIcon className="icon text-purple-600" />
        )}
      </button>
    </CustomTooltip>
  );
};

export default FavoriteButton;