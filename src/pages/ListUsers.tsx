import React, { useEffect, useState } from "react";

import { IUser } from "../interfaces/users";

import Table from "../components/Table";
import { getAllusers, createUser } from "../services/users-http.service";

export const ListUsers = () => {
  const [users, setUsers] = useState<Array<IUser>>([
    // {
    //   id: "",
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   userName: "",
    //   avatar: "",
    // },
  ]);

  const [isUpdated, setIsUpdated] = useState<boolean>(true);

  let data = {
    id: "100",
    firstName: "Kevin",
    lastName: "Marquez",
    email: "marquezkrodriguez",
    userName: "kmarquez",
    avatar: "dasda.png",
  };

  const add = (data: IUser) => {
    createUser(data)
      .then((res) => {
        console.log(res);
        setIsUpdated(!isUpdated)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllusers().then((res) => setUsers(res.data));
  }, [isUpdated]);

  if (users.length === 0) return;

  return (
    <div className="mt-5">
      <h3>USER LIST</h3>
      <Table data={users} />
      <button
        onClick={() => {
          add(data);
        }}
      >
        Add
      </button>
    </div>
  );
};
