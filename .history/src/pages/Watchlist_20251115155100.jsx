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
    <div className="container">
      <h2 className="page-title">My Watchlist</h2>

      {books.length === 0 ? (
        <p className="empty-text">No books in your watchlist yet.</p>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.isbn13} className="book-card">
              <Link to={`/book/${book.isbn13}`} className="book-link">
                <img src={book.image} alt={book.title} className="book-cover" />
                <p className="book-title">{book.title}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
