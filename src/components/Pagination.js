export default function Pagination({ currentPage, totalCount, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const pages = [...Array(totalPages).keys()].map((n) => n + 1);
  
    return (
      <div className="pagination">
        {pages.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            disabled={num === currentPage}
          >
            {num}
          </button>
        ))}
      </div>
    );
  }
  