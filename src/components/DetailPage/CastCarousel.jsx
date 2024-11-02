// CastCarousel.jsx
import React from "react";

const CastCarousel = ({ cast }) => (
  <aside>
    <h2 className="font-bold text-2xl mt-5">Elenco</h2>
    <div className="flex gap-5 mt-5 flex-wrap">
      {cast.cast &&
        cast.cast.slice(0, 20).map((actor) => (
          <div key={actor.id} className="flex flex-col items-center">
            <img
              className="rounded-xl"
              src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
              alt={actor.name}
            />
            <p className="text-center text-xs">{actor.name}</p>
          </div>
        ))}
    </div>
  </aside>
);

export default CastCarousel;