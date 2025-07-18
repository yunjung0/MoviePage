import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import "./Main.css";

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pagedMovies = movies.slice((page - 1) * 10, page * 10);

  

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
          value={search}
          onChange={handleSearch}
        />
        <span className="search-icon" onClick={() => setPage(1)}>🔍</span>
        </div>
      </div>
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

