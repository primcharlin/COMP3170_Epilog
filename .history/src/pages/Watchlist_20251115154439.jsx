import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) {
      setBooks(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">My Watchlist</h2>

      {books.length === 0 ? (
        <p className="watchlist-empty">No books in your watchlist yet.</p>
      ) : (
        <div className="watchlist-grid">
          {books.map((book) => (
            <div key={book.isbn13} className="watchlist-card">
              <Link to={`/book/${book.isbn13}`}>
                <img src={book.image} alt={book.title} />
                <p className="watchlist-book-title">{book.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
