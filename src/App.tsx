import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components";
import { useEndpointStore } from "@/store/useEndpointStore";

function App() {
  const { pathname } = useLocation();
  const setEndpoint = useEndpointStore((state) => state.setEndpoint);

  useEffect(() => {
    setEndpoint(pathname);
  }, [pathname]);
  return (
    <>
      <Header />
      <Routes></Routes>
    </>
  );
}

export default App;
