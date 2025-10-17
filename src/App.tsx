import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components";
import { Search } from "./components";

function App() {
  const location = useLocation();
  const isSignIn = location.pathname === "/signin";
  return (
    <>
      <Header EndPoint={isSignIn} />
      <Search />
      <Routes></Routes>
    </>
  );
}

export default App;
