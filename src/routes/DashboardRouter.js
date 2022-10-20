import React from "react";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { ListUsers } from "../pages/ListUsers";



export const DashboardRouter = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/users" element={<ListUsers />} />
        </Routes>
      </div>
    </>
  );
};
