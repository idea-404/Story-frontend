import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components";
import { Login } from "./page";

function App() {
  const location = useLocation();
  const isSignIn = location.pathname === "/signin";
  return (
    <>
      <Header EndPoint={isSignIn} />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
