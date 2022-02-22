import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const SignUpLogIn = () => {
  const [toggler, setToggler] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => setToggler(!toggler);

  const handleSignUp = () => {
    if (!username || !password) {
      alert("fill all fields");
      return;
    }
    axios
      .post("http://localhost:5000/auth/", { username, password })
      .then((res) => {
        sessionStorage.setItem("accessToken", res.data.token);
        sessionStorage.setItem("UserId", res.data.id);
        alert(res.data.msg);
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  };

  const handleLogIn = () => {
    if (!username || !password) {
      alert("fill all fields");
      return;
    }
    axios
      .post("http://localhost:5000/auth/login", { username, password })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("accessToken", res.data.token);
        sessionStorage.setItem("UserId", res.data.id);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.msg);
      });
  };

  if (redirect) {
    return <Navigate to="/main" />;
  } else if (toggler) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <form
          style={{
            display: "grid",
            justifyContent: "center",
            marginTop: "50px",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSignUp}>submit</button>
            <button onClick={handleClick}>LogIn</button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Log In</h1>
        <form
          style={{
            display: "grid",
            justifyContent: "center",
            marginTop: "50px",
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleLogIn}>submit</button>
            <button onClick={handleClick}>SignUp</button>
          </div>
        </form>
      </div>
    );
  }
};

export default SignUpLogIn;
