import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../css/Login.css";

export const AuthContext = React.createContext(null);

function Login({ setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
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
    }
  };

  // handle login logic here

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
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
          {error && <p className="error-message">{error}</p>}
          <NavLink to="/register" className="sign-in">
            new user? sign in
          </NavLink>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// function Login(){
//     return(
//         <div>
//             <h1>"Login"</h1>
//         </div>
//     );
// }

//

// import React, { useState } from 'react';

// const styles = {
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: '2rem',
//   },
//   input: {
//     padding: '0.5rem',
//     margin: '1rem',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     padding: '0.5rem',
//     margin: '1rem',
//     borderRadius: '4px',
//     backgroundColor: '#0077cc',
//     color: '#fff',
//     fontSize: '1rem',
//     border: 'none',
//     cursor: 'pointer',
//   },
//   errorMessage: {
//     color: 'red',
//     marginTop: '1rem',
//   },
// };

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // handle login logic here
//   };

//   return (
//     <div style={styles.form}>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <input
//           style={styles.input}
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button style={styles.button} type="submit">
//           Login
//         </button>
//         {error && <p style={styles.errorMessage}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;
