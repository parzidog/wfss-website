import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
} from "../features/userSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ login }))
      .then((res) => {
        window.localStorage.token = res.payload.token;
        console.log("res", res.payload.token);
        navigate("/admin/dashboard");
      })
  };
  const handleChange = (prop) => (event) => {
    let value = event.target.value;
    if (prop === "username") {
      value = value.toLowerCase();
    }
    setLogin({
      ...login,
      [prop]: value,
    });
  };

  return (
    <div id="admin">
      <div className="login">
        <h1>Admin Login</h1>
        <hr />
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="box">
            <label htmlFor="username" className="fl fontLabel">
              {" "}
              Username:{" "}
            </label>
            <div className="fr">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="textBox"
                autoFocus="on"
                required
                onChange={handleChange("username")}
              />
            </div>
            <div className="clr"></div>
          </div>

          <div className="box">
            <label htmlFor="password" className="fl fontLabel">
              {" "}
              Password:{" "}
            </label>
            <div className="fr">
              <input
                type="password"
                required
                name="password"
                placeholder="Password"
                className="textBox"
                onChange={handleChange("password")}
              />
            </div>
            <div className="clr"></div>
          </div>

          <div className="box">
            <input
              type="submit"
              name="login"
              className="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Admin