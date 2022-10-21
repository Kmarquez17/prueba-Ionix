import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

//Componentes
import { Table } from "../components/Table";
import { Modal } from "../components/Modal";
import { FromUser } from "../components/FromUser";

//Interface
import { IUser } from "../interfaces/users";

import {
  getAllusers,
  createUser,
  updateUser,
  removeUser,
} from "../services/users-http.service";

/**
 * Alertas
 * Componente que no existe dicha vista
 * Hacer filtro nombre y apellido
 * Hacer las pruebas unitarias
 */

export const ListUsers = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);

  const [show, setShow] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(true);
  const [isAddOrEdit, setIsAddOrEdit] = useState<number>(0);

  const [userID, setUserID] = useState<number>(0);

  useEffect(() => {
    getAllusers().then((res) => setUsers(res.data));
  }, [isUpdated]);

  const handleAlertMsg = (msg: string) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleIsAddOrEdit = (id: number) => {
    setUserID(id);
    setIsAddOrEdit(id === -1 ? 1 : 2);
    handleShowModal(true);
  };

  const handleShowModal = (show: boolean) => {
    setShow(show);
  };
  const handleAddUser = (data: IUser) => {
    data.id = users.length + 1;
    createUser(data)
      .then((res) => {
        handleAlertMsg("User successfully added!");
        setIsUpdated(!isUpdated);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  const handleEditUser = (id: number, data: IUser) => {
    updateUser(id, data)
      .then((res) => {
        handleAlertMsg("User edited successfully!");
        setIsUpdated(!isUpdated);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Do you want to remove this user?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        removeUser(id)
          .then((res) => {
            handleAlertMsg("User deleted successfully!");
            setIsUpdated(!isUpdated);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  if (users.length === 0) return;

  return (
    <div className="mt-5">
      <h3>USER LIST</h3>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          handleIsAddOrEdit(-1);
        }}
      >
        Add
      </button>

      <Table
        data={users}
        onEdit={handleIsAddOrEdit}
        handleRemove={handleRemove}
      />

      <Modal
        title={isAddOrEdit === 1 ? "Add User" : "Edit User"}
        show={show}
        handleShowModal={handleShowModal}
      >
        <FromUser
          userID={userID}
          isAddOrEdit={isAddOrEdit === 1 ? false : true}
          handleAddUser={handleAddUser}
          handleEditUser={handleEditUser}
        />
      </Modal>
    </div>
  );
};
