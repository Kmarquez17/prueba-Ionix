import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
import { loginUser } from "../services/users-http.service";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    email: "Kevin",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(false);

    const { email, password } = user;

    if (email.trim().length === 0 || password.trim().length === 0) {
      setError(true);
      setMessage("Please fill in the required information");
      return;
    }
    
    loginUser(user)
      .then((res) => {
        const { data } = res;
        if (data.length === 0) {
          setError(true);
          setMessage("Email not found");
        } else {
          console.log("data", data);
          login(data);
          navigate("/users", {
            replace: true,
          });
        }
      })
      .catch((err) => {
        setError(true);
        setMessage("Server error");
        console.log(err);
      });
  };

  const { email, password } = user;

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <img
            src="https://t3.ftcdn.net/jpg/05/06/55/22/360_F_506552238_j3Y4oq4rrlLEgzVG30AdEe0TaRINtUKr.jpg"
            id="icon"
            alt="User Icon"
          />
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            id="email"
            className="fadeIn second"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />

          {error && (
            <div
              className="mt-2 mb-2 alert alert-danger"
              role="alert"
              style={{ margin: "0px 32px" }}
            >
              <p className="m-0">{message}</p>
            </div>
          )}

          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
  );
};
