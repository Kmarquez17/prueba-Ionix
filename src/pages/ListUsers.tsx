import React, { useEffect, useState } from "react";

import { IUser } from "../interfaces/users";

import Table from "../components/Table";
import {
  getAllusers,
  createUser,
  updateUser,
  removeUser,
} from "../services/users-http.service";


/**
 * Realizar Formulario del login
 * En modal realizar formulario de agregar y editar
 * Alertas
 * Componente que no existe dicha vista
 * Hacer filtro nombre y apellido
 * Hacer las pruebas unitarias
 * Buscar una libreria que crea el avartar por el userName
 * https://www.mockaroo.com/schemas/new
 */

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
        setIsUpdated(!isUpdated);
      })
      .catch((err) => console.log(err));
  };

  const edit = (data: IUser) => {
    data.id = 1;
    updateUser(data.id, data)
      .then((res) => {
        console.log(res);
        setIsUpdated(!isUpdated);
      })
      .catch((err) => console.log(err));
  };

  const remove = (row: number) => {
    removeUser(row)
      .then((res) => {
        console.log(res);
        setIsUpdated(!isUpdated);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllusers().then((res) => setUsers(res.data));
  }, [isUpdated]);

  if (users.length === 0) return;

  console.log('users',users)

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

      <button
        onClick={() => {
          edit(data);
        }}
      >
        Edit
      </button>

      <button
        onClick={() => {
          remove(1);
        }}
      >
        Remove
      </button>
    </div>
  );
};
