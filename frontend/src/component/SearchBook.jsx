
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../api";

function SearchBook() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      console.warn("Empty search query!");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/books/search?q=${encodeURIComponent(query.trim())}`
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Backend error:", errText);
        alert("Error fetching books. Check the console for details.");
        setResults([]);
        return;
      }

      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Network or fetch error:", error);
      alert("Failed to connect to backend!");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🔍 Search Books</h2>

      <form
        onSubmit={handleSearch}
        className="d-flex justify-content-center mb-4"
      >
        <input
          type="text"
          className="form-control me-2"
          style={{ maxWidth: "400px" }}
          placeholder="Search by title, author, category, or publisher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && results.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Publisher</th>
              </tr>
            </thead>

            <tbody>
              {results.map((book) => (
                <tr
                  key={book.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleBookClick(book.id)}
                >
                  <td>{book.title}</td>
                  <td>{book.category?.name || "N/A"}</td>
                  <td>{book.author?.name || "Unknown"}</td>
                  <td>{book.publisher?.name || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && hasSearched && results.length === 0 && (
        <p className="text-center text-muted">
          No books found for “{query}”.
        </p>
      )}
    </div>
  );
}

export default SearchBook;

