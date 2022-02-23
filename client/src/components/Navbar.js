import React, { useEffect, useState } from "react";

const NavBar = ({ LogOut }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(sessionStorage.getItem("UserName"));
  }, []);
  return (
    <div className="ui inverted  menu" style={{ padding: "10px" }}>
      <div className="header item">{name}</div>
      <div className="right menu">
        <button class="ui secondary button" onClick={LogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
