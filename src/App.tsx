import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
