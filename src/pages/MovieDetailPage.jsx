import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import MovieInfo from "../components/DetailPage/MovieInfo";
import MovieDetails from "../components/DetailPage/MovieDetails";
import CastCarousel from "../components/DetailPage/CastCarousel";
import Recommendations from "../components/DetailPage/Recommendations";
import 'ldrs/bouncy';

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState({});
  const [cast, setCast] = useState({});
  const [collection, setCollection] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);

  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  const watchListMovies = JSON.parse(localStorage.getItem('watchListMovies')) || [];

  const isFavorite = favoriteMovies.includes(id);
  const isAdd = watchListMovies.includes(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchMovie = fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovie(data);
          setFetchCount((prev) => prev + 1);
        })
        .catch((err) => console.error(err));

      const fetchVideo = fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      )
        .then((response) => response.json())
        .then((data) => {
          setVideo(data);
          setFetchCount((prev) => prev + 1);
        })
        .catch((err) => console.error(err));

      const fetchCast = fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      )
        .then((response) => response.json())
        .then((data) => {
          setCast(data);
          setFetchCount((prev) => prev + 1);
        })
        .catch((err) => console.error(err));

      const fetchCollection = fetch(
        `https://api.themoviedb.org/3/collection/${movie.belongs_to_collection?.id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      )
        .then((response) => response.json())
        .then((data) => {
          setCollection(data);
          setFetchCount((prev) => prev + 1);
        })
        .catch((err) => console.error(err));

      const fetchRecommendations = fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
      )
        .then((response) => response.json())
        .then((data) => {
          setRecommendations(data.results);
          setFetchCount((prev) => prev + 1);
        })
        .catch((err) => console.error(err));

      await Promise.all([fetchMovie, fetchVideo, fetchCast, fetchCollection, fetchRecommendations]);
      setLoading(false);
    };

    fetchData();
  }, [id, movie.belongs_to_collection?.id]);

  const director = cast.crew ? cast.crew.find(member => member.job === 'Director')?.name : '';

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
        </div>
      ) : (
        <>
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

            <div className="flex mt-20 items-center justify-around">
              <MovieDetails movie={movie} director={director} />
              <CastCarousel cast={cast} />
            </div>
            <div className="flex mt-20 gap-10 justify-around">
              {movie.belongs_to_collection ? (
                <div>
                  <h2 className="text-2xl font-semibold">{collection.name}</h2>
                  <div className="flex gap-7 my-5">
                    {collection.parts && collection.parts.map((part) => (
                      <Link to={`/movies/${part.id}`} key={part.id}>
                        <img className="hover:scale-105 rounded-sm cursor-pointer"
                          src={`https://image.tmdb.org/t/p/w154${part.poster_path}`} alt={part.title} />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
              <Recommendations recommendations={recommendations} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}