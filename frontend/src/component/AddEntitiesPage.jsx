import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../api";

function AddEntitiesPage() {
  // States for author
  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");

  // States for publisher
  const [publisherName, setPublisherName] = useState("");
  const [publisherBio, setPublisherBio] = useState("");

  // States for category
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");

  // Helper function to handle POST requests
  const handleSubmit = async (endpoint, data) => {
    try {
     const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert(`${endpoint.slice(0, -1)} added successfully!`);

        // Clear form based on the endpoint
        if (endpoint === "authors") {
          setAuthorName("");
          setAuthorBio("");
        } else if (endpoint === "publishers") {
          setPublisherName("");
          setPublisherBio("");
        } else if (endpoint === "categories") {
          setCategoryName("");
          setCategoryDesc("");
        }
      } else {
        alert(`Failed to add ${endpoint.slice(0, -1)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Authors, Publishers & Categories</h2>

      {/* Author Form */}
      <div className="card mb-4 p-3 shadow-sm">
        <h4>Add Author</h4>
        <div className="mb-2">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Bio:</label>
          <textarea
            className="form-control"
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleSubmit("authors", { name: authorName, bio: authorBio })}
        >
          Add Author
        </button>
      </div>

      {/* Publisher Form */}
      <div className="card mb-4 p-3 shadow-sm">
        <h4>Add Publisher</h4>
        <div className="mb-2">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={publisherName}
            onChange={(e) => setPublisherName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Bio:</label>
          <textarea
            className="form-control"
            value={publisherBio}
            onChange={(e) => setPublisherBio(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleSubmit("publishers", { name: publisherName, bio: publisherBio })}
        >
          Add Publisher
        </button>
      </div>

      {/* Category Form */}
      <div className="card mb-4 p-3 shadow-sm">
        <h4>Add Category</h4>
        <div className="mb-2">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={categoryDesc}
            onChange={(e) => setCategoryDesc(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleSubmit("categories", { name: categoryName, description: categoryDesc })}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

export default AddEntitiesPage;
