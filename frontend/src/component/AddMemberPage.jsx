import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../api";

    function AddMemberPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [membershipDate, setMembershipDate] = useState("");

    const handleSubmit = async () => {
        if (!name || !email) {
        alert("Name and Email are required!");
        return;
        }

        const newMember = {
  name,
  email,
  phone,
  address,
  membership_date: membershipDate, // matches @JsonProperty
};

        try {
       const res = await fetch(`${API_BASE_URL}/members`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMember),
        });

        if (res.ok) {
            alert("Member added successfully!");
            // Clear the form
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setMembershipDate("");
        } else {
            alert("Failed to add member");
        }
        } catch (err) {
        console.error(err);
        alert("Error adding member");
        }
    };

    return (
        <div className="container mt-4">
        <h2 className="text-center mb-4">Add New Member</h2>
        <div className="card p-3 shadow-sm">
            <div className="mb-2">
            <label>Name:</label>
            <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label>Email:</label>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label>Phone:</label>
            <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label>Address:</label>
            <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            </div>

            <div className="mb-2">
            <label>Membership Date:</label>
            <input
                type="date"
                className="form-control"
                value={membershipDate}
                onChange={(e) => setMembershipDate(e.target.value)}
            />
            </div>

            <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            Add Member
            </button>
        </div>
        </div>
    );
    }

    export default AddMemberPage;
