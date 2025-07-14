import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={movie.poster_url} alt={movie.title_kor} className='movie-poster'/>
      <p className="movie-title">{movie.title_kor}</p>
    </Link>
  );
}
