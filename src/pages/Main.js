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
        const res = await fetch("https://thehotpotato.store/movies/");
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


/*import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import "./Main.css";

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
      const res = await fetch(`https://thehotpotato.store/movies/${query}`);
      const data = await res.json();
      console.log("받은 데이터:", data)

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
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
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



/*import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import "./Main.css";
import api from "../api/Api"
import axios from "axios";

function MovieCard(){
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPosts = await axios.get ('https://thehotpotato.store/movies/')
   
    .then((res) => {
      setMovies(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('에러 발생:', err);
      SetError(err)
      setLoading(false);
    });
  };
  return (
		<div>
			<h2>영화 리스트</h2>
			<div className="movie-container">
				{movies.map((movie, index) => (
					<MovieCard key={index} movie={movie} />
				))}
			</div>
		</div>
	);


export default MovieList;

/*export default function Main() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  /*const [search, setSearch] = useState("");

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
        {movies.map((movie, index) => (
          <MovieCard
            key={index} 
            movie={movie}
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
}*/
