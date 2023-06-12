import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../css/Home.css";



const Home = () => {
    const [user, setUser] = useState("");
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
      },[]);
  return (
    <div className="home-container">
      <h1 className="title">Welcome {user?.name} !</h1>
      <nav className="navbar">
        <ul className="navbarList">
          <li className="navbarItem">
            <NavLink to="/info" className="navbarButton">
              Info
            </NavLink>
          </li>
          <li className="navbarItem">
            <NavLink to="/todos" className="navbarButton">
              Todos
            </NavLink>
          </li>
          <li className="navbarItem">
            <NavLink to="/posts" className="navbarButton">
              Posts
            </NavLink>
          </li>
          <li className="navbarItem">
            <NavLink to="/albums" className="navbarButton">
              Albums
            </NavLink>
          </li>
          <li className="navbarItem">
            <NavLink to="/logout" className="navbarButton">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
        <Outlet user={user}/>
    </div>
  );
};

export default Home;

