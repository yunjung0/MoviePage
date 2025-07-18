import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
// import { useNavigate } from "react-router-dom";
import "./Main.css";

export default function Main() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // 영화 목록 가져오기 (페이지, 검색어)
  const fetchMovies = async (page = 1, search = "") => {
    setLoading(true);
    try {
      let qs = `?page=${page}`;
      if (search) qs += `&search=${encodeURIComponent(search)}`;
      const res = await fetch(`https://www.movielike.store/api/movies/${qs}`);
      const data = await res.json();
      setMovies(Array.isArray(data.results) ? data.results : []);
      setTotalCount(data.count || 0);
    } catch (err) {
      setMovies([]);
      setTotalCount(0);
      console.error("영화 목록 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page, searchTitle);
  }, [page, searchTitle]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleTitleSearch = () => {
    setPage(1);
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
            onChange={e => setSearchTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleTitleSearch();
            }}
          />
          <span className="search-icon" onClick={handleTitleSearch}>🔍</span>
        </div>
      </div>
      {loading ? <p>로딩중...</p> : null}
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          !loading && <div style={{margin:'40px', textAlign:'center'}}>영화를 찾을 수 없습니다.</div>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalCount={totalCount}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

