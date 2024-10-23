import { Link } from "react-router-dom";
import { useState } from "react";

export default function MovieCard({ id, title, poster_path }) {

    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <>
            <style>
                {`
                .movie-card {
                    position: relative;
                }

                .movie-info {
                    display: none;
                }

                .movie-card:hover .movie-img{
                    filter: blur(2px);
                    opacity: 0.4;
                }

                .movie-card:hover .movie-info {
                    display: block;
                    position: absolute;
                }

                .favorite-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1.5rem;
                }

            `}
            </style>
            <div key={id} className="movie-card flex flex-col text-left justify-center items-center hover:scale-125">
                <Link to={`/movies/${id}`}>
                    <img src={`https://image.tmdb.org/t/p/w185${poster_path}`} alt={title}
                        className="movie-img h-72 rounded-md shadow-md shadow-gray-900" />
                    <div className="movie-info top-[2%] px-2">
                        <h2 className="text-base">{title}</h2>
                        <p className="text-xs text-gray-600">clique para ver detalhes</p>
                    </div>
                </Link>
                <div className="movie-info bottom-[2%] px-2">
                    <button
                        className={`favorite-button ${isFavorite ? 'filled' : ''}, text-sm`}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                    <button className="text-xs text-gray-600"></button>
                </div>
            </div>
        </>
    )
}