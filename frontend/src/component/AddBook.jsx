import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../api";

function AddBook() {
  const [bookTitle, setBookTitle] = useState("");
  const [availableCopies, setAvailableCopies] = useState("1");
  const [authorId, setAuthorId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [shelf, setShelf] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // File instead of URL

  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch dropdown data on mount
 useEffect(() => {
  async function fetchDropdowns() {
    try {
const [authorsRes, publishersRes, categoriesRes] = await Promise.all([
  fetch(`${API_BASE_URL}/authors`),
  fetch(`${API_BASE_URL}/publishers`),
  fetch(`${API_BASE_URL}/categories`),
]);
      // Parse JSON properly
      const [authorsData, publishersData, categoriesData] = await Promise.all([
        authorsRes.json(),
        publishersRes.json(),
        categoriesRes.json(),
      ]);

      // Optional: log to verify
      console.log("Authors:", authorsData);
      console.log("Publishers:", publishersData);
      console.log("Categories:", categoriesData);

      // Set state
      setAuthors(authorsData);
      setPublishers(publishersData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
    }
  }
  fetchDropdowns();
}, []);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookTitle);
    formData.append("availableCopies", availableCopies);
    formData.append("authorId", authorId || "");
    formData.append("publisherId", publisherId || "");
    formData.append("categoryId", categoryId || "");
    formData.append("shelf", shelf);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
     const response = await fetch(`${API_BASE_URL}/books`, {
  method: "POST",
  body: formData,
});
      if (response.ok) {
        alert("Book added successfully!");
        // Reset form
        setBookTitle("");
        setAvailableCopies("1");
        setAuthorId("");
        setPublisherId("");
        setCategoryId("");
        setShelf("");
        setDescription("");
        setImageFile(null);
      } else {
        const errorText = await response.text();
        alert("Failed to add book: " + errorText);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add a New Book</h2>

        <form onSubmit={handleSubmit}>
          {/* Book Title */}
          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter book title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>

          {/* Available copies */}
          <div className="mb-3">
            <label className="form-label">Available Copies</label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={availableCopies}
              onChange={(e) => setAvailableCopies(e.target.value)}
              required
            />
          </div>

          {/* Author */}
          <div className="mb-3">
            <label className="form-label">Author</label>
            <select
              className="form-select"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          {/* Publisher */}
          <div className="mb-3">
            <label className="form-label">Publisher</label>
            <select
              className="form-select"
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
            >
              <option value="">Select Publisher</option>
              {publishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shelf */}
          <div className="mb-3">
            <label className="form-label">Shelf</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter shelf number or label"
              value={shelf}
              onChange={(e) => setShelf(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter book description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Select Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary px-5">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
