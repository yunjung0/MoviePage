import React, { useEffect, useState,useCallback } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './Detail.css';
import CommentSection from '../components/Comment';

export default function Detail() {
const { id } = useParams();
const navigate = useNavigate();
const [movie, setMovie] = useState(null);
const [newComment, setNewComment] = useState('');
const isLoggedIn = localStorage.getItem("token") !== null;

const fetchMovieDetail = useCallback(async () => {
try {
const res = await fetch(`https://www.movielike.store/api/movies/${id}/`);
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
const res = await fetch(`https://www.movielike.store/api/movies/${id}/comments/`, {
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
<h2>{movie.title_kor} ({movie.title_eng})</h2>
<p><strong>⭐ {movie.average_rating} / 5</strong></p>
<p><strong>감독:</strong> {movie.director?.name || "정보 없음"}</p>
<p><strong>장르 / 상영시간:</strong> {movie.genre || "정보 없음"}, {movie.showtime}</p>
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

<CommentSection movieId={id} isLoggedIn={isLoggedIn} />
</div>
);
}