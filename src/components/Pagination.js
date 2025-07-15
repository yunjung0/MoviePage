import "./Pagination.css";
import React from "react";

export default function Pagination({ currentPage, totalCount, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const visiblePages = 5;
  const startPage = Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(startPage -1)}
          disabled={startPage === 1}
        >
          ◀ 이전
        </button>

        {pages.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            disabled={num === currentPage}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => onPageChange(endPage + 1)}
          disabled={endPage >= totalPages}
        >
          다음 ▶
        </button>
      </div>
    );
  }
  