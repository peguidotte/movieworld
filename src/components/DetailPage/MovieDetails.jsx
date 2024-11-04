// MovieDetails.jsx
import React from "react";

const MovieDetails = ({ movie, director }) => (
  <aside className="flex flex-col gap-2 w-2/4 text-balance">
    <p>
      Data de lançamento:
      <p className="text-gray-400 text-sm">{movie.release_date}</p>
    </p>
    {director && (
      <p>
        Diretor:{" "}
        <p className="text-gray-400 text-sm">{director}</p>
      </p>
    )}
    {movie.genres && movie.genres.length > 0 && (
      <p>
        Gêneros:{" "}
        <p className="text-gray-400 text-sm">
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
      </p>
    )}
    {movie.production_countries && movie.production_countries.length > 0 && (
      <p>
        País de produção:{" "}
        <p className="text-gray-400 text-sm">
          {movie.production_countries.map((country) => country.name).join(", ")}
        </p>
      </p>
    )}
    {movie.production_companies && movie.production_companies.length > 0 && (
      <p>
        Produtoras:{" "}
        <p className="text-gray-400 text-sm">
          {movie.production_companies.map((company) => company.name).join(", ")}
        </p>
      </p>
    )}
  </aside>
);

export default MovieDetails;