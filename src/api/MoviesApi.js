import {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default function MovieList(){
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/movies/')
    .then(res => setMovies(res.data.results));
  }, []);

  return(
    <div>
      {movies.map(movie =>
        <MovieCard key={movie.id} movie={movie} />
      )}
    </div>
  );
}