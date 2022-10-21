import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5 shadow-sm p-3 mb-5 bg-white rounded text-center">
      <div className="d-flex justify-content-center">
        <img
          width={500}
          src="https://baja.website/wp-content/uploads/2021/04/error-404-not-found.jpg"
          alt="not_found"
        />
      </div>
      <div className="card-body">
        <p className="card-text">
          Contact support to verify why this page is not displayed{" "}
        </p>
        <NavLink
          className="btn btn-primary"
          onClick={() => {
            navigate("/users", {
              replace: true,
            });
          }}
        >
          Back to the main page
        </NavLink>
      </div>
    </div>
  );
};
