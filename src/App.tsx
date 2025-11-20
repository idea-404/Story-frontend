import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components";
import { Signin } from "@/Page";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
