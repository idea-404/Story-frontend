import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components";
import { Login } from "./page";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
