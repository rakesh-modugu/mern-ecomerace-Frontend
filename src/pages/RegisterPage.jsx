import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../api";
import "./Auth.css";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>
        <p className="auth-sub">Join our community today</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn auth-btn">Register</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;