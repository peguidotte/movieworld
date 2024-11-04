import React from "react";
import { Link } from "react-router-dom";

const Recommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  // Pegar os 3 primeiros recomendados
  const topRecommendations = recommendations.slice(0, 3);

  return (
    <div className="recommendations">
      <h2 className="text-2xl font-bold mb-4">Recomendações</h2>
      <div className="flex gap-4">
        {topRecommendations.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="recommendation-item">
            <img
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg"
            />
            <p className="text-center text-sm mt-2">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;