import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">PASOVIT</Link>
        <div className="nav-links">
          <Link to="/">Shop</Link>
          <Link to="/cart">Cart</Link>
          {token ? (
            <>
              <Link to="/orders">Orders</Link>
              <span className="user-tag">{userName}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;