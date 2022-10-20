import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../context";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login", { replace: true });
    logout();
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{padding:'10px'}}>
      <Link className="navbar-brand" to="/">
        Ionix-App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink
            className={({ isActive }) =>
              "nav-item nav-link " + (isActive ? "active" : "")
            }
            to="/users"
          >
            Users
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "nav-item nav-link " + (isActive ? "active" : "")
            }
            to="/profile"
          >
            Profile
          </NavLink>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <ul className="navbar-nav ml-auto">
            {/* <span className="nav-item nav-link text-white">{user?.name}</span> */}
            <button
              className="btn nav-item nav-link"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
};
