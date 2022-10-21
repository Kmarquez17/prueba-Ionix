import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { AuthContext } from "../context";
import { updateUser } from "../services/users-http.service";
import { Avatar } from "./Avatar";
import { FromUser } from "./FromUser";
import { Modal } from "./Modal";

export const Navbar = () => {
  const { login, user, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleEditUser = (id, data) => {
    updateUser(id, data)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated user!",
          showConfirmButton: false,
          timer: 1500,
        });
        login(data);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
    logout();
  };
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark"
      style={{ padding: "10px" }}
    >
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
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <ul className="navbar-nav ml-auto">
            <div className="btn-group">
              <button
                type="button"
                className="pb-0 btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <div className="dropdown-menu">
                <NavLink
                  className={({ isActive }) =>
                    "nav-item nav-link " + (isActive ? "active" : "")
                  }
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <p className="m-0 text-black">Profile</p>
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    "nav-item nav-link " + (isActive ? "active" : "")
                  }
                  onClick={handleLogout}
                >
                  <p className="m-0 text-black">Logout</p>
                </NavLink>
              </div>
            </div>

            <span className="nav-item nav-link text-white">
              {user?.firstName} {user?.lastName}
            </span>

            <span>
              <Avatar email={user?.email} width={40} />
            </span>
          </ul>
        </div>
        <Modal
          title={"Edit User"}
          show={show}
          handleShowModal={(e) => {
            setShow(e);
          }}
        >
          <FromUser
            userID={user?.id}
            isAddOrEdit={true}
            handleAddUser={() => {}}
            handleEditUser={handleEditUser}
          />
        </Modal>
      </div>
    </nav>
  );
};
