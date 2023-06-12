import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Albums from "./pages/Albums";
import Posts from "./pages/Posts";
import Logout from "./pages/Logout";
import Todos from "./pages/Todos";
import React, { useState } from "react";
import ProtectedRoute from './pages/ProtectedRoute';
import Photos from './pages/Photos';



function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={
          <ProtectedRoute user={user} setUser={setUser}>
            <Home user={user} />
          </ProtectedRoute>
        } >
          <Route path="/Info" element={<Info user={user} />} />
          <Route path="/Todos" element={<Todos  user={user} />} />
          <Route path="/Posts" element={<Posts user={user} />} />
          <Route path="/Posts/:postId" element={<Posts user={user}/>} />
          <Route path="/Albums" element={<Albums user={user}/>} />
          <Route path="/Albums/:albumId" element={<Photos user={user}/>} />
          <Route path="/Logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
