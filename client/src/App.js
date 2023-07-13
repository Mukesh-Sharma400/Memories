import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    setUser(storedUser);
  }, []);

  const authRedirect = () => {
    return !user ? <LogIn /> : <Navigate to="/posts" replace />;
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="559547096061-2h4l8b41uuovsuouv1k2o363m27ivb4o.apps.googleusercontent.com">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="/posts/*" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/login" element={authRedirect()} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
