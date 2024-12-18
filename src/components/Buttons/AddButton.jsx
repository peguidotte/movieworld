import React, { useState, useEffect } from 'react';
import {
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

const AddButton = ({ id, initialAdd }) => {
  const [isAdd, setIsAdd] = useState(initialAdd);

  useEffect(() => {
    const watchList = JSON.parse(localStorage.getItem('watchListMovies')) || [];
    if (isAdd) {
      if (!watchList.includes(id)) {
        watchList.push(id);
      }
    } else {
      const index = watchList.indexOf(id);
      if (index > -1) {
        watchList.splice(index, 1);
      }
    }
    localStorage.setItem('watchListMovies', JSON.stringify(watchList));
  }, [isAdd, id]);

  const toggleAdd = () => {
    setIsAdd(!isAdd);
  };

  return (
    <CustomTooltip
      placement="top"
      arrow
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={isAdd ? "Remover da Lista de interesse" : "Adicionar a Lista de interesse"}
    >
      <button
        onClick={toggleAdd}
        aria-pressed={isAdd}
        aria-label={isAdd ? "Remover da Lista de interesse" : "Adicionar a Lista de interesse"}
      >
        {isAdd ? (
          <AddCircleIcon className="icon text-purple-800" />
        ) : (
          <AddCircleOutlineIcon className="icon text-purple-600" />
        )}
      </button>
    </CustomTooltip>
  );
};

export default AddButton;