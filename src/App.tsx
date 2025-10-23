import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components";
import { Search } from "./components";
import { useEndpointStore } from "@/store/useEndpointStore";

function App() {
  const location = useLocation();
  const isSignIn = location.pathname === "/signin";

  const { pathname } = useLocation();
  const setEndpoint = useEndpointStore((state) => state.setEndpoint);

  useEffect(() => {
    setEndpoint(pathname);
  }, [pathname]);
  return (
    <>
      <Header EndPoint={isSignIn} />
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
