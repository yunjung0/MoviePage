import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom"
import "./Main.css";

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pagedMovies = movies.slice((page - 1) * 10, page * 10);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();


  

  const handleTitleSearch = async () => {
    const trimmedTitle = searchTitle.trim().toLowerCase();
    if (!trimmedTitle) return;
  
    const foundMovie = movies.find(
    (movie) =>
      movie.title_kor?.toLowerCase() === trimmedTitle ||
      movie.title_eng?.toLowerCase() === trimmedTitle
  );

  if (foundMovie) {
    setSelectedMovie(foundMovie);
  } else {
    setSelectedMovie(null);
    alert("해당 제목의 영화를 찾을 수 없습니다.");
  }
};


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/movies/");
        const data = await res.json();
        console.log("받은 데이터:", data);
        setMovies(data);
      } catch (err) {
        console.error("영화 목록 불러오기 실패:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

 
    return (
    <div>
      <div className="search-bar">
        <div className="search-wrapper">
        <input 
          className="search-input"
          type="text"
          placeholder="영화 제목을 입력하세요"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTitleSearch();
          }}
        />
        <span className="search-icon" onClick={() => setPage(1)}>🔍</span>
        </div>
      </div>
      {selectedMovie && (
      <div className="selected-movie">
        <h2>🎬 검색된 영화</h2>
        <img
          src={selectedMovie.poster_url || "https://via.placeholder.com/200x300?text=No+Image"}
          alt={selectedMovie.title_kor}
          className="selected-movie-poster"
          onClick={() => navigate(`/movie/${selectedMovie.id}`)} // 클릭 시 이동
          style={{ cursor: "pointer" }}
        />
        <h3>{selectedMovie.title_kor} ({selectedMovie.title_eng})</h3>
      </div>
      )}

      <div className="movie-grid">
      {pagedMovies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
      </div>
      <Pagination
        currentPage={page}
        totalCount={movies.length}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

