import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {
    const { movieId } = useParams();
    const nevigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [newComment, setNewComment] = useState('');
    const isLoggedIn = localStorage.getItem("token") !== null;

    useEffect(() => {
        fetchMovieDetail();
    }, []);

    const fetchMovieDetail = async () => {
        try {
            const res = await fetch(`http://43.200.28.219:1313/movies/detail/${movieId}/`);
            const data = await res.json();
            setMovie(data);
          } catch (err) {
            console.error("영화 상세 정보 불러오기 실패:", err);
          }
    };
    const handleCommentSubmit = async () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(`http://43.200.28.219:1313/movies/${movieId}/comments/`, {
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
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-info">
                <h2>{movie.title_kor} ({movie.title_eng})</h2>
                <p><strong>⭐ {movie.average_rating} / 5</strong></p>
                <p><strong>감독:</strong> {movie.director.name}</p>
                <p><strong>장르 / 상영시간:</strong> {movie.genre}, {movie.showtime}분</p>
                <p><strong>개봉일:</strong> {movie.release_date}</p>
                <p><strong>출연:</strong> {movie.actors.map(actor => actor.name).join(", ")}</p>
                <p><strong>줄거리:</strong> {movie.plot}</p>
            </div>
            <div className="comment-section">
                <h3>🗯Comment</h3>
                {movie.comments.length > 0 ? (
                    movie.comments.map((comment) => (
                        <div key={comment.id} >
                            <strong>{comment.user.username}</strong>: {comment.content}
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
                            onClick={() => navigate("/login")}
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