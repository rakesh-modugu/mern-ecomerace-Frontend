import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogged(!!token);

    const name = localStorage.getItem("userName");
    setUserName(name || "");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setLogged(false);
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "nav-active" : "";

  return (
    <header className="nav-header">
      <nav className="nav-container">
        <Link className="nav-logo" to="/">
          Clothing Store
        </Link>

        <div className="nav-links">
          <Link className={isActive("/")} to="/">Products</Link>

          <Link className={isActive("/cart")} to="/cart">Cart</Link>

          {logged ? (
            <>
              <span className="nav-user">Hi, {userName}</span>

              <Link className={isActive("/orders")} to="/orders">
                Orders
              </Link>

              <button className="nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className={isActive("/login")} to="/login">Login</Link>
              <Link className={isActive("/register")} to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
