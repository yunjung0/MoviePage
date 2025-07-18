import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 영화 전체 목록 가져오기
  useEffect(() => {
    fetch("/movies/")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("영화 데이터를 가져오는데 실패했습니다:", err);
        setIsLoading(false);
      });
  }, []);

  // 검색 필터
  const filteredMovies = movies.filter((movie) => {
    const term = searchTerm.toLowerCase();
    return (
      movie.title_kor.toLowerCase().includes(term) ||
      movie.title_eng.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="search-bar">
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="영화 제목을 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon" onClick={() => setPage(1)}>🔍</span>
        </div>
          <ul className="movie-list">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <li
                  key={movie.id}
                  onClick={() => navigate(`/detail_list/${movie.id}`)}
                  className="movie-item"
                >
                  <img
                    src={movie.poster_url}
                    alt={movie.title_eng}
                    className="movie-poster"
                  />
                  <div className="movie-info">
                    <strong>{movie.title_kor}</strong>
                    <em>{movie.title_eng}</em>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results">검색 결과가 없습니다.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
