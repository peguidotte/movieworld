import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import FavoriteButton from "../components/Buttons/FavoriteButton";
import AddButton from "../components/Buttons/AddButton";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState({});
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

  const getStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} style={{ color: "#FBC02D" }} />);
    }

    if (halfStar === 1) {
      stars.push(<StarHalfIcon key="half" style={{ color: "#FBC02D" }} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarBorderIcon key={`empty-${i}`} style={{ color: "#FBC02D" }} />
      );
    }

    return <div className="flex">{stars}</div>;
  };

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
      <div>
        <button onClick={() => navigate(-1)} className="text-sm m-10">
          <ReplyIcon fontSize="large" />
          Voltar
        </button>
        <section className="mx-20">
          {movie ? (
            <div
              key={movie.id}
              className="flex gap-3"
            >
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                  alt={""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-3xl">{movie.title}</h2>
                <div className="flex gap-1 items-center mb-4">
                  <p className="text-lg">{movie.vote_average}</p>
                  {getStars(movie.vote_average)}
                </div>
                <p className="max-w-4xl text-balance">{movie.overview}</p>
                <p className="font-bold text-xl">{movie.tagline}</p>
                <div className="flex gap-2">
                  <FavoriteButton id={id} initialFavorite={isFavorite} />
                  <AddButton id={id} initialAdd={isAdd} />
                </div>
              </div>
            </div>
          ) : null}
          {video.results && video.results.length > 0 ? (
            <iframe
              className="mt-10"
              title={video.results[0].name}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.results[0].key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          ) : null}
        </section>
      </div>
    </div>
  );
}
