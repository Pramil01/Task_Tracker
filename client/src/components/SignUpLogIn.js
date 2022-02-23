import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../SignUpLogIn.css";
import axios from "axios";

const SignUpLogIn = () => {
  const [toggler, setToggler] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    setToggler(!toggler);
    setUsername("");
    setPassword("");
  };

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
        sessionStorage.setItem("UserName", username);
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
        sessionStorage.setItem("UserName", username);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.msg);
      });
  };

  if (redirect) {
    return <Navigate to="/main" />;
  } else {
    return (
      <div className="outer-container">
        <h1>Task Tracker 📝</h1>
        <div
          className={`container ${toggler && "right-panel-active"}`}
          id="container"
        >
          <div
            className={`form-container sign-up-container  ${
              !toggler && "fadeOut"
            }`}
          >
            <form onSubmit={(e) => e.preventDefault()} className="form">
              <h1 className="heading">Sign Up</h1>
              <input
                type="text"
                placeholder="Username ..."
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password ..."
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-reg" onClick={handleSignUp}>
                Sign Up
              </button>
              <div className="contact-me">
                <br />
                <h3 className="details">Creator details :</h3>
                <nav className="social-container">
                  <a
                    href="https://www.instagram.com/kesarwanipramil/"
                    className="link social"
                  >
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pramil-kesarwani-10b374214/"
                    className="link social"
                  >
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a href="https://github.com/Pramil01" className="link social">
                    <i class="fa fa-github" aria-hidden="true"></i>
                  </a>
                </nav>
              </div>
            </form>
          </div>
          <div
            className={`form-container sign-in-container ${
              toggler && "fadeOut"
            }`}
          >
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <h1 className="heading"> Log In </h1>
              <input
                type="text"
                placeholder="Username ..."
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password..."
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-login" onClick={handleLogIn}>
                Submit
              </button>
              <div className="contact-me">
                <br />
                <h3 className="details">Creator details :</h3>
                <nav className="social-container">
                  <a
                    href="https://www.instagram.com/kesarwanipramil/"
                    className="link social"
                  >
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/pramil-kesarwani-10b374214/"
                    className="link social"
                  >
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a href="https://github.com/Pramil01" className="link social">
                    <i class="fa fa-github" aria-hidden="true"></i>
                  </a>
                </nav>
              </div>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="heading">Welcome </h1>
                <p className="para">
                  To access all the features of the site, first log in to the
                  site
                </p>
                <button className="btn ghost" id="signIn" onClick={handleClick}>
                  LogIn
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="heading">Welcome </h1>
                <p className="para">
                  If you are not registered, register yourself in less than 1
                  minute
                </p>
                <button className="btn ghost" id="signUp" onClick={handleClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SignUpLogIn;
