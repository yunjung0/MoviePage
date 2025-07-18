import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './Detail.css';

export default function Detail() {
<<<<<<< HEAD
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [userRating, setUserRating] = useState(0);  
    const [hoverRating, setHoverRating] = useState(0);
    const isLoggedIn = localStorage.getItem("token") !== null;
=======
  const { id } = useParams();
  const navigate = useNavigate();
>>>>>>> efe5b8d25c21dd1adebcd947140a476d4d3259fc

  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const isLoggedIn = localStorage.getItem("token") !== null;
  const currentUsername = localStorage.getItem("username"); // 로그인 시 저장 필요

  // 영화 상세 정보 불러오기
  const fetchMovieDetail = useCallback(async () => {
    try {
      const res = await fetch(`https://thehotpotato.store/movies/${id}/`);
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.error("영화 상세 정보 불러오기 실패:", err);
    }
  }, [id]);

  // 댓글 목록 불러오기 (로그인 여부와 무관하게)
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`https://thehotpotato.store/movies/${id}/comments/`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetail();
    fetchComments();
  }, [fetchMovieDetail, fetchComments]);

<<<<<<< HEAD
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
    
    const handleRatingSubmit = async () => {
        try {
          const res = await fetch(`https://thehotpotato.store/movies/${id}/rating/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ rating: userRating }),
          });
          if (res.ok) {
            alert("별점이 등록되었습니다!");
            fetchMovieDetail(); 
          }
        } catch (err) {
          console.error("별점 제출 실패:", err);
        }
      };
      

    return (
        <div className="movie-detail">
            <div className="movie-main">
            <img
    src={
        movie.poster_url
        ? movie.poster_url
        : "https://via.placeholder.com/300x450?text=No+Image"
=======
  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      navigate("/loginPage");
      return;
>>>>>>> efe5b8d25c21dd1adebcd947140a476d4d3259fc
    }

    try {
      const res = await fetch(`https://thehotpotato.store/movies/${id}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          content: newComment,
          rating: rating,
        }),
      });

      if (res.ok) {
        const newData = await res.json();
        setComments((prev) => [...prev, newData]);
        setNewComment("");
        setRating(5);
      }
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    }
  };

  // 댓글 수정 시작
  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  };

  // 댓글 수정 제출
  const handleEditSubmit = async (commentId) => {
    try {
      const res = await fetch(`https://thehotpotato.store/comments/${commentId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });

      if (res.ok) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, content: editingContent } : c
          )
        );
        setEditingId(null);
        setEditingContent('');
      }
    } catch (err) {
      console.error("댓글 수정 실패:", err);
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentId) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`https://thehotpotato.store/comments/${commentId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 204) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
    }
  };

  if (!movie) return <div>로딩 중...</div>;

  return (
    <div className="movie-detail">
      <div className="movie-main">
        <img
          src={movie.poster_url || "https://via.placeholder.com/300x450?text=No+Image"}
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
                    src={actor.image_url || "https://via.placeholder.com/80x110?text=No+Image"}
                    alt={actor.name}
                    className="actor-img"
                  />
                  <div className="actor-name">{actor.name}</div>
                  <div className="actor-character">{actor.character}</div>
                </div>
              ))}
            </div>
<<<<<<< HEAD
            <div className="comment-section">
                <h2>🗯 Comment</h2>
                <div className="rating-section">
                    <h3 className='choose'>별점을 선택해주세요.</h3>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= (hoverRating || userRating) ? "on" : "off"}
                                onClick={() => setUserRating(star)}
                                onMouseEnter={() => setHoverRating(0)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                ★
                            </span>
                        ))}
                        
                        <button className="starbutton" onClick={handleRatingSubmit}>별점 등록</button>
                    </div>
                    

                </div>
                {movie.comments?.length > 0 ? (
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
                            style={{ color: "white", cursor: "pointer", textDecoration: "underline"}}
                            onClick={() => navigate("/loginPage")}
                        >
                            로그인
                        </span>
                        해주세요.
                    </p>
                )}
            </div>
=======
          </div>
>>>>>>> efe5b8d25c21dd1adebcd947140a476d4d3259fc
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="comment-section">
        <h3>🗯 Comment</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: 8 }}>
              <strong>{comment.author.username}</strong> ({comment.rating}점):{" "}
              {editingId === comment.id ? (
                <>
                  <input
                    value={editingContent}
                    onChange={e => setEditingContent(e.target.value)}
                    style={{ width: 200 }}
                  />
                  <button onClick={() => handleEditSubmit(comment.id)}>저장</button>
                  <button onClick={() => setEditingId(null)}>취소</button>
                </>
              ) : (
                <>
                  {comment.content}
                  {isLoggedIn && comment.author.username === currentUsername && (
                    <>
                      <button onClick={() => startEdit(comment)} style={{ marginLeft: 8 }}>수정</button>
                      <button onClick={() => handleDelete(comment.id)} style={{ marginLeft: 4, color: 'red' }}>삭제</button>
                    </>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>아직 댓글이 없습니다.</p>
        )}

        {/* 댓글 작성 폼 */}
        {isLoggedIn ? (
          <div className='comment-form'>
            <input
              type='text'
              placeholder='댓글을 입력하세요'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num}점</option>
              ))}
            </select>
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
