

export default function MovieCard({movie}) {
  return (
    <div className="movie-card">
      <img src={movie.poster_url} alt={movie.title_kor} className="Movie-Poster"/>
      <p>{movie.title_kor}</p>
    </div>
  );
}
