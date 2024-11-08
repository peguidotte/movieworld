import React from "react";
import { Link } from "react-router-dom";

const Recommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const topRecommendations = recommendations.slice(0, 3);

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-4">Recomendações</h2>
      <div className="flex gap-7">
        {topRecommendations.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="recommendation-item">
            <img
              src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;