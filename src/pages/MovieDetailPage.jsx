import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import MovieInfo from "../components/DetailPage/MovieInfo";
import MovieDetails from "../components/DetailPage/MovieDetails";
import CastCarousel from "../components/DetailPage/CastCarousel";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState({});
  const [cast, setCast] = useState({});
  const isFavorite = JSON.parse(localStorage.getItem(`favorite-${id}`)) || false;
  const isAdd = JSON.parse(localStorage.getItem(`add-${id}`)) || false;
  const navigate = useNavigate();

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

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideo(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setCast(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(7px)",
          opacity: 0.5,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <button onClick={() => navigate(-1)} className="text-sm m-10">
        <ReplyIcon fontSize="large" />
        Voltar
      </button>
      <div className="mx-24">
        <section>
          {movie ? (
            <div key={movie.id} className="flex gap-3">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                  alt={""}
                />
              </div>
              <MovieInfo movie={movie} id={id} isFavorite={isFavorite} isAdd={isAdd} />
              {video.results && video.results.length > 0 ? (
                <iframe
                  title={video.results[0].name}
                  width="445"
                  height="250"
                  src={`https://www.youtube.com/embed/${video.results[0].key}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : null}
            </div>
          ) : null}
        </section>

        <div className="flex mt-20 items-center">
          <MovieDetails movie={movie} />
          <CastCarousel cast={cast} />
        </div>
      </div>
    </div>
  );
}