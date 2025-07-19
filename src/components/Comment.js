import React, { useState, useEffect } from "react";
import './Comment.css';

export default function CommentSection({ movieId, isLoggedIn }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.movielike.store/api/movies/${movieId}/comments/`,
          {
            headers: isLoggedIn
              ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
              : undefined,
          }
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        } else {
          setComments([]);
        }
      } catch (e) {
        setComments([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [movieId, isLoggedIn]);

  const handleSubmit = async () => {
    if (!isLoggedIn) return alert('로그인 해주세요!');
    if (!newComment.trim()) return alert("댓글을 입력하세요!");
    if (rating < 1 || rating > 5) return alert("별점을 1~5로 입력하세요!");

    try {
      const res = await fetch(
        `https://www.movielike.store/api/movies/${movieId}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content: newComment, rating }),
        }
      );
      if (res.ok) {
        const newCommentObj = await res.json();
        setComments((prev) => [...prev, newCommentObj]);
        setNewComment("");
        setRating(5);
      } else {
        alert("댓글 작성 실패!");
      }
    } catch (e) {
      alert('댓글 작성 중 오류!');
    }
  };

  return (
    <div className="comment-section">
      <h3>🗯 Comment</h3>
      {loading ? (
        <div>로딩 중...</div>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} style={{ marginBottom: 8 }}>
            <strong>{comment.author?.nickname || comment.author?.username || "익명"}</strong>
            &nbsp;|&nbsp;
            <span>{"⭐".repeat(comment.rating || 0)}</span>
            <br />
            {comment.content}
          </div>
        ))
      ) : (
        <div>아직 댓글이 없습니다.</div>
      )}
      {isLoggedIn ? (
        <div>
          <textarea className="comment-box"
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
          />
          <div style={{ margin: "8px 0" }}>
            <span>별점:&nbsp;</span>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            &nbsp;/ 5
            <button onClick={handleSubmit} style={{ marginLeft: 12 }}>Post</button>
          </div>
        </div>
      ) : (
        <div>
          댓글을 남기려면{" "}
          <span
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => window.location.href = "/loginPage"}
          >
            로그인
          </span>
          이 필요합니다.
        </div>
      )}
    </div>
  );
}
