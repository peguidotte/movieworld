import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.error(err));
  }, [id]); 

  const navigate = useNavigate();

  return (
    <>
      <div className="m-10">
        <button onClick={() => navigate(-1)} className="text-sm mb-5">
          <ReplyIcon fontSize="large" />
          Voltar
        </button>
        <section>
          {movie ? (
            <div key={movie.id} className="flex items-center">
              <div>
                <h2>{movie.title}</h2>
                <img
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div>
                <p>{movie.vote_average}</p>
                <p>{movie.overview}</p>
                <p>{movie.tagline}</p>
                {movie.backdrop_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={`${movie.title} backdrop`}
                  />
                )}
              </div>
            </div>
          ) : (
            <p>Filme não encontrado</p>
          )}
        </section>
      </div>
    </>
  );
}