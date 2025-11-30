import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import "./RegisterPage.css";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });
      navigate("/login");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>

      {error && <p className="register-error">{error}</p>}

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          name="name"
          className="register-input"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          className="register-input"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="register-input"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="register-btn" type="submit">
          Create account
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
