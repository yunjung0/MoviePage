import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import "./Main.css";
// import api from "../api/Api"

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies(page, search);
  }, [page, search]);

  const fetchMovies = async (pageNum, keyword) => {
    try {
      const query = keyword ? `?search=${keyword}&page=${pageNum}` : `?page=${pageNum}`;
      const res = await fetch(`https://thehotpotato.store/movies/`);
      const data = await res.json();
      
      setMovies(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err) {
      console.error("영화 목록 불러오기 실패:", err);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };


  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="영화 제목을 입력하세요"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <card
            key={movie.id}
            id={movie.id}
            title={movie.title_kor}
            poster={movie.poster_url}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalCount={totalCount}
        itemsPerPage={8}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
