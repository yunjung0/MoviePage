import React, { useEffect, useState,useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './Detail.css';

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [newComment, setNewComment] = useState('');
    const isLoggedIn = localStorage.getItem("token") !== null;

    const fetchMovieDetail = useCallback(async () => {
    try {
        const res = await fetch(`https://thehotpotato.store/movies/${id}/`);
        const data = await res.json();
        setMovie(data);
    } catch (err) {
        console.error("영화 상세 정보 불러오기 실패:", err);
    }
}, [id]);

    useEffect(() => {
    fetchMovieDetail();
}, [fetchMovieDetail]);

    const handleCommentSubmit = async () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(`https://thehotpotato.store/movies/${id}/comments/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ content: newComment }),
            });

            if (res.ok) {
                const newData = await res.json();
                setMovie((prev) => ({
                  ...prev,
                  comments: [...prev.comments, newData],
                }));
                setNewComment("");
              }
            } catch (err) {
              console.error("댓글 작성 실패:", err);
            }
    };
    
    if (!movie) return <div>로딩 중...</div>;

    return (
        <div className="movie-detail">
            <div className="movie-main">
            <img
    src={
        movie.poster_url
        ? movie.poster_url
        : "https://via.placeholder.com/300x450?text=No+Image"
    }
    alt={movie.title_kor}
    className="movie-img"
    />
                <div className="movie-info">
                    <h1>{movie.title_kor} ({movie.title_eng})</h1>
                    <p><strong>⭐ {movie.average_rating} / 5</strong></p>
                    <p><strong>감독:</strong> {movie.director?.name || "정보 없음"}</p>
                    <p><strong>장르 / 상영시간:</strong> {movie.genre || "정보 없음"}, {movie.showtime}분</p>
                    <p><strong>개봉일:</strong> {movie.release_date}</p>
                    <p><strong>출연:</strong> {movie.actors?.map(actor => actor.name).join(", ")}</p>
                    <p><strong>줄거리:</strong> {movie.plot}</p>

                    {/* 출연진 사진 */}
                    <div className="actor-photos">
                        <h4>출연진</h4>
                        <div className="actor-list">
                            {movie.actors?.map(actor => (
                            <div key={actor.id} className="actor-item">
                                <img
                                src={actor.image_url ? actor.image_url : "https://via.placeholder.com/80x110?text=No+Image"}
                                alt={actor.name}
                                className="actor-img"
                                />
                                <div className="actor-name">{actor.name}</div>
                                <div className="actor-character">{actor.character}</div>
                            </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <div className="comment-section">
                <h3>🗯 Comment</h3>
                {movie.comments?.length > 0 ? (
                    movie.comments.map((comment) => (
                        <div key={comment.id} >
                            <strong>{comment.author.username}</strong>: {comment.content}
                        </div>
                    ))
                ) : (
                    <p>아직 댓글이 없습니다.</p>
                )}

                {isLoggedIn ? (
                    <div className='comment-form'>
                        <input
                            type='test'
                            placeholder='댓글을 입력하세요'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleCommentSubmit}>Post</button>
                    </div>
                ) : (
                    <p>
                        댓글을 작성하려면{" "}
                        <span
                            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                            onClick={() => navigate("/loginPage")}
                        >
                            로그인
                        </span>
                        해주세요.
                    </p>
                )}
            </div>
        </div>
    );
}