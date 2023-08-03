import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

export const AuthContext = React.createContext(null);

function Register({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    /* event.preventDefault();
    // let response = await fetch("https://jsonplaceholder.typicode.com/users")
    let response = await fetch(
      `http://localhost:3001/validate_user?username=${userName}&password=${password}`
    ); //http://localhost:3001/users/${user.id}/todos
    if (response.status === 200) {
      let userId = await response.json();
      response = await fetch(`http://localhost:3001/users/${userId}`);
      let json = await response.json();
      setUser(json);
      //console.log(json[0].address.geo.lat.slice(-4));

      window.localStorage.setItem("user", JSON.stringify(json));
      navigate("/");
    } else {
      setError("Your Username or Password wrong!");
    }*/
  };

  // handle register logic here

  return (
    <div className="login-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              required
              type="text"
              id="userName"
              placeholder="Enter user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required
              type="text"
              id="email"
              placeholder="Example: azerty@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              required
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              required
              type="text"
              id="website"
              placeholder="Example: https://example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
