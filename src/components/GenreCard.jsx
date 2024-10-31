import { Link } from "react-router-dom";

export default function GenreCard({genero}) {
    return(
        <Link to={`/genre/${genero.id}`}>
            <div className="genre-card flex flex-col text-left justify-center items-center hover:scale-125 focus-within:scale-125 duration-300">
                <img src={`https://image.tmdb.org/t/p/w185${genero.poster_path}`} alt={`${genero.name} - clique para ver mais`} className="genre-img h-72 rounded-sm"/>
                <div className="genre-info top-[0] p-2">
                    <h2 id={`genre-title-${genero.id}`} className="text-base">
                        {genero.name}
                    </h2>
                    <p className="text-xs text-gray-600">clique para ver detalhes</p>
                </div>
            </div>
        </Link>
    )
}