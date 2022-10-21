import React, { useEffect, useState } from "react";

//Interfaces
import { IUser } from "../interfaces/users";
import { getUser } from "../services/users-http.service";
import { Avatar } from "./Avatar";

interface IProps {
  userID: number;
  isAddOrEdit: boolean;
  handleAddUser: (user: IUser) => void;
  handleEditUser: (id: number, user: IUser) => void;  
}
const initialState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  userName: "",
  avatar: "",
};
export const FromUser: React.FunctionComponent<IProps> = (props: IProps) => {
  const [user, setUser] = useState<IUser>(initialState);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (props.isAddOrEdit) {
      handleGetUser(props.userID);
    } else {
      setUser(initialState);
    }
  }, [props.isAddOrEdit, props.userID]);

  const handleGetUser = (id: number) => {
    getUser(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(false);

    const { id, firstName, lastName, email, userName } = user;

    if (
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      email.trim().length === 0 ||
      userName.trim().length === 0
    ) {
      setError(true);
      handleTimer();
      return;
    }

    if (!props.isAddOrEdit) {
      user.avatar = `https://www.gravatar.com/avatar/${email}?d=identicon`;
      props.handleAddUser(user);
    } else {
      props.handleEditUser(id, user);
    }
  };

  const handleTimer = () => {
    setTimeout(() => {
      setError(!error);
    }, 3500);
  };

  const { firstName, lastName, email, userName } = user;

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group mt-2 col-2">
              <Avatar email={email} width={55} />
            </div>
            <div className="form-group mt-2 col-5">
              <label htmlFor="firstName">Firt Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                className="form-control"
                onChange={handleChange}
                id="firstName"
              />
            </div>
            <div className="form-group mt-2 col-5">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                className="form-control"
                onChange={handleChange}
                id="lastName"
              />
            </div>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              onChange={handleChange}
              id="email"
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="userName">UserName</label>
            <input
              type="userName"
              name="userName"
              value={userName}
              className="form-control"
              onChange={handleChange}
              id="userName"
            />
          </div>

          {error && (
            <div className="mt-2 mb-2 alert alert-danger" role="alert">
              <p className="m-0 text-center">
                Please fill in the required information
              </p>
            </div>
          )}

          <button type="submit" className="mt-3 btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
