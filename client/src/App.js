import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import PostDetails from "./components/PostDetails";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const authRedirect = () => {
    return !user ? <Auth /> : <Navigate to="/posts" replace />;
  };

  return (
    <div className="App mycontainer">
      <GoogleOAuthProvider clientId="559547096061-2h4l8b41uuovsuouv1k2o363m27ivb4o.apps.googleusercontent.com">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Navigate to="/posts" replace />} />
            <Route exact path="/posts" element={<Home />} />
            <Route exact path="/posts/search" element={<Home />} />
            <Route exact path="/posts/:id" element={<PostDetails />} />
            <Route exact path="/auth" element={authRedirect()} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
