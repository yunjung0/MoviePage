import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster }) {
  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <img src={poster} alt={title} />
      <p>{title}</p>
    </Link>
  );
}
